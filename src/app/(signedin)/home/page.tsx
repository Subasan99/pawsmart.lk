"use client";
import { useEffect, useState, useCallback } from "react";
import Image from "next/image";
import Logo from "../../../../public/logowhite.png";
import Logoeffect from "../../../../public/stubby.png";
import { useRouter } from "next/navigation";
import { useDoctorStore } from "@/store/doctorStore";
import {
  getDepartmentData,
  getDoctorData,
  getMedicinesData,
  getPetData,
} from "@/app/(signedin)/home/action";
import { useDepartmentStore } from "@/store/departmentStore";
import { usePetStore } from "@/store/petStore";
import { useMedicineStore } from "@/store/medicinesStore";
import PopularDoctors from "@/components/Image";
import { Sheet, SheetTrigger, SheetContent } from "@/components/ui/sheet";
import SideBarIcon from "@/components/svg/side_bar_icon";
import Footer from "@/components/Footer";
import FilterDropdown from "@/components/FilterDropdown";
import { useAuthStore } from "@/store/authStore";
import { signOut } from "@/api/route";

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
      }))
    : [];

  const petdata = Array.isArray(pets)
    ? pets.map((pet: any) => ({
        src: pet.preSignedUrl,
        alt: pet.image,
        textOverlay: pet.name,
      }))
    : [];

  const [open, setOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);

  const [loading, setLoading] = useState<boolean>(false);

  const router = useRouter();

  const medicinesDatas = Array.isArray(medicines)
    ? medicines.map((medicines: any) => ({
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

  if(loading){
    return <div>Loading ....!</div>
  }

  return (
    <>
      <header
        className={`fixed top-0 left-0 w-full z-10 transition-all duration-300 ${headerBg}`}
      >
        <div
          className={`w-full h-fit flex flex-col md:flex-row justify-between items-center px-8 py-2 ${textColor}`}
        >
          <div className="flex justify-between items-center w-full md:hidden">
            <a href="/">
              {" "}
              <Image src={logo} alt="Company Logo" className="w-36" />
            </a>
            <Sheet open={open} onOpenChange={setOpen}>
              <SheetTrigger className="px-3">
                <SideBarIcon />
              </SheetTrigger>
              <SheetContent
                className={`h-full flex flex-col items-start ${textColor}`}
              >
                <Image src={logo} className="w-[288px]" alt="Company Logo" />
                <ul className="flex flex-col space-y-4 text-black">
                  {/* Sidebar items */}
                  <li key={0}>
                    <a href="/" className="hover:text-red-500">
                      Home
                    </a>
                  </li>
                  <li key={1}>
                    <a href="/aboutus" className="hover:text-red-500">
                      About Us
                    </a>
                  </li>
                  <li
                    onClick={() => handleMouseEnter("departments")}
                    className="hover:text-red-500 relative"
                  >
                    <a href="/departments" className="hover:text-red-500">
                      Departments
                    </a>
                    {activeDropdown === "departments" &&
                      renderDropdown(departments, "/departments")}
                  </li>
                  <li
                    onClick={() => handleMouseEnter("doctors")}
                    className="hover:text-red-500 relative"
                  >
                    <a href="/doctors" className="hover:text-red-500">
                      Doctors
                    </a>
                    {activeDropdown === "doctors" &&
                      renderDropdown(doctors, "/doctors")}
                  </li>
                  <li
                    onClick={() => handleMouseEnter("medicines")}
                    className="hover:text-red-500 relative"
                  >
                    <a href="/medicines" className="hover:text-red-500">
                      Medicines
                    </a>
                    {activeDropdown === "medicines" &&
                      renderDropdown(medicines, "/medicines")}
                  </li>
                  <li
                    onClick={() => handleMouseEnter("pets")}
                    className="hover:text-red-500 relative"
                  >
                    <a href="/pets" className="hover:text-red-500">
                      Pets
                    </a>
                    {activeDropdown === "pets" && renderDropdown(pets, "/pets")}
                  </li>
                  {login ? (
                    <div
                      onClick={handleSignout}
                      className="bg-red-500 hover:bg-yellow-500 text-white px-4 py-1 rounded"
                    >
                      <p className="hover:text-black">SignOut</p>
                    </div>
                  ) : (
                    <>
                      {" "}
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
                    </>
                  )}
                </ul>
              </SheetContent>
            </Sheet>
          </div>
          <div className="hidden md:flex md:items-center w-full">
            <a href="/">
              <Image src={logo} alt="Company Logo" className="w-36" />{" "}
            </a>
            <nav className="flex-1 flex justify-center">
              <ul className="flex space-x-8">
                {/* Navbar items */}
                <li key={0}>
                  <a href="/" className="hover:text-red-500">
                    Home
                  </a>
                </li>
                <li key={1}>
                  <a href="/aboutus" className="hover:text-red-500">
                    About Us
                  </a>
                </li>
                <li
                  onMouseEnter={() => handleMouseEnter("departments")}
                  onMouseLeave={handleMouseLeave}
                  className="relative"
                >
                  <a href="/departments" className="hover:text-red-500">
                    Departments
                  </a>
                  {activeDropdown === "departments" &&
                    renderDropdown(departments, "/departments")}
                </li>
                <li
                  onMouseEnter={() => handleMouseEnter("doctors")}
                  onMouseLeave={handleMouseLeave}
                  className="relative"
                >
                  <a href="/doctors" className="hover:text-red-500">
                    Doctors
                  </a>
                  {activeDropdown === "doctors" &&
                    renderDropdown(doctors, "/doctors")}
                </li>
                <li
                  onMouseEnter={() => handleMouseEnter("medicines")}
                  onMouseLeave={handleMouseLeave}
                  className="relative"
                >
                  <a href="/medicines" className="hover:text-red-500">
                    Medicines
                  </a>
                  {activeDropdown === "medicines" &&
                    renderDropdown(medicines, "/medicines")}
                </li>
                <li
                  onMouseEnter={() => handleMouseEnter("pets")}
                  onMouseLeave={handleMouseLeave}
                  className="relative"
                >
                  <a href="/pets" className="hover:text-red-500">
                    Pets
                  </a>
                  {activeDropdown === "pets" && renderDropdown(pets, "/pets")}
                </li>
              </ul>
            </nav>
            <div className="flex space-x-4">
              {login ? (
                <button
                  onClick={handleSignout}
                  className="bg-red-500 hover:bg-yellow-500 text-white px-4 py-1 rounded"
                >
                  Signout
                </button>
              ) : (
                <>
                  <button
                    onClick={handleButtonClick}
                    className="bg-red-500 hover:bg-yellow-500 text-white px-4 py-1 rounded"
                  >
                    <a href="/signin">Sign In</a>
                  </button>
                  <button
                    onClick={handleButtonClick}
                    className="bg-red-500 hover:bg-yellow-500 text-white px-4 py-1 rounded"
                  >
                    <a href="/signup">Sign Up</a>
                  </button>
                </>
              )}
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
                  style={{ objectFit: "cover" }}
                >
                  <source src="/Logvideo.mp4" type="video/mp4" />
                </video>
                <div className="absolute inset-0 bg-black opacity-60"></div>{" "}
                {/* Black shadow overlay */}
              </div>
            </div>
            <div className="flex items-center justify-center min-h-screen w-full">
              <div className="relative z-2 home-first w-full max-w-4xl">
                <div className="text mb-5 text-center">
                  <h3 className="text-3xl font-bold mb-2 text-white">
                    THE BEST VETERINARY SERVICE FOR YOUR PET
                  </h3>
                  <p className="text-lg text-white">
                    Discover Best Service to Breeds Your Loved Dog Explore
                    around the world
                  </p>
                </div>
                <section className="mb-8">
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                    <FilterDropdown
                      options={doctorOptions}
                      placeholder="Select Doctor"
                      onChange={setDoctorName}
                      value={doctorName}
                    />

                    <FilterDropdown
                      options={departmentOptions}
                      placeholder="Select Department"
                      onChange={setDepartmentName}
                      value={departmentName}
                    />

                    <input
                      type="date"
                      value={appointmentDate}
                      // onChange={(e) => setAppointmentDate(e.target.value)}
                      onChange={handleDateChange}
                      className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    />

                    <button
                      onClick={handleFilter}
                      className="bg-blue-500 text-white px-4 py-2 rounded-md shadow-sm hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    >
                      Search
                    </button>
                  </div>
                </section>
              </div>
            </div>
          </section>
        </div>

        <div id="departments" className="pb-8 pt-20">
          <PopularDoctors
            title="Departments"
            description="Your Pets Nutritional Health is Very Important & Our Priority"
            link="/departments"
            handleClick={handleClick}
            linkDescription={"Departments"}
            doctors={departmentDatas.slice(0, 4)}
            pathname={"/appoinment"}
            query={departmentDatas}
          />
        </div>

        <div id="doctors" className="pb-8 pt-20">
          <PopularDoctors
            title="Popular Doctors"
            description="Meet With Professional Doctors."
            link="/doctors"
            handleClick={handleClick}
            linkDescription="Doctors"
            doctors={doctores.slice(0, 8)}
            pathname={"/booking"}
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
            pathname={"/booking"}
            query={petdata}
          />
        </div>

        <div id="medicines" className="pb-8 pt-20">
          <PopularDoctors
            title="Medicines"
            description="Your Pets Nutritional Health is Very Important & Our Priority"
            link="/medicines"
            handleClick={handleClick}
            linkDescription={"Medicines"}
            doctors={medicinesDatas.slice(0, 4)}
            pathname={"/booking"}
            query={medicinesDatas}
          />
        </div>
      </main>
    </>
  );
}
