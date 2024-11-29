'use client';

import { useState } from 'react';
import Image from 'next/image';
import { Card } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { cn } from '@/lib/utils';
import { ArrowRight } from 'lucide-react';

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
  AppointmentList: Doctor[] | any;
  handleCancelClick: (appointmentId: string) => void;
}

const AppointmentCard: React.FC<AppointmentCardProps> = ({
  AppointmentList = [],
  handleCancelClick,
}) => {
  const defaultImage = '/department.png';

  const [isPopupVisible, setIsPopupVisible] = useState(false);
  const [selectedAppointment, setSelectedAppointment] = useState<Doctor | null>(
    null
  );
  const [isCanceling, setIsCanceling] = useState(false);

  const getStatusStyles = (status: string) => {
    switch (status.toUpperCase()) {
      case 'COMPLETED':
        return 'bg-green-100 text-green-800 hover:bg-green-200';
      case 'PENDING':
        return 'bg-yellow-100 text-yellow-800 hover:bg-yellow-200';
      case 'CANCELLED':
        return 'bg-red-100 text-red-800 hover:bg-red-200';
      default:
        return 'bg-gray-100 text-gray-800 hover:bg-gray-200';
    }
  };

  // const handleCancelClick = (appointment: Doctor) => {
  //   setSelectedAppointment(appointment);
  //   setIsPopupVisible(true);
  // };

  // const confirmCancel = async () => {
  //   if (!selectedAppointment) return;
  //   setIsCanceling(true);
  //   await handleCancel(selectedAppointment.id);
  //   setIsCanceling(false);
  //   setIsPopupVisible(false);
  // };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 p-4">
      {Array.isArray(AppointmentList) && AppointmentList.length > 0 ? (
        AppointmentList.map((appointment) => (
          <Card
            key={appointment.id}
            className="overflow-hidden hover:shadow-lg transition-shadow"
          >
            {/* Booking Time Section */}
            <div className="bg-blue-50 p-4">
              <div className="flex justify-between items-center">
                <div>
                  <h3 className="text-sm font-semibold text-gray-600">
                    Appointment Date
                  </h3>
                  <p className="text-lg font-bold">{appointment.bookingDate}</p>
                  <p className="text-md text-blue-600">{appointment.time}</p>
                </div>
                <div className="flex flex-col items-center">
                  <div
                    className={cn(
                      'px-3 py-1 rounded-full text-sm font-medium mb-2',
                      getStatusStyles(appointment.status)
                    )}
                  >
                    {appointment.status}
                  </div>

                  <button
                    // className="bg-red-500 p-2 text-white rounded-lg text-sm underline hover:text-white-800"
                    className="flex items-center justify-center group bg-red-500  hover:bg-red-600 text-white font-medium py-2 px-4 rounded-md transition-colors"
                    onClick={() => handleCancelClick(appointment)}
                    disabled={appointment.status.toUpperCase() !== 'CONFIRMED'}
                    // disabled={appointment.status.toUpperCase() !== 'PENDING'}

                    // disabled={appointment.status.toUpperCase() !== 'COMPLETED'}
                  >
                    Cancel
                    <ArrowRight
                      className="ml-2 w-0 opacity-0 group-hover:w-5 group-hover:opacity-100 text-white transition-all duration-200"
                      size={20}
                    />
                  </button>
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
                    <p className="text-sm">
                      <span className="font-medium">Name:</span>{' '}
                      {appointment.petName}
                    </p>
                    <p className="text-sm">
                      <span className="font-medium">Type:</span>{' '}
                      {appointment.petType}
                    </p>
                    <p className="text-sm">
                      <span className="font-medium">Age:</span>{' '}
                      {appointment.petAge} Yrs
                    </p>
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
                  <p className="text-sm font-medium">
                    {appointment.doctorResponse?.name}
                  </p>
                  <p className="text-sm text-gray-600">
                    {appointment.doctorResponse?.specialization}
                  </p>
                </div>
              </div>
            </div>
            <p className="text-sm p-4 text-gray-600">
              Medicine Name: {appointment.medicineResponse?.name}
            </p>
          </Card>
        ))
      ) : (
        <div className="col-span-full">
          <p className="text-center text-xl text-gray-600 py-8">
            No appointments available
          </p>
        </div>
      )}

      {/* Cancel Popup */}
      {/* {isPopupVisible && selectedAppointment && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-96">
            <h2 className="text-xl font-bold mb-4">Cancel Appointment</h2>
            <p className="text-gray-600 mb-6">
              Are you sure you want to cancel this appointment? This action
              cannot be undone.
            </p>
            <div className="flex justify-end gap-4">
              <button
                onClick={() => setIsPopupVisible(false)}
                className="px-4 py-2 bg-gray-300 text-gray-800 rounded-lg hover:bg-gray-400"
              >
                Cancel
              </button>
              <button
                onClick={confirmCancel}
                className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
                disabled={isCanceling}
              >
                {isCanceling ? 'Canceling...' : 'Confirm'}
              </button>
            </div>
          </div>
        </div>
      )} */}
    </div>
  );
};

export default AppointmentCard;
