'use client';
import ImageCalender from '@/components/ImageCalender';
import React, { useEffect } from 'react';
import RootLayout from '../layout';
import Dropdown from '@/components/DropDown';
import { Link } from '@nextui-org/react';
import { useDoctorStore } from '@/store/doctorStore';
import { getDoctorData } from '../../home/action';

const Doctors = () => {
  const [allDoctors, setAllDoctors] = useDoctorStore((state: any) => [
    state.doctors,
    state.setAllDoctors,
  ]);
  useEffect(() => {
    fetchData();
  }, [getDoctorData]);

  const fetchData = async () => {
    try {
      const doctors = await getDoctorData({ pageSize: 10, pageCount: 1 });
      setAllDoctors(doctors.records);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const doctores = allDoctors.map((doctor: any) => ({
    src: doctor.preSignedUrl,
    alt: doctor.image,
    textOverlay: doctor.name,
    imageDescription: doctor.description,
    label: doctor.name,
  }));
  const handleClick = (imageName: string) => {
    console.log(`Image clicked: ${imageName}`);
  };

  return (
    <RootLayout pageName="Doctors">
      <div className="grid  grid-cols-1 lg:grid-cols-3 h-full bg-gray-50 pb-10 ">
        <div className="col-span-1 flex items-center justify-center bg-gray ">
          <Dropdown
            title={'Doctors'}
            subtitle={'Doctors of VetHouse'}
            departments={doctores}
          />
        </div>

        <div className="col-span-1 lg:col-span-2 flex items-center justify-center  ">
          <div className="pb-10 pt-6 pl-2 pr-40">
            <a>
              <ImageCalender doctors={doctores} handleClick={handleClick} />
            </a>
          </div>
        </div>
      </div>
    </RootLayout>
  );
};

export default Doctors;
