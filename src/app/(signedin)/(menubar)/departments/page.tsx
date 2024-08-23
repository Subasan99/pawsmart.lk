"use client";
import React, { useEffect } from "react";
import { useDepartmentStore } from "@/store/departmentStore";
import { getDepartmentData, getDepartmentFilterData } from "../../home/action";
import MultipleImagesProps from "@/components/SinglePageImage";
import Header from "@/components/Header";

const Department = () => {
  const [departments, setAllDepartments] = useDepartmentStore((state: any) => [
    state.departments,
    state.setAllDepartments,
  ]);

  useEffect(() => {
    fetchData();
  }, [getDepartmentData]);
  const fetchData = async () => {
    try {
      const departmentData = await getDepartmentFilterData({
        pageSize: 10,
        pageCount: 1,
      });

      setAllDepartments(departmentData);
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
      <div className="sticky z-30 top-0 md:static h-fit">
        <Header />
      </div>
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
