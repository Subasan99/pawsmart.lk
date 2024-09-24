'use client';
import AppointmentBook from '@/components/AppointmentBook';
import Header from '@/components/HomeComponent/Header';
import Image from 'next/image';
import { useState } from 'react';
import DefaultDoc from '../../../../../public/default_user.png';
import { useDoctorStore } from '@/store/doctorStore';
import { DEFAULT_CIPHERS } from 'tls';
import Loader from '@/components/Loader';
import { Mail, Smartphone } from 'lucide-react';

const AppointmentDoctor = () => {
  const handleClick = (imageName: string) => {
    console.log(`Image clicked: ${imageName}`);
  };
  const [login, setLogin] = useState<any | undefined>();

  const [selectedDoctor, loading] = useDoctorStore((state: any) => [
    state.selectedDoctor,
    state.loading,
  ]);

  const doctorOptions = [
    { label: 'Select doctor', value: '' },
    { label: 'Doctor 1', value: 'doctor1' },
    { label: 'Doctor 2', value: 'doctor2' },
    { label: 'Doctor 3', value: 'doctor3' },
  ];

  const doctor = [
    { label: 'Select doctor', value: '' },
    { label: 'Doctor 1x', value: 'doctor1f' },
    { label: 'Doctor 2c', value: 'doctor2c' },
    { label: 'Doctor 3x', value: 'doctor3c' },
  ];

  const [appointmentInfo, setAppointmentInfo] = useState({
    message: '',
    startDate: '',
    serialNumber: '',
    selectedDoctor: '',
    selectedValue: '',
  });

  const handleChange = (field: any, value: any) => {
    setAppointmentInfo((prevState) => ({ ...prevState, [field]: value }));
  };

  const options = [
    { value: '1', label: '1' },
    { value: '2', label: '2' },
    { value: '3', label: '3' },
    { value: '4', label: '4' },
    { value: '5', label: '5' },
  ];

  const [rating, setRating] = useState('');
  const [Reviewmessage, setReviewmessage] = useState('');

  const handleDoctorChange = (value: string) => {
    setRating(value);
  };

  const handleMessageReview = (value: string) => {
    setReviewmessage(value);
  };
  console.log(selectedDoctor);

  const [votedrating, setVotedRating] = useState(0);
  const handleRatingChange = (value: string) => setRating(value);
  const handleReviewChange = (value: string) => setReviewmessage(value);

  return (
    <div className="flex flex-col md:flex-row w-full justify-start items-center md:items-center md:justify-center gap-3 h-full">
      {/* Your content here */}

      <div className="flex w-full h-full pt-8 pb-1 md:w-[350px] md:h-full md:basis-1/2 md:justify-self-start md:justify-end   self-start">
        {loading ? (
          <div className="flex flex-col grow items-center justify-center p-10 md:max-w-[470px]  bg-white border rounded shadow-md">
            <Loader className="h-10 w-10" />
          </div>
        ) : (
          <div className="flex w-full grow md:justify-self-end items-center md:h-full flex-col gap-5 p-6 md:max-w-[470px] bg-white border rounded shadow-md h-full px-10 py-10    ">
            {/* // <div className="md:max-w-md  w-full gap-3 flex flex-col items-center px-2 py-11 border p-6 rounded shadow-md my-0 bg-white"> */}
            <div className="relative flex h-[350px] w-[150px] md:w-full md:h-[420px] self-center -p-8  rounded-xl md:bg-[#666666]">
              {!selectedDoctor?.preSignedUrl ? (
                <Image
                  src={selectedDoctor?.preSignedUrl}
                  alt="doctor"
                  fill
                  className="object-cover object-top rounded-full md:rounded-none"
                />
              ) : (
                <Image
                  src={DefaultDoc}
                  alt="doctor"
                  fill
                  className="object-contain"
                />
              )}
            </div>
            <div className="flex flex-col items-center gap-2 px-2 ">
              <div className="font-bold text-xl md:text-2xl text-center w-full">
                <div>{selectedDoctor?.name}</div>
                <div className="text-lg md:text-xl font-semibold w-full">
                  {selectedDoctor?.departmentName}
                </div>
                <div className="text-lg md:text-xl font-semibold w-full">
                  {selectedDoctor?.specializationName}
                </div>
              </div>
              <div className="flex items-center font-semibold text-lg md:text-xl text-center">
                <Mail className="mr-2" />
                {selectedDoctor?.email}
              </div>
              <div className="flex items-center font-semibold text-lg md:text-xl text-center">
                <Smartphone className="mr-2" />
                {selectedDoctor?.phoneNo}
              </div>

              <div className="font-semibold text-md md:text-lg text-center  w-full">
                &quot;{selectedDoctor?.description}&quot;
              </div>
            </div>
          </div>
        )}
      </div>
      <div className="flex w-full md:w-fit md:basis-1/2">
        {/* @ts-expect-error */}
        <AppointmentBook
          userId="1"
          message={appointmentInfo.message}
          startDate={appointmentInfo.startDate}
          serialNumber={appointmentInfo.serialNumber}
          selectedDoctor={appointmentInfo.selectedDoctor}
          handleDateChange={(newDate) => handleChange('startDate', newDate)}
          handleSerialNumberChange={(newSerialNumber) =>
            handleChange('serialNumber', newSerialNumber)
          }
          handleDoctorChange={(value) => handleChange('selectedDoctor', value)}
          handleMessageChange={(newMessage) =>
            handleChange('message', newMessage)
          }
          options={doctorOptions}
          selectedValue={appointmentInfo.selectedValue}
          onChange={(value) => handleChange('selectedValue', value)}
          doctors={doctor}
          handleCalendarChange={function (value: string): void {}}
          login={login}
        />
      </div>
    </div>
  );
};

export default AppointmentDoctor;
