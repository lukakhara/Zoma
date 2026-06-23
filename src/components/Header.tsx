
import { FaWifi } from "react-icons/fa";
import { IoIosBatteryFull } from "react-icons/io";
import { BsReception4 } from "react-icons/bs";
import { FaMagnifyingGlass } from "react-icons/fa6";
import collapseIcon from "/assets/collapse.png";
import userIcon from "/assets/user.png";
import cartIcon from "/assets/cart.png";
import logoDesktop from "/assets/logo.webp";
import { Link, useNavigate } from "react-router-dom";
import i18next from "i18next";
import { useTranslation } from "react-i18next";
import { useCartContext } from "../context/CartContext";
import EnglandFlag from "/public/assets/gb.svg";
import GeorgiadFlag from "/public/assets/ge.svg";
import { MdArrowBackIosNew } from "react-icons/md";
import { useLocation } from "react-router-dom";
import { useEffect } from "react";

const Header = () => {
  const { i18n, t } = useTranslation();
  const languageGeorgian = i18n.language === "ka";

  const location = useLocation();
  const isHome = location.pathname === "/";

  const navigate = useNavigate();
  console.log("ishome=", isHome);
  const { cartItems } = useCartContext();
  const currentData = new Date();
  const currentHour = currentData.getHours();
  const currentMinute = String(currentData.getMinutes()).padStart(2, "0");

  return (
    <>
      <header className="bg-blue-50 rounded-b-2xl md:rounded-none  px-7.25 pb-5 md:py-8.75 md:px-10  lg:px-30  ">
        <div className="flex items-center justify-between  md:hidden py-2.5">
          <h1 className="text-white font-bold">{`${currentHour}:${currentMinute}`}</h1>
          <div className="flex gap-2">
            <BsReception4 className="text-white" />
            <FaWifi className="text-white" />
            <IoIosBatteryFull className="text-white min-w-[24px] min-h-[11px]" />
          </div>
        </div>

        <div className="flex items-center justify-between">
           <img className="md:block hidden" src={logoDesktop} alt="logo" />
          {isHome ? (
            <img className="block md:hidden" src={logoDesktop} alt="logo" />
          ) : (
            <button
              className="block md:hidden size-[50px] rounded-full bg-[rgba(223,223,223,0.54)] flex items-center justify-center cursor-pointer hover:opacity-85"
              onClick={() => navigate(-1)}
            >
              <MdArrowBackIosNew className="text-white " />
            </button>
          )}

          <div className=" hidden md:flex gap-2 text-white md:gap-9">
            <Link
              className="flex items-baseline justify-center gap-2 p text-[16px]"
              to="/"
            >
              {t("productsHeader")}
              <img src={collapseIcon} alt="collapse icon" />
            </Link>

            <Link to="/news">{t("news")}</Link>

            <Link to="/contact">{t("contact")}</Link>
          </div>
          <div className="flex gap-2 ">
            <button className="headerButton">
              <FaMagnifyingGlass className="text-[#2E4790]" />
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
              className="border border-gray-50  rounded-full size-[38px] grid place-items-center cursor-pointer hover:opacity-90"
              onClick={() =>
                i18next.changeLanguage(i18next.language === "ka" ? "en" : "ka")
              }
            >
              <img
                className="rounded-full"
                src={languageGeorgian ? EnglandFlag : GeorgiadFlag}
                alt="language change icon"
                width={21}
                height={21}
              />
              {/* <img src={EnglandFlag} alt="England" width={24} /> */}
            </button>
          </div>
        </div>
      </header>
    </>
  );
};

export default Header;
