'use client';
import Header from '@/components/HomeComponent/Header';
import MultipleImagesProps from '@/components/SinglePageImage';
import { useDoctorStore } from '@/store/doctorStore';
import { useEffect, useState } from 'react';
import {
  getDoctorData,
  getDoctorFilterData,
  getHospitalFilterData,
} from '../../../home/action';
import Loader from '@/components/Loader';
import FilterDropdown from '@/components/FilterDropdown';

interface Doctor {
  preSignedUrl: string;
  image: string;
  name: string;
  description: string;
}

const Doctors = () => {
  const [doctorNames, setDoctorNames] = useState<any[]>([]);
  const [docName, setDocName] = useState<any>('');
  const [docResName, setResDocName] = useState<any>(undefined);

  const [allDoctors, setAllDoctors, loading, setLoading] = useDoctorStore(
    (state: any) => [
      state.doctors,
      state.setAllDoctors,
      state.loading,
      state.setLoading,
    ]
  );

  useEffect(() => {
    fetchData();
  }, []);
  console.log("doctorsData?.recordsdoctorsDatadocName.lable",docName.label
  )

  const fetchData = async () => {
    try {
      setLoading(true);
      const doctorsData = await getDoctorFilterData({
        pageSize: 10,
        pageCount: 1,
      });
      const doctors = await getDoctorData();
      // console.log("thusi",doctorsData?.records)

      setAllDoctors(doctorsData?.records);
      setDoctorNames(doctors);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const listofdoctors = doctorNames.map((doctor: any) => ({
    label: doctor.name,
    value: doctor.id,
  }));
  const clickFilter = async () => {
    try {
      setLoading(true);
      const doctorsData = await getDoctorFilterData({
        pageSize: 10,
        pageCount: 1,
        departmentId: undefined,
        specializationId: undefined,
        petId: undefined,
        name: docName.lable,
        date: undefined,
      });
   

      setAllDoctors(doctorsData?.records);
  
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };
  const doctores = Array.isArray(allDoctors)
    ? allDoctors.map((doctor: Doctor) => ({
        src: doctor.preSignedUrl,
        alt: doctor.image,
        textOverlay: doctor.name,
        imageDescription: doctor.description,
        label: doctor.name,
      }))
    : [];

  const handleClick = (imageName: string) => {
    console.log(`Image clicked: ${imageName}`);
  };

  if (loading || !allDoctors) {
    return (
      <div className="mt-14 px-7 w-full h-full flex flex-col bg-gray-100 items-center py-4">
        <div className="w-full max-w-[1204px] justify-center items-center flex flex-col px-3 py-5 h-full rounded-lg">
          <Loader className="h-10 w-10" />
        </div>
      </div>
    );
  }

  return (
    <div id="doctors" className="pb-8 pt-3 w-full">
      <div className="bg-white rounded-lg mt-10 w-full shadow-md p-6 mb-8">
        <h3 className="text-2xl font-bold mb-4">Hospital properties found</h3>
        <hr className="my-4 border-t-2 border-gray-300" />

        <div className="flex justify-end items-center gap-6">
          {/* <FilterDropdown
            options={doctors?.map((d: any) => ({
              label: d.name,
              value: d.id,
            }))}
            placeholder="🐾 Select Pet"
            onChange={setPetName}
            value={petName}
          /> */}
          <FilterDropdown
            options={doctorNames}
            placeholder="👩‍⚕️ Select Doctor"
            onChange={setDocName}
            value={docName}
          />

          {/* <Calendar
            mode="single"
            selected={selectedDate}
            onSelect={setSelectedDate}
            initialFocus
          /> */}
          {/* <DatePicker
            selectedDate={selectedDate}
            onChange={setSelectedDate}
            placeholder="📅 Select Date"
          /> */}

          {/* Search Button */}
          <button
            onClick={fetchData}
            className="bg-blue-600 text-white px-8 py-2.5 w-64 rounded-lg hover:bg-blue-700 transition-colors"
          >
            Search
          </button>
        </div>
      </div>
      <MultipleImagesProps
        title="Popular Doctors"
        description="Meet With Professional Doctors."
        handleClick={clickFilter}
        doctors={allDoctors}
      />
    </div>
  );
};

export default Doctors;
