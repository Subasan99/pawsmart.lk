'use client';

import DoctorAppointments from '@/components/AdminPanelComponents/DoctorComponents/DoctorAppointments';
import DoctorTimeSlots from '@/components/AdminPanelComponents/DoctorComponents/DoctorTimeSlots';
import EditIcon from '@/components/svg/edit_icon';
import GenderIcon from '@/components/svg/gender-icon';
import { Separator } from '@/components/ui/separator';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useDoctorStore } from '@/store/doctorStore';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import DefaultImage from '../../../../../public/default_user.png';
import {
  getAppointmentsByDoctorId,
  getDoctorById,
  updateTimeSlot,
} from './action';
import { Edit, Mail, Phone, User, XIcon } from 'lucide-react';
import PetCard from '@/components/AdminPanelComponents/DoctorComponents/PetCard';
import DoctorPets from '@/components/AdminPanelComponents/DoctorComponents/DoctorPets';
import { useRouter } from 'next/navigation';

const Index = ({ params }: { params: { id: string } }) => {
  const router = useRouter();

  const [
    selectedDoctor,
    setSelectedDoctor,
    loading,
    doctorAppointments,
    setDoctorAppointments,
  ] = useDoctorStore((state: any) => [
    state.selectedDoctor,
    state.setSelectedDoctor,
    state.loading,
    state.doctorAppointments,
    state.setDoctorAppointments,
  ]);

  const [dayTimeSlotModal, setDayTimeSlotModal] = useState<boolean>(false);

  async function handleSelectDoctor() {
    const data = await getDoctorById(params.id);
    const appointments = await getAppointmentsByDoctorId(params.id, 1, 10);
    setDoctorAppointments(appointments);
    setSelectedDoctor(data);
  }

  console.log('PetCardPetCardPetCardPetCard', selectedDoctor.petResponses);

  useEffect(() => {
    handleSelectDoctor();
  }, [params.id]);

  if (loading) {
    <div>Loading...!</div>;
  }
  const handleClose = () => {
    router.back();
  };

  return (
    <div className="flex flex-col px-3 bg-white py-5 h-full w-full rounded-lg">
      {/* <div className="flex relative">
        <EditIcon className="absolute top-0 right-0 cursor-pointer" />
        <div className="relative">
          <EditIcon className="absolute top-5 right-5 z-10 cursor-pointer" />
          {selectedDoctor?.preSignedUrl ? (
            <Image
              src={selectedDoctor?.preSignedUrl}
              alt="Doctor Image"
              width={200}
              height={200}
              className="rounded-full border-4 object-cover h-[200px] w-[200px]"
            />
          ) : (
            <Image
              src={DefaultImage}
              className="rounded-full border-4"
              alt="default_img"
              height={200}
              width={200}
            />
          )}
        </div>
        <div className="grow flex flex-col gap-2 px-3 py-2">
          <div className="font-bold text-2xl flex gap-2 items-center">
            {selectedDoctor?.name}
            <GenderIcon gender={selectedDoctor?.gender} className="w-6 h-6" />
          </div>
          <div>
            <div className="font-semibold mb-1">
              {selectedDoctor?.specializationName}
            </div>
            <div className="font-semibold mb-2">
              {selectedDoctor?.departmentName}
            </div>
          </div>

          <div className="font-semibold text-xl">{selectedDoctor?.email}</div>
          <div className="font-semibold text-xl">{selectedDoctor?.phoneNo}</div>
          <div className="font-semibold text-xl">
            &quot;{selectedDoctor?.description}&quot;
          </div>
        </div>
      </div> */}

      <div className="bg-white rounded-lg shadow-sm">
        <button
          type="button"
          onClick={handleClose}
          className="absolute top-24 right-10 text-gray-500 hover:text-gray-700"
        >
          <XIcon className="h-5 w-5" />
        </button>
        <div className="p-6 border-b">
          <div className="flex items-start gap-6">
            {/* Profile Image */}
            <div className="relative">
              {selectedDoctor?.preSignedUrl ? (
                <Image
                  src={selectedDoctor.preSignedUrl}
                  alt="Doctor Profile"
                  width={96}
                  height={96}
                  className="w-24 h-24 rounded-full object-cover bg-gray-100"
                />
              ) : (
                <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center">
                  <User className="w-16 h-16 text-gray-400" />
                </div>
              )}
              <EditIcon className="absolute top-0 right-0 cursor-pointer" />
            </div>
            <div className="flex-1">
              <div className="flex items-center justify-between">
                <div>
                  <h1 className="text-2xl font-bold flex items-center gap-2">
                    {selectedDoctor?.name}
                    {selectedDoctor?.gender && (
                      <span className="px-2 py-1 text-sm bg-blue-100 text-blue-800 rounded-full">
                        {selectedDoctor.gender === 'female' ? 'Female' : 'Male'}
                      </span>
                    )}
                  </h1>
                  <div className="space-y-0">
                    <p className="text-lg text-gray-600">
                      {selectedDoctor?.specializationName}
                    </p>
                    <p className="text-lg text-gray-600">
                      {selectedDoctor?.departmentName}
                    </p>
                  </div>
                </div>
                <button className="px-4 py-2 border rounded-md hover:bg-gray-50 flex items-center gap-2">
                  <Edit size={16} />
                  Edit Profile
                </button>
              </div>
              <div className="mt-2 flex gap-6">
                <div className="flex items-center gap-2">
                  <Mail className="w-4 h-4 text-gray-500" />
                  <span>{selectedDoctor?.email}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Phone className="w-4 h-4 text-gray-500" />
                  <span>{selectedDoctor?.phoneNo}</span>
                </div>
              </div>
              {selectedDoctor?.description && (
                <div className="mt-2">
                  {/* <p className="text-gray-700">&quot;{selectedDoctor.description}&quot;</p> */}
                  <p className="text-gray-700">{selectedDoctor.description}</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      <Separator />
      <Tabs defaultValue="appointments" className="w-full py-2">
        <TabsList>
          <TabsTrigger value="appointments">Appointments</TabsTrigger>
          <TabsTrigger value="timeslot">Time Slots & Duration</TabsTrigger>
          <TabsTrigger value="pets">Pets</TabsTrigger>
        </TabsList>
        <TabsContent value="appointments">
          <DoctorAppointments appointments={doctorAppointments} />
        </TabsContent>
        <TabsContent value="timeslot">
          <DoctorTimeSlots
            modal={dayTimeSlotModal}
            setModal={setDayTimeSlotModal}
            doctorId={params.id}
            duration={selectedDoctor?.duration}
            dayTimeSlotReponse={selectedDoctor?.dayTimeSlotResponses}
            allocateTimeSlot={updateTimeSlot}
          />
        </TabsContent>
        <TabsContent value="pets">
          <DoctorPets petResponse={selectedDoctor.petResponses} />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Index;
