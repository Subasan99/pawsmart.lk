"use client";
import { useEffect, useState, useCallback } from "react";
import Image from "next/image";
import Logo from "../../public/logowhite.png";
import Logoeffect from "../../public/stubby.png";
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
import { useMedicinesStore } from "@/store/medicinesStore";
import { Sheet, SheetTrigger, SheetContent } from "@/components/ui/sheet";
import SideBarIcon from "@/components/svg/side_bar_icon";

export default function Home() {
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

  const [medicines, setAllMedicines] = useMedicinesStore((state: any) => [
    state.medicines,
    state.setAllMedicines,
  ]);

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

  // State to track scroll position
  const [headerBg, setHeaderBg] = useState("bg-white bg-opacity-90");
  const [textColor, setTextColor] = useState("text-black"); // Default text color
  const [logo, setLogo] = useState(Logoeffect); // Default logo

  useEffect(() => {
    // window.addEventListener("scroll", handleScroll);
  }, []);

  const fetchData = async () => {
    try {
      const petData = await getPetData();
      const departmentData = await getDepartmentData();
      const doctorData = await getDoctorData();
      const medicinesData = await getMedicinesData();
      setAllDepartments(departmentData);
      setAllMedicines(medicinesData);
      setAllPets(petData);
      setAllDoctors(doctorData);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };


  const handleButtonClick = () => {
    console.log("Search button clicked");
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
  })): [];

  const departmentDatas = Array.isArray(departments)
    ? departments.map((department: any) => ({
        src: department.preSignedUrl,
        alt: department.image,
        textOverlay: department.name,
      }))
    : [];

  const petdata = pets.map((pet: any) => ({
    src: pet.preSignedUrl,
    alt: pet.image,
    textOverlay: pet.name,
  }));

  const [open, setOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);

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

  return (
    <header
      className={`fixed top-0 left-0 w-full z-10 transition-all duration-300 ${headerBg}`}
    >
      <div
        className={`w-full h-fit flex flex-col md:flex-row justify-between items-center px-8 py-2 ${textColor}`}
      >
        <div className="flex justify-between items-center w-full md:hidden">
          <a href="/">
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
              <ul className="flex flex-col space-y-4">
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
                <li key={2}>
                  <a href="/Appointments" className="hover:text-red-500">
                  Appointments                  </a>
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
        <div className="hidden md:flex md:items-center w-full">
          <a href="/">
            <Image src={logo} alt="Company Logo" className="w-36" />
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
              <li key={2}>
                  <a href="/Appointments" className="hover:text-red-500">
                  Appointments                  </a>
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
          </div>
        </div>
      </div>
    </header>
  );
}
