// 'use client';
// import React, { useEffect, useState } from 'react';
// import { useHospitalStore } from '@/store/hospitalStore';
// import FilterDropdown from '@/components/FilterDropdown';
// import HospitalImageCard from '@/components/HospitalImageCard';
// import { getCities, getHospitalFilterData } from '@/app/home/action';
// import { Filter } from 'lucide-react';
// import { getAllSpecializations } from '@/api/route';
// import { useSpecializationStore } from '@/store/specializationStore';
// import { useCityStore } from '@/store/citiesStore';

// const Index = () => {
//   const [hospitalName, setHospitalName] = useState<any>('');
//   const [hospitalResName, setResHospitalName] = useState<any>(undefined);
//   const [specializationsResName, setResSpecializations] =
//     useState<any>(undefined);

//   const [citiesName, setResCities] = useState<any>(undefined);

//   const [selectedDay, setSelectedDay] = useState<any>(null);
//   const [cityName, setCityName] = useState<any>('');
//   const [specializationName, setSpecializationName] = useState<any>('');
//   const [selectedDoctor, setSelectedDoctor] = useState<any>('');
//   const [hospitals, setAllHospitals] = useHospitalStore((state: any) => [
//     state.hospitals,
//     state.setAllHospitals,
//   ]);
//   const [specialization, setAllSpecialization] = useSpecializationStore(
//     (state: any) => [state.specialization, state.setAllSpecialization]
//   );

//   const [cities, setAllCities] = useCityStore((state: any) => [
//     state.cities,
//     state.setAllCities,
//   ]);

//   useEffect(() => {
//     getResHospitalDetails();
//   }, []);

//   useEffect(() => {
//     getHospitalDetails();
//   }, [hospitalName, selectedDay, cityName, specializationName]);

//   const getHospitalDetails = async () => {
//     try {
//       const searchTextData = await getHospitalFilterData({
//         pageSize: 10,
//         pageCount: 1,
//         searchTerm: undefined,
//         cityId: cityName.value,
//         hospitalId: hospitalName.value,
//         specializationId: specializationName.value,
//         day: selectedDay,
//       });

//       setAllHospitals(searchTextData?.records);
//     } catch (error) {
//       console.error('Error fetching hospital data:', error);
//     }
//   };

//   const getResHospitalDetails = async () => {
//     try {
//       const searchTextData = await getHospitalFilterData({
//         pageSize: 10,
//         pageCount: 1,
//       });
//       const activeHospitals = searchTextData?.records?.filter(
//         (hospital: any) => hospital.active
//       );
//       const citiesData = await getCities();
//       const specializations = await getAllSpecializations();

//       // const uniqueCities = Array.isArray(activeHospitals)
//       //   ? [...new Set(activeHospitals.map((hospital: any) => hospital.city))]
//       //   : [];

//       // const uniqueSpecializations = Array.isArray(activeHospitals)
//       //   ? [
//       //       ...new Set(
//       //         activeHospitals.flatMap((hospital: any) =>
//       //           hospital.doctorDepartmentResponses?.flatMap(
//       //             (dept: any) =>
//       //               dept.doctorResponses?.map(
//       //                 (doc: any) => doc.specializationName
//       //               ) || []
//       //           )
//       //         )
//       //       ),
//       //     ]
//       //   : [];

//       setResHospitalName(activeHospitals);
//       setAllCities(citiesData);
//       setAllSpecialization(specializations);
//     } catch (error) {
//       console.error('Error fetching hospital data:', error);
//     }
//   };

//   const specializationOptions = Array.isArray(specialization)
//     ? specialization.map((special: any) => ({
//         label: special.specializationName,
//         value: special.id,
//       }))
//     : [];

//   const citiesOptions = Array.isArray(cities)
//     ? cities.map((city: any) => {
//         // console.log(city)
//         return {
//           label: city.name,
//           value: city.id,
//         };
//       })
//     : [];

//   const handleClick = (name: string, url: string, id: string) => {};

//   const handleDoctorSelect = (doctor: any) => {
//     setSelectedDoctor(doctor);
//   };

