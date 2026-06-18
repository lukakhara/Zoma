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


export type CardProps = Pick<Product, 'id' | 'name'| 'category'| 'images'| 'label'| 'parentId'| 'price'
| 'finalPrice'| 'amount'| 'quantity'>;


// export interface CardProps{
//   id: string;
//   name: string;
//   category: string;
//   images: string[];
//   label: string;
//   parentId: string;
//   price: number;
//   finalPrice:number;
//   amount: number;
//   quantity: number;
// }


export interface CartItem{
  id:string;
  quantity:number;
}

