"use client";
import MultipleImagesProps from "@/components/SinglePageImage";
import { useDepartmentStore } from "@/store/departmentStore";
import { useEffect } from "react";
import {
  getDeparmentFilterData,
  getDepartmentData,
} from "../../../home/action";

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
      const departmentData = await getDeparmentFilterData({
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
        id: department.id,
      }))
    : [];

  const handleClick = (imageName: string) => {
    console.log(`Image clicked: ${imageName}`);
  };

  return (
    <div id="departments" className="pb-8 pt-0">
      <MultipleImagesProps
        title="Departments"
        description="Your Pets Nutritional Health is Very Important & Our Priority"
        handleClick={handleClick}
        doctors={departmentDatas}
        pathname={"/departments"}
        query={departmentDatas}
      />
    </div>
  );
};

export default Department;
