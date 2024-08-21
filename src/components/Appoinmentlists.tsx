import React from 'react';
import { useState, useEffect } from 'react'; // Assuming you'll fetch appointments

const Appoinmentlists = () => {

  const [appointments, setAppointments] = useState([]);

  useEffect(() => {
    // Fetch appointments from API
    // setAppointments(fetchedAppointments);
  }, []);

  const handleCancelAppointment = (appointmentId:any) => {
    // Implement cancellation logic
    console.log('Canceling appointment:', appointmentId);
  };

  return (
    <div className="container mx-auto">
      <h2 className="text-2xl font-bold mb-4">My Appointments</h2>
      <ul>
        {appointments.map((appointment) => (
          <li key={appointment.id} className="border-b p-4">
            {/* Display appointment details */}
            <p>Date: {appointment.date}</p>
            <p>Time: {appointment.time}</p>
            {/* ... other details */}
            <button
              className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
              onClick={() => handleCancelAppointment(appointment.id)}
            >
              Cancel
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Appoinmentlists;