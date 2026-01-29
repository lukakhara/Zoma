import "./App.css";
import { useState } from "react";
import Header from "./components/Header";
import Footer from "./components/Footer";
import { Outlet } from "react-router-dom";


function Layout() {
  const [languageGeorgian, setLanguageGeorgian] = useState(true);

  return (
    <>
      <div className="min-h-screen h-full w-full bg-gray-200 ">
        <Header
          languageGeorgian={languageGeorgian}
          setLanguageGeorgian={setLanguageGeorgian}
        />
        <Outlet/>
        
        <Footer languageGeorgian={languageGeorgian} />
      </div>
    </>
  );
}

export default Layout;
