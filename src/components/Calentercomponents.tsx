import React, { useState } from 'react';
// import Calendar from 'react-calendar';
import './Scheduler.css';
import { Calendar } from './ui/calendar';

interface SchedulerProps {
  handleDateChange: (value: string) => void;
}

const Scheduler: React.FC<SchedulerProps> = ({ handleDateChange }) => {
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [selectedTime, setSelectedTime] = useState<string | undefined>();

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

  const getTimeSlots = () => {
    return [
      '09:00 AM', '10:00 AM', '11:00 AM', '12:00 PM', '01:00 PM',
      '02:00 PM', '03:00 PM', '04:00 PM', '05:00 PM'
    ];
  };

  const handleTimeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedTime(e.target.value);
  };

  return (
    <div
      className="flex w-full bg-yellow-600 ml-80"
      style={{
        position: 'relative',
        marginTop: '80px',
      }}
    >
      <div
        className="flex-1 p-6 w-full whitespace-nowrap"
        style={{ fontSize: '16px', fontWeight: 'bold' }}
      >
        Doctor Name Doctor Name Doctor Name Doctor Name
      </div>
      <div className="flex-2 w-full align-center justify-center">
        <Calendar
          className="bg-red-500 text-black-400 hover:text-red "
          onDayClick={onDateChange}
        />
      </div>
      <div className="flex flex-col">
        <div className="flex">
          <div
            className="flex-3 pr-6 px-8"
            style={{ fontSize: '16px', fontWeight: 'bold' }}
          >
            <div className="whitespace-nowrap">{formatDate(selectedDate)}</div>
          </div>
          <div className="flex-1 pr-8" style={{ fontSize: '16px' }}>
            <div className="bg-gray-400 p-1">12h</div>
          </div>
          <div className="flex-1" style={{ fontSize: '16px' }}>
            <div className="bg-gray-400 p-1">24h</div>
          </div>
        </div>

        {/* New Row for Time Slots */}
        {getTimeSlots().map((time) => (
          <div key={time} className="flex-1 pr-8" style={{ fontSize: '16px', marginTop: '10px' }}>
            <div className="bg-gray-200 p-2 rounded">
              {time}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Scheduler;
