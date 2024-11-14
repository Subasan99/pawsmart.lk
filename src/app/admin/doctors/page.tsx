"use client";
import { DayPickerProvider, DayPickerProps } from "react-day-picker"; // Import DayPickerProvider and DayPickerProps
import { useEffect, useState } from "react";
import { getAllPets, getAllSpecializations } from "@/api/route";
import { useAdminStore } from "@/store/adminStore";
import { usePetStore } from "@/store/petStore";
import { useSpecializationStore } from "@/store/specializationStore";
import { DataTable } from "../../../components/AdminPanelComponents/data-table";
import { getDoctorData } from "./action";
import { columns } from "./columns";
import { Button } from "react-day-picker";  // Assuming Button is from react-day-picker
import { usePathname, useRouter } from "next/navigation";
import { Stethoscope } from "lucide-react";

export default function DemoPage() {
  const router = useRouter();
  
  const [doctors, setAllDoctors,loading] = useAdminStore((state: any) => [
    state.doctors,
    state.setAllDoctors,
    state.loading
  ]);
  const [specialization, setAllSpecialization] = useSpecializationStore(
    (state: any) => [state.specialization, state.setAllSpecialization]
  );
  const [pet, setAllPet] = usePetStore(
    (state: any) => [state.pet, state.setAllPet]
  );

  const [isFormOpen, setIsFormOpen] = useState(false);

  async function fetchData() {
    const data = await getDoctorData(1, 10);
    const specializations = await getAllSpecializations();
    const pets = await getAllPets();
    setAllDoctors(data?.records);
    setAllSpecialization(specializations);
    setAllPet(pets);
  }

  useEffect(() => {
    fetchData();
  }, []);

  // Define DayPickerProps for the DayPickerProvider
  const dayPickerProps: DayPickerProps = {
    mode: "single",  // Can be "single", "multiple", etc., depending on usage
    required: false,
  };

  if (loading) {
    return <div>Loading...!</div>;
  }
  const pathname = usePathname();

  return (
    <DayPickerProvider initialProps={dayPickerProps}> {/* Provide initialProps */}
      <div className="container flex flex-col gap-4 mx-auto py-5 relative" style={{ overflow: "auto", scrollbarWidth: "none", msOverflowStyle: "none" }}>
      <div className="flex items-center">
  <Stethoscope className="mr-2 text-black font-bold  group-hover:text-black transition-colors duration-200" />
  <div className="font-bold text-2xl">Doctors</div>
</div>

        <div className="self-end ">
          <Button className="bg-blue-600 text-white p-2 rounded-xl" onClick={() => router.push('/admin/doctors/doctorcreate')}>
            Create
          </Button>
        </div>
        <DataTable columns={columns} data={doctors} />
      </div>
    </DayPickerProvider>
  );
}



// "use client";
// import { useEffect, useState } from "react";
// import { getAllPets, getAllSpecializations } from "@/api/route";
// import { useAdminStore } from "@/store/adminStore";
// import { usePetStore } from "@/store/petStore";
// import { useSpecializationStore } from "@/store/specializationStore";
// import { DataTable } from "../../../components/AdminPanelComponents/data-table";
// import { getDoctorData } from "./action";
// import { columns } from "./columns";
// import { Button } from "react-day-picker";
// import DocCreateForm from "../../../components/AdminPanelComponents/DoctorComponents/DocCreateForm";

// export default function DemoPage() {
//   const [doctors, setAllDoctors] = useAdminStore((state: any) => [
//     state.doctors,
//     state.setAllDoctors,
//   ]);
//   const [specialization, setAllSpecialization] = useSpecializationStore(
//     (state: any) => [state.specialization, state.setAllSpecialization]
//   );
//   const [pet, setAllPet] = usePetStore(
//     (state: any) => [state.pet, state.setAllPet]
//   );

//   const [isFormOpen, setIsFormOpen] = useState(false);

//   async function fetchData() {
//     const data = await getDoctorData(1, 10);
//     const specializations = await getAllSpecializations();
//     const pets = await getAllPets();
//     setAllDoctors(data?.records);
//     setAllSpecialization(specializations);
//     setAllPet(pets);
//   }

//   useEffect(() => {
//     fetchData();
//   }, []);

//   return (
//     <div className="container flex flex-col gap-4 mx-auto py-5 relative">
//       <div className="self-end">
//         <Button className="bg-red-500" onClick={() => setIsFormOpen(true)}>
//           Create
//         </Button>
//       </div>

//       {isFormOpen && (
//         <DocCreateForm
//           specialization={specialization}
//           pet={pet}
//           setOpen={setIsFormOpen}
//         />
//       )}

//       <DataTable columns={columns} data={doctors} />
//     </div>
//   );
// }
