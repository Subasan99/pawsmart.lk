"use client";
import { useEffect } from "react";
import { columns } from "./columns";
import { DataTable } from "@/components/AdminPanelComponents/data-table";
import { getSpecializationData } from "./action";
import { useSpecializationStore } from "@/store/specializationStore";
import SpecializationCreate from "@/components/AdminPanelComponents/SpecializationComponents/SpecializationCreate";

export default function Index() {
  const [specializations, setAllSpecializations] = useSpecializationStore((state: any) => [
    state.specializations,
    state.setAllSpecializations,
  ]);
  async function fetchData() {
    const data = await getSpecializationData(1, 10);
    console.log(data);
    setAllSpecializations(data?.records);
  }
  useEffect(() => {
    console.log(specializations);
    fetchData();
  }, []);
  return (
    <div className="container flex flex-col gap-4 mx-auto py-5 relative">
    <div className="self-end">
      <SpecializationCreate department={undefined} />
    </div>      {/* <Filteration getApi={fetchData} /> */}
      <DataTable columns={columns} data={specializations} />
    </div>
  );
}
