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
  capacity_unit: string;
  capacity_value: number;
  discount: number;
}

export interface CardProps {
  capacity_unit: string;
  capacity_value: number;
  id: number;
  slug: string;
  category: string;
  name: string;
  image: string;
  variants: CardVariant[];
}

export interface CardVariant {
  id: number;
  capacity_unit: string;
  capacity_value: number;
  price: number;
  discount: number;
  stock: number;
  finalPrice: number;
}

export interface CartItem {
  productId: number;
  variantId: number;
  slug: string;
  name: string;
  image: string;
  capacity_unit: string;
  capacity_value: number;
  price: number;
  discount: number;
  stock: number;
  quantity: number;
}
