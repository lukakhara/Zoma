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
import logoDesktop from "../assets/logoDesktop.png";


interface HeaderProps {
  languageGeorgian: boolean;
  setLanguageGeorgian: (languageGeorgian: boolean) => void;
}

const Header = ({ languageGeorgian,setLanguageGeorgian }: HeaderProps) => {
  const currentData = new Date();
  const currentHour = currentData.getHours();
  const currentMinute = currentData.getMinutes();



  return (
    <>
      <header className="bg-blue-50 rounded-b-2xl md:rounded-none  px-[29px] pb-5 md:py-[35px] md:px-30">
        <div className="flex items-center justify-between  md:hidden py-2.5">
          <h1 className="text-white font-bold">{`${currentHour}:${currentMinute}`}</h1>
          <div className="flex gap-2">
            <img src={mobileSignal} alt="icon" />
            <img src={wifi} alt="icon" />
            <img src={battery} alt="icon" />
          </div>
        </div>

        <div className="flex items-center justify-between">
          <img className="md:hidden" src={logo} alt="logo" />
          <img className="hidden md:block" src={logoDesktop} alt="logo" />
          <div className=" hidden md:flex gap-2 text-white md:gap-9">
            <a className="flex items-baseline justify-center gap-2" href="">
              <button className="text-[16px]">Products</button>
              <img src={collapseIcon} alt="collapse icon"  />
            </a>
            <a href="">News</a>
            <a href="">Contact</a>
          </div>
          <div className="flex gap-2 ">
            <button className="headerButton">
              <img className="" src={search} alt="seach icon" />
            </button>

            <button className="hidden headerButton md:block">
              <img
                src={cartIcon}
                alt="seach icon"
              />
            </button>
            <button className="hidden headerButton md:block">
              <img
                src={userIcon}
                alt="seach icon"
              />
            </button>

            <button className="border-1 border-gray-50  rounded-full size-9 grid place-items-center cursor-pointer hover:opacity-90"
            onClick={() => setLanguageGeorgian(!languageGeorgian)}>

              <img
                className=""
                src={languageGeorgian ?  englandFlagIcon :  georgiaFlagIcon}
                alt="language change icon"
              />
            </button>
          </div>
        </div>
      </header>
    </>
  );
};

export default Header;
