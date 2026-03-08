import Card from "./Card";
import en from "../en.json";
import ka from "../ka.json";
import { useLanguage } from "../context/LanguageContext";
import {type Product } from "../types";


const Body = () => {
   const { languageGeorgian } = useLanguage();       
  const data = languageGeorgian ?  en : ka;  
  const productData = data.products as Product[];

  return (
    <div className="grid  w-full grid-cols-2 gap-6 px-2.5 md:pb-22 m-auto md:grid-cols-3 lg:grid-col-4 xl:grid-cols-5 2xl:grid-cols-6 md:px-30  ">
      {productData.map((product) => (
        <Card key={product.id} product={product} />
      ))}
    </div>
  );
};

export default Body;
