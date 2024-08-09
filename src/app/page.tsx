'use client';
import { useEffect, useState, useCallback } from 'react';
import Image from 'next/image';
import Logo from '../../public/logowhite.png';
import Logoeffect from '../../public/stubby.png';
import { useRouter } from 'next/navigation';
import { useDoctorStore } from '@/store/doctorStore';
import { getDeparmentData, getDoctorData, getMedicinesData, getPetData } from '@/app/(signedin)/home/action';
import { useDeparmentStore } from '@/store/deparmentStore';
import { usePetStore } from '@/store/petStore';
import { useMedicinesStore } from '@/store/medicinesStore';
import PopularDoctors from '@/components/Image';
import { Sheet, SheetTrigger, SheetContent } from '@/components/ui/sheet';
import SideBarIcon from '@/components/svg/side_bar_icon';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export default function Home() {
  const [doctors, setAllDoctors] = useDoctorStore((state: any) => [
    state.doctors,
    state.setAllDoctors,
  ]);
  const [departments, setAllDeparments] = useDeparmentStore((state: any) => [
    state.departments,
    state.setAllDeparments,
  ]);
  const [pets, setAllPets] = usePetStore((state: any) => [
    state.pets,
    state.setAllPets,
  ]);

  // State to track scroll position
  const [headerBg, setHeaderBg] = useState('bg-transparent');
  const [textColor, setTextColor] = useState('text-white'); // Default text color
  const [logo, setLogo] = useState(Logo); // Default logo

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      if (scrollY > 0) {
        setHeaderBg('bg-white bg-opacity-90');
        setTextColor('text-black');
        setLogo(Logoeffect);
      } else {
        setHeaderBg('bg-transparent');
        setTextColor('text-white');
        setLogo(Logo);
      }
    };

    window.addEventListener('scroll', handleScroll);
    fetchData();

    // Clean up the event listener
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const fetchData = async () => {
    try {
      const petData = await getPetData({ pageSize: 4, pageCount: 1 });
      const departmentData = await getDeparmentData({ pageSize: 8, pageCount: 1 });
      const doctorData = await getDoctorData({ pageSize: 8, pageCount: 1 });



      setAllDeparments(departmentData.records);
      setAllPets(petData.records);
      setAllDoctors(doctorData.records);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const handleButtonClick = () => {
    console.log('Search button clicked');
  };

  const handleSearch = () => {
    console.log('Search initiated');
  };

  const handleClick = (imageName: any) => {
    console.log(`${imageName} clicked!`);
  };

  const doctores = doctors.map((doctor: any) => ({
    src: doctor.preSignedUrl,
    alt: doctor.image,
    textOverlay: doctor.name,
  }));

  const departmentDatas = departments.map((department: any) => ({
    src: department.preSignedUrl,
    alt: department.image,
    textOverlay: department.deptName,
  }));

  const petdata = pets.map((pet: any) => ({
    src: pet.preSignedUrl,
    alt: pet.image,
    textOverlay: pet.name,
  }));

  const [open, setOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);

  const [allDoctorsHeader, setAllDoctorsHeader] = useDoctorStore((state: any) => [
    state.doctors,
    state.setAllDoctors,
  ]);

  const [departmentsHeader, setAllDeparmentsHeader] = useDeparmentStore((state: any) => [
    state.departments,
    state.setAllDeparments,
  ]);
  const [medicines, setAllMedicines] = useMedicinesStore((state: any) => [
    state.medicines,
    state.setAllMedicines,
  ]);

  const [petsHeader, setAllPetsHeader] = usePetStore((state: any) => [
    state.pets,
    state.setAllPets,
  ]);

  useEffect(() => {
    fetchDataHeader();
  }, []);

  const router = useRouter();

  const fetchDataHeader = async () => {
    try {
      const [petData, departmentData, doctors, medicinesData] = await Promise.all([
        getPetData({ pageSize: 10, pageCount: 1 }),
        getDeparmentData({ pageSize: 10, pageCount: 1 }),
        getDoctorData({ pageSize: 10, pageCount: 1 }),
        getMedicinesData(),
      ]);

      setAllMedicines(medicinesData);
      setAllDeparmentsHeader(departmentData.records);
      setAllPetsHeader(petData.records);
      setAllDoctorsHeader(doctors.records);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const handleMouseEnter = useCallback((view: string) => setActiveDropdown(view), []);
  const handleMouseLeave = useCallback(() => setActiveDropdown(null), []);

  const navigate = (link: string) => router.push(link);

  const renderDropdown = (items: any[], hrefBase: string) => (
    <div className="absolute bg-white shadow-md mt-2 w-48">
      <hr className="my-2" />
      <ul className="flex flex-col space-y-2">
        {items.map((item, index) => (
          <li key={index}>
            <a href={`${hrefBase}/${item.name}`} className="text-gray-600 block px-4 py-2">
              {item.name}
              <hr className="mt-2" />
            </a>
          </li>
        ))}
      </ul>
    </div>
  );

  return (
    <>
      <header className={`fixed top-0 left-0 w-full z-10 transition-all duration-300 ${headerBg}`}>
        <div className={`w-full h-fit flex flex-col md:flex-row justify-between items-center px-8 py-2 ${textColor}`}>
          <div className="flex justify-between items-center w-full md:hidden">
            <Image src={logo} alt="Company Logo" className="w-36" />
            <Sheet open={open} onOpenChange={setOpen}>
              <SheetTrigger className="px-3">
                <SideBarIcon />
              </SheetTrigger>
              <SheetContent className={`h-full flex flex-col items-start ${textColor}`}>
                <Image src={logo} className="w-[288px]" alt="Company Logo" />
                <ul className="flex flex-col space-y-4">
                  {/* Sidebar items */}
                  {['Home', 'About Us'].map((item, index) => (
                    <li key={index}>
                      <a href={`/${item.toLowerCase().replace(/\s/g, '')}`} className="hover:text-red-500">
                        {item}
                      </a>
                    </li>
                  ))}
                  <li onClick={() => handleMouseEnter('departments')} className="hover:text-red-500 relative">
                    <a href="/departments" className="hover:text-red-500">Departments</a>
                    {activeDropdown === 'departments' && renderDropdown(departmentsHeader, '/departments')}
                  </li>
                  <li onClick={() => handleMouseEnter('doctors')} className="hover:text-red-500 relative">
                    <a href="/doctors" className="hover:text-red-500">Doctors</a>
                    {activeDropdown === 'doctors' && renderDropdown(allDoctorsHeader, '/doctors')}
                  </li>
                  <li onClick={() => handleMouseEnter('medicines')} className="hover:text-red-500 relative">
                    <a href="/medicines" className="hover:text-red-500">Medicines</a>
                    {activeDropdown === 'medicines' && renderDropdown(medicines, '/medicines')}
                  </li>
                  <li onClick={() => handleMouseEnter('pets')} className="hover:text-red-500 relative">
                    <a href="/pets" className="hover:text-red-500">Pets</a>
                    {activeDropdown === 'pets' && renderDropdown(petsHeader, '/pets')}
                  </li>
                  <li className="bg-red-500 hover:bg-yellow-500 text-white px-4 py-1 rounded">
                    <a href="/signin" className="hover:text-black">Sign In</a>
                  </li>
                  <li className="bg-red-500 hover:bg-yellow-500 text-white px-4 py-1 rounded">
                    <a href="/signup" className="hover:text-black">Sign Up</a>
                  </li>
                </ul>
              </SheetContent>
            </Sheet>
          </div>
          <div className="hidden md:flex md:items-center w-full">
            <Image src={logo} alt="Company Logo" className="w-36" />
            <nav className="flex-1 flex justify-center">
              <ul className="flex space-x-8">
                {/* Navbar items */}
                {['Home', 'About Us'].map((item, index) => (
                  <li key={index}>
                    <a href={`/${item.toLowerCase().replace(/\s/g, '')}`} className="hover:text-red-500">
                      {item}
                    </a>
                  </li>
                ))}
                <li onMouseEnter={() => handleMouseEnter('departments')} onMouseLeave={handleMouseLeave} className="relative">
                  <a href="/departments" className="hover:text-red-500">Departments</a>
                  {activeDropdown === 'departments' && renderDropdown(allDoctorsHeader, '/departments')}
                </li>
                <li onMouseEnter={() => handleMouseEnter('doctors')} onMouseLeave={handleMouseLeave} className="relative">
                  <a href="/doctors" className="hover:text-red-500">Doctors</a>
                  {activeDropdown === 'doctors' && renderDropdown(allDoctorsHeader, '/doctors')}
                </li>
                <li onMouseEnter={() => handleMouseEnter('medicines')} onMouseLeave={handleMouseLeave} className="relative">
                  <a href="/medicines" className="hover:text-red-500">Medicines</a>
                  {activeDropdown === 'medicines' && renderDropdown(medicines, '/medicines')}
                </li>
                <li onMouseEnter={() => handleMouseEnter('pets')} onMouseLeave={handleMouseLeave} className="relative">
                  <a href="/pets" className="hover:text-red-500">Pets</a>
                  {activeDropdown === 'pets' && renderDropdown(petsHeader, '/pets')}
                </li>
              </ul>
            </nav>
            <div className="flex space-x-4">
              <button onClick={handleButtonClick} className="bg-red-500 hover:bg-yellow-500 text-white px-4 py-1 rounded">
                <a href="/signin">Sign In</a>
              </button>
              <button onClick={handleButtonClick} className="bg-red-500 hover:bg-yellow-500 text-white px-4 py-1 rounded">
                <a href="/signup">Sign Up</a>
              </button>
            </div>
          </div>
        </div>
      </header>
      <main className="bg-gray-50">
        <div className="flex flex-col items-center justify-between">
          <section className="relative h-[100dvh] w-full flex items-center justify-center p-4">
            <div className="absolute inset-0 overflow-hidden z-0">
              <div className="relative h-full w-full">
                <video
                  autoPlay
                  loop
                  muted
                  className="absolute inset-0 w-full h-full object-cover"
                  style={{ objectFit: 'cover' }}
                >
                  <source src="/Logvideo.mp4" type="video/mp4" />
                </video>
                <div className="absolute inset-0 bg-black opacity-60"></div> {/* Black shadow overlay */}
              </div>
            </div>
            <div className="relative z-2 home-first w-full max-w-4xl">
              <div className="text mb-5">
                <h3 className="text-3xl font-bold mb-2 text-white">
                  THE BEST VETERINARY SERVICE FOR YOUR PET
                </h3>
                <p className="text-lg text-white">
                  Discover Best Service to Breeds Your Loved Dog Explore around
                  the world
                </p>
              </div>
              <div className="flex justify-center mb-4">
                <div className="relative w-full">
                  <input
                    type="text"
                    id="name"
                    name="search"
                    placeholder="Search Here Service and Pets .."
                    className="w-full px-4 py-2 bg-white text-black"
                  />
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-500"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth="2"
                    onClick={handleSearch}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M21 21l-4.35-4.35m-3.35 2.35a7 7 0 1 0 0-14 7 7 0 0 0 0 14z"
                    />
                  </svg>
                </div>
                <div className="flex-shrink-0">
                  <button
                    type="submit"
                    className="px-8 py-2 font-bold bg-yellow-500 text-black hover:text-white hover:bg-blue-500 transition-colors duration-300"
                    onClick={handleButtonClick}
                  >
                    Search
                  </button>
                </div>
              </div>
            </div>
          </section>
        </div>

        <div id="departments" className="pb-8 pt-20">
          <PopularDoctors
            title="Departments"
            description="Your Pets Nutritional Health is Very Important & Our Priority"
            link="your-link-here"
            handleClick={handleClick}
            linkDescription={'Departments'}
            doctors={departmentDatas}
          />
        </div>

        <div id="doctors" className="pb-8 pt-20">
          <PopularDoctors
            title="Popular Doctors"
            description="Meet With Professional Doctors."
            link="your-link-here"
            handleClick={handleClick}
            linkDescription="Doctors"
            doctors={doctores}
          />
        </div>
        <div id="pets" className="pb-8 pt-20">
          <PopularDoctors
            title="Pets Nutritional"
            description="Your Pets Nutritional Health is Very Important & Our Priority"
            link="your-link-here"
            handleClick={handleClick}
            linkDescription={'Pets'}
            doctors={petdata}
          />
        </div>
      </main>
      <Footer/>
      </>
  );
}
