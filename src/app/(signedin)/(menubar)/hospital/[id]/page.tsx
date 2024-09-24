"use client";
import React, { useEffect, useState } from "react";
import { useDoctorStore } from "@/store/doctorStore";
import { getByIdHospital } from "@/app/home/action";
import MultipleImagesProps from "@/components/SinglePageImage";
import Header from "@/components/Header";
import { useHospitalStore } from "@/store/hospitalStore";
import PopularDoctors from "@/components/Image";
import { useRouter } from "next/navigation";
import { Phone } from "lucide-react";

const Index = ({ params }: { params: { id: string } }) => {
  const [hospital, setHospital] = useState<any>(null);
  const [doctors, setDoctors] = useState<any[]>([]);
  const [deparments, setDeparment] = useState<any[]>([]);
  const [medicines, setMedicines] = useState<any[]>([]);
  const [showDoctors, setShowDoctors] = useState(true);
  const [showMedicines, setShowMedicines] = useState(true);
  const [showDepartments, setShowDeparments] = useState(true);
  useEffect(() => {
    getByHospitalDetails();
  }, [params?.id]);

  const getByHospitalDetails = async () => {
    try {
      const getByHospital = await getByIdHospital(params?.id);

      console.log(
        'getByHospitalgetByHospitalgetByHospitalgetByHospital',
        getByHospital
      );
      const deparmentList: any[] = [];

      getByHospital?.doctorDepartmentResponses?.forEach((department: any) => {
        const departmentResponse = department.departmentResponse;
        if (departmentResponse) {
          deparmentList.push(departmentResponse);
        }
      });

      const doctorList: any[] = [];
      await getByHospital?.doctorDepartmentResponses?.forEach(
        (department: any) => {
          department.doctorResponses.forEach((doctor: any) => {
            doctorList.push(doctor);
          });
        }
      );

      const medicineList: any[] = [];
      await getByHospital?.medicineResponses?.forEach((medicine: any) => {
        medicineList.push(medicine);
      });
      setHospital(getByHospital);
      setDeparment(deparmentList);
      setDoctors(doctorList);
      setMedicines(medicineList);
    } catch (error) {
      console.error(error);
    }
  };

  const handleViewDoctors = () => {
    setShowDoctors(true);
  };

  const handleViewMedicines = () => {
    setShowMedicines(true);
  };

  const handleViewDepartments = () => {
    setShowDeparments(true);
  };

  const defaultImage = '/hello.png';
  const [activeTab, setActiveTab] = useState('doctors');

  const handleTabClick = (tab: any) => {
    setActiveTab(tab);
  };

  return (
    <div id="hospitals" className="pb-8 pt-20">
      <div className="sticky z-30 top-0 md:static h-fit">
        <Header />
      </div>
      <div>
        <section className="flex flex-col items-center py-12 z-5 w-full px-4 pb-8 max-w-6xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-start w-full">
            <div className="relative m-2 flex-1 flex flex-col items-center">
              <img
                src={defaultImage}
                alt="Hospital Building"
                className="w-full h-96 rounded-md transform rotate-[-15deg] object-cover"
              />
              <div
                className="absolute top-1 right-0 hover:bg-red-600 bg-blue-900 h-16 w-36 text-white p-3 rounded-md shadow-lg transform translate-x-1/5 border-r-2 border-red-500"
                style={{ cursor: 'pointer' }}
              >
                <p className="text-sm text-center">STUBBY !</p>
                <p className="text-lg font-bold text-center flex items-center justify-center">
                  Call Me...
                  <Phone />
                </p>
              </div>
            </div>
            <div className="m-1 flex-1 text-center">
              <h1 className="text-3xl md:text-4xl font-bold leading-snug">
                Easily locate the nearest
                <span className="text-red-500"> {hospital?.name}</span>
              </h1>
              <p className="mt-4 text-gray-600">
                Hospital and access healthcare services in your area.
                <br />
                Book an appointment with our expert doctors
                <br />
                and explore Medifin for convenient medical solutions—all from
                the comfort of your home.
              </p>
              <p className="mt-4 text-gray-600">{hospital?.description}</p>
              <p className="mt-4 text-gray-600">
                Location: {hospital?.city}, {hospital?.district},{' '}
                {hospital?.province}
              </p>
            </div>
          </div>
        </section>
      </div>

      <div className="mt-8">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="flex space-x-4 mt-8">
            <button
              className={`px-4 py-2 rounded-md border-l-8 border-red-500 pl-2 ${
                activeTab === 'doctors'
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-200'
              }`}
              onClick={() => handleTabClick('doctors')}
            >
              <h2 className="font-bold text-sm md:text-base">
                Find the Doctors
              </h2>
              <p className="text-xs md:text-sm border-l-2 border-white-500 mb-2">
                and Book
              </p>
            </button>
            <button
              className={`px-4 py-2 rounded-md border-l-8 border-red-500 pl-2 ${
                activeTab === 'medicines'
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-200'
              }`}
              onClick={() => handleTabClick('medicines')}
            >
              <h2 className="font-bold text-sm md:text-base">
                {' '}
                Find the Medicines
              </h2>
              <p className="text-xs md:text-sm border-l-2 border-white-500 mb-2">
                and Book
              </p>
            </button>
            <button
              className={`px-4 py-2 rounded-md border-l-8 border-red-500 pl-2 ${
                activeTab === 'departments'
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-200'
              }`}
              onClick={() => handleTabClick('departments')}
            >
              <h2 className="font-bold text-sm md:text-base">
                Find the Departments
              </h2>
              <p className="text-xs md:text-sm border-l-2 border-white-500 mb-2">
                and Book
              </p>
            </button>
            <button
              className={`px-4 py-2 rounded-md border-l-8 border-red-500 pl-2 ${
                activeTab === 'reviews'
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-200'
              }`}
              onClick={() => handleTabClick('reviews')}
            >
              <h2 className="font-bold text-sm md:text-base"> Reviews</h2>
            </button>
          </div>

          {activeTab === 'doctors' && (
            <button
            className="bg-blue-700 text-white px-4 py-2 w-44 rounded-md hover:bg-blue-700 shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 mt-4 md:mt-0"
            onClick={handleViewDoctors}
            >
              View Doctors
            </button>
          )}

          {activeTab === 'medicines' && (
            <button
            className="bg-blue-700 text-white px-4 py-2 w-44 rounded-md hover:bg-blue-700 shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 mt-4 md:mt-0"
            onClick={handleViewMedicines}
            >
              View Medicines
            </button>
          )}

          {activeTab === 'departments' && (
            <button
              className="bg-blue-700 text-white px-4  py-2 w-44 rounded-md hover:bg-blue-700 shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 mt-4 md:mt-0"
              onClick={handleViewDepartments}
            >
              View Departments
            </button>
          )}

          {activeTab === 'reviews' && (
            <button
            className="bg-blue-700 text-white px-4 py-2 w-44 rounded-md hover:bg-blue-700 shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 mt-4 md:mt-0"
            onClick={handleViewDoctors}
            >
              View Reviews
            </button>
          )}
        </div>

        {activeTab === 'doctors' && (
          <div className="w-full mt-4">
            {showDoctors && (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-4">
                {doctors.length > 0 ? (
                  doctors.map((doctor, index) => (
                    <div
                      key={index}
                      className="m-2 hover:bg-white shadow-lg bg-slate-100 relative"
                      style={{
                        border: '1px solid #ddd',
                        padding: '20px',
                        borderRadius: '8px',
                        cursor: 'pointer',
                      }}
                    >
                      <div className="flex">
                        <div className="flex-grow pl-4">
                          <h1 className="text-xl font-bold leading-snug">
                            {doctor.name}
                          </h1>
                          <p className="mt-1 text-sm text-gray-500">
                            Gender: {doctor.gender}
                          </p>
                          <p className="mt-1 text-sm text-gray-500">
                            Qualification: {doctor.qualification}
                          </p>
                          <p className="mt-1 text-sm text-gray-500">
                            Specialization: {doctor.specializationName}
                          </p>
                          <p className="text-sm text-gray-500">
                            Duration: {doctor.duration} mins
                          </p>
                        </div>
                        <div className="flex-none mt-4">
                          <img
                            src={defaultImage}
                            alt="Doctor"
                            className="w-28 h-28 rounded-md"
                          />
                          <button className="bg-blue-600 text-white px-6 py-2 mt-2 rounded-md hover:bg-blue-700 shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
                            Book Now
                          </button>
                        </div>
                      </div>
                      <div>
                        <p className="mt-2 text-sm text-gray-500">
                          Description: {doctor.description}
                        </p>
                      </div>
                    </div>
                  ))
                ) : (
                  <p className="m-10 text-center justify-center text-xl align-middle text-gray-600">
                    No doctors available
                  </p>
                )}
              </div>
            )}
          </div>
        )}

        {/* Medicines Section */}
        {activeTab === 'medicines' && (
          <div className="mt-8">
            {showMedicines && (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
                {medicines.length > 0 ? (
                  medicines.map((medicine, index) => (
                    <div
                      key={index}
                      className="m-2 hover:bg-white shadow-lg bg-slate-100 relative"
                      style={{
                        border: '1px solid #ddd',
                        padding: '20px',
                        borderRadius: '8px',
                        cursor: 'pointer',
                      }}
                    >
                      <div className="flex-none text-center">
                        <img
                          src={defaultImage}
                          alt="Medicine"
                          className="w-28 h-28 rounded-md mx-auto"
                        />
                      </div>
                      <div className="text-center mt-4">
                        <h1 className="text-xl font-bold leading-snug">
                          {medicine.name}
                        </h1>
                        <p className="mt-2 text-gray-600">
                          Description: {medicine.description}
                        </p>
                      </div>
                      <button className="absolute bottom-1 right-1 bg-blue-600 text-white px-4 py-1 rounded-md hover:bg-blue-700 shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
                        Book Now
                      </button>
                    </div>
                  ))
                ) : (
                  <p className="m-10 text-center justify-center text-xl align-middle text-gray-600">
                    No medicines
                  </p>
                )}
              </div>
            )}
          </div>
        )}

        {activeTab === 'departments' && (
          <div className="w-full mt-4">
            {showDepartments && (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-4">
                {deparments.length > 0 ? (
                  deparments.map((deparment, index) => (
                    <div
                      key={index}
                      className="m-2 hover:bg-white shadow-lg bg-slate-100 relative"
                      style={{
                        border: '1px solid #ddd',
                        padding: '20px',
                        borderRadius: '8px',
                        cursor: 'pointer',
                      }}
                    >
                      <div className="flex-none text-center">
                        <img
                          src={defaultImage}
                          alt="Medicine"
                          className="w-28 h-28 rounded-md mx-auto"
                        />
                      </div>
                      <div className="text-center mt-4">
                        <h1 className="text-xl font-bold leading-snug">
                          {deparment.name}
                        </h1>
                        <p className="mt-2 text-gray-600">
                          Description: {deparment.description}
                        </p>
                      </div>
                    </div>
                  ))
                ) : (
                  <p className="m-10 text-center justify-center text-xl align-middle text-gray-600">
                    No deparments
                  </p>
                )}
              </div>
            )}
          </div>
        )}

        {activeTab === 'reviews' && (
          <div className="mt-8">
            <h2 className="font-bold text-2xl">Reviews</h2>
          </div>
        )}
      </div>
    </div>
  );
};

export default Index;
