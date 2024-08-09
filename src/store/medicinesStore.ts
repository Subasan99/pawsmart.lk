
import create from 'zustand';
import { persist } from 'zustand/middleware';


type Store = {
  medicines: any[];
  setAllMedicines: (departments: any[]) => void;

};


export const useMedicinesStore = create<Store>()(
  persist(
    (set) => ({
      medicines: [],
      setAllMedicines: (medicines: any[]) => {
        set({ medicines: medicines });
      },
    }),
    {
      name: 'medicine_store',
    }
  )
);
