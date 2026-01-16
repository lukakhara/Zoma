import footerShape from "../assets/footershape.png";
import cart from "../assets/footerCart.png";
import house from "../assets/home.png";
import user from "../assets/user.png";
import logo from "../assets/logo.png";

interface footerProps {
  languageGeorgian: boolean;
}

const Footer = ({ languageGeorgian }: footerProps) => {
  return (
    <>
      <footer
        className="flex flex-col w-full h-auto justify-center items-center relative overflow-x-hidden md:hidden"
        style={{ backgroundImage: `url(${footerShape})` }}
      >
        <button
          className="size-16 rounded-full bg-blue-50 relative
            grid place-items-center"
        >
          <img src={cart} alt="cart icon" />
          <span className="absolute top-2 right-1  bg-orange-100 rounded-full text-white size-4 grid place-items-center text-[14px] ">
            1
          </span>
        </button>
        <div className="flex items-center w-full text-white justify-around">
          <div className="flex gap-2">
            <img src={house} className="size-6" alt="house icon" />
            <button>{languageGeorgian ? "მთავარი" : "Home"}</button>
          </div>
          <div className="flex gap-2">
            <button>{languageGeorgian ? "პროფილი" : "Profile"}</button>
            <img src={user} className="bg-white size-7" alt="user icon " />
          </div>
        </div>
      </footer>

      <footer className="text-white  bg-blue-50 md:flex justify-around
      hidden ">
        {/* logo for footer */}
        <section className="flex flex-col justify-around">
          <img src={logo} alt="logo icon" />
          <p>Created by Integrals</p>
        </section>
        {/* physical office address and working time */}
        <section className="flex gap-4 flex-col justify-around">
          <div className="flex gap-10 items-start">
            <p>
              Head Office, Street Name #13 <br />
              Tbilisi,Georgia
            </p>
            <p>10:00-18:00</p>
          </div>
          <div className="flex gap-10 items-start">
            <p>
              Head Office, Street Name #13 <br />
              Tbilisi,Georgia
            </p>
            <p>10:00-18:00</p>
          </div>
          <div className="flex gap-10 items-start">
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
          <div className="flex">
            <img className="rounded-full size-5.25 bg-white" src="" alt="" />
            <p>+995 55 55 55</p>
          </div>
          <div className="flex">
            <img className="rounded-full size-5.25 bg-white" src="" alt="" />
            <p>+995 55 55 55</p>
          </div>
          <div className="flex">
            <img className="rounded-full size-5.25 bg-white" src="" alt="" />
            <p>+995 55 55 55</p>
          </div>
          <div className="flex">
            <img className="rounded-full size-5.25 bg-white" src="" alt="" />
            <p>zoma@info.ge</p>
          </div>
          {/* social network links */}
          <div className="">
            <button className="rounded-full size-5.25 bg-white">
              <img src="" alt="facebook icon" />
            </button>
            <button className="rounded-full size-5.25 bg-white">
              <img src="" alt="facebook icon" />
            </button>
            <button className="rounded-full size-5.25 bg-white">
              <img src="" alt="facebook icon" />
            </button>
            <button className="rounded-full size-5.25 bg-white">
              <img src="" alt="facebook icon" />
            </button>
          </div>
        </section>
      </footer>
    </>
  );
};

export default Footer;
