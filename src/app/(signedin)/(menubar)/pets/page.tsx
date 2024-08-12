"use client";
import React, { useEffect } from "react";
import { usePetStore } from "@/store/petStore";
import { getPetData, getPetFilterData } from "../../home/action";
import MultipleImagesProps from "@/components/SinglePageImage";

const Pets = () => {
  const [pets, setAllPets] = usePetStore((state: any) => [
    state.pets,
    state.setAllPets,
  ]);
  useEffect(() => {
    fetchData();
  }, [getPetData]);

  const fetchData = async () => {
    try {
      const petData = await getPetFilterData({ pageSize: 10, pageCount: 1 });

      setAllPets(petData.records);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const petdata = Array.isArray(pets)
    ? pets.map((pet: any) => ({
        src: pet.preSignedUrl,
        alt: pet.image,
        textOverlay: pet.name,
        label: pet.name,
      }))
    : [];

  const handleClick = (imageName: string) => {
    console.log(`Image clicked: ${imageName}`);
  };

  return (
    <div id="pets" className="pb-8 pt-20">
      <MultipleImagesProps
        title="Pets Nutritional"
        description="Your Pets Nutritional Health is Very Important & Our Priority"
        handleClick={handleClick}
        doctors={petdata}
      />
    </div>
  );
};

export default Pets;
