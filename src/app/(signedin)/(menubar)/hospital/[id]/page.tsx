// 'use client';
// import React, { useCallback, useEffect, useState } from 'react';
// import { getByIdHospital } from '@/app/home/action';
// import Header from '@/components/Header';
// import { useHospitalStore } from '@/store/hospitalStore';
// import { Phone } from 'lucide-react';
// import { useRouter } from 'next/navigation';
// import DocBook from '@/components/ui/docBook';
// import Image from 'next/image'; // Import the Image component

// const Index = ({ params }: { params: { id: string } }) => {
//   const router = useRouter();
//   const [
//     selectedHospital,
//     setSelectedHospital,
//     departments,
//     doctors,
//     medicines,
//     setLoading,
//   ] = useHospitalStore((state) => [
//     state.selectedHospital,
//     state.setSelectedHospital,
//     state.departments,
//     state.doctors,
//     state.medicines,
//     state.setLoading,
//   ]);

//   const [showDoctors, setShowDoctors] = useState(true);
//   const [showMedicines, setShowMedicines] = useState(true);
//   const [showDepartments, setShowDeparments] = useState(true);
  


//   const getByHospitalDetails = useCallback(async () => {
//     try {
//       setLoading(true);
//       const getByHospital = await getByIdHospital(params?.id);
//       setSelectedHospital(getByHospital);
//     } catch (error) {
//       console.error(error);
//     } finally {
//       setLoading(false);
//     }
//   }, [params?.id, setLoading, setSelectedHospital]); // Add dependencies

//   useEffect(() => {
//     getByHospitalDetails();
//   }, [getByHospitalDetails]);

//   const handleTabClick = (tab: string) => {
//     setActiveTab(tab);
//   };

//   const defaultImage = '/hello.png';
//   const [activeTab, setActiveTab] = useState('doctors');

//   const handleClick = (imageName: string) => {
//     console.log(`${imageName} clicked!`);
//   };
  
//   return (
//     <div id="hospitals" className="pb-8 pt-20">
//       <div className="sticky z-30 top-0 md:static h-fit">
//         {/* <Header /> */}
//       </div>
//       <div>
//         <section className="flex flex-col items-center py-12 z-5 w-full px-4 pb-8 max-w-6xl mx-auto">
//           <div className="flex flex-col md:flex-row justify-between items-start w-full">
//             <div className="relative m-2 flex-1 flex flex-col items-center">
//               <Image
//                 src={defaultImage}
//                 alt="Hospital Building"
//                 className="w-full h-96 rounded-md transform rotate-[-15deg] object-cover"
//                 width={300} // Add width and height to Image
//                 height={300}
//               />
//               <div
//                 className="absolute top-1 right-0 hover:bg-red-600 bg-blue-900 h-16 w-36 text-white p-3 rounded-md shadow-lg transform translate-x-1/5 border-r-2 border-red-500"
//                 style={{ cursor: 'pointer' }}
//               >
//                 <p className="text-sm text-center">STUBBY !</p>
//                 <p className="text-lg font-bold text-center flex items-center justify-center">
//                   Call Me...
//                   <Phone />
//                 </p>
//               </div>
//             </div>
//             <div className="m-1 flex-1 text-center">
//               <h1 className="text-3xl md:text-4xl font-bold leading-snug">
//                 Easily locate the nearest
//                 <span className="text-red-500"> {selectedHospital?.name}</span>
//               </h1>
//               <p className="mt-4 text-gray-600">
//                 Hospital and access healthcare services in your area.
//                 <br />
//                 Book an appointment with our expert doctors
//                 <br />
//                 and explore Medifin for convenient medical solutions—all from
//                 the comfort of your home.
//               </p>
//               <p className="mt-4 text-gray-600">
//                 {selectedHospital?.description}
//               </p>
//               <p className="mt-4 text-gray-600">
//                 Location: {selectedHospital?.city}, {selectedHospital?.district}, {selectedHospital?.province}
//               </p>
//             </div>
//           </div>
//         </section>
//       </div>

