import footerShape from "/assets/footershape.png";
import cart from "/assets/footerCart.png";
import house from "/assets/home.png";
import user from "/assets/Vector(9).png";
import logo from "/assets/logo.png";
import phone from "/assets/Social/phone.png";
import whatssap from "/assets/Social/whatsapp.png";
import viber from "/assets/Social/viber.png";
import message from "/assets/Social/message.png";
import facebook from "/assets/Social/facebook.png";
import instagram from "/assets/Social/instagram.png";
import linkedin from "/assets/Social/linkedin.png";
import tiktok from "/assets/Social/tiktokIcon.png";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import { useCartContext } from "../context/CartContext";

const Footer = () => {
  const { i18n } = useTranslation();
  const languageGeorgian = i18n.language === "ka";
  const { cartItems } = useCartContext();

  return (
    <>
      {/* MOBILE FOOTER */}
      {/* <footer className="fixed bottom-0 left-0 right-0 md:hidden bg-no-repeat text-[#FFFFFF]  z-50 
      w-full min-w-full"> */}
      <footer
        className=" md:hidden bg-no-repeat text-[#FFFFFF]  z-50 
      w-full min-w-full sticky bottom-0 left-0 right-0  "
      >
        <div
          className="min-w-full flex flex-col items-center relative pb-2 bg-no-repeat bg-cover bg-center bg-bottom w-full "
          style={{ backgroundImage: `url(${footerShape})` }}
        >
          {/* cart button */}
          <Link
            to="/checkout"
            className="headerButton md:grid relative   size-[64.21px] rounded-full bg-blue-50 
            grid place-items-center mb-2  "
          >
            
            <img src={cart} alt="seach icon" className="size-8.25 " />
            <span
              className="absolute top-2.5 right-1 rounded-full text-[14px]
                text-[#FFFFFF] bg-[#FF4C4C] w-4 h-4.5  text-center center"
            >
              {cartItems.length}
            </span>
          </Link>

          {/* <button
            className=" "
          >
            <img src={cart} alt="cart icon" />
            <span className="absolute top-2 right-1  bg-orange-100 rounded-full text-white size-4 grid place-items-center text-[14px] ">
              1
            </span>
          </button> */}

          <div className=" flex items-center w-full text-white justify-around pb-4.25 mx-9 ">
            {/* MAIN PAGE BUTTON  */}
            <Link
              className="flex items-baseline justify-center gap-2 p text-[16px]   cursor-pointer  "
              to="/"
            >
              <img src={house} className="size-6" alt="house icon" />
              <p>{languageGeorgian ? "მთავარი" : "Home"}</p>
            </Link>

            {/* PROFILE PAGE BUTTON  */}
            <Link
              className="flex gap-2  cursor-pointer flex items-center gap-2"
              to="/user/profile"
            >
              <img src={user} alt="seach icon" />
              <p>{languageGeorgian ? "პროფილი" : "Profile"}</p>
            </Link>
          </div>
        </div>
      </footer>

      {/* DESKTOP FOOTER */}
      <footer
        className="text-white  bg-blue-50 md:flex justify-around
      hidden py-12.25 "
      >
        {/* logo for footer */}
        <section className="flex flex-col justify-between">
          <img
            src={logo}
            className="max-w-[108.14px] max-h-[51px] h-auto"
            alt="logo icon"
          />
          <p className="text-xl">
            {languageGeorgian
              ? "შექმნილია Integrals-ის მიერ"
              : "Created by Integrals"}
          </p>
        </section>
        {/* physical office address and working time */}
        <section className="flex gap-4 flex-col justify-around">
          <div className="flex gap-16.5 items-start">
            <p>
              {languageGeorgian
                ? "მთავარი ოფისი, ქუჩა #13"
                : "Head Office, Street Name #13 "}
              <br />
              {languageGeorgian ? "თბილისი, საქართველო" : "Tbilisi, Georgia"}
            </p>
            <p>10:00-18:00</p>
          </div>
          <div className="flex gap-16.5 items-start">
            <p>
              {languageGeorgian
                ? "მთავარი ოფისი, ქუჩა #13"
                : "Head Office, Street Name #13 "}
              <br />
              {languageGeorgian ? "თბილისი, საქართველო" : "Tbilisi, Georgia"}
            </p>
            <p>10:00-18:00</p>
          </div>
          <div className="flex gap-16.5 items-start">
            <p>
              {languageGeorgian
                ? "მთავარი ოფისი, ქუჩა #13"
                : "Head Office, Street Name #13 "}
              <br />
              {languageGeorgian ? "თბილისი, საქართველო" : "Tbilisi, Georgia"}
            </p>
            <p>10:00-18:00</p>
          </div>
        </section>
        {/* phone numbers and social links */}
        <section>
          {/* phone numbers */}
          <div className="flex gap-1.75 flex-col">
            <div className="flex gap-1.75 items-center ">
              <img
                className="rounded-full size-5.25"
                src={phone}
                alt="mobile icon"
              />
              <p className="text-[12.49px] leading-[160%] ">+995 55 55 55</p>
            </div>
            <div className="flex gap-1.75 items-center">
              <img
                className="rounded-full size-5.25 "
                src={whatssap}
                alt="whatsapp icon"
              />
              <p className="text-[12.49px] leading-[160%] ">+995 55 55 55</p>
            </div>
            <div className="flex gap-1.75 items-center">
              <img
                className="rounded-full size-5.25 "
                src={viber}
                alt="Viber icon"
              />
              <p className="text-[12.49px] leading-[160%] ">+995 55 55 55</p>
            </div>
            <div className="flex gap-1.75 items-center">
              <img
                className="rounded-full size-5.25 bg-white"
                src={message}
                alt="letter icon"
              />
              <p className="text-[12.49px] leading-[160%] ">zoma@info.ge</p>
            </div>
          </div>

          {/* social network links */}
          <div className="flex gap-1.75 mt-4">
            <button className="rounded-full  bg-white  center">
              <img src={facebook} alt="facebook icon" />
            </button>
            <button className="rounded-full  bg-white center">
              <img src={instagram} alt="instagram icon" />
            </button>
            <button className="rounded-full  bg-white center">
              <img src={linkedin} alt="instagram icon" />
            </button>
            <button className="rounded-full  bg-white center">
              <img src={tiktok} alt="tiktok icon" />
            </button>
          </div>
        </section>
      </footer>
    </>
  );
};

export default Footer;
