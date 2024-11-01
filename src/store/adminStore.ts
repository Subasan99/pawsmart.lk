import { Doctor } from "@/lib/typings";
import create from "zustand";
import { persist } from "zustand/middleware";

type Store = {
  doctors: Doctor[];
  setAllDoctors: (doctors: Doctor[]) => void;
};

export const useAdminStore = create<Store>()(
  persist(
    (set) => ({
      doctors: [],
      setAllDoctors: (doctors: Doctor[]) => {
        set({ doctors: doctors });
      },
    }),
    {
      name: "admin_stores",
    }
  )
);
