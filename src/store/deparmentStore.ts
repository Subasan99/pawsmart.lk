// store/deparmentStore.ts
import create from 'zustand';

interface DepartmentState {
  departments: any[];
  setAllDeparments: (departments: any[]) => void;
}

export const useDeparmentStore = create<DepartmentState>((set) => ({
  departments: [],
  setAllDeparments: (departments) => set({ departments }),
}));
