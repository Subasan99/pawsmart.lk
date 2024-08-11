'use client';
// import ImageCalender from '@/components/ImageCalender';
import React, { useEffect, useState } from 'react';
import Calentercomponents from '@/components/Calentercomponents';
import { useSearchParams } from 'next/navigation';
import { useDoctorStore } from '@/store/doctorStore';
// import Calentercomponents from '@/components/Calentercomponents';

const Pets = () => {

  const [doctor, setAllDoctor] = useDoctorStore((state: any) => [
    state.doctor,
    state.setDoctors,
  ]);
  const [doccId, setDocId] = useState<any | undefined>(undefined);
  const SearchParams = useSearchParams();
  const doctors = SearchParams.get('imageQuery')

  let docName = '';
  let imageName = '';
  let docId='';


  if (doctors) {
    try {
      const queryData = JSON.parse(doctors);
      docName = queryData.imageName || '';
      imageName = queryData.image || '';
      docId = queryData.id || '';
      
      setDocId(queryData.id );
    } catch (error) {
      console.error('Error parsing imageQuery:', error);
    }
  }

  // useEffect(() => {
  //   fetchData();
  // }, [DoctorData]);

  // const fetchData = async () => {
  //   try {
  //      const docAppData = await DoctorData(doccId);
      
  //     setAllDoctor(docAppData);
     
  //   } catch (error) {
  //     console.error('Error fetching data:', error);
  //   }
  // };

console.log(doctor)
  return (
    // <RootLayout pageName=" ">
      <div className=" bg-gray-50 pb-10 mt-20 ">
        <Calentercomponents handleDateChange={function (value: string): void {
        throw new Error('Function not implemented.');
      } } name={undefined}        />
      </div>
    // </RootLayout>
  );
};

export default Pets;
