import { create } from "zustand";
import { persist } from "zustand/middleware";

type Store = {
  specialization: any[];
};

export const useSpecializationStore = create<Store>()(
  persist(
    (set) => ({
      specialization: [],
      setAllSpecialization: (specialization: any[]) => {
        set({ specialization: specialization });
      },
    }),
    {
      name: "specialization_store",
    }
  )
);
