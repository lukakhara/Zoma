import { createContext, useContext, useState, type ReactNode } from "react";
import { type CartItem } from "../types";

interface CartContextType {
  cartItems: CartItem[];
  setCartItems: (items: CartItem[]) => void;
  addToCart: (item: CartItem, addingItemsSum: number) => void;
  removeFromCart: (item: CartItem) => void;
  updateQuantity: (itemId: number, quantity: number, capacityIndex: number) => void;
  totalPrice: number;
  totalDiscount: number;
  totalPriceToPay: number;
}

const cartContext = createContext<CartContextType | null>(null);

const CartContextProdiver = ({ children }: { children: ReactNode }) => {
  const [cartItems, setCartItems] = useState<CartItem[]>([
  {
    name: "ზომა - ქაფი",
    category: "დასუფთავება",
    description: "Zoma Bafix Foam არის მზა, ქაფიანი საწმენდი საშუალება, რომელიც შექმნილია აბაზანის ზედაპირებიდან ნადების მოსაშორებლად. ის ეფექტურად აშორებს კირს და სხვა სახის ჭუჭყს. გამოდგება დაუზიანებელი ფაიფურის, კერამიკის და მინანქრის სანიტარული ზედაპირებისთვის.",
    amount: 1,
    capacities: [
       { "label": "500 ml", "price": 9.78, "quantity": 7, "discount": 12, "finalPrice": 8.61 },
      { "label": "600 ml", "price": 10.78, "quantity": 3, "discount": 8, "finalPrice": 9.92 },
      { "label": "2.5 l", "price": 38.78, "quantity": 3, "discount": 10, "finalPrice": 34.90 },
      { "label": "5 l", "price": 80.78, "quantity": 2, "discount": 15, "finalPrice": 68.66 }
    ],
    doNotUse: [
      "არ შეურიოთ Zoma Bafix Foam ქლორის შემცველ პროდუქტებს.",
      "არ გამოიყენოთ მჟავას მიმართ მგრძნობიარე ზედაპირებზე, როგორიცაა მარმარილო და სხვა."
    ],
    id: 1,
    image: ["/assets/product.png", "/assets/product2.png", "/assets/product.png"],
    instructionsForUse: [
      "შეისხურეთ ზედაპირზე",
      "დაელოდეთ 5–10 წუთი",
      "გახეხეთ ზედაპირი",
      "კარგად გაწმინდეთ და ჩამოიბანეთ"
    ],
    
    selectedCapacityIndex: 0,
    store: "შეინახეთ 5°C-დან 35°C-მდე ტემპერატურაზე."
  },
  {
    name: "ზომა - ქაფი",
    category: "დასუფთავება",
    description: "Zoma Bafix Foam არის მზა, ქაფიანი საწმენდი საშუალება, რომელიც შექმნილია აბაზანის ზედაპირებიდან ნადების მოსაშორებლად. ის ეფექტურად აშორებს კირს და სხვა სახის ჭუჭყს. გამოდგება დაუზიანებელი ფაიფურის, კერამიკის და მინანქრის სანიტარული ზედაპირებისთვის.",
    amount: 1,
    capacities: [
        { "label": "500 ml", "price": 9.78, "quantity": 7, "discount": 12, "finalPrice": 8.61 },
      { "label": "600 ml", "price": 10.78, "quantity": 3, "discount": 8, "finalPrice": 9.92 },
      { "label": "2.5 l", "price": 38.78, "quantity": 3, "discount": 10, "finalPrice": 34.90 },
      { "label": "5 l", "price": 80.78, "quantity": 2, "discount": 15, "finalPrice": 68.66 }
    ],
    doNotUse: [
      "არ შეურიოთ Zoma Bafix Foam ქლორის შემცველ პროდუქტებს.",
      "არ გამოიყენოთ მჟავას მიმართ მგრძნობიარე ზედაპირებზე, როგორიცაა მარმარილო და სხვა."
    ],
    id: 1,
    image: ["/assets/product.png", "/assets/product2.png", "/assets/product.png"],
    instructionsForUse: [
      "შეისხურეთ ზედაპირზე",
      "დაელოდეთ 5–10 წუთი",
      "გახეხეთ ზედაპირი",
      "კარგად გაწმინდეთ და ჩამოიბანეთ"
    ],
    
    selectedCapacityIndex: 1,
    store: "შეინახეთ 5°C-დან 35°C-მდე ტემპერატურაზე."
  }
]);

  const totalPrice = cartItems.reduce((total, item) => {
    const selectedCapacity = item.capacities[item.selectedCapacityIndex];
    return total + selectedCapacity.price * item.amount;
  }, 0);

  const totalPriceToPay = cartItems.reduce((total, item) => {
    const selectedCapacity = item.capacities[item.selectedCapacityIndex];
    return total + selectedCapacity.finalPrice * item.amount;
  }, 0);

  const totalDiscount = totalPrice - totalPriceToPay;

  //need to add checking for same products
  // function addToCart(item: CartItem,addingItemsSum:number) {
  //   const exists = cartItems.find((i) => i.id === item.id);
  //   const TooMuch = cartItems.find((i) => i.id === item.id && item.capacities[item.selectedCapacityIndex].quantity <= i.amount + addingItemsSum);

  //   if (TooMuch){
  //       setCartItems((prevItems) =>
  //       prevItems.map((i) =>
  //         i.id === item.id ?  { ...i, amount: item.capacities[item.selectedCapacityIndex].quantity } : i,
  //       ),
  //     );
  //   }
  //   if (exists) {
  //     setCartItems((prevItems) =>
  //       prevItems.map((i) =>
  //         i.id === item.id ?  { ...i, amount: i.amount + addingItemsSum } : i,
  //       ),
  //     );
  //   } else {
  //     setCartItems((prevItems) => [...prevItems, { ...item, amount: addingItemsSum }]);
  //   }
  // }

  function addToCart(item: CartItem, addingItemsSum: number) {
    const quantity = item.capacities[item.selectedCapacityIndex].quantity;
    const existing = cartItems.find((i) => i.id === item.id && i.selectedCapacityIndex === item.selectedCapacityIndex);
    console.log(existing);

    if (existing) {
      const newAmount = Math.min(existing.amount + addingItemsSum, quantity);
      setCartItems((prevItems) =>
        prevItems.map((i) =>
          i.id === item.id ? { ...i, amount: newAmount } : i,
        ),
      );
    } else {
      setCartItems((prevItems) => [
        ...prevItems,
        { ...item, amount: Math.min(addingItemsSum, quantity) },
      ]);
    }
  }

  function removeFromCart(item: CartItem) {
    setCartItems((prevItems) => prevItems.filter((i) =>
   i.id !== item.id || i.selectedCapacityIndex !== item.selectedCapacityIndex ));
  }

  function updateQuantity(itemId: number, amount: number,CapacityIndex:number) {
    setCartItems((prev) =>
      prev.map((item) => (item.id === itemId && 
         CapacityIndex === item.selectedCapacityIndex ?
           { ...item, amount } 
           :
            item)),
    );
  }

  console.log('------------------------------------------------',cartItems);

  return (
    <cartContext.Provider
      value={{
        cartItems,
        setCartItems,
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
