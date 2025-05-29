import { create } from "zustand";

interface CartStore {
  itemCount: number;
  setItemCount: (count: number) => void;
  incrementItemCount: (amount?: number) => void;
}

export const useCartStore = create<CartStore>((set) => ({
  itemCount: 0,
  setItemCount: (count) => set({ itemCount: count }),
  incrementItemCount: (amount = 1) =>
    set((state) => ({ itemCount: state.itemCount + amount })),
}));