//       <div className="mt-8">
//         <div className="flex flex-col md:flex-row justify-between items-start p-2 md:p-2 lg:p-2 max-w-full">
//           <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-4 mt-8 w-full">
//             <button
//               className={`px-4 py-2 rounded-md border-l-8 border-red-500 pl-2 min-w-[150px] ${
//                 activeTab === 'doctors'
//                   ? 'bg-blue-600 text-white'
//                   : 'bg-gray-200'
//               }`}
//               onClick={() => handleTabClick('doctors')}
//             >
//               <h2 className="font-bold text-sm md:text-base lg:text-lg">
//                 Find the Doctors
//               </h2>
//               <p className="text-xs md:text-sm lg:text-base border-l-2 border-white-500 mb-2">
//                 and Book
//               </p>
//             </button>
//             <button
//               className={`px-4 py-2 rounded-md border-l-8 border-red-500 pl-2 min-w-[150px] ${
//                 activeTab === 'medicines'
//                   ? 'bg-blue-600 text-white'
//                   : 'bg-gray-200'
//               }`}
//               onClick={() => handleTabClick('medicines')}
//             >
//               <h2 className="font-bold text-sm md:text-base lg:text-lg">
//                 Find the Medicines
//               </h2>
//               <p className="text-xs md:text-sm lg:text-base border-l-2 border-white-500 mb-2">
//                 and Book
//               </p>
//             </button>
//             <button
//               className={`px-4 py-2 rounded-md border-l-8 border-red-500 pl-2 min-w-[150px] ${
//                 activeTab === 'departments'
//                   ? 'bg-blue-600 text-white'
//                   : 'bg-gray-200'
//               }`}
//               onClick={() => handleTabClick('departments')}
//             >
//               <h2 className="font-bold text-sm md:text-base lg:text-lg">
//                 Find the Departments
//               </h2>
//               <p className="text-xs md:text-sm lg:text-base border-l-2 border-white-500 mb-2">
//                 and Book
//               </p>
//             </button>
//             <button
//               className={`px-4 py-2 rounded-md border-l-8 border-red-500 pl-2 min-w-[150px] ${
//                 activeTab === 'reviews'
//                   ? 'bg-blue-600 text-white'
//                   : 'bg-gray-200'
//               }`}
//               onClick={() => handleTabClick('reviews')}
//             >
//               <h2 className="font-bold text-sm md:text-base lg:text-lg">
//                 {' '}
//                 Reviews
//               </h2>
//             </button>
//           </div>
//         </div>
        
//         {activeTab === 'doctors' && (
//           <div className="w-full mt-4">
//             {showDoctors && (
//               <DocBook
//                 doctors={doctors}
//                 defaultImage="/department.png"
//                 pathname="/appointmentdoctor"
//                 doctor={true}
//                 handleClick={handleClick}
//               />
//             )}
//           </div>
//         )}
        
//         {activeTab === 'medicines' && (
//           <div className="mt-8">
//             {showMedicines && (
//               <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
//                 {medicines.length > 0 ? (
//                   medicines.map((medicine, index) => (
//                     <div
//                       key={index}
//                       className="m-2 hover:bg-white shadow-lg bg-slate-100 relative"
//                       style={{
//                         border: '1px solid #ddd',
//                         padding: '20px',
//                         borderRadius: '8px',
//                         cursor: 'pointer',
//                         paddingBottom: '60px',
//                       }}
//                     >
//                       <div className="flex-none text-center">
//                         <Image
//                           src={defaultImage}
//                           alt="Medicine"
//                           className="w-28 h-28 rounded-md mx-auto"
//                           width={100} // Add width and height to Image
//                           height={100}
//                         />
//                       </div>
//                       <div className="text-center mt-4">
//                         <h1 className="text-xl font-bold leading-snug">
//                           {medicine.name}
//                         </h1>
//                         <p className="mt-2 text-gray-600">
//                           Description: {medicine.description}
//                         </p>
//                       </div>
//                       <button className="absolute bottom-2 right-2 bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
//                         Book Now
//                       </button>
//                     </div>
//                   ))
//                 ) : (
//                   <p className="m-10 text-center justify-center text-xl align-middle text-gray-600">
//                     No medicines
//                   </p>
//                 )}
//               </div>
//             )}
//           </div>
//         )}
        
