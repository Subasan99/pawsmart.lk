import React, { useState } from 'react';
import { Calendar } from './ui/calendar';
import './Scheduler.css';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

interface SchedulerProps {
  handleDateChange: (value: string) => void;
  name: any;
}

interface TimeSlot {
  startTime: string;
  endTime: string;
}

const Scheduler: React.FC<SchedulerProps> = ({ handleDateChange, name }) => {
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [selectedTime, setSelectedTime] = useState<string>('');
  const [is24HourFormat, setIs24HourFormat] = useState<boolean>(false);

  const onDateChange = (date: Date) => {
    setSelectedDate(date);
    handleDateChange(date.toString());
  };

  const formatDate = (date: Date) => {
    const options: Intl.DateTimeFormatOptions = {
      weekday: 'short',
      day: 'numeric',
    };
    return date.toLocaleDateString('en-US', options);
  };

  const timeSlotsByDay: { [key: number]: TimeSlot[] } = {
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

  const getTimeSlots = (date: Date): TimeSlot[] => {
    const dayOfWeek = date.getDay();
    return timeSlotsByDay[dayOfWeek] || [];
  };

  const handleTimeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedTime(e.target.value);
  };

  const toggleTimeFormat = (format: '12h' | '24h') => {
    setIs24HourFormat(format === '24h');
  };

  const convertTo24HourFormat = (time: string) => {
    const [timePart, modifier] = time.split(' ');
    let [hours, minutes] = timePart.split(':').map(Number);

    if (modifier === 'PM' && hours !== 12) {
      hours += 12;
    } else if (modifier === 'AM' && hours === 12) {
      hours = 0;
    }

    return `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}`;
  };

  const formatTime = (time: string) => {
    if (is24HourFormat) {
      return convertTo24HourFormat(time);
    } else {
      return time;
    }
  };

  const timeSlots = getTimeSlots(selectedDate);

  return (
    <div className="flex justify-center items-center container">
    <Card className=" bg-gray-200">
      <CardHeader>
        <CardTitle>Select a Date & Time</CardTitle>
        <CardDescription>When scheduling your appointment, you’ll have the flexibility to choose a date and time that fits your schedule. Our user-friendly scheduling system ensures that you can easily find available slots and secure your preferred appointment time.</CardDescription>
      </CardHeader>
      <CardContent className="grid grid-cols-1 lg:grid-cols-3 gap-4 ">
        <div className="col-span-1 ">
        <div className="flex">
          <div
            className="flex-3 pr-4 px-8 text-lg font-bold whitespace-nowrap"
          >
            Doctor
          </div>
          <div
            className="flex-3 pr-4 italic text-lg text-gray-500 whitespace-nowrap"
          >
          fgh
          </div>

        </div>
        </div>
        <div className="col-span-1 flex justify-center items-center bg-white">
          <Calendar
            className="text-black-400 hover:text-red"
            onDayClick={onDateChange}
          />
        </div>
        <div className="col-span-1 ">
        <div className="flex">
          <div
            className="flex-3 pr-4 px-8 text-lg font-bold whitespace-nowrap"
          >
            <div>{formatDate(selectedDate)}</div>
          </div>
          <div className="flex items-center bg-white p-2 border rounded-lg">
  <div className="flex-1 pr-4 text-lg">
    <div
      className=" cursor-pointer rounded"
      onClick={() => toggleTimeFormat('12h')}
    >
      12h
    </div>
  </div>
  <div className="flex-1 text-lg">
    <div
      className=" cursor-pointer rounded"
      onClick={() => toggleTimeFormat('24h')}
    >
      24h
    </div>
  </div>
</div>

        </div>
        <div className="flex flex-col mt-4">
          {timeSlots.map((slot, index) => (
            <div
              key={index}
              className="bg-gray-200 p-2 mb-2  ml-2 rounded w-full text-lg items-center justify-center border"
            >
              {formatTime(slot.startTime)} - {formatTime(slot.endTime)}
            </div>
          ))}
        </div>
        </div>

        
      </CardContent>
      <CardFooter className=" justify-end items-center">
      <button
          type="submit"
          className="justify-end px-4 py-2 bg-red-500 text-white font-bold rounded hover:bg-blue-700"
        >
         continue
        </button>
      </CardFooter>
    </Card>
  </div>
  );
};

export default Scheduler;
