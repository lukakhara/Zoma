import { createContext, useContext, useState, type ReactNode } from "react";
import { type CartItem } from "../types";

interface CartContextType {
  cartItems: CartItem[];
  addToCart: (item: CartItem) => void;
  removeFromCart: (variantId: number) => void;
  updateQuantity: (variantId: number, quantity: number) => void;
  clearCart: () => void;
}

const CartContext = createContext<CartContextType | null>(null);

const CartContextProvider = ({ children }: { children: ReactNode }) => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);

  const addToCart = (item: CartItem) => {
    setCartItems((prev) => {
      const exists = prev.find(
        (i) => i.variantId === item.variantId);

      if (exists) {
        return prev.map((i) =>
          i.variantId === item.variantId
            ? { ...i, quantity: Math.min(i.quantity + item.quantity, i.stock) }
            : i,
        );
      }

      return [...prev, item];
    });
  };

  const removeFromCart = (variantId: number) => {
    setCartItems((prev) => prev.filter((i) => i.variantId !== variantId));
  };

  const updateQuantity = (variantId: number, quantity: number) => {
    if (quantity <= 0) return removeFromCart(variantId);
    setCartItems((prev) =>
      prev.map((item) =>
        item.variantId === variantId
          ? { ...item, quantity: Math.min(quantity, item.stock) }
          : item,
      ),
    );
  };

  const clearCart = () => setCartItems([]);

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export default CartContextProvider;

export const useCartContext = () => {
  const context = useContext(CartContext);
  if (!context)
    throw new Error("useCartContext must be used within a CartContextProvider");
  return context;
};
