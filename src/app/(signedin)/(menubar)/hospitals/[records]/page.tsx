'use client';
import React, { useEffect } from 'react';
import PopularDoctors from '@/components/Image';
import { getHospitalFilterData } from '@/app/home/action';
import { useHospitalStore } from '@/store/hospitalStore';

const Index = ({ params }: { params: { records: string } }) => {
  const decodedRecords = JSON.parse(decodeURIComponent(params?.records));
  const [hospitals, setAllHospitals] = useHospitalStore((state: any) => [
    state.hospitals,
    state.setAllHospitals,
  ]);

  useEffect(() => {
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
    getHospitalDetails(); 
  }, [decodedRecords, setAllHospitals]);

  const handleClick = (id: string) => {
    if (id) {
      console.log('object', id);
    }
  };

  return (
    <div id="hospital" className="pb-8 pt-5 w-full">
      <PopularDoctors
        title="Popular Hospitals"
        description="See Your Hospital"
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
