"use client";
import { usePathname } from "next/navigation";

const SideBar = () => {
  const pathname = usePathname();
  return (
      <ul className="flex flex-col space-y-4 gap-2 w-full min-h-fit h-[80vh] font-semibold px-2 relative">
        {/* Sidebar items */}

        <li
          className={`text-black ${
            pathname.includes("/admin-dashboard") && "bg-red-500 text-white"
          } px-4 py-1 rounded`}
        >
          <a href="/admin-dashboard" className="hover:text-black">
            Dashboard
          </a>
        </li>
        <li
          className={`text-black ${
            pathname.includes("/doctors-admin") && "bg-red-500 text-white"
          } px-4 py-1 rounded`}
        >
          <a href="/doctors-admin" className="hover:text-black">
            Doctors
          </a>
        </li>
        <li
          className={`text-black ${
            pathname.includes("/medicines-admin") && "bg-red-500 text-white"
          } px-4 py-1 rounded`}
        >
          <a href="/medicines-admin" className="hover:text-black">
            Medicines
          </a>
        </li>
        {/* <li
          className={`text-black ${
            pathname.includes("/appointments-admin") && "bg-red-500 text-white"
          } px-4 py-1 rounded`}
        >
          <a href="/appointments-admin" className="hover:text-black">
            Appointments
          </a>
        </li> */}
        <li
          className={`text-black ${
            pathname.includes("/departments-admin") && "bg-red-500 text-white"
          } px-4 py-1 rounded`}
        >
          <a href="/departments-admin" className="hover:text-black">
            Departments
          </a>
        </li>
        <li
          className={`text-black ${
            pathname.includes("/pets-admin") && "bg-red-500 text-white"
          } px-4 py-1 rounded`}
        >
          <a href="/pets-admin" className="hover:text-black">
            Pets
          </a>
        </li>
        <li
          className={`text-black ${
            pathname.includes("/specializations-admin") && "bg-red-500 text-white"
          } px-4 py-1 rounded`}
        >
          <a href="/specializations-admin" className="hover:text-black">
            Specializations
          </a>
        </li>
      </ul>
  );
};

export default SideBar;
