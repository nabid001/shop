import { UserAddressType } from "@repo/drizzle-config/schemas/address";
import { PaymentMethod } from "@repo/drizzle-config/schemas/order";
import { create } from "zustand";

export type CheckoutProduct = {
  _id: string;
  id: string;
  name: string;
  category: string;
  image: string;
  color: string;
  size: string;
  quantity: number;
  price: number;
  totalPrice: number;
  orderedBy: string;
};

export type CheckoutAddress = {
  shippingAddress?: string;
  firstName?: string;
  lastName?: string;
  phone?: string;
  region?: string;
  city?: string;
  zone?: string;
  address?: string;
  email?: string;
  addressType?: UserAddressType;
  paymentMethod?: PaymentMethod;
};

export type CheckoutState = {
  product: CheckoutProduct[];
  // address: CheckoutAddress;
};

export type CheckoutActions = {
  addToCheckout: (product: CheckoutProduct) => void;
  removeFromCheckout: (id: string) => void;
  clearCheckout: () => void;
};

export type CheckoutStore = CheckoutState & CheckoutActions;

export const useCheckoutStore = create<CheckoutStore>((set) => ({
  product: [],
  addToCheckout: (product) =>
    set((state) => ({
      product: [product, ...state.product],
    })),

  removeFromCheckout: (id) =>
    set((state) => ({
      product: state.product.filter((p) => p.id !== id),
    })),

  clearCheckout: () => set({ product: [] }),
}));
