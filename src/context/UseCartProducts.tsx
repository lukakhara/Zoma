// hooks/useCartProducts.ts
import { useTranslation } from "react-i18next";
import { useCartContext } from "../context/CartContext";
import productsJson from "../locales/products.json"; 

// The full shape you use everywhere in the cart UI
export interface FullCartItem {
  id: string;
  name: string;
  label: string;
  price: number;
  image: string;
  discount: number;
  finalPrice: number;
  amount: number;
}

export function useCartProducts(): FullCartItem[] {
  const { cartItems } = useCartContext();
  const { t } = useTranslation();

  const translations = t("products", { returnObjects: true }) as Record<
    string,
    { name: string; description: string; categorie: string }
  >;

  return cartItems
    .map((cartItem) => {
      const staticData = productsJson.find((p) => String(p.id) === String(cartItem.id));
      const i18nData = staticData ? translations[staticData.parentId] : undefined;

      // guard: skip if product no longer exists
      if (!staticData || !i18nData) return null;


      return {
        id: cartItem.id,
        amount: cartItem.quantity,
        name: i18nData.name,
        label: staticData.label,
        price: staticData.price,
        image: staticData.images[0], // assuming you want the first image
        discount: staticData.discount,
        finalPrice: staticData.finalPrice,
      };
    })
    .filter((item): item is FullCartItem => item !== null);
}
