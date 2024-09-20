"use client";
import { signOut } from "@/api/route";
import {
  getDepartmentData,
  getDoctorData,
  getMedicinesData,
  getPetData,
} from "@/app/(signedin)/home/action";
import FilterDropdown from "@/components/FilterDropdown";
import PopularDoctors from "@/components/Image";
import { useAuthStore } from "@/store/authStore";
import { useDepartmentStore } from "@/store/departmentStore";
import { useDoctorStore } from "@/store/doctorStore";
import { useMedicineStore } from "@/store/medicinesStore";
import { usePetStore } from "@/store/petStore";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import booking from "../../public/booking.png";
import Logo from "../../public/logowhite.png";
import Logoeffect from "../../public/stubby.png";
import doc from "../../public/doc.png";

export default function Home() {
  const [doctorName, setDoctorName] = useState<string>("");
  const [departmentName, setDepartmentName] = useState("");
  const [appointmentDate, setAppointmentDate] = useState("");

  const handleFilter = () => {
    // Perform the filtering logic
    console.log("Doctor Name:", doctorName);
    console.log("Department Name:", departmentName);
    console.log("Appointment Date:", appointmentDate);
  };

  const [doctors, setAllDoctors] = useDoctorStore((state: any) => [
    state.doctors,
    state.setAllDoctors,
  ]);
  const [departments, setAllDepartments] = useDepartmentStore((state: any) => [
    state.departments,
    state.setAllDepartments,
  ]);

  const [pets, setAllPets] = usePetStore((state: any) => [
    state.pets,
    state.setAllPets,
  ]);

  const [medicines, setAllMedicines] = useMedicineStore((state: any) => [
    state.medicines,
    state.setAllMedicines,
  ]);

  const doctorOptions = Array.isArray(doctors)
    ? doctors.map((doctor: any) => ({
        label: doctor.name,
        value: doctor.id,
      }))
    : [];

  const departmentOptions = Array.isArray(departments)
    ? departments.map((department: any) => ({
        label: department.name,
        value: department.id,
      }))
    : [];

  // State to track scroll position
  const [headerBg, setHeaderBg] = useState("bg-transparent");
  const [textColor, setTextColor] = useState("text-white"); // Default text color
  const [logo, setLogo] = useState(Logo); // Default logo
  const [login, setLogin] = useAuthStore((state) => [
    state.login,
    state.setLogin,
  ]);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      if (scrollY > 0) {
        setHeaderBg("bg-white bg-opacity-90");
        setTextColor("text-black");
        setLogo(Logoeffect);
      } else {
        setHeaderBg("bg-transparent");
        setTextColor("text-white");
        setLogo(Logo);
      }
    };

    window.addEventListener("scroll", handleScroll);
    fetchData();

    // Clean up the event listener
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const fetchData = async () => {
    try {
      const petData = await getPetData();
      const departmentData = await getDepartmentData();
      const doctorData = await getDoctorData();
      const medicinesData = await getMedicinesData();

      setAllMedicines(medicinesData);
      setAllDepartments(departmentData);
      setAllPets(petData);
      setAllDoctors(doctorData);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const handleButtonClick = () => {
    console.log("Search button clicked");
  };

  const handleSignout = async () => {
    setLoading(true);
    await signOut();
    setLogin(undefined);
    setLoading(false);
  };

  const handleSearch = () => {
    console.log("Search initiated");
  };

  const handleClick = (imageName: any) => {
    console.log(`${imageName} clicked!`);
  };

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
  const departmentDatas = Array.isArray(departments)
    ? departments.map((department: any) => ({
        src: department.preSignedUrl,
        alt: department.image,
        textOverlay: department.name,
        id: department.id,
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

  const [loading, setLoading] = useState<boolean>(false);

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
    const [month, day, year] = date.split("/");
    return `${year}-${month}-${day}`;
  };

  const handleDateChange = (e: any) => {
    const inputDate = e.target.value;
    const formattedDate = formatDate(inputDate);
    setAppointmentDate(formattedDate);
  };

  console.log(login);

  if (loading) {
    return <div>Loading ....!</div>;
  }

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
                  style={{ objectFit: "cover" }}
                >
                  <source src="/Logvideo.mp4" type="video/mp4" />
                </video>
                <div className="absolute inset-0 bg-black opacity-60"></div>{" "}
                {/* Black shadow overlay */}
              </div>
            </div>
            <div className="relative z-3 flex flex-col items-center text-center py-16">
              <div className="relative py-16">
                <div className="container mx-auto flex flex-col md:flex-row items-center justify-between">
                  {/* Left side content */}
                  <div className="text-center md:text-left">
                    <h3 className="text-3xl md:text-5xl font-bold text-red-500 mb-4">
                      Emergency?
                    </h3>
                    <h1 className="text-4xl md:text-6xl font-bold text-blue-100 mb-4">
                      Find Nearest Medical Facility
                    </h1>
                    <div className="flex gap-4 justify-center md:justify-start mt-6">
                      <button className="bg-blue-600 text-white px-6 py-3 rounded-lg shadow hover:bg-blue-700">
                        View Hospitals
                      </button>
                      <button className="bg-blue-100 text-blue-600 px-6 py-3 rounded-lg shadow hover:bg-blue-200">
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
              {/* Search Component */}
              <div className="bg-white rounded-lg shadow-lg p-4 flex-grow flex-shrink-0 w-full md:w-2/3">
                <div className="bg-white">
                  <div className="container mx-auto">
                    <h3 className=" text-2xl font-bold mb-4">
                      Start Your Search
                    </h3>
                    <hr className="my-4 border-t-2 border-gray-300" />

                    <div className="relative z-2 home-first w-full pt-4">
                      <section className="mb-8">
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-4">
                          <input
                            type="text"
                            placeholder="Search doctors, clinics, hospitals, etc."
                            value={appointmentDate}
                            onChange={handleDateChange}
                            className="block min-w-16 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                          />

                          <FilterDropdown
                            options={departmentOptions}
                            placeholder="Select Location"
                            onChange={setDepartmentName}
                            value={departmentName}
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

              {/* Join As Doctor Component */}
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
                    <button className="bg-blue-600 text-white px-6 py-3 rounded-lg shadow hover:bg-blue-700 mt-4">
                      Appointment
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div id="departments" className="pb-8 pt-20">
          <PopularDoctors
            title="Departments"
            description="Your Pets Nutritional Health is Very Important & Our Priority"
            link="/departments"
            handleClick={handleClick}
            linkDescription={"Departments"}
            doctors={departmentDatas.slice(0, 4)}
            pathname={"/departments"}
            query={departmentDatas}
          />
        </div>
        <div>
          {/* Main Section */}
          <section className="flex flex-col items-center py-12 z-5 w-full px-4 pb-8 max-w-6xl mx-auto">
            <div className="flex flex-row justify-between items-center w-full">
              <div className=" m1 flex-1 text-center">
                <h1 className="text-4xl font-bold leading-snug">
                  Find Pet Healthcare Near You with
                  <span className="text-red-500"> One Click</span>
                </h1>
                <p className="mt-4 text-gray-600">
                  Find the nearest hospital with ease.
                  <br />
                  Get instant access to healthcare services in your area,
                  <br />
                  right from the comfort of your home.
                </p>
                <div className="mt-6 space-x-4">
                  <button className="bg-white border border-blue-500 text-blue-500 py-2 px-4 rounded hover:bg-blue-500 hover:text-white transition">
                    Nearest Hospital
                  </button>
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

        <div id="doctors" className="pb-8 pt-20">
          <PopularDoctors
            title="Popular Doctors"
            description="Meet With Professional Doctors."
            link="/doctors"
            handleClick={handleClick}
            linkDescription="Doctors"
            doctors={doctores.slice(0, 4)}
            pathname={"/doctor-details"}
            query={doctores}
          />
        </div>
        <div id="pets" className="pb-8 pt-20">
          <PopularDoctors
            title="Pets Nutritional"
            description="Your Pets Nutritional Health is Very Important & Our Priority"
            link="/pets"
            handleClick={handleClick}
            linkDescription={"Pets"}
            doctors={petdata.slice(0, 4)}
            pathname={"/pets"}
            query={petdata}
          />
        </div>
      </main>
    </>
  );
}
