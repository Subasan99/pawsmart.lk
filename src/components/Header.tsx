"use client";
import Image from "next/image";
import { useState } from "react";
import Logo from "../../public/VetHouse.png";
import { Sheet, SheetContent, SheetTrigger } from "./ui/sheet";
import SideBarIcon from "./svg/side_bar_icon";

export default function Header() {
  const [open, setOpen] = useState<boolean>(false);
  return (
    <div className="w-full  h-fit">
      {/* This is for mobile view */}
      <div className="flex justify-between w-full md:hidden h-fit py-2 items-center">
        {/* Heeader Image */}
        <Image
          src={Logo}
          className="w-[288px] justify-self-center"
          alt="Company Logo"
        />
        {/* Side Bar */}
        <Sheet open={open} onOpenChange={setOpen}>
          <SheetTrigger className="px-3">
            <div className="justify-self-end">
              <SideBarIcon />
            </div>
          </SheetTrigger>
          <SheetContent className="h-full flex flex-col items-start">

          </SheetContent>
        </Sheet>
      </div>
      {/* This is for the Web view */}
      <div className="hidden w-full md:flex h-fit py-2 px-2">
        {/* Header Image */}
        <Image className="w-72 " src={Logo} alt="company Logo" />
      </div>
    </div>
  );
}
