import cart from "/assets/footerCart.png";
import house from "/assets/home.png";
import user from "/assets/Vector(9).png";
import logo from "/assets/logo.webp";
import phone from "/assets/Social/phone.webp";
import whatssap from "/assets/Social/whatsapp.webp";
import viber from "/assets/Social/viber.webp";
import message from "/assets/Social/message.webp";
import facebook from "/assets/Social/facebook.webp";
import instagram from "/assets/Social/instagram.webp";
import linkedin from "/assets/Social/linkedin.webp";
import tiktok from "/assets/Social/tiktokIcon.webp";
import { FaUser } from "react-icons/fa";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import { useCartContext } from "../context/CartContext";
import { FaHouse } from "react-icons/fa6";

const Footer = () => {
  const { t } = useTranslation("translation", { keyPrefix: "footer" });
  const { cartItems } = useCartContext();

  return (
    <>
      <footer
        className=" md:hidden bg-no-repeat text-[#FFFFFF]  z-100 
      w-full min-w-full sticky bottom-0 left-0 right-0  "
      >
        <section className=" min-w-full flex flex-col items-center relative pb-2 w-full">
          <img
            src="public/footershape.png"
            alt="background of footer"
            fetchPriority="high"
            className="absolute inset-0 w-full h-full object-cover object-bottom -z-10"
          />
          {/* cart button */}
          <Link
            to="/checkout"
            className="headerButton md:grid relative   size-[64.21px] rounded-full bg-blue-50 
            flex items-center justify-center pt-2 pr-2   "
          >
            <img src={cart} alt="seach icon" className="size-[26.81px] " />
            <div
              className="absolute top-2 right-2 rounded-full 
                 bg-[#FF4C4C] w-4 h-4.5  text-center center"
            >
              <span className=" text-[14px] text-[#FFFFFF] absolute bottom-0 right-1">
                {cartItems.length}
              </span>
            </div>
          </Link>

          <div className=" flex items-center w-full text-white justify-around pb-4.25 mx-9 ">
            {/* MAIN PAGE BUTTON  */}
            <Link
              className="flex items-baseline justify-center gap-2 p text-[16px]   cursor-pointer   "
              to="/"
            >
              <FaHouse className="size-6"/> 
              <p className="">{t("home")}</p>
            </Link>

            {/* PROFILE PAGE BUTTON  */}
            <Link
              className="flex gap-2  cursor-pointer  items-center"
              to="/user/profile"
            >
              <FaUser/>
              <p>{t("profile")}</p>
            </Link>
          </div>
        </section>
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
          <p className="text-xl">{t("createdBy")}</p>
        </section>
        {/* physical office address and working time */}
        <section className="flex gap-4 flex-col justify-around">
          <div className="flex gap-16.5 items-start">
            <p>
              {t("mainOffice")}
              <br />
              {t("city")}
            </p>
            <p>10:00-18:00</p>
          </div>
          <div className="flex gap-16.5 items-start">
            <p>
              {t("mainOffice")}
              <br />
              {t("city")}
            </p>
            <p>10:00-18:00</p>
          </div>
          <div className="flex gap-16.5 items-start">
            <p>
              {t("mainOffice")}
              <br />
              {t("city")}
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
