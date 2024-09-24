import { Appointment, Doctor } from "@/lib/typings";
import { create } from "zustand";
import { persist } from "zustand/middleware";

type Store = {
  loading: boolean;
  doctors: Doctor[];
  doctor: Doctor[];
  selectedDoctor: Doctor | null | undefined;
  setSelectedDoctor: (doctor: Doctor | null | undefined) => void;
  doctorAppointments: Appointment[];
  setDoctorAppointments: (appointments: Appointment[]) => void;
};

export const useDoctorStore = create<Store>()(
  persist(
    (set) => ({
      loading: true,
      doctors: [],
      selectedDoctor: null,
      doctorAppointments: [],
      setLoading: (loading: boolean) => {
        set({ loading: true });
      },
      setAllDoctors: (doctors: any[]) => {
        set({ doctors: doctors, loading: false });
      },
      doctor: [],
      setAllDoctor: (doctor: any[]) => {
        set({ doctor: doctor, loading: false });
      },
      setSelectedDoctor: (doctor: Doctor | null | undefined) => {
        set({ selectedDoctor: doctor, loading: false });
      },
      setDoctorAppointments: (appointments: Appointment[]) => {
        set({ doctorAppointments: appointments });
      },
    }),
    {
      name: "doctor_store",
    }
  )
);
