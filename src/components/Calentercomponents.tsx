import React, { useState } from 'react';
import { Calendar } from './ui/calendar';
import './Scheduler.css';

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
    <div
      className="flex flex-col lg:flex-row w-full lg:ml-80 container"
      style={{
        position: 'relative',
        marginTop: '80px',
      }}
    >
      <div
        className="flex-1 p-6 w-full whitespace-nowrap justify-center align-center border-l-2 border-gray-200 pl-2 text-lg font-bold"
      >
        Scheduler
      </div>
      <div className="flex-2 w-full align-center justify-center mx-2">
        <Calendar
          className="text-black-400 hover:text-red"
          onDayClick={onDateChange}
        />
      </div>
      <div className="flex flex-col mx-4 border-gray-200 pl-2 border-r-2">
        <div className="flex">
          <div
            className="flex-3 pr-4 px-8 text-lg font-bold whitespace-nowrap"
          >
            <div>{formatDate(selectedDate)}</div>
          </div>
          <div className="flex-1 pr-8 text-lg">
            <div
              className="bg-gray-400 p-1 cursor-pointer"
              onClick={() => toggleTimeFormat('12h')}
            >
              12h
            </div>
          </div>
          <div className="flex-1 text-lg">
            <div
              className="bg-gray-400 p-1 cursor-pointer"
              onClick={() => toggleTimeFormat('24h')}
            >
              24h
            </div>
          </div>
        </div>
        <div className="flex flex-col mt-4">
          {timeSlots.map((slot, index) => (
            <div
              key={index}
              className="bg-gray-200 p-2 mb-2 rounded w-full text-lg"
            >
              {formatTime(slot.startTime)} - {formatTime(slot.endTime)}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Scheduler;
