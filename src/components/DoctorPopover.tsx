import Image from "next/image";
import DoctorImage from "../../public/doctor.png";

const DoctorPopover = () => {
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
      <div className='bg-red-500 hover:bg-yellow-500 hover:text-black text-white px-4 py-1 rounded w-full text-center cursor-pointer'>
        <a href="/signin" className="">
          Sign Out
        </a>
      </div>
    </div>
  );
};

export default DoctorPopover;
