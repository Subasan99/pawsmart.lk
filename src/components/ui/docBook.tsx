import { doctorResponses } from '@/lib/typings';
import { useDoctorStore } from '@/store/doctorStore';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';

interface Doctor {
  id?: any;
  preSignedUrl?: string;
  name: string;
  gender?: string;
  qualification?: string;
  specializationName?: string;
  duration?: string;
  description?: string;
  isActive?:boolean;
}

interface DocBookProps {
  doctors: doctorResponses[];
  defaultImage: string;
  pathname: string;  
  doctor?: boolean;  
  handleClick: (name: string, preSignedUrl: string|null, id: string) => void;
  // setSelectedDoctor: (doctor: Doctor) => void;
}

const DocBook: React.FC<DocBookProps> = ({
  doctors,
  defaultImage,
  pathname,
  doctor,
  handleClick,
  // setSelectedDoctor,


}) => {
  const [setSelectedDoctor] = useDoctorStore((state: any) => [
    state.setSelectedDoctor,
  ]);
console.log("doctors",doctors)
  return (
    // <div className="grid grid-cols-1 w-full sm:grid-cols-2 lg:grid-cols-3 gap-6 p-4">
    //   {doctors.length > 0 ? (
    //     doctors.map((doc, index) => (
    //       <div
    //         key={index}
    //         className="bg-white rounded-lg shadow-md overflow-hidden"
            
    //       >
    //         {/* Image Section */}
    //         <div className="relative h-48">
    //           <Image
    //             src={doc?.preSignedUrl || defaultImage}
    //             alt={doc?.name || 'Doctor'}
    //             layout="fill"
    //             objectFit="cover"
    //             className="w-full"
    //           />
    //         </div>
            
    //         {/* Content Section */}
    //         <div className="p-4">
    //           {/* Header with Rating */}
    //           <div className="flex justify-between items-center mb-2">
    //             <h2 className="text-xl font-semibold text-blue-600">{doc.name}</h2>
    //             <div className="flex items-center">
    //               <span className="bg-blue-100 text-blue-800 text-sm font-semibold px-2.5 py-0.5 rounded">
    //                 {doc.qualification}
    //               </span>
    //             </div>
    //           </div>
              
    //           {/* Location & Specialization */}
    //           <div className="text-gray-600 text-sm mb-4">
    //             <div className="flex items-center gap-2 mb-1">
    //               <span className="font-medium">Specialization:</span>
    //               {doc.specializationName}
    //             </div>
    //             <div className="flex items-center gap-2">
    //               <span className="font-medium">Duration:</span>
    //               {doc.duration} mins
    //             </div>
    //           </div>
              
    //           {/* Room Details */}
    //           <div className="border-t border-gray-200 pt-4 mb-4">
    //             <div className="text-sm text-gray-600">
    //               <div className="mb-1">
    //                 <span className="font-medium">Gender:</span> {doc.gender}
    //               </div>
    //               <div className="text-sm line-clamp-2">
    //                 {doc.description}
    //               </div>
    //             </div>
    //           </div>
              
    //           {/* Booking Button */}
    //           <Link
    //             href={{
    //               pathname: `${pathname}${doc.id && !doctor ? `/${doc.id}` : ''}`,
    //               query: doctor ? { doctorId: doc.id } : undefined,
    //             }}
    //             onClick={() => {
    //               if (doctor) setSelectedDoctor(doc);
    //               handleClick(doc.name, doc.preSignedUrl, doc.id);
    //             }}
    //             className="block w-full text-center bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-md transition-colors"
    //           >
    //             Book Appointment
    //           </Link>
    //         </div>
    //       </div>
    //     ))
    //   ) : (
    //     <div className="col-span-full text-center py-8">
    //       <p className="text-xl text-gray-600">No doctors available</p>
    //     </div>
    //   )}
    // </div>


    <div className="grid grid-cols-1 w-full sm:grid-cols-2 lg:grid-cols-3 gap-6 p-4">
  {doctors.length > 0 ? (
    doctors
      .filter((doc) => doc?.isActive) 
      .map((doc, index) => (
        <div
          key={index}
          className="bg-white rounded-lg shadow-md overflow-hidden"
        >
          {/* Image Section */}
          <div className="relative h-48">
            <Image
              src={doc?.preSignedUrl || defaultImage}
              alt={doc?.name || 'Doctor'}
              layout="fill"
              objectFit="cover"
              className="w-full"
            />
          </div>

          {/* Content Section */}
          <div className="p-4">
            {/* Header with Rating */}
            <div className="flex justify-between items-center mb-2">
              <h2 className="text-xl font-semibold text-blue-600">{doc.name}</h2>
              <div className="flex items-center">
                <span className="bg-blue-100 text-blue-800 text-sm font-semibold px-2.5 py-0.5 rounded">
                  {doc.qualification}
                </span>
              </div>
            </div>

            {/* Location & Specialization */}
            <div className="text-gray-600 text-sm mb-4">
              <div className="flex items-center gap-2 mb-1">
                <span className="font-medium">Specialization:</span>
                {doc.specializationName}
              </div>
              <div className="flex items-center gap-2">
                <span className="font-medium">Duration:</span>
                {doc.duration} mins
              </div>
            </div>

            {/* Room Details */}
            <div className="border-t border-gray-200 pt-4 mb-4">
              <div className="text-sm text-gray-600">
                <div className="mb-1">
                  <span className="font-medium">Gender:</span> {doc.gender}
                </div>
                <div className="text-sm line-clamp-2">
                  {doc.description}
                </div>
              </div>
            </div>

            {/* Booking Button and Active Status */}
            <div className="flex justify-between items-center">
            <span
                className={`text-xs font-semibold py-1 px-2 rounded ${
                  doc?.isActive ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                }`}
              >
                {doc?.isActive ? 'Active' : 'Inactive'}
              </span>
              <Link
                href={{
                  pathname: `${pathname}${doc.id && !doctor ? `/${doc.id}` : ''}`,
                  query: doctor ? { doctorId: doc.id } : undefined,
                }}
                onClick={() => {
                  if (doctor) setSelectedDoctor(doc);
                  handleClick(doc.name, doc.preSignedUrl, doc.id);
                }}
                className="block text-center bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-md transition-colors"
              >
                Book Appointment
              </Link>
             
            </div>
          </div>
        </div>
      ))
  ) : (
    <div className="col-span-full text-center py-8">
      <p className="text-xl text-gray-600">No doctors available</p>
    </div>
  )}
</div>

  );
};

export default DocBook;