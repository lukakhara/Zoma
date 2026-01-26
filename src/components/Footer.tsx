import footerShape from "../assets/footershape.png";
import cart from "../assets/footerCart.png";
import house from "../assets/home.png";
import user from "../assets/Vector(9).png";
import logo from "../assets/logo.png";
import phone from "../assets/Social/phone.png";
import whatssap from "../assets/Social/whatsapp.png";
import viber from "../assets/Social/viber.png";
import message from "../assets/Social/message.png";
import facebook from "../assets/Social/facebook.png";
import instagram from "../assets/Social/instagram.png";
import linkedin from "../assets/Social/linkedin.png";
import tiktok from "../assets/Social/tiktokIcon.png";

interface footerProps {
  languageGeorgian: boolean;
}

const Footer = ({ languageGeorgian }: footerProps) => {
  return (
    <>
      {/* MOBILE FOOTER */}
      {/* <footer className="fixed bottom-0 left-0 right-0 md:hidden bg-no-repeat text-[#FFFFFF]  z-50 
      w-full min-w-full"> */}
        <footer className=" md:hidden bg-no-repeat text-[#FFFFFF]  z-50 
      w-full min-w-full">

        <div  className="min-w-full flex flex-col items-center relative pb-2 bg-no-repeat bg-cover bg-center bg-bottom w-full " 
        style={{ backgroundImage: `url(${footerShape})` }}>
          {/* cart button */}
          <button
            className="size-16 rounded-full bg-blue-50 relative
            grid place-items-center mb-2 "
          >
            <img src={cart} alt="cart icon" />
            <span className="absolute top-2 right-1  bg-orange-100 rounded-full text-white size-4 grid place-items-center text-[14px] ">
              1
            </span>
          </button>

          <div className=" flex items-center w-full text-white justify-around pb-4.25 mx-9">
            {/* MAIN PAGE BUTTON  */}
            <div className="flex gap-2">
              <img src={house} className="size-6" alt="house icon" />
              <button>{languageGeorgian ? "მთავარი" : "Home"}</button>
            </div>
            {/* PROFILE PAGE BUTTON  */}
            <div className="flex gap-2">
              <button className="opacity-19">
                {languageGeorgian ? "პროფილი" : "Profile"}
              </button>
              <img src={user} className="w-4.5 h-4.75" alt="user icon " />
            </div>
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
          <p className="text-xl">Created by Integrals</p>
        </section>
        {/* physical office address and working time */}
        <section className="flex gap-4 flex-col justify-around">
          <div className="flex gap-16.5 items-start">
            <p>
              Head Office, Street Name #13 <br />
              Tbilisi,Georgia
            </p>
            <p>10:00-18:00</p>
          </div>
          <div className="flex gap-16.5 items-start">
            <p>
              Head Office, Street Name #13 <br />
              Tbilisi,Georgia
            </p>
            <p>10:00-18:00</p>
          </div>
          <div className="flex gap-16.5 items-start">
            <p>
              Head Office, Street Name #13 <br />
              Tbilisi,Georgia
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
