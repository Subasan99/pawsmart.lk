import { signOut } from '@/api/route';
import Image from 'next/image';
import { useRouter } from 'next/navigation'; // Updated import
import changePasswordImage from '/public/changePassword.jpg';
import DoctorImage from '/public/doctor.png';
import { LogOut } from 'lucide-react';


interface AdminPopoverProps {
  handleSignOut: () => Promise<void>;
  adminName:string;
}

const AdminPopover: React.FC<AdminPopoverProps> = ({ handleSignOut ,adminName}) => {
  return (
    <div className="px-3 flex flex-col w-full gap-3">
      <div className="w-full h-fit flex gap-3 items-center">
        <div>
          <Image
            src={DoctorImage}
            alt="Doctor"
            className="w-10 h-10 rounded-full object-cover"
          />
        </div>
        <div className="font-semibold">{adminName}</div>
      </div>

      <div className="w-full h-fit flex gap-3 items-center">
        <a href="/changepassword" className="flex items-center gap-3">
          <div className="w-15 h-15">
            <Image
              src={changePasswordImage}
              alt="Change Password"
              className="w-10 h-15 rounded-full object-cover"
            />
          </div>
          <div className="font-semibold">Change Password</div>
        </a>
      </div>

      <div
        onClick={handleSignOut}
        className=" hover:bg-yellow-500 flex hover:text-black text-black px-2 py-1 rounded w-full justify-center cursor-pointer"
      >
         {/* <button className="flex  gap-2 cursor-pointer"> */}
    <LogOut size={20} />
    <span className="text-sm lg:text-sm font-semibold">LOG OUT</span>
  {/* </button> */}
      </div>
    </div>
  );
};

export default AdminPopover;
