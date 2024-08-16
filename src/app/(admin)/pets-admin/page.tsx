"use client";
import { useEffect } from "react";
import { columns } from "./columns";
import { DataTable } from "../../../components/AdminPanelComponents/data-table";
import { getPetData } from "./action";
import { usePetStore } from "@/store/petStore";

export default function DemoPage() {
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
    <div className="container mx-auto py-5 relative">
      {/* <Filteration getApi={fetchData} /> */}
      <DataTable columns={columns} data={pets} />
    </div>
  );
}
