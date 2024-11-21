'use client';

import { useBookingStore } from '@/store/bookingStore';
import { useEffect, useState } from 'react';
import { cancelBooking, getBookingById } from '../action';
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
  Syringe,
  User,
  XIcon,
} from 'lucide-react';
import { useRouter } from 'next/navigation';

const Index = ({ params }: { params: { id: string } }) => {
  const router = useRouter();
  const [selectedBooking, setSelectedBooking, loading] = useBookingStore(
    (state: any) => [
      state.selectedBooking,
      state.setSelectedBooking,
      state.loading,
    ]
  );
  const [isPopupVisible, setIsPopupVisible] = useState(false); // Manage popup visibility
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



  const [isCanceling, setIsCanceling] = useState(false); // To handle cancel state


  async function handleCancelBooking() {
    setIsCanceling(true);
    try {
      await cancelBooking(params.id);
      const updatedBooking = { ...selectedBooking, status: 'CANCELED' };
      setSelectedBooking(updatedBooking);
    } catch (error) {
      console.error('Failed to cancel booking:', error);
      alert('Something went wrong while canceling the booking.');
    } finally {
      setIsCanceling(false);
      setIsPopupVisible(false); // Close popup after action
    }
  }
  useEffect(() => {
    handleSelectBooking();
  }, [params.id]);
  
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
    <div className="flex items-center gap-2">
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

  const handleClose = () => {
    router.back();
  };
  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-6">
      <div className="bg-gradient-to-r rounded-t-2xl p-6 text-black">
        <div className="flex items-center justify-between flex-wrap gap-4">

        <button
          type="button"
          onClick={handleClose}
          className="absolute top-24 right-10 text-gray-500 hover:text-gray-700"
        >
          <XIcon className="h-5 w-5" />
        </button>
        <div className="flex items-center">
            <Calendar className="mr-2 text-black font-bold group-hover:text-black transition-colors duration-200" />
            <div className="font-bold text-2xl">Booking Details</div>
          </div>
          <div
            className={`flex items-center cursor-pointer ${
              status === 'CANCELED'
                ? 'bg-red-600 text-white'
                : status === 'COMPLETED'
                ? 'bg-green-600 text-white'
                : status === 'CONFIRMED'
                ? 'bg-blue-600 text-white'
                : 'bg-gray-600 text-white'
            } p-2 rounded-lg`}
            onClick={
              status !== 'CANCELED' && !isCanceling
                ? () => setIsPopupVisible(true) // Show popup
                : undefined
            }
          >
            {isCanceling ? (
              <span>Canceling...</span>
            ) : (
              <>
                <CheckCircle className="w-5 h-5" />
                <span className="font-semibold ml-2">{status}</span>
              </>
            )}
          </div>
        </div>
      </div>

      <div className="bg-white shadow-xl rounded-b-2xl divide-y divide-gray-100">
        {/* Booking Information */}
        <div className="p-6">
          <SectionHeader
            title="Booking Information"
            icon={Calendar}
            bgColor="bg-blue-100"
            iconColor="text-blue-600"
          />
          <div className="flex flex-wrap gap-x-6 gap-y-3 pl-14">
            <DetailItem label="Booking Date" value={bookingDate} icon={Calendar} />
            <DetailItem label="Time" value={time} icon={Clock} />
            <DetailItem label="Pet Name" value={petName} icon={Heart} />
            <DetailItem label="Pet Age" value={petAge} icon={Heart} />
            <DetailItem label="Pet Type" value={petType} icon={Heart} />
            <DetailItem label="Description" value={description} icon={AlertCircle} />
          </div>
        </div>

      
        {isPopupVisible && (
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
                onClick={handleCancelBooking}
                className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
                disabled={isCanceling}
              >
                {isCanceling ? 'Canceling...' : 'Confirm'}
              </button>
            </div>
          </div>
        </div>
      )}

        {bookingType === 'DOCTOR' ? (
          <div className="p-6">
            <SectionHeader
              title="Doctor Details"
              icon={Stethoscope}
              bgColor="bg-purple-100"
              iconColor="text-purple-600"
            />
            <div className="flex flex-wrap gap-x-6 gap-y-3 pl-14">
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
              {doctorResponse?.specialization && (
                <DetailItem
                  label="Specialization"
                  value={doctorResponse?.specialization}
                  icon={Stethoscope}
                />
              )}
              {doctorResponse?.department && (
                <DetailItem
                  label="Department"
                  value={doctorResponse?.department}
                  icon={Stethoscope}
                />
              )}
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
            <div className="flex flex-wrap gap-x-6 gap-y-3 pl-14">
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
          <div className="flex flex-wrap gap-x-6 gap-y-3 pl-14">
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
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;


//  'use client';


// import { useBookingStore } from '@/store/bookingStore';
// import { useEffect, useState } from 'react';
// import { cancelBooking, getBookingById } from '../action';
// import {
//   AlertCircle,
//   Calendar,
//   CheckCircle,
//   Clock,
//   Heart,
//   Mail,
//   Phone,
//   PlusIcon,
//   Stethoscope,
//   User,
// } from 'lucide-react';

// const Index = ({ params }: { params: { id: string } }) => {
//   const [selectedBooking, setSelectedBooking, loading] = useBookingStore(
//     (state: any) => [
//       state.selectedBooking,
//       state.setSelectedBooking,
//       state.loading,
//     ]
//   );
//   const [isPopupVisible, setIsPopupVisible] = useState(false); // Manage popup visibility
//   const [isCanceling, setIsCanceling] = useState(false); // To handle cancel state

//   async function handleSelectBooking() {
//     const data = await getBookingById(params.id);
//     setSelectedBooking(data);
//   }

//   useEffect(() => {
//     handleSelectBooking();
//   }, [params.id]);

//   if (loading) {
//     return <div>Loading...!</div>;
//   }

//   async function handleCancelBooking() {
//     setIsCanceling(true);
//     try {
//       await cancelBooking(params.id);
//       const updatedBooking = { ...selectedBooking, status: 'CANCELED' };
//       setSelectedBooking(updatedBooking);
//     } catch (error) {
//       console.error('Failed to cancel booking:', error);
//       alert('Something went wrong while canceling the booking.');
//     } finally {
//       setIsCanceling(false);
//       setIsPopupVisible(false); // Close popup after action
//     }
//   }

//   const {
//     userResponse,
//     doctorResponse,
//     bookingDate,
//     time,
//     medicineResponse,
//     description,
//     status,
//     bookingType,
//     petName,
//     petAge,
//     petType,
//   } = selectedBooking || {};

//   const DetailItem = ({ label, value, icon: Icon }: any) => (
//     <div className="flex items-center gap-2">
//       {Icon && <Icon className="w-4 h-4 text-gray-400" />}
//       <span className="font-medium text-gray-600">{label}:</span>
//       <span className="text-gray-800">{value}</span>
//     </div>
//   );

//   return (
//     <div className="min-h-screen bg-gray-50 p-4 md:p-6">
//       <div className="bg-gradient-to-r rounded-t-2xl p-6 text-black">
//         <div className="flex items-center justify-between flex-wrap gap-4">
//           <div className="flex items-center">
//             <Calendar className="mr-2 text-black font-bold group-hover:text-black transition-colors duration-200" />
//             <div className="font-bold text-2xl">Booking Details</div>
//           </div>
//           <div
//             className={`flex items-center cursor-pointer ${
//               status === 'CANCELED'
//                 ? 'bg-red-600 text-white'
//                 : status === 'COMPLETED'
//                 ? 'bg-green-600 text-white'
//                 : status === 'CONFIRMED'
//                 ? 'bg-blue-500 text-black'
//                 : 'bg-gray-600 text-white'
//             } p-2 rounded-lg`}
//             onClick={
//               status !== 'CANCELED' && !isCanceling
//                 ? () => setIsPopupVisible(true) // Show popup
//                 : undefined
//             }
//           >
//             {isCanceling ? (
//               <span>Canceling...</span>
//             ) : (
//               <>
//                 <CheckCircle className="w-5 h-5" />
//                 <span className="font-semibold ml-2">{status}</span>
//               </>
//             )}
//           </div>
//         </div>
//       </div>

//       {/* Popup */}
//       {isPopupVisible && (
//         <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
//           <div className="bg-white p-6 rounded-lg shadow-lg w-96">
//             <h2 className="text-xl font-bold mb-4">Cancel Appointment</h2>
//             <p className="text-gray-600 mb-6">
//               Are you sure you want to cancel this appointment? This action
//               cannot be undone.
//             </p>
//             <div className="flex justify-end gap-4">
//               <button
//                 onClick={() => setIsPopupVisible(false)}
//                 className="px-4 py-2 bg-gray-300 text-gray-800 rounded-lg hover:bg-gray-400"
//               >
//                 Cancel
//               </button>
//               <button
//                 onClick={handleCancelBooking}
//                 className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
//                 disabled={isCanceling}
//               >
//                 {isCanceling ? 'Canceling...' : 'Confirm'}
//               </button>
//             </div>
//           </div>
//         </div>
//       )}

//       {/* Booking Information */}
//       <div className="bg-white shadow-xl rounded-b-2xl divide-y divide-gray-100">
//         <div className="p-6">
//           <div className="flex flex-wrap gap-x-6 gap-y-3 pl-14">
//             <DetailItem label="Booking Date" value={bookingDate} icon={Calendar} />
//             <DetailItem label="Time" value={time} icon={Clock} />
//             <DetailItem label="Pet Name" value={petName} icon={Heart} />
//             <DetailItem label="Pet Age" value={petAge} icon={Heart} />
//             <DetailItem label="Pet Type" value={petType} icon={Heart} />
//                    <DetailItem label="Description" value={description} icon={AlertCircle} />

//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Index;
