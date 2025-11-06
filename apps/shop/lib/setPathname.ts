import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

type UseUrlStoreState = {
  currentUrlPath: string;
  addCurrentUrlPath: (path: string) => void;
  clearCurrentUrlPath: () => void;
};

export const useUrlStore = create<UseUrlStoreState>()(
  persist(
    (set) => ({
      currentUrlPath: "",
      addCurrentUrlPath: (path) => set({ currentUrlPath: path }),
      clearCurrentUrlPath: () => set({ currentUrlPath: "" }),
    }),
    {
      name: "urlPathName",
      storage: createJSONStorage(() => localStorage),
    }
  )
);
