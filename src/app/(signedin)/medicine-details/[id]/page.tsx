"use client";
import DefaultImage from "../../../../../public/default_user.png";
import Image from "next/image";
import GenderIcon from "@/components/svg/gender-icon";
import { useEffect, useState } from "react";
import DaySlot from "@/components/shared/day-slot";
import { getMedicinceById } from "./action";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { useMedicineStore } from "@/store/medicinesStore";

const Index = ({ params }: { params: { id: string } }) => {
  const router = useRouter();
  const [dloading, setdLoading] = useState<boolean>(true);
  const [
    selectedMedicine,
    setSelectedMedicine,
    loading,
  ] = useMedicineStore((state: any) => [
    state.selectedMedicine,
    state.setSelectedMedicine,
    state.loading,
  ]);

  async function fetchData() {
    const response = await getMedicinceById(params.id);
    setSelectedMedicine(response);
    setdLoading(false);
  }

  useEffect(() => {
    fetchData();
  }, [params.id]);

  if (dloading && !selectedMedicine) {
    return (
      <div className="mt-14 px-7 w-full flex flex-colbg-gray-100 items-center py-4">
        <div className="w-full max-w-[1204px] flex flex-col px-3 py-5 h-full rounded-lg">
          Loading...!
        </div>
      </div>
    );
  }
  console.log(selectedMedicine);
  return (
    <div className="mt-14 px-7 w-full flex flex-col items-center py-4">
      <div className="w-full flex flex-col max-w-[1204px] gap-y-3">
        <div className="w-full flex flex-col px-3 bg-white py-5 h-full rounded-lg">
          <div className="w-full flex flex-col items-center md:flex-row md:justify-start relative">
            <div className="relative">
              {selectedMedicine?.preSignedUrl ? (
                <Image
                  src={selectedMedicine?.preSignedUrl}
                  alt="Doctor Image"
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
            <div className="grow w-1/2 min-w-fit items-center md:items-start flex flex-col gap-2 px-3 py-2">
              <div>
                <div className="font-semibold mb-1">
                  {selectedMedicine?.specializationName}
                </div>
                <div className="font-semibold mb-2">
                  {selectedMedicine?.departmentName}
                </div>
              </div>
              <div className="flex flex-col items-start">
                <div className="font-semibold text-xl">
                  &quot;{selectedMedicine?.description}&quot;
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="w-full flex flex-col px-3 bg-white py-5 rounded-lg">
          <DaySlot daySlots={selectedMedicine?.dayTimeSlotResponses} />
        </div>
        <div className="w-full relative flex md:justify-end">
          <Button
            onClick={() => {
              router.push(`/appointmentdoctor?doctorId=${selectedMedicine?.id}`);
            }}
            className="w-full md:w-fit md:px-3"
          >
            Book for Appointment
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Index;
