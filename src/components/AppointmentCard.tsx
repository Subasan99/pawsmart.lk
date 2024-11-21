'use client';

import { Appointment } from '@/lib/typings';
import Image from 'next/image';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { cn } from "@/lib/utils";
import { useBookingStore } from '@/store/bookingStore';
import { useState } from 'react';
import { cancelBooking } from '@/app/admin/appointments/action';

interface Doctor {
  id: string;
  bookingDate: string;
  time: string;
  petName: string;
  petAge: string;
  petType: string;
  medicineResponse?: {
    id: string;
    name: string;
  };
  doctorResponse?: {
    id: string;
    name: string;
    specialization: string;
  };
  status: string;
}

interface AppointmentCardProps {
  AppointmentList: Doctor[];
  handleClick: (doctorId: string) => void;
}

const AppointmentCard: React.FC<AppointmentCardProps> = ({
  AppointmentList = [],
  handleClick,
}) => {
  const defaultImage = '/department.png';
  
  const [isPopupVisible, setIsPopupVisible] = useState(false); // Manages popup visibility
  const [selectedAppointment, setSelectedAppointment] = useState<Doctor | null>(null); // Stores the selected appointment for cancellation
  const [isCanceling, setIsCanceling] = useState(false);

  const getStatusStyles = (status: string) => {
    switch (status.toUpperCase()) {
      case 'COMPLETED':
        return "bg-green-100 text-green-800 hover:bg-green-200";
      case 'PENDING':
        return "bg-yellow-100 text-yellow-800 hover:bg-yellow-200";
      case 'CANCELLED':
        return "bg-red-100 text-red-800 hover:bg-red-200";
      default:
        return "bg-gray-100 text-gray-800 hover:bg-gray-200";
    }
  };

  const [selectedBooking, setSelectedBooking, loading] = useBookingStore(
    (state: any) => [
      state.selectedBooking,
      state.setSelectedBooking,
      state.loading,
    ]
  );

  async function handleCancelBooking(id) {
    if (!selectedAppointment) return; // Prevent action if no appointment is selected
    setIsCanceling(true);
    try {
      // Assuming you have a cancelBooking function
      await cancelBooking(selectedAppointment.id);
      const updatedBooking = { ...selectedAppointment, status: 'CANCELLED' };
      setSelectedBooking(updatedBooking);
    } catch (error) {
      console.error('Failed to cancel booking:', error);
      alert('Something went wrong while canceling the booking.');
    } finally {
      setIsCanceling(false);
      setIsPopupVisible(false);  // Close the popup after cancellation is confirmed
    }
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 p-4">
      {Array.isArray(AppointmentList) && AppointmentList.length > 0 ? (
        AppointmentList.map((appointment) => (
          <Card key={appointment.id} className="overflow-hidden hover:shadow-lg transition-shadow">
            {/* Booking Time Section */}
            <div className="bg-blue-50 p-4">
              <div className="flex justify-between items-center">
                <div>
                  <h3 className="text-sm font-semibold text-gray-600">Appointment Date</h3>
                  <p className="text-lg font-bold">{appointment.bookingDate}</p>
                  <p className="text-md text-blue-600">{appointment.time}</p>
                </div>
                <div className={cn(
                  "px-3 py-1 rounded-full text-sm font-medium",
                  getStatusStyles(appointment.status)
                )}>
                  {appointment.status}
                </div>
              </div>
            </div>

            <Separator />

            {/* Pet Information Section */}
            <div className="p-4">
              <div className="flex items-start gap-4">
                <div className="w-24 h-24 relative rounded-lg overflow-hidden flex-shrink-0">
                  <Image
                    src={defaultImage}
                    alt="pet"
                    fill
                    className="object-cover"
                  />
                </div>
                <div>
                  <h3 className="font-semibold text-lg mb-1">Pet Details</h3>
                  <div className="space-y-1">
                    <p className="text-sm"><span className="font-medium">Name:</span> {appointment.petName}</p>
                    <p className="text-sm"><span className="font-medium">Type:</span> {appointment.petType}</p>
                    <p className="text-sm"><span className="font-medium">Age:</span> {appointment.petAge} Yrs</p>
                  </div>
                </div>
              </div>
            </div>

            <Separator />

            {/* Doctor Information Section */}
            <div className="p-4">
              <div className="flex items-start gap-4">
                <div className="w-16 h-16 relative rounded-full overflow-hidden flex-shrink-0">
                  <Image
                    src={defaultImage}
                    alt="doctor"
                    fill
                    className="object-cover"
                  />
                </div>
                <div>
                  <h3 className="font-semibold text-lg mb-1">Doctor Details</h3>
                  <p className="text-sm font-medium">{appointment.doctorResponse?.name}</p>
                  <p className="text-sm text-gray-600">{appointment.doctorResponse?.specialization}</p>

                </div>

              </div>
            </div>
            <p className="text-sm p-4 text-gray-600">Medicine Name: {appointment.medicineResponse?.name}</p>

            {/* Conditionally render Cancel Button */}
            {appointment.status !== "CANCELLED" && (
              <div className="p-4 bg-gray-50">
                <button
                  onClick={() => {
                    setSelectedAppointment(appointment); // Select the appointment
                    setIsPopupVisible(true); // Show the popup
                  }}
                  className="w-full bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 transition-colors focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
                >
                  Cancel Appointment
                </button>
              </div>
            )}
          </Card>
        ))
      ) : (
        <div className="col-span-full">
          <p className="text-center text-xl text-gray-600 py-8">
            No appointments available
          </p>
        </div>
      )}
          {isPopupVisible && selectedAppointment && (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
        <div className="bg-white p-6 rounded-lg shadow-lg w-96">
          <h2 className="text-xl font-bold mb-4">Cancel Appointment</h2>
          <p className="text-gray-600 mb-6">
            Are you sure you want to cancel this appointment? This action
            cannot be undone.
          </p>
          <div className="flex justify-end gap-4">
            <button
              onClick={() => setIsPopupVisible(false)} // Close popup without action
              className="px-4 py-2 bg-gray-300 text-gray-800 rounded-lg hover:bg-gray-400"
            >
              Cancel
            </button>
            <button
              onClick={handleCancelBooking(appointment.id)} 
              className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
              disabled={isCanceling}
            >
              {isCanceling ? 'Canceling...' : 'Confirm'}
            </button>
          </div>
        </div>
      </div>
    )}
    </div>



  );
};

export default AppointmentCard;
