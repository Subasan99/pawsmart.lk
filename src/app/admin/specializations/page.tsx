"use client";
import { getDepartmentData } from "@/app/home/action";
import { DataTable } from "@/components/AdminPanelComponents/data-table";
import SpecializationCreate from "@/components/AdminPanelComponents/SpecializationComponents/SpecializationCreate";
import { useDepartmentStore } from "@/store/departmentStore";
import { useSpecializationStore } from "@/store/specializationStore";
import { useEffect } from "react";
import { getSpecializationData } from "./action";
import { columns } from "./columns";
import { BriefcaseMedical } from "lucide-react";

export default function Index() {
  const [specializations, setAllSpecializations] = useSpecializationStore(
    (state: any) => [state.specializations, state.setAllSpecializations]
  );
  const [department, setAllDepartment] = useDepartmentStore((state: any) => [
    state.department,
    state.setAllDepartment,
  ]);
  async function fetchData() {
    const data = await getSpecializationData(1, 10);
    const departments = await getDepartmentData();
    console.log(data);
    setAllSpecializations(data?.records);
    setAllDepartment(departments);
  }
  useEffect(() => {
    console.log(specializations);
    fetchData();
  }, []);
  return (
    <div className="container flex flex-col gap-4 mx-auto py-5 relative">
          <div className="flex items-center">
    <BriefcaseMedical className="mr-2 text-black font-bold  group-hover:text-black transition-colors duration-200" />
    <div className="font-bold text-2xl">Specializations</div>
    </div>
      
      <div className="self-end">
        <SpecializationCreate department={department} />
      </div>{" "}
      {/* <Filteration getApi={fetchData} /> */}
      <DataTable columns={columns} data={specializations} />
    </div>
  );
}
