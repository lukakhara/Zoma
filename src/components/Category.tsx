import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next"; 

interface CategoryProps {
  filter: string;
  setFilter: (category:string) => void;
}



const Category = ({filter,setFilter}: CategoryProps) => {
  const { t } = useTranslation();
  const categories = t("categories", { returnObjects: true }) as string[];

  return (
    <>
      <section className="my-4 md:my-9 mx-1 w-full  flex justify-center ">
        <ul className="flex gap-2 overflow-hidden  md:gap-10">
          {Object.values(categories).map((category) => (
            <li key={category}>
              <button
                // ${index === activeButton ? "bg-blue-50 text-white" : "bg-gray-50 text-gray-100"}
                className={` ${filter === category ? "bg-blue-50 text-white" : "bg-gray-50 text-gray-100"}
                rounded-4xl px-4 py-2 cursor-pointer hover:opacity-90 `}
                onClick={() => setFilter(category)}
              >
                {category}
              </button>
            </li>
          ))}
        </ul>
      </section>
    </>
  );
};

export default Category;
