"use client";

import { DataTable } from "@/components/AdminPanelComponents/data-table";
import PetCreate from "@/components/AdminPanelComponents/PetComponents/PetCreate";
import { usePetStore } from "@/store/petStore";
import { useEffect, useCallback } from "react";
import { getPetData } from "./action";
import { columns } from "./columns";

export default function Index() {
  const [pets, setAllPets] = usePetStore((state: any) => [
    state.pets,
    state.setAllPets,
  ]);

  // Memoized function to fetch pet data
  const fetchData = useCallback(async () => {
    const data = await getPetData(1, 10);
    console.log(data);
    setAllPets(data?.records);
  }, [setAllPets]);

  useEffect(() => {
    console.log(pets);
    fetchData();
  }, [fetchData]); // Include fetchData in the dependency array

  return (
    <div className="container flex flex-col gap-4 mx-auto py-5 relative">
      <div className="self-end">
        <PetCreate />
      </div>
      {/* <Filteration getApi={fetchData} /> */}
      <DataTable columns={columns} data={pets} />
    </div>
  );
}
