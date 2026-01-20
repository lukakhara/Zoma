import "./App.css";
import { useState } from "react";
import Home from "./components/Home.tsx";
import ProductPage from "./components/ProductPage.tsx";
import Checkout from "./components/Checkout.tsx";
import Header from "./components/Header.tsx";
import Footer from "./components/Footer.tsx";

function App() {
  const [languageGeorgian, setLanguageGeorgian] = useState(true);

  return (
    <>
      <div className="min-h-screen h-full w-full bg-gray-200">
        <Header
          languageGeorgian={languageGeorgian}
          setLanguageGeorgian={setLanguageGeorgian}
        />
        {/* <Home
          languageGeorgian={languageGeorgian}
          setLanguageGeorgian={setLanguageGeorgian}
        /> */}
        {/* <ProductPage languageGeorgian={languageGeorgian} />   */}
        <Checkout  languageGeorgian={languageGeorgian} />
        <Footer languageGeorgian={languageGeorgian} />
      </div>
    </>
  );
}

export default App;
