'use client';

import Header from '@/components/HomeComponent/Header';
import CircledArrowIcon from '@/components/svg/circled-arrow-icon';
import { useEffect, useState } from 'react';
import {
  getAppointmentBooking,
  getAppointmentBookingFilterData,
  getHospitalFilterData,
} from '../../../home/action';
import { useAuthStore } from '@/store/authStore';
import { useDoctorStore } from '@/store/doctorStore';
import AppointmentCard from '@/components/AppointmentCard';
const Appointments = (premiumBookings: any, normalBookings: any) => {
  const [login] = useAuthStore((state) => [state.login]);
  const [doctorAppointments, setDoctorAppointments, doctorfiltAppointments] =
    useDoctorStore((state: any) => [
      state.doctorAppointments,
      state.setDoctorAppointments,
      state.doctorfiltAppointments,
    ]);
  const [activeTab, setActiveTab] = useState('premium');
  const [DoctorName, setdoctorName] = useState<any[]>([]); // For storing the API response
  const [BookingDate, setbookingdate] = useState<any[]>([]); // For storing the API response
  const [BookingTime, setbookingTime] = useState<any[]>([]); // For storing the API response

  const [Status, setstatus] = useState<any[]>([]); // For storing the API response
  const [Description, setdescription] = useState<any[]>([]); // For storing the API response

  const handleTabClick = (tab: any) => {
    setActiveTab(tab);
  };
  useEffect(() => {
    getAppointmentDetails();
  }, []);

  const getAppointmentDetails = async () => {
    console.log("login?.userId,",login)
    try {
      const filterAppoinmentLinst = await getAppointmentBookingFilterData({
        pageSize: 10,
        pageCount: 1,
        userId: login?.userId,
      });

      setDoctorAppointments(filterAppoinmentLinst?.records);
    } catch (error) {
      console.error('Error fetching hospital data:', error);
    }
  };
  const renderTabContent = () => {
    switch (activeTab) {
      case 'premium':
        return (
          <AppointmentCard
            AppointmentList={doctorAppointments}
            handleClick={handleDoctorClick}
          />
        );
      case 'normal':
        return <div>Normal Bookings: {normalBookings.length}</div>;
      case 'all':
        return (
          <div>
            All Bookings: {premiumBookings.length + normalBookings.length}
          </div>
        );
      default:
        return null;
    }
  };

  const handleDoctorClick = (doctorId: string) => {
    console.log('Book doctor with ID:', doctorId);
  };

  return (
    // <RootLayout pageName="Appointments">
    <div className="container mx-auto mt-16 bg-[#F7F8F9] rounded-xl">
      {/* <div className="sticky z-30 top-0 md:static h-fit">
        <Header />
      </div> */}

      <div className="flex border-b">
        <button
          className={`px-4 py-2 ${
            activeTab === 'premium' ? 'border-b-2 border-blue-500' : ''
          }`}
          onClick={() => handleTabClick('premium')}
        >
          Doctor
        </button>
        <button
          className={`px-4 py-2 ${
            activeTab === 'normal' ? 'border-b-2 border-blue-500' : ''
          }`}
          onClick={() => handleTabClick('normal')}
        >
          Medicine
        </button>
      </div>
      <div className="mt-4">{renderTabContent()}</div>
    </div>
    // </RootLayout>
  );
};

export default Appointments;
