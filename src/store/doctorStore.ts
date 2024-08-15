import { create } from 'zustand';
import { persist } from 'zustand/middleware';

type Store = {
  doctors: any[];
  doctor: any[];

};

export const useDoctorStore = create<Store>()(
  persist(
    (set) => ({
      doctors: [],
      setAllDoctors: (doctors: any[]) => {
        set({ doctors: doctors });
      },
      doctor: [],
      setAllDoctor: (doctor: any[]) => {
        set({ doctor: doctor });
      },
    }),
    {
      name: 'doctor_store',
    }
  )
);
