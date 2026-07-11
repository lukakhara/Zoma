import Card from "./Card.tsx";
import { useTranslation } from "react-i18next";
import { useEffect, useState } from "react";
import { getProducts } from "../services/productService.ts";
import type { CardProps } from "../types";

const Body = ({ filter }: { filter: string }) => {
  const {i18n } = useTranslation();
  const [products, setProducts] = useState<CardProps[]>([]);

  useEffect(() => {
    getProducts(i18n.language, filter || undefined)
      .then((data) => setProducts(data))
      .catch((error) => console.error("error message", error));
  }, [i18n.language, filter]);

  return (
    <div className="grid  w-full grid-cols-2 gap-1.5  md:gap-6  md:pb-22 md:grid-cols-3   lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6  ">
      {products.map((product, index) => (
        <Card key={product.id} product={product} index={index} />
      ))}
    </div>
  );
};

export default Body;
