// hooks/useCartProducts.ts
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useCartStore } from "../store/useCartStore";

export interface FullCartItem {
  id: string;
  name: string;
  label: string;
  price: number;
  image: string;
  discount: number;
  finalPrice: number;
  amount: number;
  quantity: number;
}

// Shape returned by your backend for a translated product
interface ProductApiResponse {
  id: string;
  name: string;
  label: string;
  price: number;
  images: string[];
  discount: number;
  finalPrice: number;
  amount: number;
}

export function useCartProducts(): FullCartItem[] {
  const cartItems = useCartStore((state) => state.cartItems);
  const { i18n } = useTranslation();

  const [products, setProducts] = useState<Record<string, ProductApiResponse>>({});

  useEffect(() => {
    if (cartItems.length === 0) {
      setProducts({});
      return;
    }

    const ids = cartItems.map((item) => item.productId).join(",");
    const controller = new AbortController();

    fetch(`/api/products?ids=${ids}&lang=${i18n.language}`, {
      credentials: "include",
      signal: controller.signal,
    })
      .then((res) => {
        if (!res.ok) throw new Error(`Failed to fetch cart products: ${res.status}`);
        return res.json();
      })
      .then((data: ProductApiResponse[]) => {
        const byId = Object.fromEntries(data.map((p) => [String(p.id), p]));
        setProducts(byId);
      })
      .catch((err) => {
        if (err.name !== "AbortError") console.error(err);
      });

    return () => controller.abort();
    // re-fetch when cart contents or language change
  }, [cartItems.map((i) => `${i.productId}:${i.quantity}`).join(","), i18n.language]);

  return cartItems
    .map((cartItem) => {
      const product = products[String(cartItem.productId)];
      if (!product) return null;

      return {
        id: product.id,
        amount: product.amount,
        name: product.name,
        label: product.label,
        price: Number(product.price),        // guard against Postgres numeric strings
        image: product.images[0],
        discount: Number(product.discount),
        finalPrice: Number(product.finalPrice),
        quantity: cartItem.quantity,
      };
    })
    .filter((item): item is FullCartItem => item !== null);
}