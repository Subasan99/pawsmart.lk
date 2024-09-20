"use client";
import React, { useEffect, useState } from "react";
import { useDoctorStore } from "@/store/doctorStore";
import { getDoctorFilterData, getHospital } from "../../home/action";
import MultipleImagesProps from "@/components/SinglePageImage";
import Header from "@/components/Header";
import { useHospitalStore } from "@/store/hospitalStore";
import PopularDoctors from "@/components/Image";

interface Doctor {
  preSignedUrl: string;
  image: string;
  name: string;
  description: string;
}

const Hospitals = () => {
  const [allHospitals, setAllHospitalData] = useHospitalStore((state: any) => [
    state.hospitals,
    state.setAllHospitals,
  ]);
  const [error, setError] = useState<string | null>(null);
console.log('allHospitalsallHospitalsallHospitals',allHospitals)
  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const hospitalData = await getHospital();
      console.log('hospitalDatahospitalData',hospitalData)
      setAllHospitalData(hospitalData);
      setError(null); 
    } catch (error) {
      console.error("Error fetching data:", error);
      setError("Failed to fetch doctors. Please try again later.");
    }
  };


  const hospitals = Array.isArray(allHospitals)
    ? allHospitals.map((doctor: Doctor) => ({
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
    <div id="hospitals" className="pb-8 pt-20">
      <div className="sticky z-30 top-0 md:static h-fit">
        <Header />
      </div>
      {/* <MultipleImagesProps
        title="Popular Hospitals"
        description="Choose Your Hospital"
        handleClick={handleClick}
        doctors={hospitals}
      /> */}

<PopularDoctors
            title="Departments"
            description="Your Pets Nutritional Health is Very Important & Our Priority"
            link="/departments"
            handleClick={handleClick}
            linkDescription={'Departments'}
            doctors={hospitals.slice(0, 4)}
            pathname={'/hospital'}
            query={hospitals}
          />
    </div>
  );
};

export default Hospitals;