//         {activeTab === 'departments' && (
//           <div className="w-full mt-4">
//             {showDepartments && (
//               <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
//                 {departments.length > 0 ? (
//                   departments?.map((deparment, index) => (
//                     <div
//                       key={index}
//                       className="m-2 hover:bg-white shadow-lg bg-slate-100 relative"
//                       style={{
//                         border: '1px solid #ddd',
//                         padding: '20px',
//                         borderRadius: '8px',
//                         cursor: 'pointer',
//                         paddingBottom: '60px',
//                       }}
//                     >
//                       <div className="flex-none text-center">
//                         <Image
//                           src={defaultImage}
//                           alt="Department"
//                           className="w-28 h-28 rounded-md mx-auto"
//                           width={100} // Add width and height to Image
//                           height={100}
//                         />
//                       </div>
//                       <div className="text-center mt-4">
//                         <h1 className="text-xl font-bold leading-snug">
//                           {deparment.name}
//                         </h1>
//                         <p className="mt-2 text-gray-600">
//                           Description: {deparment.description}
//                         </p>
//                       </div>
//                     </div>
//                   ))
//                 ) : (
//                   <p>No departments available.</p>
//                 )}
//               </div>
//             )}
//           </div>
//         )}

//         {activeTab === 'reviews' && (
//           <div className="mt-8">
//             <h2 className="text-2xl font-bold">Reviews</h2>
//             {/* Add review section here */}
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default Index;


// 'use client';
// import React, { useEffect, useState } from 'react';
// import { getByIdHospital } from '@/app/home/action';
// import Header from '@/components/Header';
// import { useHospitalStore } from '@/store/hospitalStore';
// import { Phone } from 'lucide-react';
// import { useRouter } from 'next/navigation';
// import DocBook from '@/components/ui/docBook';

// const Index = ({ params }: { params: { id: string } }) => {
//   const router = useRouter();
//   const [
//     selectedHospital,
//     setSelectedHospital,
//     departments,
//     doctors,
//     medicines,
//     setLoading,
//   ] = useHospitalStore((state) => [
//     state.selectedHospital,
//     state.setSelectedHospital,
//     state.departments,
//     state.doctors,
//     state.medicines,
//     state.setLoading,
//   ]);

//   const [showDoctors, setShowDoctors] = useState(true);
//   const [showMedicines, setShowMedicines] = useState(true);
//   const [showDepartments, setShowDeparments] = useState(true);
//   useEffect(() => {
//     getByHospitalDetails();
//   }, [params?.id]);

//   const getByHospitalDetails = async () => {
//     try {
//       setLoading(true);
//       const getByHospital = await getByIdHospital(params?.id);

//       setSelectedHospital(getByHospital);
//     } catch (error) {

//     }
//   };

//   const handleViewDoctors = () => {
//     setShowDoctors(true);
//   };

//   const handleViewMedicines = () => {
//     setShowMedicines(true);
//   };

//   const handleViewDepartments = () => {
//     setShowDeparments(true);
//   };

//   const defaultImage = '/hello.png';
//   const [activeTab, setActiveTab] = useState('doctors');

//   const handleTabClick = (tab: any) => {
//     setActiveTab(tab);
//   };
//   const [selectedDoctor, setSelectedDoctor] = useState(null);
//   const handleSetSelectedDoctor = (doctor: any) => {
//     setSelectedDoctor(doctor);
//   };

