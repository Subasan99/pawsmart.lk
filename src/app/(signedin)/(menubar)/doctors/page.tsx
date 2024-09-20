"use client";
import Header from "@/components/Header";
import MultipleImagesProps from "@/components/SinglePageImage";
import { useDoctorStore } from "@/store/doctorStore";
import { useEffect, useState } from "react";
import { getDoctorFilterData } from "../../home/action";

interface Doctor {
  preSignedUrl: string;
  image: string;
  name: string;
  description: string;
}

const Doctors = () => {
  const [allDoctors, setAllDoctors] = useDoctorStore((state: any) => [
    state.doctors,
    state.setAllDoctors,
  ]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchData();
  }, []); // Empty dependency array

  const fetchData = async () => {
    try {
      const doctorsData = await getDoctorFilterData({
        pageSize: 10,
        pageCount: 1,
      });
      setAllDoctors(doctorsData.records);
      setError(null); // Clear error if data fetch is successful
    } catch (error) {
      console.error("Error fetching data:", error);
      setError("Failed to fetch doctors. Please try again later.");
    }
  };

  const doctores = Array.isArray(allDoctors)
    ? allDoctors.map((doctor: Doctor) => ({
        src: doctor.preSignedUrl,
        alt: doctor.image,
        textOverlay: doctor.name,
        imageDescription: doctor.description,
        label: doctor.name,
      }))
    : [];

  const handleClick = (imageName: string) => {
    console.log(`Image clicked: ${imageName}`);
  };

  return (
    <div id="doctors" className="pb-8 pt-20">
      <div className="sticky z-30 top-0 md:static h-fit">
        <Header />
      </div>
      <MultipleImagesProps
        title="Popular Doctors"
        description="Meet With Professional Doctors."
        handleClick={handleClick}
        doctors={doctores}
      />
    </div>
  );
};

export default Doctors;
