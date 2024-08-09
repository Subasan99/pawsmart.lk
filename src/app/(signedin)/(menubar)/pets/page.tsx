'use client';
import ImageCalender from '@/components/ImageCalender';
import React, { useEffect } from 'react';
import RootLayout from '../layout';
import Dropdown from '@/components/DropDown';
import { Link } from '@nextui-org/react';
import { usePetStore } from '@/store/petStore';
import { getPetData } from '../../home/action';

const Pets = () => {
  const [pets, setAllPets] = usePetStore((state: any) => [
    state.pets,
    state.setAllPets,
  ]);
  useEffect(() => {
    fetchData();
  }, [getPetData]);

  const fetchData = async () => {
    try {
      const petData = await getPetData({ pageSize: 10, pageCount: 1 });

      setAllPets(petData.records);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const petdata = Array.isArray(pets)
    ? pets.map((pet: any) => ({
        src: pet.preSignedUrl,
        alt: pet.image,
        textOverlay: pet.name,
        label: pet.name,
      }))
    : [];

  const handleClick = (imageName: string) => {
    console.log(`Image clicked: ${imageName}`);
  };

  return (
    <RootLayout pageName="Pets">
      <div className="grid  grid-cols-1 lg:grid-cols-3 h-full bg-gray-50 pb-10 ">
        <div className="col-span-1 flex items-center justify-center bg-gray">
          <Dropdown
            title={'Pets'}
            subtitle={'Medicines of VetHouse'}
            departments={petdata}
          />
        </div>

        <div className="col-span-1 lg:col-span-2 flex items-center justify-center  ">
          <div className="pb-10 pt-6 pl-2 pr-40">
            <Link href={'/appointmentdeparment'}>
              <a>
                <ImageCalender doctors={petdata} handleClick={handleClick} />
              </a>
            </Link>
          </div>
        </div>
      </div>
    </RootLayout>
  );
};

export default Pets;
