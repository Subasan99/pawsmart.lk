"use client";
import { useEffect } from "react";
import { columns } from "./columns";
import { DataTable } from "../../../components/AdminPanelComponents/data-table";
import { getDoctorData } from "./action";
import { useAdminStore } from "@/store/adminStore";
import DoctorCreate from "@/components/AdminPanelComponents/DoctorComponents/DoctorCreate";
import { useSpecializationStore } from "@/store/specializationStore";
import { getAllPets, getAllSpecializations } from "@/api/route";
import { usePetStore } from "@/store/petStore";

export default function DemoPage() {
  const [doctors, setAllDoctors] = useAdminStore((state: any) => [
    state.doctors,
    state.setAllDoctors,
  ]);
  const [specialization, setAllSpecialization] = useSpecializationStore(
    (state: any) => [state.specialization, state.setAllSpecialization]
  );
  const [pet, setAllPet] = usePetStore(
    (state: any) => [state.pet, state.setAllPet]
  );
  async function fetchData() {
    const data = await getDoctorData(1, 10);
    const specializations = await getAllSpecializations();
    const pets = await getAllPets();
    console.log(data);
    setAllDoctors(data?.records);
    setAllSpecialization(specializations);
    setAllPet(pets);
  }
  useEffect(() => {
    fetchData();
  }, []);
  return (
    <div className="container flex flex-col gap-4 mx-auto py-5 relative">
      {/* <Filteration getApi={fetchData} /> */}
      <div className="self-end">
        <DoctorCreate
         specialization={specialization}
         pet={pet} />
      </div>
      <DataTable columns={columns} data={doctors} />
    </div>
  );
}
