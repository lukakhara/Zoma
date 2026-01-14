import React from "react";
import footerShape from "../assets/footershape.png";
import cart from "../assets/footerCart.png";
import house from "../assets/home.png";
import user from "../assets/user.png";

interface footerProps{
  languageGeorgian:boolean;
}

const Footer = ({languageGeorgian} : footerProps) => {
  return (
    <>
      <footer
        className="flex flex-col w-full h-auto justify-center items-center relative"
        style={{ backgroundImage: `url(${footerShape})` }}
      >
        <button
          className="size-[64px] rounded-full bg-blue-50 relative
            grid place-items-center"
        >
          <img src={cart} alt="cart icon" />
          <span className="absolute top-2 right-1  bg-orange-100 rounded-full text-white size-4 grid place-items-center text-[14px] ">1</span>
          
        </button>
        <div className="flex items-center w-full text-white justify-around">
          <div className="flex gap-2">
            <img src={house} className="size-6" alt="house icon" />
            <button>{languageGeorgian ? 'მთავარი' : 'Home'}</button>
          </div>
          <div className="flex gap-2">
            <button>{languageGeorgian ? 'პროფილი' : 'Profile'}</button>
            <img src={user} className="bg-white size-7" alt="user icon " />
          </div>
        </div>
      </footer>
    </>
  );
};

export default Footer;
