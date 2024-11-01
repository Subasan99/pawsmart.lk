'use client';
import React, { useEffect, useState } from 'react';
import Header from '@/components/Header';
import PopularDoctors from '@/components/Image';
import { getHospitals } from '@/app/home/action';
import { useRouter } from 'next/navigation';

interface Hospital {
  preSignedUrl: string;
  image: string;
  name: string;
  description: string;
}

interface Doctor {
  id?: string;
  src: string;
  alt: string;
  textOverlay: string;
  description?: string;
  specializationName?: string;
  dayTimeSlotResponses?: [];
}

const Hospitals = () => {
  
  const router = useRouter();
  const [data, setData] = useState<any[]>([]);

  useEffect(() => {
    getHospitalDetails();
  }, []);

  const defaultImage = "/department.png";

  const getHospitalDetails = async () => {
    try {
      const hospitalData = await getHospitals();
   console.log("object",hospitalData)
      const result = hospitalData?.map((record: any) => ({
        id:record?.id,
        src: record?.preSignedUrl||defaultImage,
        alt: record?.name,
        textOverlay: record?.name,
        description: record?.description,
        dayTimeSlotResponses: [],
      }));

      setData(result);
   
    } catch (error) {
      console.error('Error fetching hospital data:', error);
    }
  };

  const handleClick = (id: string) => {
    if (id) {
      console.log('object',id)
    }
  };

  return (
    <div id="hospitals" className="pb-8 pt-20">
      <div className="sticky z-30 top-0 md:static h-fit">
        <Header />
      </div>
      <div id="hospital" className="pb-8 pt-20">
      <PopularDoctors
        title="Popular Hospital"
        description="see Your Hospital"
        handleClick={handleClick}
        doctors={data}
        linkDescription={''}
        pathname={''}
        query={data}
      />
    </div>
    </div>  
  );
};

export default Hospitals;
