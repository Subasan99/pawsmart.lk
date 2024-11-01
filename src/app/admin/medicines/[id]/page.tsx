"use client";

import MedicineAppointments from "@/components/AdminPanelComponents/MedicineComponents/MedicineAppointments";
import MedicineTimeSlots from "@/components/AdminPanelComponents/MedicineComponents/MedicineTimeSlots";
import EditIcon from "@/components/svg/edit_icon";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useMedicineStore } from "@/store/medicinesStore";
import Image from "next/image";
import { useEffect, useState, useCallback } from "react";
import DefaultImage from "../../../../../public/default_user.png";
import { getAppointmentsByMedicineId, getMedicineById, updateMedicineTimeSlot } from "../action";

const Index = ({ params }: { params: { id: string } }) => {
  const [
    selectedMedicine,
    setSelectedMedicine,
    loading,
    medicineAppointments,
    setMedicineAppointments,
  ] = useMedicineStore((state: any) => [
    state.selectedMedicine,
    state.setSelectedMedicine,
    state.loading,
    state.medicineAppointments,
    state.setMedicineAppointments,
  ]);

  const [medicineDayTimeSlotModal, setMedicineDayTimeSlotModal] = useState<boolean>(false);

  // Memoized handleSelectMedicine function
  const handleSelectMedicine = useCallback(async () => {
    const data = await getMedicineById(params.id);
    const appointments = await getAppointmentsByMedicineId(params.id, 1, 10);
    setSelectedMedicine(data);
    setMedicineAppointments(appointments); // Ensure you're also setting appointments
  }, [params.id, setSelectedMedicine, setMedicineAppointments]); // Add dependencies

  useEffect(() => {
    handleSelectMedicine();
  }, [params.id]);

  if (loading) {
    return <div>Loading...!</div>; // Make sure to return the loading state
  }

  return (
    <div className="flex flex-col px-3 bg-white py-5 h-full w-full rounded-lg">
      <div className="flex relative">
        <EditIcon className="absolute top-0 right-0 cursor-pointer" />
        <div className="relative">
          <EditIcon className="absolute top-5 right-5 z-10 cursor-pointer" />
          {selectedMedicine?.preSignedUrl ? (
            <Image
              src={selectedMedicine?.preSignedUrl}
              alt="Medicine Image"
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
            {selectedMedicine?.name}
          </div>
          <div className="font-semibold text-xl">
            &quot;{selectedMedicine?.description}&quot;
          </div>
        </div>
      </div>
      <Separator />
      <Tabs defaultValue="appointments" className="w-full py-2">
        <TabsList>
          <TabsTrigger value="appointments">Appointments</TabsTrigger>
          <TabsTrigger value="timeslot">Time Slots & Duration</TabsTrigger>
        </TabsList>
        <TabsContent value="appointments">
          <MedicineAppointments appointments={medicineAppointments} />
        </TabsContent>
        <TabsContent value="timeslot">
          <MedicineTimeSlots
            modal={medicineDayTimeSlotModal}
            setModal={setMedicineDayTimeSlotModal}
            medicineId={params.id}
            duration={selectedMedicine?.duration}
            medicineDayTimeSlotReponse={selectedMedicine?.dayTimeSlotResponses}
            medicineAllocateTimeSlot={updateMedicineTimeSlot}
          />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Index;
