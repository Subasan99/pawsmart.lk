"use client";
import { useEffect } from "react";
import { columns } from "./columns";
import { DataTable } from "../../../components/AdminPanelComponents/data-table";
import { getDoctorData } from "./action";
import { useAdminStore } from "@/store/adminStore";

export default function DemoPage() {
  const [doctors, setAllDoctors] = useAdminStore((state: any) => [
    state.doctors,
    state.setAllDoctors,
  ]);
  async function fetchData() {
    const data = await getDoctorData(1, 10);
    console.log(data);
    setAllDoctors(data?.records);
  }
  useEffect(() => {
    console.log(doctors)
    fetchData();
  }, []);
  return (
    <div className="container mx-auto py-5 relative">
        {/* <Filteration getApi={fetchData} /> */}
      <DataTable columns={columns} data={doctors} />
    </div>
  );
}
