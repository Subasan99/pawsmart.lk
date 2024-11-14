"use client";
import DepartmentCreate from "@/components/AdminPanelComponents/DepartmentComponents/DepartmentCreate";
import { useDepartmentStore } from "@/store/departmentStore";
import { useEffect } from "react";
import { DataTable } from "../../../components/AdminPanelComponents/data-table";
import { getDepartmentData } from "./action";
import { columns } from "./columns";
import { Building } from "lucide-react";

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
      
      <div className="flex items-center">
    <Building className="mr-2 text-black font-bold  group-hover:text-black transition-colors duration-200" />
    <div className="font-bold text-2xl">Departments</div>
    </div>
      <div className="self-end">
        <DepartmentCreate />
      </div>
      <DataTable columns={columns} data={departments} />
    </div>
  );
}
