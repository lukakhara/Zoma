import playIcon from "/assets/play.png";
import cartIcon from "/assets/cart.png";
import { type CardProps } from "../types";
import { Link } from "react-router";
import { useCartContext } from "../context/CartContext";
import { useTranslation } from "react-i18next";
import { useState } from "react";
import { ChevronDown } from "lucide-react";

const Card = ({ product }: { product: CardProps }) => {
  const { i18n } = useTranslation();
  const languageGeorgian = i18n.language === "ka";

  const { addToCart } = useCartContext();

  const [quantity, setQuantity] = useState(1);
  console.log('cart components is rendering');

  return (
    <>
      <div className=" rounded-xl  bg-white flex flex-col relative ">
        <div className="  pb-2">
          <div className="flex justify-between items-center  -z-10">
            <button className="cursor-pointer size-[23.76px] centeredFlex mt-[10.67px] ml-[10.67px]">
              <img src={playIcon} className="" alt="playIcon" />
            </button>

            <button
              className="cursor-pointer size-[27.62px] centeredFlex bg-blue-100 rounded-full p-2
                mt-[8px] mr-[12.05px]    "
              onClick={() => addToCart(String(product.id),quantity)}
            >
              <img
                className="bg-none size-[14.83px] "
                src={cartIcon}
                alt="playIcon"
              />
            </button>
          </div>

          <img
            src={product.images[0]}
            className="w-[65.94px] h-[130.99px] object-cover relative bottom-5 z-100 m-auto  "
            alt="Product image"
          />

          {/* name and category and prices  */}
          <div className="flex flex-col font-helvetocaRegular pl-[19px] gap-[5px] desktop:pl-[0px] desktop:ml-[19px] desktop:mr-[12px] -mt-5 flex-1  ">
            {/* name and category */}
            <div className=" text-[#DDDDDD] text-[10px]  category leading-[100%]">
              {product.category}
            </div>
            <div className="text-[#1A1A1A] text-[14px]  leading-[100%]  overflow-hidden">
              {product.name}
            </div>
            {/* prices */}
            <div className="flex  items-center  gap-2 sm:text-nowrap">
              <p
                className="bg-[#FDE800] text-[20px]  text-[#474747]
             font-helvetocaMedium p-2 rounded-sm leading-[15.19px] sm:leading-[12.19px] desktop:p-[7.13px] "
              >
                {product.finalPrice}{" "}
                <span className="font-helvetocaRegular">₾</span>
              </p>
              <p className="font-helvetocaMedium text-[#C3C3C3] text-[20px]  line-through leading-[17.36px]">
                {product.price} <span>₾</span>
              </p>
            </div>
          </div>
        </div>

        <div className="flex items-baseline  gap-2 desktop:gap-[7.13px] justify-between  mb-[10px] ml-[15px] mr-[16px] mt-auto  ">
          <div className=" relative  h-[33px] desktop:mt-2.5   rounded-[100px]   bg-[#F2F2F2]  desktop:w-[50.79px] desktop:h-[33px] flex items-center justify-center   gap-1.5 w-[57px]">
            <select
              className="

                          absolute inset-0 opacity-0 cursor-pointer
                        "
              name="amounth"
              id="amounth"
              value={quantity}
              onChange={(e) => setQuantity(Number(e.target.value))}
            >
              {Array.from({ length: product.amount }, (_, i) => (
                <option key={i + 1} value={i + 1}>
                  {i + 1}
                </option>
              ))}
            </select>
            <span
              className=" 
                          text-blue-50
                          text-[18px]
                          flex items-center justify-center
                        
                          outline-none
                          cursor-pointer"
            >
              {quantity}
            </span>
            <ChevronDown className="size-3 " />
          </div>

          {/* Need to add product id to the link */}
          <Link
            className="cursor-pointer bg-blue-50 text-white  font-helvetocaRegular 
             py-2 px-6 rounded-[100px] text-[14px] flex-1 h-[33px] desktop:h-[29.41 px] flex items-center justify-center font-normal"
            to={`${/product/}${product.parentId ? product.parentId : product.id}`}
          >
            {languageGeorgian ? "ყიდვა" : "Buy Now"}
          </Link>
        </div>
      </div>
    </>
  );
};

export default Card;
