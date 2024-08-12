"use client";
import React, { useEffect } from "react";
import { useDeparmentStore } from "@/store/deparmentStore";
import { getDeparmentData, getDeparmentFilterData } from "../../home/action";
import MultipleImagesProps from "@/components/SinglePageImage";

const Department = () => {
  const [departments, setAllDeparments] = useDeparmentStore((state: any) => [
    state.departments,
    state.setAllDeparments,
  ]);

  useEffect(() => {
    fetchData();
  }, [getDeparmentData]);
  const fetchData = async () => {
    try {
      const departmentData = await getDeparmentFilterData({
        pageSize: 10,
        pageCount: 1,
      });

      setAllDeparments(departmentData);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const departmentDatas = Array.isArray(departments)
    ? departments.map((department: any) => ({
        src: department.preSignedUrl,
        alt: department.image,
        textOverlay: department.name,
        label: department.name,
      }))
    : [];

  const handleClick = (imageName: string) => {
    console.log(`Image clicked: ${imageName}`);
  };

  return (
    <div id="departments" className="pb-8 pt-20">
      <MultipleImagesProps
        title="Departments"
        description="Your Pets Nutritional Health is Very Important & Our Priority"
        handleClick={handleClick}
        doctors={departmentDatas}
      />
    </div>
  );
};

export default Department;