//   const handleClick = (imageName: any) => {
//     console.log(`${imageName} clicked!`);
//   };
//   return (
//     <div id="hospitals" className="pb-8 pt-20">
//       <div className="sticky z-30 top-0 md:static h-fit">
//         <Header />
//       </div>
//       <div>
//         <section className="flex flex-col items-center py-12 z-5 w-full px-4 pb-8 max-w-6xl mx-auto">
//           <div className="flex flex-col md:flex-row justify-between items-start w-full">
//             <div className="relative m-2 flex-1 flex flex-col items-center">
//               <img
//                 src={defaultImage}
//                 alt="Hospital Building"
//                 className="w-full h-96 rounded-md transform rotate-[-15deg] object-cover"
//               />
//               <div
//                 className="absolute top-1 right-0 hover:bg-red-600 bg-blue-900 h-16 w-36 text-white p-3 rounded-md shadow-lg transform translate-x-1/5 border-r-2 border-red-500"
//                 style={{ cursor: 'pointer' }}
//               >
//                 <p className="text-sm text-center">STUBBY !</p>
//                 <p className="text-lg font-bold text-center flex items-center justify-center">
//                   Call Me...
//                   <Phone />
//                 </p>
//               </div>
//             </div>
//             <div className="m-1 flex-1 text-center">
//               <h1 className="text-3xl md:text-4xl font-bold leading-snug">
//                 Easily locate the nearest
//                 <span className="text-red-500"> {selectedHospital?.name}</span>
//               </h1>
//               <p className="mt-4 text-gray-600">
//                 Hospital and access healthcare services in your area.
//                 <br />
//                 Book an appointment with our expert doctors
//                 <br />
//                 and explore Medifin for convenient medical solutions—all from
//                 the comfort of your home.
//               </p>
//               <p className="mt-4 text-gray-600">
//                 {selectedHospital?.description}
//               </p>
//               <p className="mt-4 text-gray-600">
//                 Location: {selectedHospital?.city}, {selectedHospital?.district}
//                 , {selectedHospital?.province}
//               </p>
//             </div>
//           </div>
//         </section>
//       </div>

//       <div className="mt-8">

//         <div className="flex flex-col md:flex-row justify-between items-start p-2 md:p-2 lg:p-2 max-w-full">
//           <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-4 mt-8 w-full">

//             <button
//               className={`px-4 py-2 rounded-md border-l-8 border-red-500 pl-2 min-w-[150px] ${
//                 activeTab === 'doctors'
//                   ? 'bg-blue-600 text-white'
//                   : 'bg-gray-200'
//               }`}
//               onClick={() => handleTabClick('doctors')}
//             >
//               <h2 className="font-bold text-sm md:text-base lg:text-lg">
//                 Find the Doctors
//               </h2>
//               <p className="text-xs md:text-sm lg:text-base border-l-2 border-white-500 mb-2">
//                 and Book
//               </p>

//             </button>

// {/*
//             <button
//               className={`px-4 py-2 rounded-md border-l-8 border-red-500 pl-2 min-w-[150px] ${
//                 activeTab === 'medicines'
//                   ? 'bg-blue-600 text-white'
//                   : 'bg-gray-200'
//               }`}
//               onClick={() => handleTabClick('medicines')}
//             >
//               <h2 className="font-bold text-sm md:text-base lg:text-lg">
//                 Find the Medicines
//               </h2>
//               <p className="text-xs md:text-sm lg:text-base border-l-2 border-white-500 mb-2">
//                 and Book
//               </p>
//             </button>
//             <button
//               className={`px-4 py-2 rounded-md border-l-8 border-red-500 pl-2 min-w-[150px] ${
//                 activeTab === 'departments'
//                   ? 'bg-blue-600 text-white'
//                   : 'bg-gray-200'
//               }`}
//               onClick={() => handleTabClick('departments')}
//             >
//               <h2 className="font-bold text-sm md:text-base lg:text-lg">
//                 Find the Departments
//               </h2>
//               <p className="text-xs md:text-sm lg:text-base border-l-2 border-white-500 mb-2">
//                 and Book
//               </p>
//             </button>
//             <button
//               className={`px-4 py-2 rounded-md border-l-8 border-red-500 pl-2 min-w-[150px] ${
//                 activeTab === 'reviews'
//                   ? 'bg-blue-600 text-white'
//                   : 'bg-gray-200'
//               }`}
//               onClick={() => handleTabClick('reviews')}
//             >
//               <h2 className="font-bold text-sm md:text-base lg:text-lg">
//                 {' '}
//                 Reviews
//               </h2>
//             </button>
//  */}

