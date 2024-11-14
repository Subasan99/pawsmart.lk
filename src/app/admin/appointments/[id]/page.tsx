'use client';

import { useBookingStore } from '@/store/bookingStore';
import { useEffect } from 'react';
import { getBookingById } from '../action';
import {
  AlertCircle,
  Calendar,
  CheckCircle,
  Clock,
  Heart,
  Mail,
  Phone,
  PlusIcon,
  Stethoscope,
  User,
} from 'lucide-react';

const Index = ({ params }: { params: { id: string } }) => {
  const [selectedBooking, setSelectedBooking, loading] = useBookingStore(
    (state: any) => [
      state.selectedBooking,
      state.setSelectedBooking,
      state.loading,
    ]
  );

  async function handleSelectBooking() {
    const data = await getBookingById(params.id);
    setSelectedBooking(data);
  }

  useEffect(() => {
    handleSelectBooking();
  }, [params.id]);

  if (loading) {
    return <div>Loading...!</div>;
  }

  const {
    userResponse,
    doctorResponse,
    bookingDate,
    time,
    medicineResponse,
    description,
    status,
    bookingType,
    petName,
    petAge,
    petType,
  } = selectedBooking || {};
  const DetailItem = ({ label, value, icon: Icon }: any) => (
    <div className="flex items-center gap-2 ">
      {Icon && <Icon className="w-4 h-4 text-gray-400" />}
      <span className="font-medium text-gray-600">{label}:</span>
      <span className="text-gray-800">{value}</span>
    </div>
  );

  const SectionHeader = ({ title, icon: Icon, bgColor, iconColor }: any) => (
    <div className="flex items-center gap-3 mb-4">
      <div className={`${bgColor} p-2 rounded-full`}>
        <Icon className={`w-6 h-6 ${iconColor}`} />
      </div>
      <h2 className="text-xl font-semibold text-gray-800">{title}</h2>
    </div>
  );
  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-6">
      <div className="bg-gradient-to-r  rounded-t-2xl p-6 text-black">
        <div className="flex items-center justify-between flex-wrap gap-4">
          <h1 className="text-2xl md:text-3xl font-bold">Booking Details</h1>
          <div
            className={`flex items-center ${
              status === 'CANCELED'
                ? 'bg-red-600 text-white'
                : status === 'COMPLETED'
                ? 'bg-green-600 text-white'
                : status === 'CONFIRMED'
                ? 'bg-blue-500 text-black'
                : 'bg-gray-600 text-white'
            } p-2 rounded-lg`}
          >
            <CheckCircle className="w-5 h-5" />
            <span className="font-semibold ml-2">{status}</span>
          </div>
        </div>
      </div>

      <div className="bg-white shadow-xl rounded-b-2xl divide-y divide-gray-100">
        <div className="p-6">
          <SectionHeader
            title="Booking Information"
            icon={Calendar}
            bgColor="bg-blue-100"
            iconColor="text-blue-600"
          />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-3 pl-14">
            <DetailItem
              label="Booking Date"
              value={bookingDate}
              icon={Calendar}
            />
            <DetailItem label="Time" value={time} icon={Clock} />
            <DetailItem label="Pet Name" value={petName} icon={Heart} />
            <DetailItem label="Pet Age" value={petAge} icon={Heart} />
            <DetailItem label="Pet Type" value={petType} icon={Heart} />
            <div className="col-span-full">
              <DetailItem
                label="Description"
                value={description}
                icon={AlertCircle}
              />
            </div>
          </div>
        </div>

        {bookingType === 'DOCTOR' ? (
          <div className="p-6">
            <SectionHeader
              title="Doctor Details"
              icon={Stethoscope}
              bgColor="bg-purple-100"
              iconColor="text-purple-600"
            />
            <div className="space-y-3 pl-14">
              <DetailItem
                label="Name"
                value={doctorResponse?.name}
                icon={User}
              />
              <DetailItem
                label="Email"
                value={doctorResponse?.email}
                icon={Mail}
              />
              <DetailItem
                label="Phone"
                value={doctorResponse?.phoneNo}
                icon={Phone}
              />
              <DetailItem
                label="Date of Birth"
                value={doctorResponse?.dateOfBirth}
                icon={Calendar}
              />
              <DetailItem
                label="Gender"
                value={doctorResponse?.gender}
                icon={User}
              />
              <div className="flex items-center gap-2 mt-4">
                <span className="bg-purple-50 px-3 py-1 rounded-full text-purple-600 text-sm">
                  {doctorResponse?.specialization}
                </span>
                {doctorResponse?.department && (
                  <span className="bg-purple-50 px-3 py-1 rounded-full text-purple-600 text-sm">
                    {doctorResponse?.department}
                  </span>
                )}
              </div>
            </div>
          </div>
        ) : (
          <div className="p-6">
            <SectionHeader
              title="Medicine Details"
              icon={PlusIcon}
              bgColor="bg-green-100"
              iconColor="text-green-600"
            />
            <div className="space-y-3 pl-14">
              <DetailItem label="Name" value={medicineResponse?.name} />
              <DetailItem
                label="Description"
                value={medicineResponse?.description}
              />
            </div>
          </div>
        )}

        {/* User Details */}
        <div className="p-6">
          <SectionHeader
            title="User Details"
            icon={User}
            bgColor="bg-green-100"
            iconColor="text-green-600"
          />
          <div className="space-y-3 pl-14">
            <DetailItem
              label="Name"
              value={`${userResponse?.firstName} ${userResponse?.lastName}`}
              icon={User}
            />
            <DetailItem label="Email" value={userResponse?.email} icon={Mail} />
            <DetailItem
              label="Phone"
              value={userResponse?.phoneNo}
              icon={Phone}
            />
            <DetailItem
              label="Date of Birth"
              value={userResponse?.dateOfBirth}
              icon={Calendar}
            />
            <DetailItem
              label="Gender"
              value={userResponse?.gender}
              icon={User}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
