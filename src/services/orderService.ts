const API = import.meta.env.VITE_API_URL;

export interface OrderItem {
  id: number;
  variant_id: number;
  quantity: number;
  unit_price: number;
  name: string;
  label?: string;
  image: string;
  discount: number;
  price: number;
  finalPrice: number;
}

export interface Order {
  id: number;
  status: "pending" | "confirmed" | "delivered";
  total: number;
  created_at: string;
  items: OrderItem[];
}

export async function getOrders(): Promise<Order[]> {
  const res = await fetch(`${API}/api/orders`, { credentials: "include" });
  if (!res.ok) throw new Error("Failed to fetch orders");
  const data = await res.json();

  return data.map((o: any) => ({
    ...o,
    total: Number(o.total), // <-- convert here
    items: o.items.map((i: any) => ({
      ...i,
      price: Number(i.unit_price), // <-- convert here
      finalPrice: i.discount
        ? Number((Number(i.unit_price) * (1 - i.discount / 100)).toFixed(2))
        : Number(i.unit_price),
    })),
  }));
}