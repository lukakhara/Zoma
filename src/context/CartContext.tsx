import { createContext, useContext, useState, type ReactNode } from "react";
import { type CartItem } from "../types";
import productsJson from "../locales/products.json";

interface CartContextType {
  cartItems: CartItem[];
  addToCart: (id: string,quantity:number) => void;
  removeFromCart: (id: string) => void;
  updateQuantity: (id: string, quantity: number) => void;
  clearCart: () => void;
}

const cartContext = createContext<CartContextType | null>(null);

const CartContextProdiver = ({ children }: { children: ReactNode }) => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);

  const getStock = (id: string) =>
    productsJson.find((p) => p.id === id)?.amount ?? 0;

  const addToCart = (id: string,quantity:number) => {
    setCartItems((prev) => {
      const exists = prev.find((item) => item.id === id);
      const stock = getStock(id);

      if (exists) {
        return prev.map((item) =>
          item.id === id
            ? { ...item, quantity: Math.min(item.quantity + quantity, stock) }
            : item,
        );
      }
      if (stock === 0) return prev;
      return [...prev, { id, quantity: quantity }];
    });
  };

  const removeFromCart = (id: string) => {
    setCartItems((prev) => prev.filter((item) => item.id !== id));
  };

  const updateQuantity = (id: string, quantity: number) => {
    if (quantity <= 0) return removeFromCart(id);
    const stock = getStock(id);
    setCartItems((prev) =>
      prev.map((item) =>
        item.id === id
          ? { ...item, quantity: Math.min(quantity, stock) }
          : item,
      ),
    );
  };

  const clearCart = () => setCartItems([]);

  return (
    <cartContext.Provider
      value={{
        cartItems,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
      }}
    >
      {children}
    </cartContext.Provider>
  );
};

export default CartContextProdiver;

export const useCartContext = () => {
  const context = useContext(cartContext);
  if (!context) {
    throw new Error("useCartContext must be used within a CartContextProvider");
  }
  return context;
};
