import React from 'react';
import Image from 'next/image'; // Adjust the import according to your setup
import DefaultDoc from '../../../public/default_user.png';
import { Mail, Smartphone } from 'lucide-react';
import Loader from '../Loader';
import { useDoctorStore } from '@/store/doctorStore';

interface DoctorCardProps {
  loading: boolean;
  selectedDoctor: {
    preSignedUrl?: string;
    name: string;
    departmentName: string;
    specializationName: string;
    email: string;
    phoneNo: string;
    description: string;
  } | null; 
}

const DoctorCard: React.FC<DoctorCardProps> = ({ loading, selectedDoctor }) => {
  const defaultImage = "/department.png";

  return (
    <div className="flex w-full h-full  pb-1 md:w-[350px] md:h-full md:basis-1/2 md:justify-self-start md:justify-end self-start">
      {loading ? (
        <div className="flex flex-col grow items-center justify-center p-10 md:max-w-[470px] bg-white border rounded">
          <Loader className="h-10 w-10" />
        </div>
      ) : (
        <div className="flex w-full grow md:justify-self-end items-center md:h-full flex-col gap-5 p-6 md:max-w-[470px] border rounded  bg-white h-full ">
          {/* <div className="relative flex h-[350px] w-[150px] md:w-full md:h-[420px] self-center -p-8 rounded-xl md:bg-[#666666]"> */}


          {/* {selectedDoctor?.preSignedUrl ? ( */}
  <div className="relative h-[350px] w-full rounded-full">
    <Image
      src={selectedDoctor?.preSignedUrl || DefaultDoc}
      alt="doctor"
      fill
      className="object-cover object-top rounded-full md:rounded-none"
    />
  </div>
{/* ) : (
  <div className="relative h-[350px] w-full rounded-full">
    <Image
      src={DefaultDoc}
      alt="doctor"
      fill
      className="object-contain"
    />
  </div>
)} */}

          {/* <div className="relative h-[350px] w-full rounded-full">
            <Image
              src={selectedDoctor?.preSignedUrl || DefaultDoc}
              alt="doctor"
              layout="fill"
              className="object-cover object-top rounded-full md:rounded-none"
            />
          </div> */}
          <div className="flex flex-col items-center gap-2 px-2 text-center">
            <div className="font-bold text-xl md:text-2xl w-full">
              <h2 className="text-xl flex w-full justify-center text-center mb-2">
                {selectedDoctor?.name}
              </h2>
            </div>
            <div className="text-lg md:text-xl font-semibold w-full">
              {selectedDoctor?.departmentName}
            </div>
            <div className="text-lg md:text-xl font-semibold w-full">
              <h2 className="text-xl flex w-full justify-center text-center mb-2">
                {selectedDoctor?.specializationName}
              </h2>
            </div>
            <div className="flex items-center font-semibold text-lg md:text-xl w-full">
              <h2 className="text-xl flex w-full justify-center text-center mb-2">
                <Mail className="mr-2" />
                {selectedDoctor?.email}
              </h2>
            </div>
            <div className="flex items-center font-semibold text-lg md:text-xl w-full">
              <h2 className="text-xl flex w-full justify-center text-center mb-2">
                <Smartphone className="mr-2" />
                {selectedDoctor?.phoneNo}
              </h2>
            </div>
            <div className="font-semibold text-md md:text-lg w-full">
              <h2 className="text-xl flex w-full justify-center text-center mb-2">
                &quot;{selectedDoctor?.description}&quot;
              </h2>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DoctorCard;
