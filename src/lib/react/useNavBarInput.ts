import create from "zustand";

export interface NavBarInputStore {
  input: string | null;
  setInput: (input: string | null) => unknown;
}

export const useNavBarInput = create<NavBarInputStore>((set) => ({
  input: null,
  setInput: (input) => set({ input }),
}));
