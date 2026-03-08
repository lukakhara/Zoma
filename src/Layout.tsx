import "./App.css";
import { useState } from "react";
import Header from "./components/Header";
import Footer from "./components/Footer";
import { Outlet } from "react-router-dom";


function Layout() {

  return (
    <>
      <div className="min-h-screen flex flex-col h-full w-full bg-gray-200 ">
        <Header
        />
        <main className="flex-1">
            <Outlet/>
        </main>
      
        
        <Footer />
      </div>
    </>
  );
}

export default Layout;
