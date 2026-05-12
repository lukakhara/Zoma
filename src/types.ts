export interface Capacity {
  label: string;
  price: number;
  quantity:number,
  discount: number;
  finalPrice: number;
}
export interface Product {
  id: number;
  name?: string;
  category?: string;
  purpose?: string;
  image: string[];
  capacities: Capacity[];
  description?: string;
  instructionsForUse?: string[];
  doNotUse?: string[];
  store?: string;
}

export interface CartItems extends Product{
  quantity:number;
  selectedCapacityIndex:number;
}

export interface CardProps {
  product: Product;
}

