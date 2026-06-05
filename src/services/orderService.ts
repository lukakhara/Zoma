import { type FullCartItem } from '../context/UseCartProducts'

export interface OrderItem {
  id: string;
  name: string;
  label: string;
  image: string;
  price: number;
  finalPrice: number;
  quantity: number;
}

export interface Order {
  id: string;
  items: OrderItem[];
  total: number;
  date: string;
  status: "pending" | "confirmed" | "delivered";
}

export const placeOrder = (cartItems: FullCartItem[]): Order => {
  const order: Order = {
    id: crypto.randomUUID(),
    items: cartItems.map((item) => ({
      id: item.id,
      name: item.name,
      label: item.label,
      image: item.image,
      price: item.price,
      finalPrice: item.finalPrice,
      quantity: item.quantity,
    })),
    total: cartItems.reduce((sum, i) => sum + i.finalPrice * i.quantity, 0),
    date: new Date().toISOString(),
    status: "pending",
  };

  const existing = JSON.parse(localStorage.getItem("orders") ?? "[]");
  localStorage.setItem("orders", JSON.stringify([...existing, order]));
  return order;
};

export const getOrders = (): Order[] => {
  return JSON.parse(localStorage.getItem("orders") ?? "[]");
};