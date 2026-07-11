import { create } from "zustand";
import { type CartItem } from "../types";

interface CartState {
  cartItems: CartItem[];
  addToCart: (item: CartItem) => void;
  removeFromCart: (variantId: number) => void;
  updateQuantity: (variantId: number, quantity: number) => void;
  clearCart: () => void;
}

export const useCartStore = create<CartState>()((set) => ({
  cartItems: [],

  addToCart: (item) => {
    set((state) => {
      const exists = state.cartItems.find(
        (i) => i.variantId === item.variantId,
      );

      if (exists) {
        return {
          cartItems: state.cartItems.map((i) =>
            i.variantId === item.variantId
              ? {
                  ...i,
                  quantity: Math.min(i.quantity + item.quantity, i.stock),
                }
              : i,
          ),
        };
      }

      return { cartItems: [...state.cartItems, item] };
    });
  },

  removeFromCart: (variantId) => {
    set((state) => ({
      cartItems: state.cartItems.filter((i) => i.variantId !== variantId),
    }));
  },

  updateQuantity: (variantId, quantity) => {
    set((state) => ({
      cartItems: state.cartItems.map((i) =>
        i.variantId === variantId
          ? { ...i, quantity: Math.min(quantity, i.stock) }
          : i,
      ),
    }));
  },

  clearCart: () => {
    set({ cartItems: [] });
  },
}));
