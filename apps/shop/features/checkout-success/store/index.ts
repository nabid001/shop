import { create } from "zustand";

export type CheckoutSuccessState = {
  checkoutId: string;
};

export type CheckoutSuccessActions = {
  setCheckoutId: (checkoutId: string) => void;
  clearCheckoutId: () => void;
};

export const useCheckoutSuccessStore = create<
  CheckoutSuccessState & CheckoutSuccessActions
>((set) => ({
  checkoutId: "",
  setCheckoutId: (id) => set({ checkoutId: id }),
  clearCheckoutId: () => set({ checkoutId: "" }),
}));
