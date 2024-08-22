"use client";
import { useEffect } from "react";
import { columns } from "./columns";
import { DataTable } from "../../../components/AdminPanelComponents/data-table";
import { getDepartmentData } from "./action";
import DepartmentCreate from "./DepartmentCreate";
import { useDepartmentStore } from "@/store/departmentStore";

export default function DemoPage() {
  const [departments, setAllDepartments] = useDepartmentStore((state: any) => [
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
    <div className="container flex flex-col gap-4 mx-auto py-5 relative">
      <div className="self-end">
        <DepartmentCreate />
      </div>
      <DataTable columns={columns} data={departments} />
    </div>
  );
}
