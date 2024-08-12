"use client";
import React, { useEffect } from "react";
import { useMedicinesStore } from "@/store/medicinesStore";
import { getMedicineFilterData } from "../../home/action";
import MultipleImagesProps from "@/components/SinglePageImage";

const Medicines = () => {
  const [medicines, setAllMedicines] = useMedicinesStore((state: any) => [
    state.medicines,
    state.setAllMedicines,
  ]);

  useEffect(() => {
    fetchData();
  }, [getMedicineFilterData]);
  const fetchData = async () => {
    try {
      const medicinesData = await getMedicineFilterData({
        pageSize: 10,
        pageCount: 1,
      });

      setAllMedicines(medicinesData);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const medicinesDatas = Array.isArray(medicines)
    ? medicines.map((medicines: any) => ({
        src: medicines.preSignedUrl,
        alt: medicines.image,
        textOverlay: medicines.name,
        label: medicines.name,
      }))
    : [];

  const handleClick = (imageName: string) => {
    console.log(`Image clicked: ${imageName}`);
  };

  return (
    <div id="departments" className="pb-8 pt-40">
      <MultipleImagesProps
        title="Medicines"
        description="Your Pets Nutritional Health is Very Important & Our Priority"
        handleClick={handleClick}
        doctors={medicinesDatas}
      />
    </div>
  );
};

export default Medicines;
