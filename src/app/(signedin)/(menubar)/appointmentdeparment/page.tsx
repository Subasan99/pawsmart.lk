'use client';
import Image from 'next/image';
import React, { useEffect, useState } from 'react';
import RootLayout from '../layout';
import Dropdown from '@/components/DropDown';
import AppointmentBook from '@/components/AppointmentBook';
import ReviewSection from '@/components/Review';
import InfoSection from '@/components/DepInfo';
import { useSearchParams } from 'next/navigation';

const AppointmentDeparment = () => {
  const searchParams = useSearchParams();
  const textOverlay = searchParams.get('textOverlay');
  const date = searchParams.get('date');

  useEffect(() => {
    console.log(`textOverlay: ${searchParams}`);
    console.log(`date: ${date}`);
  }, [textOverlay, date]);
  const handleClick = (imageName: string) => {
    console.log(`Image clicked: ${imageName}`);
  };
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

  return (
    <RootLayout pageName="Anatolian Shepherd">
      <div className="grid grid-cols-1 lg:grid-cols-3 min-h-screen bg-gray-150 pb-10 overflow-y-auto bg-gray-50">
        <div className="col-span-1 lg:col-span-2 flex items-center justify-center bg-gray-150 min-h-full">
          <div className="pb-10 pt-6 pr-2 pl-6 lg:pl-40 min-h-full flex flex-col justify-between">
            <Image
              src="/doctor.png"
              alt="Company Logo"
              width={690}
              height={460}
              className="mt-5 lg:mt-20 mb-5"
            />
            <div>
              <h2 className="text-2xl lg:text-4xl font-bold mb-2">Xatem mitrum facen</h2>
              <div className="flex items-center text-xs pb-3 font-bold text-gray-700">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  className="w-5 h-5 mr-2"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                  />
                </svg>
                07-08-2022
              </div>
              <InfoSection
                title="Title"
                description="Description"
                imageSrc="/department.png"
                imageAlt="Department Image"
                date="Aug 18, 2022"
              />
            </div>
          </div>
        </div>
        <div className="col-span-1 flex  lg:pr-40 min-h-screen relative">
          <div className="relative max-w-full w-full px-6 lg:px-0">
            <AppointmentBook
              message={appointmentInfo.message}
              startDate={appointmentInfo.startDate}
              serialNumber={appointmentInfo.serialNumber}
              selectedDoctor={appointmentInfo.selectedDoctor}
              handleDateChange={(newDate) => handleChange('startDate', newDate)}
              handleSerialNumberChange={(newSerialNumber) =>
                handleChange('serialNumber', newSerialNumber)
              }
              handleDoctorChange={(value) =>
                handleChange('selectedDoctor', value)
              }
              handleMessageChange={(newMessage) =>
                handleChange('message', newMessage)
              }
              options={doctorOptions}
              selectedValue={appointmentInfo.selectedValue}
              onChange={(value) => handleChange('selectedValue', value)}
              doctors={doctor}
              handleCalendarChange={function (value: string): void {}}
            />
          </div>
        </div>
      </div>
    </RootLayout>
  );
};

export default AppointmentDeparment;
