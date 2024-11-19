'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import { Separator } from '@/components/ui/separator';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import DefaultImage from '../../../../../public/default_user.png';
import { Edit, Mail, Phone, XIcon } from 'lucide-react';
import { getHospitalById, updateHospitalImage } from './action';
import { useRouter } from 'next/navigation';
import HospitalDepartmentDoctorCreate from '@/components/AdminPanelComponents/HospitalComponents/HospitalDepartmentDoctorCreate';
import { useDepartmentStore } from '@/store/departmentStore';
import { getDepartmentData } from '../../departments/action';
import { getDoctorData } from '../../doctors/action';
import { useDoctorStore } from '@/store/doctorStore';
import { useAdminStore } from '@/store/adminStore';

const HospitalDetails = ({ params }: { params: { id: any } }) => {
  const [hospital, setHospital] = useState<any>(null);
  const router = useRouter();
  const [image, setImage] = useState<File | null>(null);
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [departments, setAllDepartments] = useDepartmentStore((state: any) => [
    state.departments,
    state.setAllDepartments,
  ]);

  const [selectedDepartmentId, setSelectedDepartmentId] = useState<any | null>(
    null
  );

  const [doctors, setAllDoctors] = useAdminStore((state: any) => [
    state.doctors,
    state.setAllDoctors,
    state.loading,
  ]);
  console.log('selectedDepartmentIdselectedDepartmentId', selectedDepartmentId);

  async function fetchData() {
    const data = await getHospitalById(params.id);
    const departmentData = await getDepartmentData();
    const doctor = await getDoctorData(
      1,
      10,
      undefined,
      selectedDepartmentId,
      undefined
    );

    setAllDepartments(departmentData);
    setAllDoctors(doctor?.records);

    setHospital(data);
  }

  useEffect(() => {
    fetchData();
  }, []);

  if (!hospital) {
    return <div>Loading...</div>;
  }

  const handleClose = () => {
    router.back();
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImage(file);
      setImageUrl(URL.createObjectURL(file));
    }
  };

  const uploadImage = async () => {
    if (!image) return;
    setLoading(true);
    console.log('params.id, imageparams.id, image', image);
    try {
      const updatedImageUrl = await updateHospitalImage(params.id, image);
      console.log(updatedImageUrl);
      setHospital((prev: any) => ({ ...prev, preSignedUrl: updatedImageUrl }));
      setImage(null);
      setImageUrl(null);
      alert('Image updated successfully!');
    } catch (error) {
      alert('An error occurred while updating the image.');
    } finally {
      setLoading(false);
    }
  };

  const handleDepartmentSelect = (departmentId: number) => {
    setSelectedDepartmentId(departmentId);
    console.log('Selected Department ID:', departmentId);
  };
  return (
    <div className="flex flex-col px-6 py-6 mr-6 bg-white shadow-md rounded-lg">
      <div className="flex items-start gap-6 border-b pb-4">
        <button
          type="button"
          onClick={handleClose}
          className="absolute top-28 right-10 text-gray-500 hover:text-gray-700"
        >
          <XIcon className="h-5 w-5" />
        </button>
        <div className="relative">
          {imageUrl ? (
            <Image
              src={imageUrl}
              alt="Preview Image"
              width={120}
              height={120}
              className="w-32 h-32 rounded-lg object-cover bg-gray-100"
            />
          ) : hospital.preSignedUrl ? (
            <Image
              src={hospital.preSignedUrl}
              alt="Hospital Image"
              width={120}
              height={120}
              className="w-32 h-32 rounded-lg object-cover bg-gray-100"
            />
          ) : (
            <div className="w-32 h-32 bg-gray-100 rounded-lg flex items-center justify-center">
              <span className="text-gray-400 text-xl">No Image</span>
            </div>
          )}

          <button
            type="button"
            onClick={() => document.getElementById('image-upload')?.click()}
            className="absolute bottom-2 right-2 p-1 bg-gray-100 rounded-full hover:bg-gray-200"
          >
            <Edit className="w-5 h-5 text-gray-500" />
          </button>

          <input
            id="image-upload"
            type="file"
            accept="image/*"
            className="hidden"
            onChange={handleImageChange}
          />

          {image && (
            <button
              type="button"
              onClick={uploadImage}
              disabled={loading}
              className={`mt-2 px-4 py-2 text-xs rounded-md ${
                loading ? 'bg-gray-300' : 'bg-blue-500 text-white'
              }`}
            >
              {loading ? 'Uploading...' : 'Upload Image'}
            </button>
          )}
        </div>

        <div className="flex-1">
          <h1 className="text-xl font-bold">{hospital.name}</h1>
          <p className="text-gray-600 text-xs">{hospital.description}</p>

          <div className="mt-2">
            <span
              className={`px-3 py-1 text-xs rounded-full ${
                hospital.active
                  ? 'bg-green-100 text-green-800'
                  : 'bg-red-100 text-red-800'
              }`}
            >
              {hospital.active ? 'Active' : 'Inactive'}
            </span>
          </div>

          <div className="mt-2 flex gap-4">
            <div className="flex items-center gap-2">
              <Phone className="w-4 h-4 text-gray-500 text-xs" />
              <span>{hospital.phoneNumber}</span>
            </div>
            <div className="flex items-center gap-2">
              <Mail className="w-4 h-4 text-gray-500" />
              <span className="text-xs">{hospital.email}</span>
            </div>
          </div>

          <div className="mt-2 text-gray-700">
            <p className="text-xs">
              <strong className="text-xs">Address:</strong> {hospital.address},{' '}
              {hospital.city}, {hospital.district}, {hospital.province}
            </p>
            <p className="text-xs">
              <strong className="text-xs">Website:</strong>{' '}
              <a href={hospital.website} className="text-blue-500">
                {hospital.website}
              </a>
            </p>
            <p className="text-xs">
              <strong className="text-xs">Operating Hours:</strong>{' '}
              {hospital.openTime} - {hospital.closeTime}
            </p>
          </div>
        </div>
      </div>

      <Separator className="my-6" />

      <Tabs defaultValue="departments" className="w-full">
        <TabsList>
          <TabsTrigger value="departments">Departments</TabsTrigger>
          <TabsTrigger value="doctors">Doctors</TabsTrigger>
          <TabsTrigger value="medicines">Medicines</TabsTrigger>

          <TabsTrigger value="docdepart">Add To Department Doctor</TabsTrigger>
        </TabsList>
        <TabsContent value="departments">
          {hospital.doctorDepartmentResponses.map((dept: any) => (
            <div
              key={dept.departmentResponse.id}
              className="mb-6 border-b pb-4 flex items-start gap-4"
            >
              {/* Image Section */}
              <div className="relative w-20 h-20 flex-shrink-0">
                {dept.departmentResponse.preSignedUrl ? (
                  <Image
                    src={dept.departmentResponse.preSignedUrl}
                    alt={dept.departmentResponse.name}
                    width={80}
                    height={80}
                    className="w-20 h-20 rounded-lg object-cover bg-gray-100"
                  />
                ) : (
                  <div className="w-20 h-20 bg-gray-100 rounded-lg flex items-center justify-center">
                    <span className="text-gray-400 text-sm">No Image</span>
                  </div>
                )}
              </div>

              {/* Text Content Section */}
              <div className="flex-1">
                <h2 className="text-xs font-semibold text-gray-800">
                  {dept.departmentResponse.name}
                </h2>
                <p className="text-xs text-gray-600">
                  {dept.departmentResponse.description}
                </p>

                <div className="mt-2">
                  <span
                    className={`px-3 py-1 text-xs rounded-full ${
                      dept.departmentResponse.active
                        ? 'bg-green-100 text-green-800'
                        : 'bg-red-100 text-red-800'
                    }`}
                  >
                    {dept.departmentResponse.active ? 'Active' : 'Inactive'}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </TabsContent>

        <TabsContent value="doctors">
          {hospital.doctorDepartmentResponses.map((dept: any) => (
            <div key={dept.departmentResponse.id} className="mb-6">
              <h2 className="text-xs font-semibold text-gray-800">
                Department : {dept.departmentResponse.name}
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                {dept.doctorResponses.map((doctor: any) => (
                  <div
                    key={doctor.id}
                    className="p-4 border rounded-lg flex items-start gap-4"
                  >
                    <div className="relative w-20 h-20">
                      {doctor.preSignedUrl ? (
                        <Image
                          src={doctor.preSignedUrl}
                          alt={doctor.name}
                          width={80}
                          height={80}
                          className="w-20 h-20 rounded-lg object-cover bg-gray-100"
                        />
                      ) : (
                        <div className="w-20 h-20 bg-gray-100 rounded-lg flex items-center justify-center">
                          <span className="text-gray-400 text-sm">
                            No Image
                          </span>
                        </div>
                      )}
                    </div>

                    <div className="flex-1">
                      <h3 className="text-xs font-bold flex items-center gap-2">
                        {doctor.name}
                        {/* Active Status Badge */}
                        <span
                          className={`px-2 py-1 text-xs rounded-full ${
                            doctor.isActive
                              ? 'bg-green-100 text-green-800'
                              : 'bg-red-100 text-red-800'
                          }`}
                        >
                          {doctor.isActive ? 'Active' : 'Inactive'}
                        </span>
                      </h3>
                      <p className="text-xs">
                        <span
                          className={`inline-block px-2 py-1 rounded-md ${
                            doctor.specializationName
                              ? 'bg-purple-300 text-blue-800'
                              : 'bg-gray-100 text-gray-600'
                          }`}
                        >
                          {doctor.specializationName || 'No Specialization'}
                        </span>
                      </p>

                      <p className="text-gray-600 text-xs ">
                        {doctor.description}
                      </p>
                      <div className="mt-2 flex gap-2">
                        <span className="text-gray-600 text-xs">
                          Email: {doctor.email}
                        </span>
                        <span className="text-gray-600 text-xs">
                          Phone: {doctor.phoneNo}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </TabsContent>
        <TabsContent value="medicines">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {hospital.medicineResponses.map((medicine: any) => (
              <div
                key={medicine.id}
                className="p-4 border rounded-lg flex items-start gap-4"
              >
                <div className="relative w-20 h-20">
                  {medicine.preSignedUrl ? (
                    <Image
                      src={medicine.preSignedUrl}
                      alt={medicine.name}
                      width={80}
                      height={80}
                      className="w-20 h-20 rounded-lg object-cover bg-gray-100"
                    />
                  ) : (
                    <div className="w-20 h-20 bg-gray-100 rounded-lg flex items-center justify-center">
                      <span className="text-gray-400 text-sm">No Image</span>
                    </div>
                  )}
                </div>
                <div>
                  <h3 className="text-sm font-bold">{medicine.name}</h3>
                  <p className="text-xs text-gray-600">
                    {medicine.description}
                  </p>
                  <p className="text-xs text-gray-700">
                    <strong>Duration:</strong> {medicine.duration} minutes
                  </p>
                  <span
                    className={`inline-block px-3 py-1 mt-2 text-xs rounded-full ${
                      medicine.active
                        ? 'bg-green-100 text-green-800'
                        : 'bg-red-100 text-red-800'
                    }`}
                  >
                    {medicine.active ? 'Active' : 'Inactive'}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="docdepart">
          <HospitalDepartmentDoctorCreate
            setOpen={function (open: boolean): void {
              throw new Error('Function not implemented.');
            }}
            reloadTable={fetchData}
            department={departments}
            doctor={doctors}
            id={params?.id}
            onDepartmentSelect={handleDepartmentSelect}
          />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default HospitalDetails;
