import React from "react";
import Category from "./Category.tsx";
import Body from "./Body.tsx";


interface HomeProps {
  languageGeorgian: boolean;
  setLanguageGeorgian: (languageGeorgian: boolean) => void;
}

const Home = ({ languageGeorgian, setLanguageGeorgian }: HomeProps) => {
  return (
    <>
      <div>
        <Category languageGeorgian={languageGeorgian} />
        <Body languageGeorgian={languageGeorgian} />
      </div>
    </>
  );
};

export default Home;
