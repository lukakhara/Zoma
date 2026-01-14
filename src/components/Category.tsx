import React, { useEffect, useState } from "react";
import en from "../en.json";
import ka from "../ka.json";

interface CategoryProps {
  languageGeorgian: boolean;
}

const Category = ({ languageGeorgian }: CategoryProps) => {
  const data = languageGeorgian ? en : ka;

  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    const data = languageGeorgian ? en : ka;
  }, []);

  const activeButtonStyle = isActive
    ? "bg-blue-50 text-white"
    : "bg-gray-50 text-gray-100";

  return (
    <>
      <section className="mt-4 md:mt-9 mx-1 w-full  flex justify-center ">
        <ul className="flex gap-2 overflow-hidden  md:gap-10">
          {Object.values(data.categories).map((category, index) => (
            <li key={index}>
              <button
                className={`${activeButtonStyle}
                rounded-4xl px-4 py-2 cursor-pointer hover:opacity-90`}
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
