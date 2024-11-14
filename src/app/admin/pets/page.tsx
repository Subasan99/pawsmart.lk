"use client";
import { DataTable } from "@/components/AdminPanelComponents/data-table";
import PetCreate from "@/components/AdminPanelComponents/PetComponents/PetCreate";
import { usePetStore } from "@/store/petStore";
import { useEffect } from "react";
import { getPetData } from "./action";
import {  petsColumns } from "./columns";
import { Dog } from "lucide-react";

export default function Index() {
  const [pets, setAllPets] = usePetStore((state: any) => [
    state.pets,
    state.setAllPets,
  ]);
  async function fetchData() {
    const data = await getPetData(1, 10);
    console.log(data);
    setAllPets(data?.records);
  }
  useEffect(() => {
    console.log(pets);
    fetchData();
  }, []);
  return (
    <div className="container flex flex-col gap-4 mx-auto py-5 relative">
        <div className="flex items-center">
    <Dog className="mr-2 text-black font-bold  group-hover:text-black transition-colors duration-200" />
    <div className="font-bold text-2xl">Pets</div>
    </div>
    
    <div className="self-end">
      <PetCreate />
    </div>      {/* <Filteration getApi={fetchData} /> */}
      <DataTable columns={petsColumns} data={pets} />
    </div>
  );
}