//   const daysOfWeekOptions = [
//     { value: 'MONDAY', label: 'Monday' },
//     { value: 'TUESDAY', label: 'Tuesday' },
//     { value: 'WEDNESDAY', label: 'Wednesday' },
//     { value: 'THURSDAY', label: 'Thursday' },
//     { value: 'FRIDAY', label: 'Friday' },
//     { value: 'SATURDAY', label: 'Saturday' },
//     { value: 'SUNDAY', label: 'Sunday' },
//   ];

//   return (
//     <div className="w-full mx-auto px-4 py-8">
//       <div className="bg-white rounded-lg shadow-md p-6 mb-8">
//         <h3 className="text-2xl font-bold mb-4">Hospital properties found</h3>
//         <hr className="my-4 border-t-2 border-gray-300" />

//         <div className="flex justify-end items-center gap-6">
//           <FilterDropdown
//             options={hospitalResName?.map((h: any) => ({
//               label: h.name,
//               value: h.id,
//             }))}
//             placeholder="🏥 Select Hospital"
//             onChange={setHospitalName}
//             value={hospitalName}
//           />

//           <FilterDropdown
//             options={daysOfWeekOptions}
//             placeholder="🗓 Select Day"
//             onChange={(selectedOption: any) => setSelectedDay(selectedOption)}
//             value={selectedDay}
//           />

//           <FilterDropdown
//             options={citiesOptions}
//             placeholder="📍 Select Location"
//             onChange={(selectedOption: any) => {
//               setCityName(selectedOption);
//             }}
//             value={cityName}
//           />

//           <FilterDropdown
//             options={specializationOptions}
//             placeholder="🔬 Select Specialization"
//             onChange={(selectedOption: any) => {
//               setSpecializationName(selectedOption);
//             }}
//             value={specializationName}
//           />

//           {/* <button
//             onClick={()=>getHospitalDetails}
//             className="bg-blue-600 text-white px-4 py-2.5 rounded-lg hover:bg-blue-700 transition-colors"
//           >
//             Search
//           </button> */}

//           <button
//             // onClick={getHospitalDetails}
//             className="bg-blue-600 text-white px-8 py-2.5 w-64 rounded-lg flex items-center justify-center gap-2 hover:bg-blue-700 transition-colors"
//           >
//             <Filter className="w-5 h-5" />
//             Filter
//           </button>
//         </div>
//       </div>

//       {hospitals?.filter((hospital: any) => hospital.active).length > 0 ? (
//         hospitals
//           ?.filter((hospital: any) => hospital.active)
//           .map((hospital: any) => (
//             <HospitalImageCard
//               key={hospital.id}
//               item={hospital}
//               onClick={(id: any) => console.log('Hospital clicked:', id)}
//               pathname="/hospital"
//               setSelectedDoctor={handleDoctorSelect}
//               handleClick={handleClick}
//             />
//           ))
//       ) : (
//         <div className="text-center text-gray-500 text-lg">
//           No hospital found.
//         </div>
//       )}
//     </div>
//   );
// };

// export default Index;


'use client';
import React, { useEffect, useState } from 'react';
import { useHospitalStore } from '@/store/hospitalStore';
import FilterDropdown from '@/components/FilterDropdown';
import HospitalImageCard from '@/components/HospitalImageCard';
import { getCities, getHospitalFilterData } from '@/app/home/action';
import { Filter } from 'lucide-react';
import { getAllSpecializations } from '@/api/route';
import { useSpecializationStore } from '@/store/specializationStore';
import { useCityStore } from '@/store/citiesStore';

