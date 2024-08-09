// components/Dropdown.tsx
import React, { useState } from 'react';
import { Calendar, DateValue } from '@nextui-org/react';

interface AppointmentProps {
  message: string;
  startDate: string;
  serialNumber: string;
  selectedDoctor: string;
  options: { label: string; value: string }[];
  doctors: { label: string; value: string }[];
  selectedValue: string;
  onChange: (value: string) => void;
  handleDateChange: (value: string) => void;
  handleSerialNumberChange: (value: string) => void;
  handleDoctorChange: (value: string) => void;
  handleMessageChange: (value: string) => void;
  handleCalendarChange: (value: string) => void;
}

const Appointment: React.FC<AppointmentProps> = ({
  message,
  startDate,
  serialNumber,
  selectedDoctor,
  options,
  doctors,
  selectedValue,
  onChange,
  handleSerialNumberChange,
  handleDoctorChange,
  handleMessageChange,
  handleCalendarChange,
}) => {
  const [isCalendarOpen, setIsCalendarOpen] = useState(false);

  return (
    <div>
    <div className="max-w-md mx-auto relative mt-10 p-10 border rounded shadow-md  bg-white">
      <h2 className="text-xl  mb-2">Appointment Booking</h2>
      <hr className="mb-4 " />
      {/* <form onSubmit={handleSubmit}> */}
      <div className="mb-4 relative">
        <div className="flex items-center border border-gray-400 rounded px-3 py-2">
          <input
            type="date"
            className="block w-full text-gray-700 bg-transparent focus:outline-none"
            placeholder="mm/dd/yyyy"
            onChange={(e: any) => handleCalendarChange(e.target.value)}
          />
        </div>
        {isCalendarOpen && (
          <div className="absolute mt-2 bg-white border border-gray-300 shadow-lg z-10">
            <Calendar
              aria-label="Date (controlled)"
              onChange={(e: any) => handleSerialNumberChange(e.target.value)}
            />
          </div>
        )}
      </div>

      <div className="mb-4  text-gray-700">
        <input
          type="text"
          value={serialNumber}
          onChange={(e) => handleSerialNumberChange(e.target.value)}
          className="w-full px-3 py-2 border rounded"
          placeholder="Serial Number"
        />
      </div>
      <div className="mb-4  text-gray-700">
        <select
          value={selectedDoctor}
          onChange={(e) => handleDoctorChange(e.target.value)}
          className="w-full px-3 py-2 border rounded"
        >
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </div>
      <div className="mb-4">
        <select
          value={selectedValue}
          onChange={(e) => onChange(e.target.value)}
          className="w-full px-3 py-2 border rounded"
        >
          {doctors.map((doctor) => (
            <option key={doctor.value} value={doctor.value}>
              {doctor.label}
            </option>
          ))}
        </select>
      </div>
      <div className="mb-4">
        <textarea
          value={message}
          onChange={(e) => handleMessageChange(e.target.value)}
          className="w-full px-3 py-2 border rounded"
          placeholder="Create Message"
        />
      </div>
      <div className="mb-4">
        <button
          type="submit"
          className="w-full px-4 py-2 bg-red-500 text-white font-bold rounded hover:bg-blue-700"
        >
          Appointment Booking
        </button>
      </div>
      {/* </form> */}
      
    </div>
    <div className="text-xs mt-5 mb-2  align-center justify-center ">No money charged in this step</div>
    </div>
    
  );
};

export default Appointment;
