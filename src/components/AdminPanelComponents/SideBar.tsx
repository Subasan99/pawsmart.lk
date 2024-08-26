"use client";
import { usePathname } from "next/navigation";

const SideBar = () => {
  const pathname = usePathname();
  return (
      <ul className="flex flex-col space-y-4 gap-2 w-full min-h-fit h-[80vh] font-semibold px-2 relative">
        {/* Sidebar items */}

        <li
          className={`text-black ${
            pathname.includes("/dashboard") && "bg-red-500 text-white"
          } px-4 py-1 rounded`}
        >
          <a href="/dashboard" className="hover:text-black">
            Dashboard
          </a>
        </li>
        <li
          className={`text-black ${
            pathname.includes("/doctors") && "bg-red-500 text-white"
          } px-4 py-1 rounded`}
        >
          <a href="/doctors" className="hover:text-black">
            Doctors
          </a>
        </li>
        <li
          className={`text-black ${
            pathname.includes("/medicines") && "bg-red-500 text-white"
          } px-4 py-1 rounded`}
        >
          <a href="/medicines" className="hover:text-black">
            Medicines
          </a>
        </li>
        <li
          className={`text-black ${
            pathname.includes("/appointments") && "bg-red-500 text-white"
          } px-4 py-1 rounded`}
        >
          <a href="/appointments" className="hover:text-black">
            Appointments
          </a>
        </li>
        <li
          className={`text-black ${
            pathname.includes("/departments") && "bg-red-500 text-white"
          } px-4 py-1 rounded`}
        >
          <a href="/departments" className="hover:text-black">
            Departments
          </a>
        </li>
        <li
          className={`text-black ${
            pathname.includes("/pets") && "bg-red-500 text-white"
          } px-4 py-1 rounded`}
        >
          <a href="/pets" className="hover:text-black">
            Pets
          </a>
        </li>
        <li
          className={`text-black ${
            pathname.includes("/specializations") && "bg-red-500 text-white"
          } px-4 py-1 rounded`}
        >
          <a href="/specializations" className="hover:text-black">
            Specializations
          </a>
        </li>
      </ul>
  );
};

export default SideBar;
