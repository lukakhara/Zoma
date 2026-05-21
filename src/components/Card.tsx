import playIcon from "/assets/play.png";
import cartIcon from "/assets/cart.png";
import { type CartItem } from "../types";
import { Link } from "react-router";
import { useCartContext } from "../context/CartContext";
import { useTranslation } from "react-i18next";
import { useState } from "react";

const Card = ({ cartItem }: { cartItem: CartItem }) => {
  const { i18n } = useTranslation();
  const languageGeorgian = i18n.language === "ka";

  const { addToCart } = useCartContext();
  
  const [quantity,setQuantity] = useState(1);

  return (
    <>
      <div className=" rounded-xl p-2 bg-white flex flex-col justify-between">
        <div className="">
          <div className="flex justify-between items-center ">
            <button className="cursor-pointer size-[23.76px] centeredFlex">
              <img src={playIcon} className="" alt="playIcon" />
            </button>
            <button
              className="cursor-pointer size-[27.62px] centeredFlex bg-blue-100 rounded-full p-2
                    "
              onClick={() => addToCart(cartItem,quantity) }
            >
              <img
                className="bg-none size-[14.83px]"
                src={cartIcon}
                alt="playIcon"
              />
            </button>
          </div>

          <img src={cartItem.image[0]} alt="Product image" className="" />
        </div>

        <div className="flex  flex-col justify-between flex-1  ">
          {/* name and category */}
          <div className="bg-blue text-[#DDDDDD] text-[10px]">
            {cartItem.category}
          </div>
          <div className="text-[#1A1A1A] text-sm">{cartItem.name}</div>
          {/* prices */}
          <div className="flex items-center  gap-2">
            <p className="bg-[#FDE800] text-xl text-gray-300 font-semibold px-2 rounded-sm">
              {cartItem.capacities[cartItem.selectedCapacityIndex].finalPrice} ₾
            </p>
            <p className="text-[#C3C3C3] text-xl line-through">
              {cartItem.capacities[cartItem.selectedCapacityIndex].price} ₾
            </p>
          </div>

          <div className="flex items-center gap-2  ">
            <select
              className="bg-[#F2F2F2] py-2 px-3  centeredFlex  rounded-3xl text-blue-50 text-xl "
              name="amounth"
              id="amounth"
              value={quantity}
               onChange={(e) =>
                         setQuantity(Number(e.target.value))
                        }
            >
              {Array.from(
                { length: cartItem.capacities[cartItem.selectedCapacityIndex].quantity },
                (_, i) => (
                  <option key={i + 1} value={i + 1}>
                    {i + 1}
                  </option>
                ),
              )}
            </select>
            {/* Need to add product id to the link */}
            <Link
              className="cursor-pointer bg-blue-50 text-white flex-1 text-center py-2 rounded-3xl"
              to={`${/product/}${cartItem.id}`}
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
