'use client';
import { useDoctorStore } from '@/store/doctorStore';
import { ArrowRight, Filter } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { IconRight } from 'react-day-picker';
interface PopularDoctorsProps {
  title: string;
  description: string;
  link?: string;
  linkDescription: string;
  doctors: {
    id?: string;
    preSignedUrl: string;
    name: string;
    departmentName: string;
    description?: string;
    specializationName?: string;
    dayTimeSlotResponses?: [];
  }[];
  handleClick: (imageName: any, image: any, id: any) => void;
  pathname?: string | any;
  doctor?: boolean;
}

const PopularData: React.FC<PopularDoctorsProps> = ({
  title,
  description,
  link,
  linkDescription,
  doctors,
  handleClick,
  pathname,
  doctor,
}) => {
  const defaultImage = '/department.png';
  const [setSelectedDoctor] = useDoctorStore((state: any) => [
    state.setSelectedDoctor,
  ]);

  const DoctorCard = ({ image, index, className }: any) => (
    <div
      onClick={() => {
        if (doctor) setSelectedDoctor(image);
        handleClick(image.name, image.preSignedUrl, image.id);
      }}
      className={`group relative rounded-lg overflow-hidden cursor-pointer ${className}`}
    >
      <div className="w-full h-full">
        <Image
          src={image.preSignedUrl || defaultImage}
          alt={image.name}
          className="object-cover w-full h-full"
          width={500}
          height={500}
        />
      </div>
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/50 to-transparent p-4 flex flex-col justify-end transform translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
        <h3 className="text-white font-semibold text-lg mb-1">{image.name}</h3>
        <p className="text-gray-200 text-sm line-clamp-2">
          {image.description || description}
        </p>
      </div>
    </div>
  );

  return (
    <div className="w-full px-12 py-8">
      <div className="border-l-2 border-red-500 pl-2">
        <h2 className="text-2xl font-bold">{title}</h2>
        <p className="text-l border-l-2 border-white-500 pl-2 mb-6">
          {description}
        </p>
      </div>

      {doctors?.length > 0 ? (
        <div className="grid grid-cols-12 gap-4">
          {/* Left large image */}
          {doctors[0] && (
            <div className="col-span-12 md:col-span-4 h-[400px]">
              <DoctorCard image={doctors[0]} index={0} className="h-full" />
            </div>
          )}

          {/* Right large image */}
          {doctors[1] && (
            <div className="col-span-12 md:col-span-8 h-[400px]">
              <DoctorCard image={doctors[1]} index={1} className="h-full" />
            </div>
          )}

          {/* Bottom row of smaller images */}
          <div className="col-span-12">
            <div className="grid grid-cols-2 md:grid-cols-5 gap-4 h-48">
              {doctors[2] && (
                <DoctorCard image={doctors[2]} index={2} className="h-full" />
              )}
              {doctors[3] && (
                <DoctorCard image={doctors[3]} index={3} className="h-full" />
              )}

              {/* {doctors.slice(2, 7).map((image, index) => (
                <DoctorCard
                  key={index}
                  image={image}
                  index={index + 2}
                  className="h-full"
                />
              ))} */}

              {/* See All Button */}
              {/* <Link
                href="/viewallhospi"
                className="relative h-full col-span-2 md:col-span-1 rounded-lg overflow-hidden bg-emerald-700 text-white flex flex-col items-center justify-center group"
              >
                <ArrowRight className="text-2xl mb-2 group-hover:translate-x-1 transition-transform duration-300" />
                <p className="font-medium">See All</p>
              </Link> */}
              <Link
                href="/viewallhospi"
                className="relative h-full col-span-2 md:col-span-1  bg-gray-400 hover:bg-slate-500  rounded-lg overflow-hidden bg-cover bg-center text-white flex flex-col items-center justify-center group"
                style={{
                  // backgroundImage: `url(${defaultImage})`,
                  // filter: 'blur(0.1px)',
                  // textDecoration: 'none',
                }}
              >
                <ArrowRight className="text-7xl text-white mb-2 group-hover:translate-x-1 transition-transform duration-300 bg-gradient-to-t to-transparent" />
                <p className="font-extrabold text-white text-4xl rounded-lg bg-gradient-to-tto-transparent ">
                  See All
                </p>
              </Link>
            </div>
          </div>
        </div>
      ) : (
        <div className="text-center py-8 text-gray-500">No data available</div>
      )}
    </div>
  );
};

export default PopularData;
