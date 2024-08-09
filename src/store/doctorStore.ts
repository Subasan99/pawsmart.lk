import { create } from 'zustand';
import { persist } from 'zustand/middleware';

type Store = {
  doctors: any[];
};

export const useDoctorStore = create<Store>()(
  persist(
    (set) => ({
      doctors: [],
      setAllDoctors: (doctors: any[]) => {
        set({ doctors: doctors });
      },
    }),
    {
      name: 'doctor_store',
    }
  )
);
