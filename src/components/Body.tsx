import Card from "./Card";
import productsData from "../locales/products.json";
import { type CartItem} from "../types";
import { useTranslation } from "react-i18next";

const Body = ({ filter }: { filter: string }) => {
  const { t } = useTranslation();
  const productsName = t("products", { returnObjects: true }) as Record<
    string,   
    { name: string ,category: string }
  >;


  const products = (productsData as CartItem[]).map((product) => ({
    ...product,
    quantity: 1,
    selectedCapacityIndex: 0,
    name: productsName[product.id]?.name ?? product.name,
    category: productsName[product.id]?.category ?? product.category,
  }));


  const filteredProducts =
    filter === ""
      ? products
      : products.filter((product) => product.category === filter);

    console.log('filteredProducts:', filteredProducts[0]);  

  return (
    <div className="grid  w-full grid-cols-2 gap-6 px-2.5 md:pb-22 m-auto md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6  ">
      {filteredProducts.map((cartItem) => (
        <Card key={cartItem.id} cartItem={cartItem} />
      ))}
    </div>
  );
};

export default Body;
