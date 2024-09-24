'use client';
import React, { useEffect, useState } from 'react';
import Header from '@/components/Header';
import PopularDoctors from '@/components/Image';
import { getHospitalFilterData } from '@/app/home/action';
import { useRouter } from 'next/navigation';
import { useHospitalStore } from '@/store/hospitalStore';

const Index = ({ params }: { params: { records: string } }) => {
  const decodedRecords = JSON.parse(decodeURIComponent(params?.records));
  const [hospitals, setAllHospitals] = useHospitalStore((state: any) => [
    state.hospitals,
    state.setAllHospitals,
  ]);

  useEffect(() => {
    getHospitalDetails();
  }, []);


  const getHospitalDetails = async () => {
    try {
      const searchTextData = await getHospitalFilterData({
        pageSize: 10,
        pageCount: 1,
        searchTerm: decodedRecords?.searchData,
        cityId: decodedRecords?.cityId,
      });

      setAllHospitals(searchTextData?.records);
    } catch (error) {
      console.error('Error fetching hospital data:', error);
    }
  };


  const handleClick = (id: string) => {
    if (id) {
      console.log('object', id);
    }
  };

  return (
    <div id="hospital" className="pb-8 pt-5 w-full">
      <PopularDoctors
        title="Popular Hospital"
        description="see Your Hospital"
        handleClick={handleClick}
        doctors={hospitals}
        linkDescription={''}
        pathname={'/hospital'}
        query={hospitals}
      />
    </div>
  );
};

export default Index;
