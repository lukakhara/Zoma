export interface Product {
  id: string;
  name: string;
  category: string;
  purpose: string;
  description: string;
  instructionsForUse?: string[];
  doNotUse: string[];
  store?: string;
  images: string[];
  label: string;
  parentId: string;
  price: number;
  finalPrice: number;
  quantity: number;
  amount: number;
  discount: number;
}

interface CardVariant {
  id: number;
  capacity: string;
  price: number;
  discount: number;
  stock: number;
}

export interface CardProps {
  id: number;
  slug: string;
  category: string;
  name: string;
  image: string;
  variants: CardVariant[];
  min_price: number;
  min_final_price: number;
}

export interface CartItem {
  productId: number;
  variantId: number;
  slug: string;
  name: string;
  image: string;
  capacity: string;
  price: number;
  discount: number;
  stock: number;
  quantity: number;
}

// types.ts
// export interface CartItem {
//   productId: number;
//   variantId: number;
//   quantity: number;
//   name: string; // display name (current language)
//   capacity: string; // "500ml"
//   price: number;
//   discount: number;
//   image: string;
//   stock: number;
// }
