import Card from "./Card";
import en from "../en.json";
import ka from "../ka.json";

interface Language {
  languageGeorgian: boolean;
}

interface Product {
  id: number;
  name: string;
  categorie: string;
  startingPrice: number;
  endPrice: number;
  quantity: number;
  image: string;
}

const Body = ({ languageGeorgian }: Language) => {
  const data = languageGeorgian ?  en: ka;
  const productData = data.products;

  return (
    <div className="grid  w-full grid-cols-2 gap-6 px-2.5 md:pb-22 m-auto md:grid-cols-3 lg:grid-col-4 xl:grid-cols-5 2xl:grid-cols-6 md:px-30  ">
      {productData.map((product) => (
        <Card
          key={product.id}
          product={product}
          languageGeorgian={languageGeorgian}
        />
      ))}
    </div>
  );
};

export default Body;
