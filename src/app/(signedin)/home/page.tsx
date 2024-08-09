'use client';
import PopularDoctors from '@/components/Image';
import { useEffect } from 'react';

import { getDeparmentData, getDoctorData, getPetData } from './action';
import { useDeparmentStore } from '@/store/deparmentStore';
import { usePetStore } from '@/store/petStore';
import { useDoctorStore } from '@/store/doctorStore';

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
  useEffect(() => {
    fetchData();
  }, [getPetData, getDeparmentData, getDoctorData]);

  const fetchData = async () => {
    try {
      const petData = await getPetData({ pageSize: 10, pageCount: 1 });
      const departmentData = await getDeparmentData({ pageSize: 10, pageCount: 1 });
      const doctors = await getDoctorData({ pageSize: 10, pageCount: 1 });
      setAllDeparments(departmentData);
      setAllPets(petData.records);
      setAllDoctors(doctors.records);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };
  const handleButtonClick = () => {
    console.log('object');
  };

  const handleSearch = () => {
    console.log('object');
  };

  const handleClick = (imageName: any) => {
    console.log(`${imageName} clicked!`);
  };

  const doctores = doctors.map((doctor: any) => ({
    src: doctor.preSignedUrl,
    alt: doctor.image,
    textOverlay: doctor.name,
  }));

  const departmentDatas = Array.isArray(departments)
    ? departments.map((department: any) => ({
        src: department.preSignedUrl,
        alt: department.image,
        textOverlay: department.deptName,
      }))
    : [];

  const petdata = Array.isArray(pets)
    ? pets.map((pet: any) => ({
        src: pet.preSignedUrl,
        alt: pet.image,
        textOverlay: pet.name,
      }))
    : [];
  return (
    <main className="bg-gray-50">
      <div className="flex min-h-screen flex-col items-center justify-between">
        <section className="relative h-[620px] w-full flex items-center justify-center p-4">
          <div className="absolute inset-0 overflow-hidden z-0">
            <video
              autoPlay
              loop
              muted
              className="absolute inset-0 w-full h-full object-cover"
              style={{ objectFit: 'cover' }}
            >
              <source src="/Logvideo.mp4" type="video/mp4" />
            </video>
          </div>
          <div className="relative z-10 home-first w-full max-w-4xl">
            <div className="text mb-5">
              <h3 className="text-2xl font-bold mb-2 text-white">
                THE BEST VETERINARY SERVICE FOR YOUR PET
              </h3>
              <p className="text-lg  text-white">
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

      <div className="pb-8">
        <PopularDoctors
          title="Departments"
          description="  Your Pets Nutritional Health is Very Important & Our Priority"
          link="your-link-here"
          handleClick={handleClick}
          linkDescription={'Departments'}
          doctors={departmentDatas}
        />
      </div>

      <div className="pb-8">
        <PopularDoctors
          // key={index}
          title="Popular Doctors"
          description="Meet With Professional Doctor."
          link="your-link-here"
          handleClick={handleClick}
          linkDescription="Doctor"
          doctors={doctores}
        />
      </div>
      <div className="pb-8">
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
  );
}
