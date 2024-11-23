'use client';
import { getAllSpecializations, signOut } from '@/api/route';
import { useEffect, useState, useCallback } from 'react';
import Image from 'next/image';
import Logo from '../../public/logowhite.png';
import Logoeffect from '../../public/stubby.png';
import booking from '../../public/booking.png';
import { useRouter } from 'next/navigation';
import { useDoctorStore } from '@/store/doctorStore';
import {
  getCities,
  getDepartmentData,
  getDoctorData,
  gethospitalFilterAllData,
  getHospitals,
  getMedicinesData,
  getPetData,
} from '@/app/home/action';
import FilterDropdown from '@/components/FilterDropdown';
import PopularDoctors from '@/components/Image';
import { useAuthStore } from '@/store/authStore';
import { useDepartmentStore } from '@/store/departmentStore';
import { useMedicineStore } from '@/store/medicinesStore';
import { usePetStore } from '@/store/petStore';
import doc from '../../public/doc.png';
import { Hospital } from 'lucide-react';
import { useSpecializationStore } from '@/store/specializationStore';
import { useHospitalStore } from '@/store/hospitalStore';
import { useCityStore } from '@/store/citiesStore';

export default function Home() {
  const [doctorName, setDoctorName] = useState<string>('');
  const [cityName, setCityName] = useState<any>();
  const [hospitalName, setHospitalName] = useState<any>('');
  const [specializationName, setSpecializationName] = useState<any>('');
  const [selectedDay, setSelectedDay] = useState<any>(null);

  const [searchData, setsearchData] = useState<any>('');
  console.log('selectedDayselectedDayselectedDay', selectedDay?.value);
  const [cities, setAllCities] = useCityStore((state: any) => [
    state.cities,
    state.setAllCities,
  ]);

  const [login, setLogin, loadingAuth] = useAuthStore((state) => [
    state.login,
    state.setLogin,
    state.loadingAuth,
  ]);
  const [doctors, setAllDoctors] = useDoctorStore((state: any) => [
    state.doctors,
    state.setAllDoctors,
  ]);
  const [departments, setAllDepartments] = useDepartmentStore((state: any) => [
    state.departments,
    state.setAllDepartments,
  ]);

  const [specialization, setAllSpecialization] = useSpecializationStore(
    (state: any) => [state.specialization, state.setAllSpecialization]
  );

  const [pets, setAllPets] = usePetStore((state: any) => [
    state.pets,
    state.setAllPets,
  ]);

  const [medicines, setAllMedicines] = useMedicineStore((state: any) => [
    state.medicines,
    state.setAllMedicines,
  ]);

  const specializationOptions = Array.isArray(specialization)
    ? specialization.map((special: any) => ({
        label: special.specializationName,
        value: special.id,
      }))
    : [];

  const [
    hospitals,
    setAllHospitals,
    setFilterAllHospitals,
    filterAllHspitals,
    loading,
    setLoading,
  ] = useHospitalStore((state: any) => [
    state.hospitals,
    state.setAllHospitals,
    state.setFilterAllHospitals,
    state.filterAllHspitals,

    state.loading,
    state.setLoading,
  ]);

  const hospitalsOptions = Array.isArray(hospitals)
    ? hospitals.map((hospital: any) => ({
        label: hospital.name,
        value: hospital.id,
      }))
    : [];

  const departmentOptions = Array.isArray(departments)
    ? departments.map((department: any) => ({
        label: department.name,
        value: department.id,
      }))
    : [];

  const citiesOptions = Array.isArray(cities)
    ? cities.map((city: any) => {
        // console.log(city)
        return {
          label: city.name,
          value: city.id,
        };
      })
    : [];

  const daysOfWeekOptions = [
    { value: 'MONDAY', label: 'Monday' },
    { value: 'TUESDAY', label: 'Tuesday' },
    { value: 'WEDNESDAY', label: 'Wednesday' },
    { value: 'THURSDAY', label: 'Thursday' },
    { value: 'FRIDAY', label: 'Friday' },
    { value: 'SATURDAY', label: 'Saturday' },
    { value: 'SUNDAY', label: 'Sunday' },
  ];
  const fetchData = async () => {
    try {
      const petData = await getPetData();
      const departmentData = await getDepartmentData();
      const doctorData = await getDoctorData();
      const medicinesData = await getMedicinesData();
      const citiesData = await getCities();
      const specializations = await getAllSpecializations();
      const hospitalData = await getHospitals();
      const hosptaltData = await gethospitalFilterAllData({
        pageSize: 10,
        pageCount: 1,
      });

      setAllMedicines(medicinesData);
      setAllDepartments(departmentData);
      setAllPets(petData);
      setAllDoctors(doctorData);
      setAllCities(citiesData);
      setAllSpecialization(specializations);
      setAllHospitals(hospitalData);
      setFilterAllHospitals(hosptaltData?.records);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleClick = (imageName: any) => {};

  const doctores = Array.isArray(doctors)
    ? doctors.map((doctor: any) => ({
        id: doctor.id,
        src: doctor.preSignedUrl,
        alt: doctor.image,
        textOverlay: doctor.name,
        description: doctor.description,
        specializationName: doctor.specializationName,
        dayTimeSlotResponses: doctor.dayTimeSlotResponses,
      }))
    : [];
  const hospitalDatas = Array.isArray(filterAllHspitals)
    ? filterAllHspitals.map((hospital: any) => ({
        src: hospital.preSignedUrl,
        alt: hospital.image,
        textOverlay: hospital.name,
        id: hospital.id,
      }))
    : [];

  const petdata = Array.isArray(pets)
    ? pets.map((pet: any) => ({
        src: pet.preSignedUrl,
        alt: pet.image,
        textOverlay: pet.name,
        id: pet.id,
      }))
    : [];

  const [open, setOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);

  // const [loading, setLoading] = useState<boolean>(false);

  const router = useRouter();

  const medicinesDatas = Array.isArray(medicines)
    ? medicines.map((medicines: any) => ({
        id: medicines.id,
        src: medicines.preSignedUrl,
        alt: medicines.image,
        textOverlay: medicines.name,
        label: medicines.name,
      }))
    : [];

  const handleMouseEnter = useCallback(
    (view: string) => setActiveDropdown(view),
    []
  );
  const handleMouseLeave = useCallback(() => setActiveDropdown(null), []);

  const navigate = (link: string) => router.push(link);

  const renderDropdown = (items: any[], hrefBase: string) => (
    <div className="absolute bg-white shadow-md mt-2 w-48">
      <hr className="my-2" />
      <ul className="flex flex-col space-y-2">
        {items &&
          Array.isArray(items) &&
          items.map(
            (item, index) =>
              item && (
                <li key={index}>
                  <a
                    href={`${hrefBase}/${item.name}`}
                    className="text-gray-600 block px-4 py-2"
                  >
                    {item.name}
                    <hr className="mt-2" />
                  </a>
                </li>
              )
          )}
      </ul>
    </div>
  );

  const formatDate = (date: any) => {
    const [month, day, year] = date.split('/');
    return `${year}-${month}-${day}`;
  };

  const handleDateChange = (e: any) => {
    const inputDate = e.target.value;
    setsearchData(inputDate);
  };

  if (loading && loadingAuth) {
    return <div>Loading ....!</div>;
  }

  const handleFilter = async () => {
    // const searchTextData = await getHospitalFilterData({
    //   pageSize: 10,
    //   pageCount: 1,
    //   searchTerm: searchData,
    // });
    // const result = searchTextData?.records.map((record: any) => ({
    //   id: record?.id,
    // }));

    const result = {
      cityId: cityName?.value,
      hospitalId: hospitalName?.value,
      specializationId: specializationName?.value,
      day: selectedDay?.value,
    };
    const encodedRecords = JSON.stringify(result);
    if (cityName || hospitalName || specializationName || selectedDay) {
      await router.push(`/hospitals/${encodedRecords}`);
    }
    setSelectedDay('');
    setCityName('');
    setHospitalName('');
  };

  return (
    <>
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
                <div className="absolute inset-0 bg-black opacity-60"></div>{' '}
                {/* Black shadow overlay */}
              </div>
            </div>
            <div className="relative z-3 flex flex-col items-center text-center py-16">
              <div className="relative py-16">
                <div className="container mx-auto flex flex-col md:flex-row items-center justify-between">
                  {/* Left side content */}
                  <div className="text-center md:text-left">
                    <h1 className="text-4xl md:text-6xl font-bold text-blue-100 mb-4">
                      Find Pet Healthcare Near You with
                    </h1>
                    <h3 className="text-3xl md:text-5xl font-bold text-red-500 mb-4">
                      One Click
                    </h3>
                    {/* <h1 className="text-4xl md:text-6xl font-bold text-blue-100 mb-4">
                      Find Nearest Medical Facility
                    </h1> */}
                    <h1 className="text-xl md:text-2xl font-medium text-blue-100 mb-4">
                      Find the nearest hospital with ease.
                      <br />
                      Get instant access to healthcare services in your area,
                      <br />
                      right from the comfort of your home.
                    </h1>
                    <div className="flex gap-4 justify-center md:justify-start mt-6">
                      <button
                        className="bg-blue-600 text-white px-6 py-3 rounded-lg shadow hover:bg-blue-700"
                        onClick={() => router.push('/viewallhospi')}
                      >
                        View Hospitals
                      </button>
                      <button
                        className="bg-blue-100 text-blue-600 px-6 py-3 rounded-lg shadow hover:bg-blue-200"
                        onClick={() => router.push('/doctors')}
                      >
                        View Doctors
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
          <div className="relative z-5 w-full px-4 pb-8 -mt-20 max-w-6xl mx-auto">
            <div className="flex flex-row justify-between space-x-4">
              <div className="bg-white rounded-lg shadow-lg p-4 flex-grow flex-shrink-0 w-full md:w-2/3">
                <div className="bg-white">
                  <div className="container mx-auto">
                    <h3 className=" text-2xl font-bold mb-4">
                      Start Your Search Hospital
                    </h3>
                    <hr className="my-4 border-t-2 border-gray-300" />

                    <div className="relative z-2 home-first w-full pt-4">
                      <section className="mb-8">
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-4 gap-4">
                          {/* <input
        type="text"
        placeholder="Search doctors, clinics, hospitals, etc."
        value={searchData}
        onChange={handleDateChange}
        className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
      /> */}

                          <FilterDropdown
                            options={citiesOptions}
                            placeholder="📍 Select Location"
                            onChange={(selectedOption: any) => {
                              setCityName(selectedOption);
                            }}
                            value={cityName}
                          />

                          <FilterDropdown
                            options={hospitalsOptions}
                            placeholder="🏥 Select Hospital"
                            onChange={(selectedOption: any) => {
                              setHospitalName(selectedOption);
                            }}
                            value={hospitalName}
                          />

                          <FilterDropdown
                            options={daysOfWeekOptions}
                            placeholder="🗓 Select Day"
                            onChange={(selectedOption: any) =>
                              setSelectedDay(selectedOption)
                            }
                            value={selectedDay}
                          />
                          <FilterDropdown
                            options={specializationOptions}
                            placeholder="🔬 Select Specialization"
                            onChange={(selectedOption: any) => {
                              setSpecializationName(selectedOption);
                            }}
                            value={specializationName}
                          />

                          <button
                            onClick={handleFilter}
                            className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                          >
                            Search
                          </button>
                        </div>
                      </section>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-gray-200  rounded-lg shadow-lg p-4 flex-grow flex-shrink-0 w-full md:w-1/3">
                <div className="flex items-center">
                  <Image
                    src={booking}
                    alt="Your Image"
                    className="w-1/2 h-auto object-cover rounded-lg -mt-10"
                  />
                  <div className="flex-grow pl-4">
                    <h3 className="text-lg font-bold">
                      Are You Make an Appointment
                    </h3>
                    <button
                      className="bg-blue-600 text-white px-6 py-3 rounded-lg shadow hover:bg-blue-700 mt-4"
                      onClick={() => router.push('/Appointments')}
                    >
                      Appointment
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div id="departments" className="pb-8 px-6  pt-12">
          <PopularDoctors
            title="Hospitals"
            description="Your Pets Nutritional Health is Very Important & Our Priority"
            // link="/hospitalHomepage"
            handleClick={handleClick}
            linkDescription={'See Departments'}
            doctors={filterAllHspitals?.slice(0, 4)}
            // pathname={'/hospitalHomepage'}
          />
        </div>
        <div>
          <section className="flex flex-col items-center py-12 z-5 w-full px-4 pb-8 max-w-6xl mx-auto">
            <div className="flex flex-row justify-between items-center w-full">
              <div className=" m1 flex-1 text-center">
                <h1 className="text-4xl font-bold leading-snug">
                  Welcome to Stubby!
                  <span className="text-red-500">
                    Your one-stop solution for pet healthcare and more.
                  </span>
                </h1>
                <p className="mt-4 text-gray-600">
                  Explore our services to find the nearest hospital,
                  <br />
                  book appointments, connect with expert doctors,
                  <br />
                  and discover care for your beloved pets.
                </p>
                <p className="border-blue-500 text-blue-500 py-2 px-4 rounded hover:text-black transition">
                  Sign in now to unlock appointment booking and personalized
                  features!
                </p>
                <div className="mt-6 space-x-4">
                  {/* <button className="bg-white border border-blue-500 text-blue-500 py-2 px-4 rounded hover:bg-blue-500 hover:text-white transition">
                    Nearest Hospital
                  </button> */}
                </div>
              </div>

              <div className="relative m2 flex-1 flex items-center justify-center">
                <Image
                  src={doc}
                  alt="Dr. Tyrone Grindle"
                  width={300}
                  height={400}
                  className="rounded-lg "
                />
                <div className="absolute bottom-0 bg-blue-900 text-white p-3 rounded-md shadow-lg ml-80 transform -translate-x-1/2 border-r-2 border-red-500">
                  <p className="text-sm">Greetings & Welcome to</p>
                  <p className="text-lg font-bold text-center">STUBBY</p>
                </div>
              </div>
            </div>
          </section>
        </div>
        {/* 
        <div id="doctors" className="pb-8 pt-20">
          <PopularDoctors
            title="Popular Doctors"
            description="Meet With Professional Doctors."
            link="/doctors"
            handleClick={handleClick}
            linkDescription="See Doctors"
            doctors={doctors?.slice(0, 4)}
            pathname={'/appointmentdoctor'}
            query={doctors}
            doctor={true}
          />
        </div>
        <div id="pets" className="pb-8 pt-20">
          <PopularDoctors
            title="Pets Nutritional"
            description="Your Pets Nutritional Health is Very Important & Our Priority"
            link="/pets"
            handleClick={handleClick}
            linkDescription={'See Pets'}
            doctors={pets?.slice(0, 4)}
            pathname={'/pets'}
            query={petdata}
          />
        </div> */}
      </main>
    </>
  );
}
