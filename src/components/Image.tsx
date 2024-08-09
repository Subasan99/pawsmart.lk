'use client';
import Image from 'next/image';

interface PopularDoctorsProps {
  title: string;
  description: string;
  link: string;
  linkDescription: string;
  doctors: { src: string; alt: string; textOverlay: string }[];
  handleClick: (imageName: string) => void;
}

const PopularDoctors: React.FC<PopularDoctorsProps> = ({
  title,
  description,
  link,
  linkDescription,
  doctors,
  handleClick,
}) => {
  return (
    <div className="w-full container pt-5 px-7 mx-auto">
      <div className="border-l-2 border-red-500 pl-2">
        <h2 className="font-bold text-2xl">{title}</h2>
      </div>
      <div className="flex flex-row justify-between items-center">
        <p className="text-l border-l-2 border-white-500 pl-2">{description}</p>
        <a href={link}>
          <h2 className="text-red-500 hover:text-black">{linkDescription}</h2>
        </a>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 pt-5">
        {doctors.map((image, index) => (
          <div
            key={index}
            onClick={() => handleClick(image.alt)}
            className="cursor-pointer relative overflow-hidden transition-transform duration-300 ease-in-out hover:scale-105"
          >
            <div
              className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-60"
            ></div>
            <div
              className="absolute bottom-0 left-0 w-full bg-gray-800 bg-opacity-60 text-white text-center p-2 shadow-md md:bg-opacity-10 md:text-left"
            >
              <span className="text-base md:text-lg truncate">{image.textOverlay}</span>
            </div>
            <Image
              src={image.src}
              width={1000}
              height={1000}
              alt={image.alt}
              className="w-full h-auto object-cover md:w-100 md:h-80 transition-transform duration-300 ease-in-out hover:scale-105"
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default PopularDoctors;
