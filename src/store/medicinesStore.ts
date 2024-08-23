import { Appointment, Medicine } from "@/lib/typings";
import { create } from "zustand";
import { persist } from "zustand/middleware";

type Store = {
  loading: boolean;
  medicines: Medicine[];
  medicine: Medicine[];
  selectedMedicine: Medicine | null | undefined;
  setSelectedMedicine: (medicine: Medicine | null | undefined) => void;
  medicineAppointments: Appointment[];
  setMedicineAppointments: (appointments: Appointment[]) => void;
};

export const useMedicineStore = create<Store>()(
  persist(
    (set) => ({
      loading: true,
      medicines: [],
      selectedMedicine: null,
      medicineAppointments: [],
      setAllMedicines: (medicines: any[]) => {
        set({ medicines: medicines, loading: false });
      },
      medicine: [],
      setAllMedicine: (medicine: any[]) => {
        set({ medicine: medicine, loading: false });
      },
      setSelectedMedicine: (medicine: Medicine | null | undefined) => {
        set({ selectedMedicine: medicine, loading: false });
      },
      setMedicineAppointments: (appointments: Appointment[]) => {
        set({ medicineAppointments: appointments });
      },
    }),
    {
      name: "medicine_store",
    }
  )
);
