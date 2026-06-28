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
  finalPrice:number;
  quantity: number;
  amount:number;
  discount:number;
}


export interface CardProps {
  id: number;
  slug: string;
  category: string;
  name: string;
  image: string;
  min_price: string;       // Keeping as string to match database format
  min_final_price: string; // Keeping as string to match database format
  capacity:string,
  stock:number,
}



// types.ts
export interface CartItem {
  productId: number;
  variantId: number;
  quantity: number;
  name: string;       // display name (current language)
  capacity: string;   // "500ml"
  price: number;
  discount: number;
  imageUrl: string;
  stock:number;
}


