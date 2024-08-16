'use client';
import React, { useEffect, useState } from 'react';
import DoctorProfile from '@/components/DoctorProfile';
import DoctorViewDetails from '@/components/DoctorViewDetails';
import { getBookingFilterData, getDoctorByIdData } from '../(signedin)/home/action';
import { useDoctorStore } from '@/store/doctorStore';
import DoctorAvailable from '@/components/DoctorAvailable';
import UpdateDoctorAvailable from '@/components/UpdateDoctorAvailable';
import { useBookingStore } from '@/store/bookingStore';

const DoctorProfilePage = () => {
  const [doctor, setAllDoctor] = useDoctorStore((state: any) => [
    state.doctor,
    state.setAllDoctor,
  ]);
  const [name, setName] = useState(doctor.name);
  const [description, setDescription] = useState(doctor.description);
  const [specialiction, setSpecialiction] = useState(doctor.specializationName);
  const [imageSrc, setImageSrc] = useState('/department.png');
  const [timeSlotsByDay, setTimeSlotsByDay] = useState<any>([]);
  const [isEditing, setIsEditing] = useState<boolean>(false);
  type TimeSlot = any;

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSave = (
    newName: string,
    newDescription: string,
    newSpecialiction: string
  ) => {
    setName(newName);
    setDescription(newDescription);
    setSpecialiction(newSpecialiction);
    setIsEditing(false);
  };

  const handleProfilePictureUpdate = (newImageSrc: string) => {
    setImageSrc(newImageSrc);
  };

  const [booking, setAllBooking] = useBookingStore((state: any) => [
    state.booking,
    state.setAllBooking,
  ]);

  useEffect(() => {
    fetchData();
  }, [getBookingFilterData]);

  const fetchData = async () => {
    try {
      // Fetch doctor data and booking data
      // const doctor = await getDoctorByIdData('1');
      const bookingData = await getBookingFilterData({
        doctorId: 1,
        pageSize: 10,
        pageCount: 1,
      });
  
      // Set the state with fetched data
      setAllBooking(bookingData.records);
      // setAllDoctor(doctor);
      setImageSrc(doctor.preSignedUrl);
      setTimeSlotsByDay(doctor.dayTimeSlotResponses);
  
      // Extract doctorResponse for each record in bookingData
      // bookingData.records.forEach((record:any) => {
      //   console.log('Doctor Response:', record.doctorResponse);
      // });
  
      // // Example: find a specific doctorResponse by id
      // const targetId = 1; 
      // const targetDoctorResponse = bookingData.records.find(
      //   (record:any) => record.doctorResponse.id === targetId
      // );
  
      // if (targetDoctorResponse) {
      //   console.log('Target Doctor Response:', targetDoctorResponse.doctorResponse);
      // } else {
      //   console.log('No doctorResponse found with id:', targetId);
      // }
  
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };
  

  const dayMapping: { [key: string]: number } = {
    SUNDAY: 0,
    MONDAY: 1,
    TUESDAY: 2,
    WEDNESDAY: 3,
    THURSDAY: 4,
    FRIDAY: 5,
    SATURDAY: 6,
  };

  const tableOfTimeSlotsByDay = Array.isArray(timeSlotsByDay)
    ? timeSlotsByDay.reduce((acc: any, response: any) => {
        const dayNumber = dayMapping[response.day] || 0;
        const appointmentTimes = response.appointmentTimes.map(
          (time: string) =>
            time && {
              startTime: time,
            }
        );
        return {
          ...acc,
          [dayNumber]: appointmentTimes,
        };
      }, {})
    : {};

  return (
<div className="  mt-16  mb-20 bg-gray" style={{width:"100}%"}}>
    <div
      className="container justify-center mt-16 align-start mb-20 bg-gray"
      style={{ width: '100}%' }}
    >
      <div>
        <DoctorProfile
          handleEdit={handleEdit}
          handleSave={handleSave}
          handleProfilePictureUpdate={handleProfilePictureUpdate}
          name={''}
          description={''}
          Specialiction={''}
          imageSrc={''}
          isEditing={isEditing}
        />
    
      </div>
        </div>
        <div className="container p-5 w-auto justify-end " style={{width:"100%"}}>
          <DoctorAvailable/>
   
          <DoctorViewDetails nameOfDocView={''} timeSlotsByDay={tableOfTimeSlotsByDay} handleAccept={function (slot: TimeSlot): void {
          throw new Error('Function not implemented.');
        } } handleCancel={function (slot: TimeSlot): void {
          throw new Error('Function not implemented.');
        } } />
        </div>
    </div>
  );
};

export default DoctorProfilePage;
