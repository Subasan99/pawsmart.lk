"use client";
import { useEffect } from "react";
import { columns } from "./columns";
import { DataTable } from "../../../components/AdminPanelComponents/data-table";
import { getDepartmentData } from "./action";
import { useDeparmentStore } from "@/store/deparmentStore";

export default function DemoPage() {
  const [departments, setAllDepartments] = useDeparmentStore((state: any) => [
    state.departments,
    state.setAllDepartments,
  ]);
  async function fetchData() {
    const data = await getDepartmentData(1, 10);
    console.log(data);
    setAllDepartments(data?.records);
  }
  useEffect(() => {
    console.log(departments);
    fetchData();
  }, []);
  return (
    <div className="container mx-auto py-5 relative">
      {/* <Filteration getApi={fetchData} /> */}
      <DataTable columns={columns} data={departments} />
    </div>
  );
}
