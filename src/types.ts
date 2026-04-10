export interface Capacity {
  price: number;
  discount: number;
  finalPrice: number;
}

export interface Product {
  id: number;
  name?: string;
  categorie: string;
  purpose?: string;
  startingPrice?: number;
  endPrice: number;
  quantity: number;
  image: string[];
  capacities?: Partial<Record<string, Capacity>>;
  description?: string;
  instructionsForUse?: string[];
  doNotUse?: string[];
  store?: string;
}

export interface CardProps {
  product: Product;
}