import React from "react";
import georgiaFlagIcon from "../assets/georgiaFlagIcon.png";
import englandFlagIcon from "../assets/englandFlagIcon.png";
import search from "../assets/search.png";
import logo from "../assets/logo.png";
import wifi from "../assets/Wifi.png";
import battery from "../assets/Battery.png";
import mobileSignal from "../assets/Mobile Signal(1).png";
import collapseIcon from "../assets/collapse.png";
import userIcon from "../assets/user.png";
import cartIcon from "../assets/cart.png";


interface HeaderProps {
  language: string;
  setLanguage: (lang: string) => void;
}

const Header = ({ language }: HeaderProps) => {
  return (
    <>
      <header className="bg-blue-50 rounded-b-2xl  px-10 py-8 ">
        <div className="flex items-center justify-between my-2 md:hidden">
          <h1 className="text-white">{language}</h1>
          <div className="flex gap-2">
            <img src={wifi} alt="icon" />
            <img src={battery} alt="icon" />
            <img src={mobileSignal} alt="icon" />
          </div>
        </div>

        <div className="flex items-center justify-between">
          <img src={logo} alt="logo" />
          <div className="test hidden md:flex gap-2 text-white">
            <a className="flex items-center">
              <button>Products</button>
              <img src={collapseIcon} alt="collapse icon" className="size-4" />
            </a>
            <a href="">News</a>
            <a href="">Contact</a>
          </div>
          <div className="flex gap-2">
            <img
              className="size-9.5 bg-gray-50 rounded-full"
              src={search}
              alt="seach icon"
            />
            <img
              className="size-9.5 bg-gray-50 rounded-full hidden md:blockh"
              src={cartIcon}
              alt="seach icon"
            />
            <img
              className="size-9.5 bg-gray-50 rounded-full hidden md:blockh"
              src={userIcon}
              alt="seach icon"
            />
            <img
              className="size-9.5 border-1 border-gray-50 "
              src={englandFlagIcon}
              alt="language change icon"
            />
          </div>
        </div>
      </header>
    </>
  );
};

export default Header;
