"use client";

import { useEffect } from "react";
import { getAppointmentsByDoctorId, getDoctorById } from "./action";
import { useDoctorStore } from "@/store/doctorStore";
import Image from "next/image";
import DefaultImage from "../../../../../public/default_user.png";
import EditIcon from "@/components/svg/edit_icon";
import GenderIcon from "@/components/svg/gender-icon";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import DoctorAppointments from "@/components/AdminPanelComponents/DoctorComponents/DoctorAppointments";
import DoctorTimeSlots from "@/components/AdminPanelComponents/DoctorComponents/DOctorTimeSlots";

const Index = ({ params }: { params: { id: string } }) => {
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

  async function handleSelectDoctor() {
    const data = await getDoctorById(params.id);
    const appointments = await getAppointmentsByDoctorId(params.id, 1, 10);
    setSelectedDoctor(data);
  }

  useEffect(() => {
    handleSelectDoctor();
  }, [params.id]);

  if (loading) {
    <div>Loading...!</div>;
  }

  return (
    <div className="flex flex-col px-3 bg-white py-5 h-full w-full rounded-lg">
      <div className="flex relative">
        <EditIcon className="absolute top-0 right-0 cursor-pointer" />
        <div className="relative">
          <EditIcon className="absolute top-5 right-5 z-10 cursor-pointer" />
          {selectedDoctor?.preSignedUrl ? (
            <Image
              src={selectedDoctor?.preSignedUrl}
              alt="Doctor Image"
              width={200}
              height={200}
              className="rounded-full border-4"
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
            {selectedDoctor?.firstName} {selectedDoctor?.lastName}{" "}
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
          <DoctorTimeSlots/>
        </TabsContent>
        <TabsContent value="pets">Change your password here.</TabsContent>
      </Tabs>
    </div>
  );
};

export default Index;
