import Card from "./Card";
import productsData from "../locales/products.json";
import { type Product } from "../types";
import { useTranslation } from "react-i18next";

const Body = ({ filter }: { filter: string }) => {
  const { t } = useTranslation();
  const productsName = t("products", { returnObjects: true }) as Record<
    string,   
    { name: string ,category: string }
  >;

  const products = (productsData as Product[]).map((product) => ({
    ...product,
    name: productsName[product.id]?.name ?? product.name,
    category: productsName[product.id]?.category ?? product.category,
  }));


  const filteredProducts =
    filter === ""
      ? products
      : products.filter((product) => product.category === filter);



  return (
    <div className="grid  w-full grid-cols-2 gap-6 px-2.5 md:pb-22 m-auto md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6  ">
      {filteredProducts.map((product) => (
        <Card key={product.id} product={product} />
      ))}
    </div>
  );
};

export default Body;
