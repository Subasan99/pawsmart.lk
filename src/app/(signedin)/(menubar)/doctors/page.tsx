"use client";
import Header from "@/components/HomeComponent/Header";
import MultipleImagesProps from "@/components/SinglePageImage";
import { useDoctorStore } from "@/store/doctorStore";
import { useEffect, useState } from "react";
import { getDoctorFilterData } from "../../../home/action";
import Loader from "@/components/Loader";

interface Doctor {
  preSignedUrl: string;
  image: string;
  name: string;
  description: string;
}

const Doctors = () => {
  const [allDoctors, setAllDoctors, loading, setLoading] = useDoctorStore(
    (state: any) => [
      state.doctors,
      state.setAllDoctors,
      state.loading,
      state.setLoading,
    ]
  );

  useEffect(() => {
    fetchData();
  }, []); // Empty dependency array

  const fetchData = async () => {
    try {
      setLoading(true);
      const doctorsData = await getDoctorFilterData({
        pageSize: 10,
        pageCount: 1,
      });
      setAllDoctors(doctorsData.records);
    } catch (error) {
      console.error("Error fetching data:", error);
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

  if (loading || !allDoctors) {
    return (
      <div className="mt-14 px-7 w-full h-full flex flex-col bg-gray-100 items-center py-4">
        <div className="w-full max-w-[1204px] justify-center items-center flex flex-col px-3 py-5 h-full rounded-lg">
          <Loader className="h-10 w-10" />
        </div>
      </div>
    );
  }

  return (
    <div id="doctors" className="pb-8 pt-3 w-full">
      <MultipleImagesProps
        title="Popular Doctors"
        description="Meet With Professional Doctors."
        handleClick={handleClick}
        doctors={allDoctors}
      />
    </div>
  );
};

export default Doctors;
