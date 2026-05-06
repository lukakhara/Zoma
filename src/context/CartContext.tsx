import { createContext, useContext, useState, type ReactNode } from "react";
import { type Product } from "../types";

interface CartContextType {
  cartItems: Product[];
  addToCart: (item: Product) => void;
  removeFromCart: (item: Product) => void;
  totalPrice: number;
  totalDiscount: number;
  totalPriceToPay: number;
}

const cartContext = createContext<CartContextType | null>(null);

const CartContextProdiver = ({ children }: { children: ReactNode }) => {
  const [cartItems, setCartItems] = useState<Product[]>([]);
  

  const totalPrice = cartItems.reduce((total, item) => {
    const selectedCapacity = item.capacities[item.selectedCapacityIndex ?? 0];
    return total + selectedCapacity.discount;
  }, 0);
  const totalPriceToPay = 
  cartItems.reduce((total, item) => {
    const selectedCapacity = item.capacities[item.selectedCapacityIndex ?? 0];
    return total + selectedCapacity.finalPrice;
  }, 0);
  const totalDiscount = totalPrice - totalPriceToPay; 

  //need to add check for same products 
  function addToCart(item: Product) {
    setCartItems((prevItems) => [...prevItems, item]);
  }

  const removeFromCart = (item: Product) => {
    setCartItems((prevItems) => prevItems.filter((i) => i.id !== item.id));
  };

  return (
    <cartContext.Provider value={{ cartItems, addToCart, removeFromCart,totalPrice,totalDiscount,totalPriceToPay }}>
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
