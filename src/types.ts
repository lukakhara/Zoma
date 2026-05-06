export interface Capacity {
  label: string;
  price: number;
  discount: number;
  finalPrice: number;
}

export interface Product {
  id: number;
  name?: string;
  category?: string;
  purpose?: string;
  startingPrice?: number;
  endPrice: number;
  quantity: number;
  image: string[];
  capacities?: Capacity[];
  description?: string;
  instructionsForUse?: string[];
  doNotUse?: string[];
  store?: string;
}

export interface CardProps {
  product: Product;
}

