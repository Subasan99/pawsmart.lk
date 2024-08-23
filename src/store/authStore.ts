import { create } from "zustand";
import { persist } from "zustand/middleware";

type Store = {
  login: any;
  setLogin: (login: any) => void;
};

export const useAuthStore = create<Store>()(
  persist(
    (set, get) => ({
      login: undefined,
      setLogin: (login: any) => {
        console.log('login response',login);
        set({ login: login });
      },
    }),
    {
      name: "auth_store",
    }
  )
);
