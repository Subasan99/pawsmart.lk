"use client";
import { useEffect } from "react";
import { columns } from "./columns";
import { DataTable } from "../../../components/AdminPanelComponents/data-table";
import { getDoctorData } from "./action";
import { useAdminStore } from "@/store/adminStore";
import DoctorCreate from "@/components/AdminPanelComponents/DoctorComponents/DoctorCreate";
import { useSpecializationStore } from "@/store/specializationStore";
import { getAllSpecializations } from "@/api/route";

export default function DemoPage() {
  const [doctors, setAllDoctors] = useAdminStore((state: any) => [
    state.doctors,
    state.setAllDoctors,
  ]);
  const [specialization, setAllSpecialization] = useSpecializationStore(
    (state: any) => [state.specialization, state.setAllSpecialization]
  );
  async function fetchData() {
    const data = await getDoctorData(2, 10);
    const specializations = await getAllSpecializations();
    console.log(data);
    setAllDoctors(data?.records);
    setAllSpecialization(specializations);
  }
  useEffect(() => {
    fetchData();
  }, []);
  return (
    <div className="container flex flex-col gap-4 mx-auto py-5 relative">
      {/* <Filteration getApi={fetchData} /> */}
      <div className="self-end">
        <DoctorCreate specialization={specialization} />
      </div>
      <DataTable columns={columns} data={doctors} />
    </div>
  );
}