const Index = () => {
  const [hospitalName, setHospitalName] = useState<any>('');
  const [specializationsResName, setResSpecializations] = useState<any>(undefined);
  const [citiesName, setResCities] = useState<any>(undefined);
  const [selectedDay, setSelectedDay] = useState<any>(null);
  const [cityName, setCityName] = useState<any>('');
  const [specializationName, setSpecializationName] = useState<any>('');
  const [selectedDoctor, setSelectedDoctor] = useState<any>('');
  
  const [hospitals, setAllHospitals,loading] = useHospitalStore((state: any) => [
    state.hospitals,
    state.setAllHospitals,
    state.loading
  ]);

  const [specialization, setAllSpecialization] = useSpecializationStore(
    (state: any) => [state.specialization, state.setAllSpecialization]
  );

  const [cities, setAllCities] = useCityStore((state: any) => [
    state.cities,
    state.setAllCities,
  ]);

  useEffect(() => {
    getResHospitalDetails();
  }, []);

  useEffect(() => {
    getHospitalDetails();
  }, [hospitalName, selectedDay, cityName, specializationName]);

  const getHospitalDetails = async () => {
    try {
      const searchTextData = await getHospitalFilterData({
        pageSize: 10,
        pageCount: 1,
        searchTerm: undefined,
        cityId: cityName.value,
        hospitalId: hospitalName.value,
        specializationId: specializationName.value,
        day: selectedDay,
      });

      const activeHospitals = searchTextData?.records?.filter(
        (hospital: any) => hospital.active
      );
      setAllHospitals(activeHospitals);
    } catch (error) {
      console.error('Error fetching hospital data:', error);
    }
  };

  const getResHospitalDetails = async () => {
    try {
      const searchTextData = await getHospitalFilterData({
        pageSize: 10,
        pageCount: 1,
      });
      const activeHospitals = searchTextData?.records?.filter(
        (hospital: any) => hospital.active
      );
      const citiesData = await getCities();
      const specializations = await getAllSpecializations();

      setAllCities(citiesData);
      setAllSpecialization(specializations);
      setAllHospitals(activeHospitals); // Set only active hospitals here
    } catch (error) {
      console.error('Error fetching hospital data:', error);
    }
  };

  const specializationOptions = Array.isArray(specialization)
    ? specialization.map((special: any) => ({
        label: special.specializationName,
        value: special.id,
      }))
    : [];

  const citiesOptions = Array.isArray(cities)
    ? cities.map((city: any) => ({
        label: city.name,
        value: city.id,
      }))
    : [];

  const handleDoctorSelect = (doctor: any) => {
    setSelectedDoctor(doctor);
  };

  const daysOfWeekOptions = [
    { value: 'MONDAY', label: 'Monday' },
    { value: 'TUESDAY', label: 'Tuesday' },
    { value: 'WEDNESDAY', label: 'Wednesday' },
    { value: 'THURSDAY', label: 'Thursday' },
    { value: 'FRIDAY', label: 'Friday' },
    { value: 'SATURDAY', label: 'Saturday' },
    { value: 'SUNDAY', label: 'Sunday' },
  ];

  if (loading) {
    <div>Loading...!</div>;
  }
  return (
    <div className="w-full mx-auto px-4 py-8">
      <div className="bg-white rounded-lg shadow-md p-6 mb-8">
        <h3 className="text-2xl font-bold mb-4">Hospital properties found</h3>
        <hr className="my-4 border-t-2 border-gray-300" />

        <div className="flex justify-end items-center gap-6">
          <FilterDropdown
            options={hospitals?.map((h: any) => ({
              label: h.name,
              value: h.id,
            }))}
            placeholder="🏥 Select Hospital"
            onChange={setHospitalName}
            value={hospitalName}
          />

          <FilterDropdown
            options={daysOfWeekOptions}
            placeholder="🗓 Select Day"
            onChange={(selectedOption: any) => setSelectedDay(selectedOption)}
            value={selectedDay}
          />

          <FilterDropdown
            options={citiesOptions}
            placeholder="📍 Select Location"
            onChange={(selectedOption: any) => setCityName(selectedOption)}
            value={cityName}
          />

          <FilterDropdown
            options={specializationOptions}
            placeholder="🔬 Select Specialization"
            onChange={(selectedOption: any) => setSpecializationName(selectedOption)}
            value={specializationName}
          />

          <button
            className="bg-blue-600 text-white px-8 py-2.5 w-64 rounded-lg flex items-center justify-center gap-2 hover:bg-blue-700 transition-colors"
          >
            <Filter className="w-5 h-5" />
            Filter
          </button>
        </div>
      </div>

      {hospitals?.length > 0 ? (
        hospitals.map((hospital: any) => (
          <HospitalImageCard
            key={hospital.id}
            item={hospital}
            onClick={(id: any) => console.log('Hospital clicked:', id)}
            pathname="/hospital"
            setSelectedDoctor={handleDoctorSelect}
            handleClick={handleDoctorSelect}
          />
        ))
      ) : (
        <div className="text-center text-gray-500 text-lg">
          No hospital found.
        </div>
      )}
    </div>
  );
};

export default Index;
