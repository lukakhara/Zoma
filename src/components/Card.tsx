import playIcon from "/assets/play.png";
import cartIcon from "/assets/cart.png";
import { type CardProps } from "../types";
import { Link } from "react-router";
import { useCartContext } from "../context/CartContext";
import { useTranslation } from "react-i18next";
import { useState } from "react";

const Card = ({ product }: { product: CardProps }) => {
  const { i18n } = useTranslation();
  const languageGeorgian = i18n.language === "ka";

  const { addToCart } = useCartContext();

  const [quantity, setQuantity] = useState(1);

  return (
    <>
      <div className=" rounded-xl  bg-white flex flex-col justify-between relative">
        <div className="">
          <div className="flex justify-between items-center ">
            <button className="cursor-pointer size-[23.76px] centeredFlex mt-[10.67px] ml-[10.67px]">
              <img src={playIcon} className="" alt="playIcon" />
            </button>

            <button
              className="cursor-pointer size-[27.62px] centeredFlex bg-blue-100 rounded-full p-2
                mt-[8px] mr-[12.05px]    "
              onClick={() => addToCart(String(product.id))}
            >
              <img
                className="bg-none size-[14.83px] "
                src={cartIcon}
                alt="playIcon"
              />
            </button>
          </div>
          <div className=" w-full flex justify-center z-100  ">
            <img
              src={product.images[0]}
              className="w-[65.94px] h-[130.99px] object-cover "
              alt="Product image"
            />
          </div>
        </div>

        <div className="flex  flex-col  font-helvetocaRegular  ml-[19px] mr-[12px] pb-[6.6px] ">
          {/* name and category */}
          <div className=" text-[#7D7D7D] text-[10px] desktop:text-[8.91px] category leading-[100%] ">
            {product.category}
          </div>
          <div className="text-[#1A1A1A] text-[14px] desktop:text-[12.48px] leading-[100%]">{product.name}</div>
          {/* prices */}
          <div className="flex items-center  gap-2">
            <p className="bg-[#FDE800] text-[20px] desktop:text-[17.82px] text-[#474747] font-helvetocaMedium px-2 rounded-sm leading-[12.19px] p-[7.13px]">
              {product.finalPrice}{" "}
              <span className="font-helvetocaRegular">₾</span>
            </p>
            <p className="font-helvetocaMedium text-[#C3C3C3] text-[20px] desktop:text-[17.82px] line-through leading-[17.36px]">
              {product.price} <span>₾</span>
            </p>
          </div>
        </div>

        <div className="flex items-center gap-[7.13px] justify-between test mb-[10px] ml-[15px] mr-[16px]">
          <div className="relative inline-block  w-[50.79px] h-[29.41px] flex items-center justify-center">
            <select
              className="
                          appearance-none
                          bg-[#F2F2F2]
                          py-2
                          pl-3
                          pr-8
                          rounded-3xl
                          text-blue-50
                          text-[18px]hh
                          desktop:text-[16.04px]
                          outline-none
                          cursor-pointer
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

            {/* Custom Arrow */}
            <span
              className="
                    pointer-events-none
                          absolute
                          right-3
                          top-[65%]
                          -translate-y-1/2
                          w-2
                          h-2
                          border-l-2
                          border-b-2
                          border-[#2E4790]
                          rotate-[-45deg]
                        
                            "
            />
          </div>

          {/* Need to add product id to the link */}
          <Link
            className="cursor-pointer bg-blue-50 text-white desktop:text-[12.48px] font-helvetocaRegular flex-1 text-center py-2 rounded-3xl text-[14px]"
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
