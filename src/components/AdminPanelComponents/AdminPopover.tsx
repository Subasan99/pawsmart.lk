import Image from "next/image";
import DoctorImage from "../../../public/doctor.png";
import changePasswordImage from "../../../public/changePassword.jpg"
import { signOut } from "@/api/route";

const AdminPopover = () => {
  return (
    <div className="px-3 flex flex-col w-full gap-3">
      <div className="w-full h-fit flex gap-3 items-center">
        <div className="">
          <Image
            src={DoctorImage}
            alt="Doctor"
            className="w-10 h-10 rounded-full object-cover"
          />
        </div>
        <div className="font-semibold">My Profile</div>
      </div>

  


      <div className="w-full h-fit flex gap-3 items-center">
  <a href="/changepassword" className="flex items-center gap-3">
    <div className="w-15 h-15">
      <Image
        src={changePasswordImage}
        alt="Doctor"
        className="w-10 h-15 rounded-full object-cover"
      />
    </div>
    <div className="font-semibold">Change Password</div>
  </a>
</div>


      <div onClick={() => signOut()} className="bg-red-500 hover:bg-yellow-500 hover:text-black text-white px-2 py-1 rounded w-full text-center cursor-pointer">
        <a href="/signin" className="">
          Sign Out
        </a>
      </div>
    </div>
  );
};

export default AdminPopover;
