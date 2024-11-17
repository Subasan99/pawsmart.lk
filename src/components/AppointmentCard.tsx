'use client';

import { Appointment } from '@/lib/typings';
import Image from 'next/image';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
// import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { cn } from "@/lib/utils";

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
            <p className="text-sm p-4 text-gray-600">Medicine Name:{"appointment.medicineResponse?.name"}</p>

            {/* Cancel Button */}
            <div className="p-4 bg-gray-50">
              <button
                onClick={() => handleClick(appointment.id)}
                className="w-full bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 transition-colors focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
              >
                Cancel Appointment
              </button>
            </div>
          </Card>
        ))
      ) : (
        <div className="col-span-full">
          <p className="text-center text-xl text-gray-600 py-8">
            No appointments available
          </p>
        </div>
      )}
    </div>
  );
};

export default AppointmentCard;