"use client";
import Header from "@/components/HomeComponent/Header";
import MultipleImagesProps from "@/components/SinglePageImage";
import { usePetStore } from "@/store/petStore";
import { useEffect } from "react";
import { getPetFilterData } from "../../../home/action";

interface Pet {
  preSignedUrl: string;
  image: string;
  name: string;
}

const Pets = () => {
  const [pets, setAllPets] = usePetStore((state: any) => [
    state.pets,
    state.setAllPets,
  ]);

  useEffect(() => {
    fetchData();
  }, []); // Only fetch data on component mount

  const fetchData = async () => {
    try {
      const petData = await getPetFilterData({ pageSize: 10, pageCount: 1 });
      setAllPets(petData.records);
    } catch (error) {
      console.error("Error fetching data:", error);
      // Optionally, set some state to display an error message to the user
    }
  };

  const petdata = Array.isArray(pets)
    ? pets.map((pet: Pet) => ({
        src: pet.preSignedUrl,
        alt: pet.image,
        textOverlay: pet.name,
        label: pet.name,
      }))
    : [];

    console.log(pets)

  const handleClick = (imageName: string) => {
    console.log(`Image clicked: ${imageName}`);
  };

  return (
    <div id="pets" className="pb-8 pt-20">
      <div className="sticky z-30 top-0 md:static h-fit">
        <Header />
      </div>
      <MultipleImagesProps
        title="Pets Nutritional"
        description="Your Pets' Nutritional Health is Very Important & Our Priority"
        handleClick={handleClick}
        doctors={pets}
        pathname="/pets"
      />
    </div>
  );
};

export default Pets;
