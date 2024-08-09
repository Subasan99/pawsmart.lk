'use client';
import ImageCalender from '@/components/ImageCalender';
import React, { useEffect } from 'react';
import RootLayout from '../layout';
import Dropdown from '@/components/DropDown';
import { Link } from '@nextui-org/react';
import { useMedicinesStore } from '@/store/medicinesStore';
import { getMedicinesData } from '../../home/action';

const Medicines = () => {
  const [medicines, setAllMedicines] = useMedicinesStore((state: any) => [
    state.medicines,
    state.setAllMedicines,
  ]);

  useEffect(() => {
    fetchData();
  }, [ getMedicinesData, ]);
  const fetchData = async () => {
    try {
 
      const medicinesData = await getMedicinesData();

      setAllMedicines(medicinesData);
  
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };



  const medicinesDatas = Array.isArray(medicines)
    ? medicines.map((medicines: any) => ({
        src: medicines.preSignedUrl,
        alt: medicines.image,
        textOverlay: medicines.name,
        label: medicines.name,
      }))
    : [];

  const handleClick = (imageName: string) => {
    console.log(`Image clicked: ${imageName}`);
  };

  return (
    <RootLayout pageName="Medicines">
      <div className="grid  grid-cols-1 lg:grid-cols-3 h-full bg-gray-50 pb-10 ">
        <div className="col-span-1 flex items-center justify-center bg-gray">
          <Dropdown title={'Medicines'} subtitle={'Medicines of VetHouse'} departments={medicinesDatas}/>
        </div>

        <div className="col-span-1 lg:col-span-2 flex items-center justify-center  ">
          <div className="pb-10 pt-6 pl-2 pr-40">
          <Link href={'/appointmentmedicines'}>
          <a>
            <ImageCalender doctors={medicinesDatas} handleClick={handleClick} />
            </a>
            </Link>
          </div>
        </div>
      </div>
    </RootLayout>
  );
};

export default Medicines;
