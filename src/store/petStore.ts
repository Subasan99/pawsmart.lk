import { create } from 'zustand';
import { persist } from 'zustand/middleware';

type Store = {
  pets: any[];
};

export const usePetStore = create<Store>()(
  persist(
    (set) => ({
      pets: [],
      setAllPets: (pets: any[]) => {
        set({ pets: pets });
      },
    }),
    {
      name: 'pet_store',
    }
  )
);
