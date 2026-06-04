import georgiaFlagIcon from "/assets/georgia-flag-icon.png";
import englandFlagIcon from "/assets/england-flag-icon.png";
import search from "/assets/search.png";
import logo from "/assets/logo.png";
import wifi from "/assets/MobileIcons/Wifi.png";
import battery from "/assets/MobileIcons/Battery.png";
import mobileSignal from "/assets/MobileIcons/Mobile-Signal.png";
import collapseIcon from "/assets/collapse.png";
import userIcon from "/assets/user.png";
import cartIcon from "/assets/cart.png";
import logoDesktop from "/assets/logoDesktop.png";
import { Link } from "react-router-dom";
import i18next from "i18next";
import { useTranslation } from "react-i18next";
import { useCartContext } from "../context/CartContext";



const Header = () => {
  const { i18n,t  } = useTranslation();
  const languageGeorgian = i18n.language === "ka";


  const {cartItems} = useCartContext();

  const currentData = new Date();
  const currentHour = currentData.getHours();
  const currentMinute = String(currentData.getMinutes()).padStart(2, "0");


  return (
    <>
      <header className="bg-blue-50 rounded-b-2xl md:rounded-none  px-7.25 pb-5 md:py-8.75 md:px-30">
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
            <Link
              className="flex items-baseline justify-center gap-2 p text-[16px]"
              to="/"
            >
              {t("product")}
              <img src={collapseIcon} alt="collapse icon" />
            </Link>

            <Link to="/news">
              {t("news")}
            </Link>

            <Link to="/contact">
             {t("contact")}
            </Link>
          </div>
          <div className="flex gap-2 ">
            <button className="headerButton">
              <img className="" src={search} alt="seach icon" />
            </button>

            <Link
              to="/checkout"
              className="hidden headerButton md:grid relative size-9  pt-[11.77px]"
            >
              <img
                src={cartIcon}
                alt="seach icon"
                className="size-[15.03px] "
              />
              <span
                className="absolute top-2.5 right-1 rounded-full text-[7.85px]
                text-[#FFFFFF] bg-[#FF4C4C] size-[8.97px]  text-center center"
              >
                {cartItems.length}
              </span>
            </Link>
            <Link className="hidden headerButton md:grid" to="/user/profile">
              <img src={userIcon} alt="seach icon" />
            </Link>

            <button
              className="border border-gray-50  rounded-full size-9 grid place-items-center cursor-pointer hover:opacity-90"
              onClick={() =>
                i18next.changeLanguage(i18next.language === "ka" ? "en" : "ka")
              }
            >
              <img
                className=""
                src={languageGeorgian ? englandFlagIcon : georgiaFlagIcon}
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
