'use client';
import React, { useEffect, useState } from 'react';
import { useDoctorStore } from '@/store/doctorStore';
import { getDoctorFilterData, getHospital } from '../../../home/action';
import MultipleImagesProps from '@/components/SinglePageImage';
import Header from '@/components/Header';
import { useHospitalStore } from '@/store/hospitalStore';
import PopularDoctors from '@/components/Image';
import { useRouter } from 'next/navigation';

const Index = ({ params }: { params: { id: string } }) => {
  console.log('objectammmaaaaa', params?.id);
  const [hospital, sethospital] = useState<any>('');
  const [doctors, setDoctors] = useState<any[]>([]);
  useEffect(() => {
    getByHospitalDetails();
  }, []);

  const getByHospitalDetails = async () => {
    try {
      const getByHospital = await getHospital(params?.id);
      sethospital(getByHospital);

      const doctorList: any[] = [];
      getByHospital?.doctorDepartmentResponses?.forEach((department: any) => {
        department.doctorResponses.forEach((doctor: any) => {
          doctorList.push(doctor);
          console.log(`Doctor Name: ${doctor.name}, Email: ${doctor.email}`);
        });
      });

      setDoctors(doctorList); // Save doctor list to state
    } catch (error) {
      return null;
    }
  };
  const defaultImage = '/department.png';

  return (
    <div id="hospitals" className="pb-8 pt-20">
      <div className="sticky z-30 top-0 md:static h-fit">
        <Header />
      </div>

      <div
        className="m-10"
        style={{
          border: '1px solid #ddd',
          padding: '30px',
          borderRadius: '8px',
          display: 'flex',
          maxWidth: '500px',
          backgroundColor: 'white',
        }}
      >
        <div style={{ position: 'relative' }}>
          <img
            src={defaultImage}
            alt="Hospital Building"
            style={{ width: '150px', height: 'auto', borderRadius: '8px' }}
          />
          <span
            style={{
              position: 'absolute',
              top: '8px',
              left: '8px',
              backgroundColor: 'red',
              color: 'white',
              padding: '4px 8px',
              borderRadius: '50%',
              fontWeight: 'bold',
            }}
          >
            ✨
          </span>
        </div>

        <div style={{ marginLeft: '16px' }}>
          <a href="/hospitals" className="hover:text-red-500">
            Hospital
          </a>
          {/* <h2 style={{ fontSize: '1.5em', margin: '0' }}>Hospital
          
          </h2> */}

          <h2 style={{ fontSize: '1.5em', margin: '0' }}>
            {hospital?.name}
            {/* <span style={{ color: 'green' }}>✔️</span> */}
          </h2>
          <p>
            Location: {hospital?.city}, {hospital?.district},{' '}
            {hospital?.province}
          </p>
          <div
            style={{ display: 'flex', alignItems: 'center', marginTop: '8px' }}
          >
            <span style={{ color: 'gold' }}>⭐⭐⭐⭐⭐</span>
            <span style={{ marginLeft: '8px' }}>2100 Feedback</span>
          </div>
          <p style={{ margin: '12px 0', color: '#555' }}>
            {hospital?.description}
          </p>
          {/* <div style={{ display: 'flex', gap: '10px' }}>
            <button style={{ padding: '10px 16px', border: 'none', borderRadius: '4px', cursor: 'pointer', backgroundColor: '#f0f0f0' }}>Add Feedback</button>
            <button style={{ padding: '10px 16px', border: 'none', borderRadius: '4px', cursor: 'pointer', backgroundColor: '#007bff', color: 'white' }}>Book Now</button>
          </div> */}
        </div>
      </div>


      {doctors.length > 0 ? (
  <div
    style={{
      display: 'flex',
      flexWrap: 'wrap',
      justifyContent: 'space-around',
      gap: '20px',
    }}
  >
{doctors.length > 0 ? (
  <div
    style={{
      display: 'flex',
      justifyContent: 'space-between', // Ensures spacing between cards
      gap: '20px', // Optional, extra spacing between cards
      flexWrap: 'nowrap', // Prevents wrapping of the cards
    }}
  >
    {/* {doctors.map((doctor, index) => (
      <div
        key={index}
        className="m-10"
        style={{
          border: '1px solid #ddd',
          padding: '30px',
          borderRadius: '8px',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          width: '250px', // Adjust card width
          backgroundColor: 'white',
        }}
      >
        <div style={{ position: 'relative' }}>
          <img
            src={defaultImage}
            alt="Hospital Building"
            style={{ width: '150px', height: 'auto', borderRadius: '8px' }}
          />
          <span
            style={{
              position: 'absolute',
              top: '8px',
              left: '8px',
              backgroundColor: 'red',
              color: 'white',
              padding: '4px 8px',
              borderRadius: '50%',
              fontWeight: 'bold',
            }}
          >
            ✨
          </span>
        </div>

        <div style={{ marginTop: '16px', textAlign: 'center' }}>
          <h2 style={{ fontSize: '1.5em', margin: '0' }}>{doctor.name}</h2>
          <p>Email: {doctor.email}</p>
          <p>Specialty: {doctor.specialty}</p>
        </div>
      </div>
    ))} */}
  </div>
) : (
  <p className="m-10">No doctors available</p>
)}

  </div>
) : (
  <p className="m-10">No doctors available</p>
)}

    </div>
  );
};

export default Index;
