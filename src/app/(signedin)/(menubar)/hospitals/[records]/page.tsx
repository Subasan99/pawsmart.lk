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
  
      <div id="hospital" className="pb-8 pt-5">
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
  
  );
};

export default Index;
