'use client';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import Logo from '../../public/stubby.png';
import { Sheet, SheetContent, SheetTrigger } from './ui/sheet';
import SideBarIcon from './svg/side_bar_icon';
import { useRouter } from 'next/navigation';
import { useDoctorStore } from '@/store/doctorStore';
import {
  getDeparmentData,
  getDoctorData,
  getMedicinesData,
  getPetData,
} from '@/app/(signedin)/home/action';
import { useDeparmentStore } from '@/store/deparmentStore';
import { usePetStore } from '@/store/petStore';
import { useMedicinesStore } from '@/store/medicinesStore';

// const departments = [
//   { name: 'Cardiology', href: '/departments/cardiology' },
//   { name: 'Neurology', href: '/departments/neurology' },
//   { name: 'Orthopedics', href: '/departments/orthopedics' },
//   { name: 'Surgery', href: '/departments/surgery' },
// ];
// const Doctors = [
//   { name: 'Cardiologywdscfev', href: '/departments/cardiology' },
//   { name: 'Neurologyscd', href: '/departments/neurology' },
//   { name: 'Orthopedicsxs', href: '/departments/orthopedics' },
//   { name: 'hewww', href: '/departments/surgery' },
// ];

export default function Header() {
  const [open, setOpen] = useState<boolean>(false);
  const [showDepartments, setShowDepartments] = useState<boolean>(false);
  const [show, setShow] = useState<boolean>(false);
  const [showMedicines, setshowMedicines] = useState<boolean>(false);
  const [showPets, setshowPets] = useState<boolean>(false);
  const [showdoctor, setShowDoctors] = useState<boolean>(false);

  const [headerBg, setHeaderBg] = useState('transparent');

  const handleScroll = () => {
    const scrollY = window.scrollY;
    const videoHeight = document.querySelector('video')?.clientHeight || 0;

    if (scrollY > videoHeight) {
      setHeaderBg('bg-white bg-opacity-90');
    } else {
      setHeaderBg('bg-transparent');
    }
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);
  const [allDoctors, setAllDoctors] = useDoctorStore((state: any) => [
    state.doctors,
    state.setAllDoctors,
  ]);

  const [departments, setAllDeparments] = useDeparmentStore((state: any) => [
    state.departments,
    state.setAllDeparments,
  ]);
  const [medicines, setAllMedicines] = useMedicinesStore((state: any) => [
    state.medicines,
    state.setAllMedicines,
  ]);

  const [pets, setAllPets] = usePetStore((state: any) => [
    state.pets,
    state.setAllPets,
  ]);
  useEffect(() => {
    fetchData();
  }, [getPetData, getDeparmentData, getDoctorData]);

  const fetchData = async () => {
    try {
      const petData = await getPetData({ pageSize: 10, pageCount: 1 });
      const departmentData = await getDeparmentData({ pageSize: 10, pageCount: 1 });
      const doctors = await getDoctorData({ pageSize: 10, pageCount: 1 });
      const medicinesData = await getMedicinesData();
      setAllMedicines(medicinesData);
      setAllDeparments(departmentData);
      setAllPets(petData.records);
      setAllDoctors(doctors.records);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const doctores = allDoctors.map((doctor: any) => ({
    name: doctor.name,
    href: '/departments/orthopedics',
  }));

  const departmentDatas = Array.isArray(departments)
    ? departments.map((department: any) => ({
        name: department.deptName,
        href: '/departments/orthopedics',
      }))
    : [];

  const petdata = Array.isArray(pets)
    ? pets.map((pet: any) => ({
        name: pet.name,
        href: '/departments/orthopedics',
      }))
    : [];

  const medicinesDatas = Array.isArray(medicines)
    ? medicines.map((medicines: any) => ({
        name: medicines.name,
        href: '/departments/orthopedics',
      }))
    : [];

  const toggleDepartments = () => {
    // setShowDoctors(false);

    setShowDepartments(!showDepartments);
  };
  const toggleDoctors = () => {
    setShowDepartments(false);
    // setShowDoctors(!showDoctors);
  };

  const router = useRouter();

  const handleMouseEnter = (
    view: 'departments' | 'doctors' | 'medicines' | 'pets'
  ) => {
    switch (view) {
      case 'departments':
        setShowDepartments(true);
        break;
      case 'doctors':
        setShowDoctors(true);
        break;
      case 'medicines':
        setshowMedicines(true);
        break;
      case 'pets':
        setshowPets(true);
        break;
    }
  };

  const handleMouseLeave = (
    view: 'departments' | 'doctors' | 'medicines' | 'pets'
  ) => {
    switch (view) {
      case 'departments':
        setShowDepartments(false);
        break;
      case 'doctors':
        setShowDoctors(false);
        break;
      case 'medicines':
        setshowMedicines(false);
        break;
      case 'pets':
        setshowPets(false);
        break;
    }
  };

  const navigate = (link: string) => {
    router.push(link);
  };

  return (
    // <header className="fixed top-0 left-0 w-full bg-white shadow-md z-50">
    // <header className="sticky top-0 z-30 bg-white bg-opacity-90 border-b border-gray-300 transition-background duration-300">
    <header className="fixed top-0 left-0 w-full z-10 transition-all duration-300 bg-transparent bg-white ">
      <div className="w-full h-fit flex flex-col md:flex-row justify-between items-center px-8 py-2">
        <div className="flex justify-between items-center w-full md:hidden">
        <Image src={Logo} alt="Company Logo" style={{ width: '140px', height: 'auto' }} />

          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger className="px-3">
              <SideBarIcon />
            </SheetTrigger>
            <SheetContent className="h-full flex flex-col items-start">
              <Image src={Logo} className="w-[288px]" alt="Company Logo" />
              <ul className="flex flex-col space-y-4 ">
                <li>
                  <a href="/" className="hover:text-red-500 ">
                    Home
                  </a>
                </li>
                <li>
                  <a href="/aboutus" className="hover:text-red-500">
                    About Us
                  </a>
                </li>
                <li>
                  <button
                    onClick={toggleDepartments}
                    className="hover:text-red-500"
                  >
                    <a href="/departments" className="hover:text-red-500">
                      {' '}
                      Departments
                    </a>
                  </button>
                  {showDepartments && (
                    <div>
                      <hr className="my-2" />
                      <ul className="flex flex-col space-y-2">
                        {departments.map((department: any, index: any) => (
                          <li key={index}>
                            <a href={department.href} className="text-blue-500">
                              {department.name}
                            </a>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </li>
                <li>
                  <button
                    onClick={toggleDoctors}
                    className="hover:text-red-500"
                  >
                    <a href="/doctors" className="hover:text-red-500">
                      Doctors
                    </a>
                  </button>
                  {show && (
                    <div className="absolute bg-white shadow-md mt-2 w-48">
                      <hr className="my-2" />
                      <ul className="flex flex-col space-y-2">
                        {allDoctors.map((Doctor:any, index:any) => (
                          <li key={index}>
                            <a
                              href={Doctor.href}
                              className=" text-gray-600 block px-4 py-2"
                            >
                              {Doctor.name}
                              <hr className="mt-2 " />
                            </a>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </li>
                <li>
                  <button
                    onClick={toggleDepartments}
                    className="hover:text-red-500"
                  >
                    <a href="/medicines" className="hover:text-red-500">
                      Medicines
                    </a>
                  </button>
                </li>
                <li>
                  <button
                    onClick={toggleDepartments}
                    className="hover:text-red-500"
                  >
                    <a href="/pets" className="hover:text-red-500">
                      Pets
                    </a>
                  </button>
                </li>
                <li className="bg-red-500 hover:bg-yellow-500 text-white px-4 py-1 rounded">
                  <a href="/signin" className="hover:text-black">
                    Sign In
                  </a>
                </li>
                <li className="bg-red-500 hover:bg-yellow-500 text-white px-4 py-1 rounded">
                  <a href="/signup" className="hover:text-black">
                    Sign Up
                  </a>
                </li>
              </ul>
            </SheetContent>
          </Sheet>
        </div>

        {/* Desktop View */}
        <div className="hidden md:flex w-full items-center justify-between">
          <div>
            {/* Header Image */}
            <Image className="w-72" src={Logo} alt="Company Logo" />
          </div>
          {/* Navigation Menu */}
          <div className="flex justify-end">
            <nav className="flex-grow flex justify-end">
              <ul className="flex justify-end items-center space-x-4">
                <li>
                  <a href="/" className="hover:text-red-500">
                    Home
                  </a>
                </li>
                <li>
                  <a href="/aboutus" className="hover:text-red-500">
                    About Us
                  </a>
                </li>
                <li
                  onMouseEnter={() => handleMouseEnter('doctors')}
                  onMouseLeave={() => handleMouseLeave('doctors')}
                  className="relative"
                >
                  <button
                    onClick={() => navigate('/doctors')}
                    className="hover:text-red-500"
                  >
                    <a className="hover:text-red-500">Doctors</a>
                  </button>
                  {showdoctor && (
                    <div
                      className="absolute bg-white shadow-md mt-2 w-48"
                      onMouseEnter={() => handleMouseEnter('doctors')}
                      onMouseLeave={() => handleMouseLeave('doctors')}
                    >
                      <hr className="my-2" />
                      <ul className="flex flex-col space-y-2">
                        {doctores.map((Doctor: any, index: any) => (
                          <li key={index}>
                            <a
                              href={Doctor.href}
                              className="text-gray-600 block px-4 py-2"
                            >
                              {Doctor.name}
                              <hr className="mt-2" />
                            </a>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </li>
                <li
                  onMouseEnter={() => handleMouseEnter('departments')}
                  onMouseLeave={() => handleMouseLeave('departments')}
                  className="relative"
                >
                  <button
                    onClick={() => navigate('/departments')}
                    className="hover:text-red-500"
                  >
                    <a className="hover:text-red-500">Deparment</a>
                  </button>
                  {showDepartments && (
                    <div
                      className="absolute bg-white shadow-md mt-2 w-48"
                      onMouseEnter={() => handleMouseEnter('departments')}
                      onMouseLeave={() => handleMouseLeave('departments')}
                    >
                      <hr className="my-2" />
                      <ul className="flex flex-col space-y-2">
                        {Array.isArray(departments) && departments.length > 0 ? (
departments.map((department: any, index: any) => (
      <li key={index}>
        <a href={department.href} className="text-gray-600 block px-4 py-2">
          {department.name}
          <hr className="mt-2" />
        </a>
      </li>
    ))
  ) : (
    <li>""</li> // Handle empty or invalid departments array
  )}
</ul>
                    </div>
                  )}
                </li>
                <li
                  onMouseEnter={() => handleMouseEnter('medicines')}
                  onMouseLeave={() => handleMouseLeave('medicines')}
                  className="relative"
                >
                  <button
                    onClick={() => navigate('/medicines')}
                    className="hover:text-red-500"
                  >
                    <a className="hover:text-red-500">Medicines</a>
                  </button>
                  {showMedicines && (
                    <div
                      className="absolute bg-white shadow-md mt-2 w-48"
                      onMouseEnter={() => handleMouseEnter('medicines')}
                      onMouseLeave={() => handleMouseLeave('medicines')}
                    >
                      <hr className="my-2" />
                      <ul className="flex flex-col space-y-2">
                        {medicinesDatas.map((medicine: any, index: any) => (
                          <li key={index}>
                            <a
                              href={medicine.href}
                              className="text-gray-600 block px-4 py-2"
                            >
                              {medicine.name}
                              <hr className="mt-2" />
                            </a>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </li>{' '}
                <li
                  onMouseEnter={() => handleMouseEnter('pets')}
                  onMouseLeave={() => handleMouseLeave('pets')}
                  className="relative"
                >
                  <button
                    onClick={() => navigate('/pets')}
                    className="hover:text-red-500"
                  >
                    <a className="hover:text-red-500">Pets</a>
                  </button>
                  {showPets && (
                    <div
                      className="absolute bg-white shadow-md mt-2 w-48"
                      onMouseEnter={() => handleMouseEnter('pets')}
                      onMouseLeave={() => handleMouseLeave('pets')}
                    >
                      <hr className="my-2" />
                      <ul className="flex flex-col space-y-2">
                        {petdata.map((pet: any, index: any) => (
                          <li key={index}>
                            <a
                              href={pet.href}
                              className="text-gray-600 block px-4 py-2"
                            >
                              {pet.name}
                              <hr className="mt-2" />
                            </a>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </li>
                <li className="bg-red-500 hover:bg-yellow-500 text-white px-4 py-1 rounded">
                  <a href="/signin" className="hover:text-black">
                    Sign In
                  </a>
                </li>
                <li className="bg-red-500 hover:bg-yellow-500 text-white px-4 py-1 rounded">
                  <a href="/signup" className="hover:text-black">
                    Sign Up
                  </a>
                </li>
              </ul>
            </nav>
          </div>
        </div>
      </div>
    </header>
  );
}

// 'use client';
// import Image from 'next/image';
// import { useEffect, useState } from 'react';
// import Logo from '../../public/VetHouse.png';
// import { Sheet, SheetContent, SheetTrigger } from './ui/sheet';
// import SideBarIcon from './svg/side_bar_icon';
// import { useRouter } from 'next/navigation';
// import { useDoctorStore } from '@/store/doctorStore';
// import { getDeparmentData, getDoctorData, getMedicinesData, getPetData } from '@/app/(signedin)/home/action';
// import { useDeparmentStore } from '@/store/deparmentStore';
// import { usePetStore } from '@/store/petStore';
// import { useMedicinesStore } from '@/store/medicinesStore';
// import NavItem from './HeaderNavItem';
// import Dropdown from './HeaderDropDowm';

// const Header = () => {
//   const [open, setOpen] = useState<boolean>(false);
//   const [showDepartments, setShowDepartments] = useState<boolean>(false);
//   const [showDoctors, setShowDoctors] = useState<boolean>(false);
//   const [showMedicines, setShowMedicines] = useState<boolean>(false);
//   const [showPets, setShowPets] = useState<boolean>(false);

//   const [allDoctors, setAllDoctors] = useDoctorStore((state: any) => [
//     state.doctors,
//     state.setAllDoctors,
//   ]);
//   const [departments, setAllDeparments] = useDeparmentStore((state: any) => [
//     state.departments,
//     state.setAllDeparments,
//   ]);
//   const [medicines, setAllMedicines] = useMedicinesStore((state: any) => [
//     state.medicines,
//     state.setAllMedicines,
//   ]);
//   const [pets, setAllPets] = usePetStore((state: any) => [
//     state.pets,
//     state.setAllPets,
//   ]);

//   useEffect(() => {
//     fetchData();
//   }, [getPetData, getDeparmentData, getDoctorData]);

//   const fetchData = async () => {
//     try {
//       const petData = await getPetData({ pageSize: 10, pageCount: 1 });
//       const departmentData = await getDeparmentData();
//       const doctors = await getDoctorData({ pageSize: 10, pageCount: 1 });
//       const medicinesData = await getMedicinesData();
//       setAllMedicines(medicinesData);
//       setAllDeparments(departmentData);
//       setAllPets(petData.records);
//       setAllDoctors(doctors.records);
//     } catch (error) {
//       console.error('Error fetching data:', error);
//     }
//   };

//   const doctores = allDoctors.map((doctor: any) => ({
//     name: doctor.name,
//     href: '/departments/orthopedics'
//   }));

//   const departmentDatas = Array.isArray(departments)
//     ? departments.map((department: any) => ({
//         name: department.deptName,
//         href: '/departments/orthopedics'
//       }))
//     : [];

//   const petdata = Array.isArray(pets)
//     ? pets.map((pet: any) => ({
//         name: pet.name,
//         href: '/departments/orthopedics'
//       }))
//     : [];

//   const medicinesDatas = Array.isArray(medicines)
//     ? medicines.map((medicine: any) => ({
//         name: medicine.name,
//         href: '/departments/orthopedics'
//       }))
//     : [];

//   const handleMouseEnter = (view: 'departments' | 'doctors' | 'medicines' | 'pets') => {
//     switch (view) {
//       case 'departments':
//         setShowDepartments(true);
//         break;
//       case 'doctors':
//         setShowDoctors(true);
//         break;
//       case 'medicines':
//         setShowMedicines(true);
//         break;
//       case 'pets':
//         setShowPets(true);
//         break;
//     }
//   };

//   const handleMouseLeave = (view: 'departments' | 'doctors' | 'medicines' | 'pets') => {
//     switch (view) {
//       case 'departments':
//         setShowDepartments(false);
//         break;
//       case 'doctors':
//         setShowDoctors(false);
//         break;
//       case 'medicines':
//         setShowMedicines(false);
//         break;
//       case 'pets':
//         setShowPets(false);
//         break;
//     }
//   };

//   const router = useRouter();

//   const navigate = (link: string) => {
//     router.push(link);
//   };

//   return (
//     <header className="fixed top-0 left-0 w-full bg-white shadow-md z-50">
//       <div className="w-full h-fit flex flex-col md:flex-row justify-between items-center px-8 py-2">
//         {/* Mobile View */}
//         <div className="flex justify-between items-center w-full md:hidden">
//           <Image src={Logo} className="w-[288px]" alt="Company Logo" />
//           <Sheet open={open} onOpenChange={setOpen}>
//             <SheetTrigger className="px-3">
//               <SideBarIcon />
//             </SheetTrigger>
//             <SheetContent className="h-full flex flex-col items-start">
//               <Image src={Logo} className="w-[288px]" alt="Company Logo" />
//               <ul className="flex flex-col space-y-4">
//                 <NavItem href="/home" label="Home" />
//                 <NavItem href="/aboutus" label="About Us" />
//                 <Dropdown
//                   items={departmentDatas}
//                   label="Departments"
//                   showDropdown={showDepartments}
//                   toggleDropdown={() => setShowDepartments(!showDepartments)}
//                   onMouseEnter={() => handleMouseEnter('departments')}
//                   onMouseLeave={() => handleMouseLeave('departments')}

//                 />
//                 <Dropdown
//                   items={doctores}
//                   label="Doctors"
//                   showDropdown={showDoctors}
//                   toggleDropdown={() => setShowDoctors(!showDoctors)}
//                   onMouseEnter={() => handleMouseEnter('doctors')}
//                   onMouseLeave={() => handleMouseLeave('doctors')}

//                 />
//                 <NavItem href="/medicines" label="Medicines" />
//                 <Dropdown
//                   items={petdata}
//                   label="Pets"
//                   showDropdown={showPets}
//                   toggleDropdown={() => setShowPets(!showPets)}
//                   onMouseEnter={() => handleMouseEnter('pets')}
//                   onMouseLeave={() => handleMouseLeave('pets')}

//                 />
//               </ul>
//             </SheetContent>
//           </Sheet>
//         </div>

//         {/* Desktop View */}
//         <div className="hidden md:flex flex-row justify-between items-center w-full">
//           <div className="flex items-center">
//             <Image src={Logo} className="w-[288px]" alt="Company Logo" />
//             <nav className="ml-8 flex space-x-6">
//               <NavItem href="/home" label="Home" />
//               <NavItem href="/aboutus" label="About Us" />
//               <Dropdown
//                 items={departmentDatas}
//                 label="Departments"
//                 showDropdown={showDepartments}
//                 toggleDropdown={() => setShowDepartments(!showDepartments)}
//                 onMouseEnter={() => handleMouseEnter('departments')}
//                 onMouseLeave={() => handleMouseLeave('departments')}

//               />
//               <Dropdown
//                 items={doctores}
//                 label="Doctors"
//                 showDropdown={showDoctors}
//                 toggleDropdown={() => setShowDoctors(!showDoctors)}
//                 onMouseEnter={() => handleMouseEnter('doctors')}
//                 onMouseLeave={() => handleMouseLeave('doctors')}

//               />

//           <Dropdown
//                 items={medicinesDatas}
//                 label="Medicines"
//                 showDropdown={showMedicines}
//                 toggleDropdown={() => setShowPets(!showMedicines)}
//                 onMouseEnter={() => handleMouseEnter('medicines')}
//                 onMouseLeave={() => handleMouseLeave('medicines')}

//               />
//               <Dropdown
//                 items={petdata}
//                 label="Pets"
//                 showDropdown={showPets}
//                 toggleDropdown={() => setShowPets(!showPets)}
//                 onMouseEnter={() => handleMouseEnter('pets')}
//                 onMouseLeave={() => handleMouseLeave('pets')}

//               />
//             </nav>
//           </div>
//         </div>
//       </div>
//     </header>
//   );
// };

// export default Header;
