import { createContext, useContext, useState, type ReactNode } from "react";
import { type CartItem } from "../types";

interface CartContextType {
  cartItems: CartItem[];
  addToCart: (item: CartItem) => void;
  removeFromCart: (item: CartItem) => void;
  updateQuantity: (itemId: number, quantity: number) => void;
  totalPrice: number;
  totalDiscount: number;
  totalPriceToPay: number;
}

const cartContext = createContext<CartContextType | null>(null);

const CartContextProdiver = ({ children }: { children: ReactNode }) => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);

  const totalPrice = cartItems.reduce((total, item) => {
    const selectedCapacity = item.capacities[item.selectedCapacityIndex];
    return total + selectedCapacity.price * item.quantity;
  }, 0);

  const totalPriceToPay = cartItems.reduce((total, item) => {
    const selectedCapacity = item.capacities[item.selectedCapacityIndex];
    return total + selectedCapacity.finalPrice * item.quantity;
  }, 0);

  const totalDiscount = totalPrice - totalPriceToPay;

  //need to add checking for same products
  function addToCart(item: CartItem) { 
    const exists = cartItems.find(i => i.id === item.id);

    if (exists) {
      setCartItems(prevItems =>
        prevItems.map(i =>
          i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i
        )
      );
    } else {
      setCartItems(prevItems => [...prevItems, { ...item, quantity: 1 }]);
    }
  }

    
    function removeFromCart(item: CartItem) {
      setCartItems(prevItems => prevItems.filter((i) => i.id !== item.id));
    }

    function updateQuantity(itemId: number, quantity: number) {
      setCartItems(prev =>
        prev.map(item => (item.id === itemId ? { ...item, quantity } : item)),
      );  
    }

    return (
      <cartContext.Provider
        value={{
          cartItems,
          addToCart,
          removeFromCart,
          updateQuantity,
          totalPrice,
          totalDiscount,
          totalPriceToPay,
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
