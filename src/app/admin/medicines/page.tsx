"use client";
import { getAllSpecializations } from "@/api/route";
import { DataTable } from "@/components/AdminPanelComponents/data-table";
import MedicineCreate from "@/components/AdminPanelComponents/MedicineComponents/MedicineCreate";
import { useMedicineStore } from "@/store/medicinesStore";
import { useSpecializationStore } from "@/store/specializationStore";
import { useEffect } from "react";
import { getMedicineData } from "./action";
import { columns } from "./columns";
import { Syringe } from "lucide-react";

export default function Index() {
  const [medicines, setAllMedicines] = useMedicineStore((state: any) => [
    state.medicines,
    state.setAllMedicines,
  ]);
  const [specialization, setAllSpecialization] = useSpecializationStore(
    (state: any) => [state.specialization, state.setAllSpecialization]
  );
  async function fetchData() {
    const data = await getMedicineData(1, 10);
    const specializations = await getAllSpecializations();
    console.log(data);
    setAllMedicines(data);
    setAllSpecialization(specializations);
  }
  useEffect(() => {
    fetchData();
  }, []);
  return (
    <div className="container flex flex-col gap-4 mx-auto py-5 relative">
       <div className="flex items-center">
    <Syringe className="mr-2 text-black font-bold  group-hover:text-black transition-colors duration-200" />
    <div className="font-bold text-2xl">Vaccination</div>
    </div>
      <div className="self-end">
        <MedicineCreate />
      </div>
      <DataTable columns={columns} data={medicines} />
    </div>
  );
}
