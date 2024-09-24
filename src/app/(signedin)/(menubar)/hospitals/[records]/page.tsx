"use client";
import React, { useEffect, useState } from "react";
import Header from "@/components/Header";
import PopularDoctors from "@/components/Image";
import { getHospitalFilterData } from "@/app/home/action";
import { useRouter } from "next/navigation";

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

const Index = ({ params }: { params: { records: string } }) => {
  const router = useRouter();
  const decodedRecords = JSON.parse(decodeURIComponent(params?.records));
  const [data, setData] = useState<any[]>([]);

  useEffect(() => {
    getHospitalDetails();
  }, []);

  // const getByHospitalDetails = async () => {
  //   try {
  //     // const hospitalPromises = decodedRecords.map(async (record: any) => {
  //     //   try {
  //     //     return await getHospital(record.id);
  //     //   } catch (err) {
  //     //     console.error(`Failed to fetch hospital with id: ${record.id}`, err);
  //     //     return null;
  //     //   }
  //     // });

  //     // const hospitalData = await Promise.all(hospitalPromises);
  //     // const filteredHospitalData = hospitalData.filter((hospital) => hospital !== null);
  //     // const formattedData = filteredHospitalData.map((hospital: any) => ({
  //     //   src: hospital?.preSignedUrl || hospital?.image,
  //     //   alt: hospital?.name,
  //     //   textOverlay: hospital?.name,
  //     //   description: hospital?.description,
  //     //   dayTimeSlotResponses: [],
  //     // }));

  //     // setData(formattedData);
  //     // console.log('Formatted Hospital Data:', formattedData);

  //   } catch (error) {
  //     console.error('Error fetching hospital data:', error);
  //   }
  // };
  const defaultImage = "/department.png";

  const getHospitalDetails = async () => {
    try {
      const searchTextData = await getHospitalFilterData({
        pageSize: 10,
        pageCount: 1,
        searchTerm: decodedRecords?.searchData,
        cityId: decodedRecords?.cityId,
      });
      const result = searchTextData?.records.map((record: any) => ({
        id: record?.id,
        src: record?.preSignedUrl || defaultImage,
        alt: record?.name,
        textOverlay: record?.name,
        description: record?.description,
        dayTimeSlotResponses: [],
      }));

      setData(result);
    } catch (error) {
      console.error("Error fetching hospital data:", error);
    }
  };

  const handleClick = (id: string) => {
    if (id) {
      console.log("object", id);
    }
  };

  return (
    <div id="hospitals" className="pb-8 pt-20">
      <div id="hospital" className="pb-8 pt-20">
        <PopularDoctors
          title="Popular Hospital"
          description="see Your Hospital"
          handleClick={handleClick}
          doctors={data}
          linkDescription={""}
          pathname={"/hospital"}
          query={data}
        />
      </div>
    </div>
  );
};

export default Index;
