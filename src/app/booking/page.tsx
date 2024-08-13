'use client';
import React, { useState } from 'react';
import Calentercomponents from '@/components/Calentercomponents';

import { useSearchParams } from 'next/navigation';
import { useDoctorStore } from '@/store/doctorStore';

const Pets = () => {
  const [doctor, setAllDoctor] = useDoctorStore((state: any) => [
    state.doctor,
    state.setDoctors,
  ]);
  type TimeSlot = any;
  const [doccId, setDocId] = useState<any | undefined>(undefined);
  const SearchParams = useSearchParams();
  const doctors = SearchParams.get('imageQuery');
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [selectedTimeSlot, setSelectedTimeSlot] = useState<TimeSlot | null>(null);
  
  let docName = '';
  let imageName = '';
  let docId = '';

  if (doctors) {
    try {
      const queryData = JSON.parse(doctors);
      docName = queryData.imageName || '';
      imageName = queryData.image || '';
      docId = queryData.id || '';
      setDocId(queryData.id);
    } catch (error) {
      console.error('Error parsing imageQuery:', error);
    }
  }

  const handleDateChange = (value: Date) => {
    console.log('Selected date:', value);
    setSelectedDate(value);
  };

  const handleTimeSlotChange = (slot: { startTime: string; endTime: string }) => {
    console.log(`Selected time slot: ${slot.startTime} - ${slot.endTime}`);
       setSelectedTimeSlot(slot);
  };
  const formatDate = (date: Date) => {
    return date.toLocaleDateString();
  };

  const formatTime = (time: string) => {
    return time;
  };
  const handleContinue = () => {
    if (selectedDate && selectedTimeSlot) {
      const formattedDate = formatDate(selectedDate);
      const formattedStartTime = formatTime(selectedTimeSlot.startTime);
      const formattedEndTime = formatTime(selectedTimeSlot.endTime);
      console.log(`Selected time: ${formattedStartTime} - ${formattedEndTime}`);
      // Redirect or navigate to another page with selected date and time
      // router.push({
      //   pathname: '/appointment',
      //   query: { date: formattedDate, time: `${formattedStartTime} - ${formattedEndTime}` }
      // });
    } else {
      alert('Please select both date and time.');
    }
  };

  const timeSlotsByDay = {
    0: [{ startTime: '10:00 AM', endTime: '11:00 AM' }],
    1: [
      { startTime: '09:00 AM', endTime: '10:00 AM' },
      { startTime: '10:00 AM', endTime: '11:00 AM' },
    ],
    2: [
      { startTime: '09:00 AM', endTime: '10:00 AM' },
      { startTime: '11:00 AM', endTime: '12:00 PM' },
      { startTime: '01:00 PM', endTime: '02:00 PM' },
    ],
    3: [
      { startTime: '09:00 AM', endTime: '10:00 AM' },
      { startTime: '10:00 AM', endTime: '11:00 AM' },
      { startTime: '12:00 PM', endTime: '01:00 PM' },
      { startTime: '02:00 PM', endTime: '03:00 PM' },
    ],
    4: [
      { startTime: '09:00 AM', endTime: '10:00 AM' },
      { startTime: '11:00 AM', endTime: '12:00 PM' },
      { startTime: '03:00 PM', endTime: '04:00 PM' },
    ],
    5: [
      { startTime: '10:00 AM', endTime: '11:00 AM' },
      { startTime: '12:00 PM', endTime: '01:00 PM' },
      { startTime: '04:00 PM', endTime: '05:00 PM' },
    ],
    6: [
      { startTime: '09:00 AM', endTime: '10:00 AM' },
      { startTime: '11:00 AM', endTime: '12:00 PM' },
      { startTime: '01:00 PM', endTime: '02:00 PM' },
      { startTime: '03:00 PM', endTime: '04:00 PM' },
    ],
  };

  return (
    <div className="bg-gray-50 pb-10 mt-20">
      <Calentercomponents
   handleDateChange={handleDateChange}
        handleTimeSlotChange={handleTimeSlotChange}
        handleContinue={handleContinue} // Pass the callback here
        name={docName}
        timeSlotsByDay={timeSlotsByDay}
      />
    </div>
  );
};

export default Pets;