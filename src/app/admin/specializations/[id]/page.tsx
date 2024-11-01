"use client";

import EditIcon from "@/components/svg/edit_icon";
import { useSpecializationStore } from "@/store/specializationStore";
import Image from "next/image";
import { useEffect, useCallback } from "react";
import DefaultImage from "../../../../../public/default_user.png";
import { getSpecializationById } from "../action";

const Index = ({ params }: { params: { id: string } }) => {
  const [
    selectedSpecialization,
    setSelectedSpecialization,
    loading,
  ] = useSpecializationStore((state: any) => [
    state.selectedSpecialization,
    state.setSelectedSpecialization,
    state.loading,
  ]);

  // Memoized function to fetch the selected specialization
  const handleSelectSpecialization = useCallback(async () => {
    const data = await getSpecializationById(params.id);
    setSelectedSpecialization(data);
  }, [params.id, setSelectedSpecialization]);

  useEffect(() => {
    handleSelectSpecialization();
  }, [handleSelectSpecialization]); // Dependency is now handleSelectSpecialization

  if (loading) {
    return <div>Loading...!</div>; // Fixed missing return statement
  }

  return (
    <div className="flex flex-col px-3 bg-white py-5 h-full w-full rounded-lg">
      <div className="flex relative">
        <EditIcon className="absolute top-0 right-0 cursor-pointer" />
        <div className="relative">
          <EditIcon className="absolute top-5 right-5 z-10 cursor-pointer" />
          {selectedSpecialization?.preSignedUrl ? (
            <Image
              src={selectedSpecialization.preSignedUrl}
              alt="Specialization Image"
              width={200}
              height={200}
              className="rounded-full border-4 object-cover h-[200px] w-[200px]"
            />
          ) : (
            <Image
              src={DefaultImage}
              className="rounded-full border-4"
              alt="default_img"
              height={200}
              width={200}
            />
          )}
        </div>
        <div className="grow flex flex-col gap-2 px-3 py-2">
          <div className="font-bold text-2xl flex gap-2 items-center">
            {selectedSpecialization?.specializationName} {" "}
          </div>
          <div className="font-semibold text-xl">
            &quot;{selectedSpecialization?.description}&quot;
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
