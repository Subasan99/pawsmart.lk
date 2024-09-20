import { Hospital } from "@/lib/typings";
import { create } from "zustand";
import { persist } from "zustand/middleware";

type Store = {
  loading: boolean;
  hospitals: Hospital[];


};

export const useHospitalStore = create<Store>()(
  persist(
    (set) => ({
      loading: true,
      hospitals: [],
      setAllHospitals: (hospitals: any[]) => {
        set({ hospitals: hospitals, loading: false });
      },
   
 
    }),
    {
      name: "hospital_store",
    }
  )
);