//           </div>
//         </div>

//         {/* {activeTab === 'doctors' && ( */}
//           <div className="w-full mt-4">
//             {showDoctors && (
//               <DocBook
//                 doctors={doctors}
//                 defaultImage="/department.png"
//                 pathname="/appointmentdoctor"
//                 doctor={true}
//                 handleClick={handleClick}
//               />
//             )}
//           </div>
//         {/* )} */}
//         {/* {activeTab === 'medicines' && (
//           <div className="mt-8">
//             {showMedicines && (
//               <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
//                 {medicines.length > 0 ? (
//                   medicines.map((medicine, index) => (
//                     <div
//                       key={index}
//                       className="m-2 hover:bg-white shadow-lg bg-slate-100 relative"
//                       style={{
//                         border: '1px solid #ddd',
//                         padding: '20px',
//                         borderRadius: '8px',
//                         cursor: 'pointer',
//                         paddingBottom: '60px',
//                       }}
//                     >
//                       <div className="flex-none text-center">
//                         <img
//                           src={defaultImage}
//                           alt="Medicine"
//                           className="w-28 h-28 rounded-md mx-auto"
//                         />
//                       </div>
//                       <div className="text-center mt-4">
//                         <h1 className="text-xl font-bold leading-snug">
//                           {medicine.name}
//                         </h1>
//                         <p className="mt-2 text-gray-600">
//                           Description: {medicine.description}
//                         </p>
//                       </div>
//                       <button className="absolute bottom-2 right-2 bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
//                         Book Now
//                       </button>
//                     </div>
//                   ))
//                 ) : (
//                   <p className="m-10 text-center justify-center text-xl align-middle text-gray-600">
//                     No medicines
//                   </p>
//                 )}
//               </div>
//             )}
//           </div>
//         )} */}
// {/*
//         {activeTab === 'departments' && (
//           <div className="w-full mt-4">
//             {showDepartments && (
//               <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-4">
//                 {departments.length > 0 ? (
//                   departments?.map((deparment, index) => (
//                     <div
//                       key={index}
//                       className="m-2 hover:bg-white shadow-lg bg-slate-100 relative"
//                       style={{
//                         border: '1px solid #ddd',
//                         padding: '20px',
//                         borderRadius: '8px',
//                         cursor: 'pointer',
//                       }}
//                     >
//                       <div className="flex-none text-center">
//                         <img
//                           src={defaultImage}
//                           alt="Medicine"
//                           className="w-28 h-28 rounded-md mx-auto"
//                         />
//                       </div>
//                       <div className="text-center mt-4">
//                         <h1 className="text-xl font-bold leading-snug">
//                           {deparment.name}
//                         </h1>
//                         <p className="mt-2 text-gray-600">
//                           Description: {deparment.description}
//                         </p>
//                       </div>
//                     </div>
//                   ))
//                 ) : (
//                   <p className="m-10 text-center justify-center text-xl align-middle text-gray-600">
//                     No deparments
//                   </p>
//                 )}
//               </div>
//             )}
//           </div>
//         )} */}
// {/*
//         {activeTab === 'reviews' && (
//           <div className="mt-8">
//             <h2 className="font-bold text-2xl">Reviews</h2>
//           </div>
//         )} */}
//       </div>
//     </div>
//   );
// };

// export default Index;
'use client';

import React, { useEffect, useState } from 'react';
import { getByIdHospital, getDoctorFilterData } from '@/app/home/action';
import { useHospitalStore } from '@/store/hospitalStore';
import { useRouter } from 'next/navigation';
import DocBook from '@/components/ui/docBook';
import FilterDropdown from '@/components/FilterDropdown';
import { Calendar } from '@/components/ui/calendar';
import { CalendarIcon, CloudFog } from 'lucide-react';
import { useAdminStore } from '@/store/adminStore';
import { useDoctorStore } from '@/store/doctorStore';
import { Input } from '@/components/ui/input';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { format } from 'date-fns';
import { getAllPets } from '@/app/admin/pets/action';
import { usePetStore } from '@/store/petStore';
import Pets from '../../pets/page';

