'use client';
import ImageCalender from '@/components/ImageCalender';
import React, { useEffect } from 'react';
import RootLayout from '../layout';
import Dropdown from '@/components/DropDown';
import { Link } from '@nextui-org/react';
import { useDeparmentStore } from '@/store/deparmentStore';
import { getDeparmentData } from '../../home/action';

const Department = () => {
  const [departments, setAllDeparments] = useDeparmentStore((state: any) => [
    state.departments,
    state.setAllDeparments,
  ]);

  useEffect(() => {
    fetchData();
  }, [ getDeparmentData, ]);
  const fetchData = async () => {
    try {
 
      const departmentData = await getDeparmentData({ pageSize: 10, pageCount: 1 });

      setAllDeparments(departmentData);
  
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };



  // const departmentDatas = Array.isArray(departments)
  //   ? departments.map((department: any) => ({
  //       src: department.preSignedUrl,
  //       alt: department.image,
  //       textOverlay: department.deptName,
  //       label: department.deptName,
  //     }))
  //   : [];

  const departmentDatas = Array.isArray(departments)
  ? departments.slice(0, 4).map((department: any) => ({
      src: department.preSignedUrl,
      alt: department.image,
      textOverlay: department.deptName,
      label: department.deptName,
    }))
  : [];


  const handleClick = (imageName: string) => {
    console.log(`Image clicked: ${imageName}`);
  };

  return (
    <RootLayout pageName="Department">
      <div className="grid  grid-cols-1 lg:grid-cols-3 h-full bg-gray-50 pb-10 ">
        <div className="col-span-1 flex items-center justify-center bg-gray ">
          
          <Dropdown
            title={'Departments'}
            subtitle={'Departments of VetHouse'}
            departments={departmentDatas}
          />
        </div>

        <div className="col-span-1 lg:col-span-2 flex items-center justify-center  ">
          <div className="pb-10 pt-6 pl-2 pr-40">
            <ImageCalender doctors={departmentDatas} handleClick={handleClick} />
          </div>
        </div>
      </div>
    </RootLayout>
  );
};

export default Department;
