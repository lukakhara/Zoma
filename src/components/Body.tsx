import Card from "./Card.tsx";
import productsData from "../locales/products.json";
import { useTranslation } from "react-i18next";

const Body = ({ filter }: { filter: string }) => {
  const { t } = useTranslation();
  const productsName = t("products", { returnObjects: true }) as Record<
    string,   
    { name: string ,category: string }
  >;

  

const products = productsData
  .filter((p, index, arr) => arr.findIndex((x) => x.parentId === p.parentId) === index)
  .map((p) => ({
    ...p,
    quantity: 1,
    name: productsName[p.parentId]?.name,
    category: productsName[p.parentId]?.category,
  }));



  const filteredProducts =
    filter === ""
      ? products
      : products.filter((product) => product.category === filter);

console.log('cart components is rendering');

  return (
    <div className="grid  w-full grid-cols-2 gap-1.5  md:gap-6  md:pb-22 md:grid-cols-3   lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6  ">
      {filteredProducts.map((product) => (
        <Card key={product.id} product={product} />
      ))}
    </div>
  );
};

export default Body;
