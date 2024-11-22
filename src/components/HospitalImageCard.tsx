import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Heart } from 'lucide-react';

interface HospitalImageCardProps {
  item: any;
  onClick: (id: string) => void;
  pathname?: string;
  doctor?: boolean;
  setSelectedDoctor?: (doctor: any) => void;
  handleClick?: (name: string, url: string, id: string) => void;
  defaultImage?: string;
}

const HospitalImageCard = ({
  item,
  onClick,
  pathname = '/hospital',
  doctor = false,
  setSelectedDoctor,
  handleClick,
  defaultImage = '/api/placeholder/400/320',
}: HospitalImageCardProps) => {
  const doctors =
    item.doctorDepartmentResponses
      ?.flatMap((dept: any) =>
        dept.doctorResponses?.map((doc: any) => ({
          ...doc,
          departmentName: dept.departmentResponse.name,
        }))
      )
      .filter(Boolean) || [];

  return (
    // <div className="w-full space-y-6">
    //   <div className="bg-white rounded-lg shadow-md p-6 flex flex-col gap-6">
    //     {doctors.length > 0 ? (
    //       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
    //         {doctors.map((doctor: any, index: number) => (
    //           <Link
    //             key={index}
    //             href={{
    //               pathname: `${pathname}${doctor.id ? `/${doctor.id}` : ''}`,
    //               query: doctor ? { doctorId: doctor.id } : undefined,
    //             }}
    //             className="group relative aspect-square overflow-hidden rounded-lg"
    //             onClick={() => {
    //               if (setSelectedDoctor) setSelectedDoctor(doctor);
    //               if (handleClick) handleClick(doctor.name, doctor.preSignedUrl, doctor.id);
    //             }}
    //           >

    //             <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/0 to-transparent z-10"></div>

    //             <div className="relative w-full h-full">
    //               <Image
    //                 src={item.preSignedUrl || defaultImage}
    //                 alt={doctor.name}
    //                 fill
    //                 className="object-cover object-center group-hover:scale-110 transition-transform duration-300"
    //               />
    //             </div>

    //             <div className="absolute bottom-0 left-0 right-0 p-4 z-20">
    //               <h3 className="text-white font-semibold text-lg">{doctor.name}</h3>
    //               <p className="text-white/80 text-sm">{doctor.departmentName}</p>
    //             </div>

    //             <button
    //               className="absolute top-3 right-3 w-8 h-8 flex items-center justify-center bg-white/80 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-200 z-20"
    //               onClick={(e) => {
    //                 e.preventDefault();
    //                 // Add favorite functionality here
    //               }}
    //             >
    //               <Heart className="w-5 h-5 text-gray-600" />
    //             </button>
    //           </Link>
    //         ))}
    //       </div>
    //     ) : (
    //       <div className="text-center py-8">
    //         <h3 className="text-xl font-semibold text-gray-500">No doctors available at this time</h3>
    //       </div>
    //     )}

    //     <div>
    //       <div className="flex items-start justify-between">
    //         <div>
    //           <h2 className="text-xl font-semibold text-gray-900">{item.name}</h2>
    //           <p className="text-gray-500">{item.city}</p>
    //         </div>
    //         <div className="flex flex-col items-end">
    //           <div className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-sm font-semibold">8.6</div>
    //           <span className="text-sm text-gray-600 mt-1">87 reviews</span>
    //         </div>
    //       </div>

    //       <div className="mt-4 flex items-center text-sm text-gray-600">
    //         <span>{item.address}</span>
    //         <span className="mx-2">•</span>
    //         <span>
    //           {item.openTime} - {item.closeTime}
    //         </span>
    //       </div>

    //       <div className="mt-4 flex flex-wrap gap-2">
    //         {item.doctorDepartmentResponses?.map((dept: any) => (
    //           <span
    //             key={dept.departmentResponse.id}
    //             className="px-3 py-1 rounded-full text-sm bg-gray-100 text-gray-800"
    //           >
    //             {dept.departmentResponse.name}
    //           </span>
    //         ))}
    //       </div>

    //       <div className="mt-6 flex items-center justify-between">
    //         <div>
    //           <p className="text-red-600 font-medium">{doctors.length} doctors available</p>
    //           <p className="text-sm text-gray-500">Book your appointment today</p>
    //         </div>
    //         <button
    //           className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
    //           onClick={(e) => {
    //             e.stopPropagation();
    //             onClick?.(item.id);
    //           }}
    //         >
    //           Book Now
    //         </button>
    //       </div>
    //     </div>
    //   </div>
    // </div>

    <div className="bg-white rounded-lg shadow-md p-6 flex gap-6 items-start">
      {/* <Link
    href={{
      pathname: `${pathname}${item.id ? `/${item.id}` : ''}`,
      query: item ? { doctorId: item.id } : undefined,
    }}
    // className="group relative aspect-square overflow-hidden rounded-lg"
    className="bg-white rounded-lg shadow-md p-6 flex gap-6 items-start"

    onClick={() => {
      if (setSelectedDoctor) setSelectedDoctor(item);
      if (handleClick) handleClick(item.name, item.preSignedUrl, item.id);
    }}
  > */}
      <div className="flex-shrink-0 w-36 h-36">
        <Image
          src={item.preSignedUrl || defaultImage}
          alt={item.name}
          width={144}
          height={200}
          
          className="object-cover rounded-lg"
        />
      </div>

      <div className="flex-1">
        <div className="flex items-start justify-between">
          <div>
            <h2 className="text-xl font-semibold text-gray-900">{item.name}</h2>
            <p className="text-gray-500">From {''} {item.city}</p>
          </div>
          <div className="flex flex-col items-end">
            <div
              className={`px-2 py-1 rounded text-sm font-semibold ${
                item.active
                  ? 'bg-green-100 text-green-800'
                  : 'bg-red-100 text-red-800'
              }`}
            >
              {item.active ? 'Active' : 'Inactive'}
            </div>
            <span className="text-sm text-gray-600 mt-1">
              {item.openTime} - {item.closeTime}
            </span>
          </div>
        </div>

        <div className="mt-4 flex items-center text-sm text-gray-600">
          <span>at {' '}{item.address}</span>
        </div>

        <div className="mt-4 flex flex-wrap gap-2">
  {item.doctorDepartmentResponses?.map((dept: any) => (
    <span
      key={dept.departmentResponse.id}
      className="px-3 py-1 rounded-full text-sm bg-gray-100 text-gray-800"
    >
    Department of{ " "}{dept.departmentResponse.name}
    </span>
  ))}
</div>

        <Link
          href={{
            pathname: `${pathname}${item.id ? `/${item.id}` : ''}`,
            query: item ? { doctorId: item.id } : undefined,
          }}
          className="group relative aspect-square overflow-hidden rounded-lg"
          // className="bg-white rounded-lg shadow-md p-6 flex gap-6 items-start"

          onClick={() => {
            if (setSelectedDoctor) setSelectedDoctor(item);
            if (handleClick) handleClick(item.name, item.preSignedUrl, item.id);
          }}
        >
          <div className="mt-6 flex items-center justify-between">
            <div className=' p-4'>
              <p className="text-red-600 font-medium">
                {doctors.length} doctors available
              </p>
              <p className="text-sm  text-gray-500">
                Book your appointment today
              </p>
            </div>
            <button
              className={`px-6 py-2 m-4 rounded-lg text-white transition-colors ${
                doctors.length > 0 && item.active
                  ? 'bg-blue-600 hover:bg-blue-700'
                  : 'bg-gray-400 cursor-not-allowed'
              }`}
              onClick={(e) => {
                e.stopPropagation();
                if (doctors.length > 0 && item.active) {
                  onClick?.(item.id);
                }
              }}
              disabled={doctors.length === 0 || !item.active}
            >
         {doctors.length > 0 && item.active ? 'Booking Available' : 'Booking Unavailable'}
            </button>
          </div>
        </Link>
      </div>
    </div>
  );
};

export default HospitalImageCard;
