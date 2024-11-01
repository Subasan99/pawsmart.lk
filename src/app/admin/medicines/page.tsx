"use client";
import { getAllSpecializations } from "@/api/route";
import { DataTable } from "@/components/AdminPanelComponents/data-table";
import MedicineCreate from "@/components/AdminPanelComponents/MedicineComponents/MedicineCreate";
import { useMedicineStore } from "@/store/medicinesStore";
import { useSpecializationStore } from "@/store/specializationStore";
import { useEffect, useCallback } from "react";
import { getMedicineData } from "./action";
import { columns } from "./columns";

export default function Index() {
  const [medicines, setAllMedicines] = useMedicineStore((state: any) => [
    state.medicines,
    state.setAllMedicines,
  ]);
  const [specialization, setAllSpecialization] = useSpecializationStore(
    (state: any) => [state.specialization, state.setAllSpecialization]
  );

  // Memoized fetchData function
  const fetchData = useCallback(async () => {
    const data = await getMedicineData(1, 10);
    const specializations = await getAllSpecializations();
    console.log(data);
    setAllMedicines(data);
    setAllSpecialization(specializations);
  }, [setAllMedicines, setAllSpecialization]); // Add dependencies

  useEffect(() => {
    fetchData();
  }, [fetchData]); // Include fetchData in the dependency array

  return (
    <div className="container flex flex-col gap-4 mx-auto py-5 relative">
      {/* <Filteration getApi={fetchData} /> */}
      <div className="self-end">
        <MedicineCreate />
      </div>
      <DataTable columns={columns} data={medicines} />
    </div>
  );
}
