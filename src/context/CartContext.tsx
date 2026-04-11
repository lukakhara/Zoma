import { createContext,useContext, useState, type ReactNode } from "react";
import { type Product } from "../types";

interface CartContextType{
  cartItems : Product[];
  addToCart : (item:Product) => void;
  removeFromCart : (item:Product) => void;
}

const cartContext = createContext<CartContextType | null>(null);

const CartContextProdiver = ({ children }: { children: ReactNode }) => {
  const [cartItems, setCartItems] = useState<Product[]>([]);

  const addToCart = (item: Product) =>
    setCartItems((prevItems) => [...prevItems, item]);

  const removeFromCart = (item: Product) => {
    setCartItems((prevItems) => prevItems.filter((i) => i.id !== item.id));
  };

  return (
    <cartContext.Provider value={{ cartItems, addToCart, removeFromCart }}>
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
