import React from "react";
import Header from "./Header.tsx";
import Category from "./Category.tsx";
import Body from "./Body.tsx";
import Footer from "./Footer.tsx";

interface HomeProps {
  languageGeorgian: boolean;
  setLanguageGeorgian: (languageGeorgian: boolean) => void;
}

const Home = ({ languageGeorgian, setLanguageGeorgian }: HomeProps) => {
  return (
    <>
      <div>
        <Header
          languageGeorgian={languageGeorgian}
          setLanguageGeorgian={setLanguageGeorgian}
        />
        <Category languageGeorgian={languageGeorgian} />
        <Body languageGeorgian={languageGeorgian} />
        <Footer languageGeorgian={languageGeorgian} />
      </div>
    </>
  );
};

export default Home;
