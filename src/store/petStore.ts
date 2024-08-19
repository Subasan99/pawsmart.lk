import { Pet } from "@/lib/typings";
import { create } from "zustand";
import { persist } from "zustand/middleware";

type Store = {
  loading: boolean;
  pets: Pet[];
  pet: Pet[];
  selectedPet: Pet | null | undefined;
  setSelectedPet: (pet: Pet | null | undefined) => void;
};

export const usePetStore = create<Store>()(
  persist(
    (set) => ({
      loading: true,
      pets: [],
      selectedPet: null,
      setAllPets: (pets: any[]) => {
        set({ pets: pets, loading: false });
      },
      pet: [],
      setAllPet: (pet: any[]) => {
        set({ pet: pet, loading: false });
      },
      setSelectedPet: (pet: Pet | null | undefined) => {
        set({ selectedPet: pet, loading: false });
      },
    }),
    {
      name: "pet_store",
    }
  )
);
