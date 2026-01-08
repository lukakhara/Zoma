import React, { useState } from "react";
import en from "../en.json";
import ka from "../ka.json";

interface CategoryProps {
  language: string;
}

const Category = ({ language }: CategoryProps) => {
  const isGeorgian = language === "georgian";
  const data = isGeorgian ? ka : en;
  const [isActive, setIsActive] = useState(false);

  const activeButtonStyle = isActive
    ? "bg-blue-50 text-white"
    : "bg-gray-50 text-gray-100";

  return (
    <>
      <section className="mt-4 ">
        <ul className="flex gap-2 overflow-hidden">
          {Object.values(data.categories).map((category, index) => (
            <li key={index}>
              <button className={`${activeButtonStyle}
                rounded-4xl px-4 py-2 cursor-pointer hover:opacity-90`}>
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
