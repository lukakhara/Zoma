import playIcon from "/assets/play.png";
import cartIcon from "/assets/cart.png";
import { type Product } from "../types";
import { Link } from "react-router";
import { useCartContext } from "../context/CartContext";
import { useTranslation } from "react-i18next";

const Card = ({ product }: { product: Product }) => {
 const { i18n } = useTranslation();
  const languageGeorgian = i18n.language === "ka";

  const { addToCart } = useCartContext();

 

  return (
    <>
      <div className=" rounded-xl p-2 bg-white flex flex-col justify-between">
        <div className="">
          <div className="flex justify-between items-center ">
            <button className="cursor-pointer size-[23.76px] center">
              <img src={playIcon} className="" alt="playIcon" />
            </button>
            <button
              className="cursor-pointer size-[27.62px] center bg-blue-100 rounded-full p-2
                    "
              onClick={() => addToCart}
            >
              <img
                className="bg-none size-[14.83px]"
                src={cartIcon}
                alt="playIcon"
              />
            </button>
          </div>

          <img src={product.image[0]} alt="Product image" className="" />
        </div>

        <div className="flex  flex-col justify-between flex-1  ">
          {/* name and category */}
          <div className="bg-blue text-[#DDDDDD] text-[10px]">
            {product.category}
          </div>
          <div className="text-[#1A1A1A] text-sm">{product.name}</div>
          {/* prices */}
          <div className="flex items-center  gap-2">
            <div className="bg-[#FDE800] text-xl text-gray-300 font-semibold px-2 rounded-sm">
              {product.endPrice} ₾
            </div>
            <div className="text-[#C3C3C3] text-xl line-through">
              {product.startingPrice}
            </div>
          </div>

          <div className="flex items-center gap-2  ">
            <select
              className="bg-[#F2F2F2] py-2 px-3  center  rounded-3xl text-blue-50 text-xl"
              name="amounth"
              id="amounth"
            >
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
              <option value="5">5</option>
              <option value="6">6</option>
              <option value="7">7</option>
              <option value="8">8</option>
              <option value="9">9</option>
            </select>
            {/* Need to add product id to the link */}
            <Link
              className="cursor-pointer bg-blue-50 text-white flex-1 text-center py-2 rounded-3xl"
              to={`${/product/}${product.id}`}
            >
              {languageGeorgian ? "Buy Now" : "ყიდვა"}
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default Card;
