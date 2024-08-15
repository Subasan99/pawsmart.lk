
import create from 'zustand';
import { persist } from 'zustand/middleware';


type Store = {
  booking: any[];
  setAllBooking: (departments: any[]) => void;

};


export const useBookingStore = create<Store>()(
  persist(
    (set) => ({
      booking: [],
      setAllBooking: (booking: any[]) => {
        set({ booking: booking });
      },
    }),
    {
      name: 'medicine_store',
    }
  )
);