const Index = ({ params }: { params: { id: string } }) => {
  const router = useRouter();
  const [docName, setDocName] = useState<any>('');
  const [nameSpecialization, setSelectedSpecialization] = useState<any>('');

  const [petName, setPetName] = useState<any>(''); // State for pet name
  const [selectedDate, setSelectedDate] = useState<any>(''); // State for selected date
  const [hospitalResName, setResHospitalName] = useState<any>(undefined);
  const [doctorNames, setDoctorNames] = useState<any[]>([]);

  const [
    selectedHospital,
    setSelectedHospital,
    departments,
    doctors,
    medicines,
    doctorsinhospital,
    setDoctors,
    specializationinhospital,
    setSpecialization,
    setLoading,
  ] = useHospitalStore((state) => [
    state.selectedHospital,
    state.setSelectedHospital,
    state.departments,
    state.doctors,
    state.medicines,
    state.doctorsinhospital,
    state.setDoctors,
    state.specializationinhospital,
    state.setSpecialization,
    state.setLoading,
  ]);
  const [pet, setAllPet] = usePetStore((state: any) => [
    state.pet,
    state.setAllPet,
  ]);
  const [open, setOpen] = useState(false);
  useEffect(() => {
    getByHospitalDetails();
  }, []);

  useEffect(() => {
    // doctorFilter();
  }, [  nameSpecialization.value,
    petName.value,
    selectedDate]);

  const getByHospitalDetails = async () => {
    try {
      setLoading(true);
      const getByHospital = await getByIdHospital(params?.id);
      const pets = await getAllPets();

      const DoctorData = await getByIdHospital(params?.id);
      setSelectedHospital(getByHospital);
      setAllPet(pets);

      // const doctorNames = DoctorData.map((doctor: any) => ({
      //   label: doctor.name,
      //   value: doctor.id,
      // }));

      const doctorNames =
        DoctorData?.doctorDepartmentResponses.flatMap((department: any) =>
          department?.doctorResponses.map((doctor: any) => ({
            label: doctor.name, // Doctor name
            value: doctor.id, // Doctor ID
          }))
        ) || [];

      const SpecializationNames =
        DoctorData?.doctorDepartmentResponses.flatMap((department: any) =>
          department?.doctorResponses.map((doctor: any) => ({
            label: doctor.specializationName, // Doctor name
            value: doctor.id,
          }))
        ) || [];

      setDoctors(doctorNames);
      setSpecialization(SpecializationNames);
      // if (!docName) {
      //   setSelectedHospital(getByHospital);
      // }

      // const doctors = getByHospital.records
      //   .flatMap((record: any) =>
      //     record.doctorDepartmentResponses.flatMap(
      //       (dept: any) => dept.doctorResponses
      //     )
      //   )
      //   .map((doctor: any) => ({
      //     label: doctor.name,
      //     value: doctor.id,
      //   }));

      // setDoctorNames(doctors);
    } catch (error) {
      console.error(error);
    }
  };

//   const doctorFilter = async () => {
//     // debugger
//     try {
//       setLoading(true);
// // debugger
//       const searchTextData = await getDoctorFilterData({
//         pageCount:10,
//         pageSize:1,
//         name:docName,
//         departmentId:undefined,
// petId:petName.value,
// specializationId:nameSpecialization.value,
// date:selectedDate
//       });
// // debugger
//       console.log(
//         'searchTextDatasearchTextDatasearchTextData',
//         searchTextData?.data,
//       );

//       // if (searchTextData?.records?.length > 0) {
//       //   // Flatten doctorResponses from all hospitals and remove duplicates
//       //   const doctors = searchTextData.records.flatMap((hospital: any) =>
//       //     hospital.doctorDepartmentResponses?.flatMap((dept: any) =>
//       //       dept.doctorResponses || []
//       //     )
//       //   );

//       //   // Deduplicate doctors by unique ID
//       //   const uniqueDoctors = doctors.filter(
//       //     (doctor: any, index: number, self: any[]) =>
//       //       self.findIndex((d: any) => d.id === doctor.id) === index
//       //   );

//       //   // Store doctors in the state
//       //   useHospitalStore.getState().setDoctors(uniqueDoctors);
//       // }
//     } catch (error) {
//       console.error('Error fetching data:', error);
//     }
//   };

const formatDate = (date:any) => {
  const d = new Date(date);
  return `${d.getFullYear()}-${(d.getMonth() + 1).toString().padStart(2, '0')}-${d.getDate().toString().padStart(2, '0')}`;
};

const formattedDate = formatDate(selectedDate);


const doctorFilter = async () => {
  try {
    setLoading(true);

    // Log parameters
    const requestData = {
      pageSize: 10,

      pageCount: 1,
      name: docName.label ,
      // departmentId: undefined,
      petId: petName?.value,
      specializationId: nameSpecialization?.value,
      date: formattedDate,
    };
    console.log('Request Data:', requestData);

    const searchTextData = await getDoctorFilterData(requestData);

    console.log('Full API Response:', searchTextData);

    if (searchTextData) {
      console.log('Search Data:', searchTextData?.data);
    } else {
      console.warn('API returned undefined response.');
    }
  } catch (error) {
    console.error('Error fetching data:', error);
  } finally {
    setLoading(false);
  }
};

const handleClick = (imageName: any) => {
    console.log(`${imageName} clicked!`);
  };

  return (
    <div id="hospitals" className="pb-8 w-full pt-20">
      <div className="bg-white rounded-lg w-full shadow-md p-6 mb-8">
        <h3 className="text-2xl font-bold mb-4">Hospital properties found</h3>
        <hr className="my-4 border-t-2 border-gray-300" />

        <div className="flex justify-end items-center gap-6">
        <FilterDropdown
            options={pet?.map((d: any) => ({
              label: d.name,
              value: d.id,
            }))}
            placeholder="🐾 Select Pet"
            onChange={setPetName}
            value={petName}
          /> 
          <FilterDropdown
            options={doctorsinhospital}
            placeholder="👩‍⚕️ Select Doctor"
            onChange={setDocName}
            value={docName}
          />

          <FilterDropdown
            options={specializationinhospital}
            placeholder="👩‍⚕️ Select Specialization"
            onChange={setSelectedSpecialization}
            value={nameSpecialization}
          />

          <div className="relative">
            <Popover open={open} onOpenChange={setOpen}>
              <PopoverTrigger asChild>
                <button className="bg-white border border-gray-500 rounded-lg px-4 py-2 w-full flex justify-between items-center text-sm font-medium hover:bg-gray-50">
                  {selectedDate
                    ? format(selectedDate, 'PPP')
                    : '📅 Select Date'}
                  <CalendarIcon className="h-4 w-4 text-gray-500" />
                </button>
              </PopoverTrigger>
              <PopoverContent align="start" className="p-0 z-50">
                <Calendar
                  mode="single"
                  selected={selectedDate}
                  onSelect={(date) => {
                    setSelectedDate(date); // Update selected date state
                    setOpen(false); // Close the calendar after selection
                  }}
                  initialFocus
                />
              </PopoverContent>
            </Popover>
          </div>

          {/* <Calendar
            mode="single"
            selected={selectedDate}
            onSelect={setSelectedDate}
            initialFocus
          /> 
          {/* <DatePicker
            selectedDate={selectedDate}
            onChange={setSelectedDate}
            placeholder="📅 Select Date"
          /> */}

          {/* Search Button */}
          <button
            onClick={doctorFilter}
            className="bg-blue-600 text-white px-8 py-2.5 w-64 rounded-lg hover:bg-blue-700 transition-colors"
          >
            Search
          </button>
        </div>
      </div>
      {/* <div className="mt-8 bg-white rounded-lg w-full shadow-md p-6 mb-8"> */}
      <div className="w-full mt-4">
        <DocBook
          doctors={doctors}
          defaultImage="/department.png"
          pathname="/appointmentdoctor"
          doctor={true}
          handleClick={handleClick}
        />
      </div>
      {/* </div> */}
    </div>
  );
};

export default Index;
