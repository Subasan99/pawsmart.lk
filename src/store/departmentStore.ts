import { Department } from "@/lib/typings";
import { create } from "zustand";
import { persist } from "zustand/middleware";

type Store = {
  loading: boolean;
  departments: Department[];
  department: Department[];
  selectedDepartment: Department | null | undefined;
  setSelectedDepartment: (department: Department | null | undefined) => void;
};

export const useDepartmentStore = create<Store>()(
  persist(
    (set) => ({
      loading: true,
      departments: [],
      selectedDepartment: null,
      setAllDepartments: (departments: any[]) => {
        set({ departments: departments, loading: false });
      },
      department: [],
      setAllDepartment: (department: any[]) => {
        set({ department: department, loading: false });
      },
      setSelectedDepartment: (department: Department | null | undefined) => {
        set({ selectedDepartment: department, loading: false });
      },
    }),
    {
      name: "department_store",
    }
  )
);
