"use client";
import { useEffect, useState, useCallback } from "react";
import Image from "next/image";
import Logo from "../../../public/stubby.png";
import Logoeffect from "../../../public/stubby.png";
import { useRouter } from "next/navigation";
import { useDoctorStore } from "@/store/doctorStore";
import {
  getDeparmentData,
  getDoctorData,
  getMedicinesData,
  getPetData,
} from "@/app/(signedin)/home/action";
import { useDeparmentStore } from "@/store/deparmentStore";
import { usePetStore } from "@/store/petStore";
import { useMedicinesStore } from "@/store/medicinesStore";
import { Sheet, SheetTrigger, SheetContent } from "@/components/ui/sheet";
import SideBarIcon from "@/components/svg/side_bar_icon";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import UserIcon from "../svg/user_icon";
import AdminPopover from "./AdminPopover";
import { usePathname } from "next/navigation";

export default function AdminHeader() {
  const pathname = usePathname();
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

  const [medicines, setAllMedicines] = useMedicinesStore((state: any) => [
    state.medicines,
    state.setAllMedicines,
  ]);

  // State to track scroll position
  const [headerBg, setHeaderBg] = useState("bg-transparent");
  const [textColor, setTextColor] = useState("text-white"); // Default text color
  const [logo, setLogo] = useState(Logo); // Default logo

  useEffect(() => {
    setHeaderBg("bg-white bg-opacity-90");
    setTextColor("text-black");
    setLogo(Logoeffect);
  }, []);

  const fetchData = async () => {
    try {
      const petData = await getPetData();
      const departmentData = await getDeparmentData();
      const doctorData = await getDoctorData();
      const medicinesData = await getMedicinesData();
      setAllDeparments(departmentData);
      setAllMedicines(medicinesData);
      setAllPets(petData);
      setAllDoctors(doctorData);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const [open, setOpen] = useState(false);
  const [sOpen, setSOpen] = useState(false);
  console.log(pathname);

  const router = useRouter();

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
              <Image src={logo} alt="Company Logo" className="w-36" />
            </a>
            <Sheet open={open} onOpenChange={setOpen}>
              <SheetTrigger className="px-1">
                <SideBarIcon />
              </SheetTrigger>
              <SheetContent
                className={`h-full flex flex-col items-start ${textColor}`}
              >
                <Image src={logo} className="w-[288px]" alt="Company Logo" />
                <ul className="flex flex-col space-y-4 gap-2">
                  {/* Sidebar items */}

                  <li className="bg-red-500 hover:bg-yellow-500 text-white px-4 py-1 rounded absolute bottom-8">
                    <a href="/signin" className="hover:text-black">
                      Sign Out
                    </a>
                  </li>
                </ul>
              </SheetContent>
            </Sheet>
          </div>
          <div className="hidden md:flex md:justify-between md:items-center w-full">
            <a className="justify-self-center" href="/admin-dashboard">
              <Image src={logo} alt="Company Logo" className="w-36" />
            </a>
            <Popover>
              <PopoverTrigger>
                <div className="flex space-x-4 cursor-pointer">
                  <UserIcon />
                </div>
              </PopoverTrigger>
              <PopoverContent>
                <AdminPopover />
              </PopoverContent>
            </Popover>
          </div>
        </div>
      </header>
    </>
  );
}
