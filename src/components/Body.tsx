import Card from "./Card.tsx";
import productsData from "../locales/products.json";
import { useTranslation } from "react-i18next";
import { useMemo } from "react";

const Body = ({ filter }: { filter: string }) => {
  const { t, i18n } = useTranslation();
  const productsName = useMemo(() => {
    return t("products", { returnObjects: true }) as Record<
      string,
      { name: string; category: string }
    >;
  }, [i18n.language]);

  const products = useMemo(() => {
    return productsData
      .filter(
        (p, index, arr) =>
          arr.findIndex((x) => x.parentId === p.parentId) === index,
      )
      .map((p) => ({
        ...p,
        quantity: 1,
        name: productsName[p.parentId]?.name,
        category: productsName[p.parentId]?.category,
      }));
  }, [productsName]);

  const filteredProducts = useMemo(() => {
    return filter === ""
      ? products
      : products.filter((product) => product.category === filter);
  }, [filter,products]);

  return (
    <div className="grid  w-full grid-cols-2 gap-1.5  md:gap-6  md:pb-22 md:grid-cols-3   lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6  ">
      {filteredProducts.map((product,index) => (
        <Card key={product.id} product={product} index={index} />
      ))}
    </div>
  );
};

export default Body;
