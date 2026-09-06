import playIcon from "/assets/play.png";
import cartIcon from "/assets/cart.png";
import { type CardProps } from "../types";
import { Link } from "react-router";
import { useCartContext } from "../context/CartContext";
import { useTranslation } from "react-i18next";
import { useState, useCallback, memo } from "react";
import { ChevronDown } from "lucide-react";

const ABOVE_FOLD_COUNT = 12;
const LCP_COUNT = 2;

const Card = ({ product, index }: { product: CardProps; index: number }) => {
  const { i18n } = useTranslation();
  const isGeorgian = i18n.language === "ka";
  const { addToCart } = useCartContext();

  const isAboveFold = index < ABOVE_FOLD_COUNT;
  const isLCP = index < LCP_COUNT;

  const [quantity, setQuantity] = useState(1);

  const handleAddToCart = useCallback(() => {
    addToCart(String(product.id), quantity);
  }, [addToCart, product.id, quantity]);

  const handleQuantityChange = useCallback(
    (e: React.ChangeEvent<HTMLSelectElement>) => {
      setQuantity(Number(e.target.value));
    },
    []
  );

  const productImage = product.images?.[0];

  return (
    <div className="rounded-xl bg-white flex flex-col relative">
      <div className="pb-2">
        <div className="flex justify-between items-center -z-10">
          <button
            type="button"
            aria-label="Play product video"
            className="cursor-pointer size-[23.76px] centeredFlex mt-[10.67px] ml-[10.67px]"
          >
            <img src={playIcon} alt="" aria-hidden="true" />
          </button>

          <button
            type="button"
            aria-label={isGeorgian ? "კალათაში დამატება" : "Add to cart"}
            className="cursor-pointer size-[27.62px] centeredFlex bg-blue-100 rounded-full p-2 mt-[8px] mr-[12.05px]"
            onClick={handleAddToCart}
          >
            <img
              className="bg-none size-[15px]"
              src={cartIcon}
              alt=""
              aria-hidden="true"
              decoding="async"
              loading="eager"
              fetchPriority="high"
              width={15}
              height={15}
            />
          </button>
        </div>

        {productImage && (
          <img
            src={productImage}
            className="w-[65.94px] h-[130.99px] object-cover relative bottom-5 z-100 m-auto"
            alt={product.name}
            decoding="async"
            loading={isAboveFold ? "eager" : "lazy"}
            fetchPriority={isLCP ? "high" : isAboveFold ? "auto" : "low"}
            width={66}
            height={131}
          />
        )}

        <div className="flex flex-col font-helvetocaRegular pl-[19px] gap-[5px] desktop:pl-[0px] desktop:ml-[19px] desktop:mr-[12px] -mt-5 flex-1">
          <div className="text-[#7D7D7D]! text-[10px] category leading-[100%]">
            {product.category}
          </div>
          <div className="text-[#1A1A1A] text-[14px] leading-[100%] overflow-hidden">
            {product.name}
          </div>
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2 sm:text-nowrap">
            <p className="bg-[#FDE800] text-[20px] text-[#474747] font-helvetocaMedium p-2 rounded-sm leading-[15.19px] sm:leading-[12.19px] desktop:p-[7.13px] text-nowrap">
              {product.finalPrice} <span className="font-helvetocaRegular">₾</span>
            </p>
            <p className="font-helvetocaMedium px-2 text-[#C3C3C3] text-nowrap text-[20px] line-through leading-[17.36px]">
              {product.price} <span>₾</span>
            </p>
          </div>
        </div>
      </div>

      <div className="flex items-baseline gap-2 desktop:gap-[7.13px] justify-between mb-[10px] ml-[15px] mr-[16px] mt-auto">
        <div
          className="relative h-[33px] desktop:mt-2.5 rounded-[100px] bg-[#F2F2F2]
            desktop:w-[50.79px] desktop:h-[33px] w-[57px]
            flex items-center justify-center gap-1.5
            transition-colors hover:bg-[#e8e8e8]
            focus-within:ring-2 focus-within:ring-blue-50/40 "
        >
          <select
            className="absolute inset-0 opacity-0 cursor-pointer  "
            name="amount"
            aria-label="Select quantity"
            value={quantity}
            onChange={handleQuantityChange}
          >
            {Array.from({ length: product.amount }, (_, i) => (
              <option key={i} value={i + 1} >
                {i + 1}
              </option>
            ))}
          </select>

          <span className="text-blue-50 text-[18px] flex items-center justify-center pointer-events-none select-none  pl-2">
            {quantity}
          </span>
          <ChevronDown className="size-3 text-blue-50 pointer-events-none transition-transform" />
        </div>

        <Link
          className="cursor-pointer bg-blue-50 text-white font-helvetocaRegular
            py-2 px-6 rounded-[100px] text-[14px] flex-1 h-[33px] desktop:h-[29.41px]
            flex items-center justify-center font-normal
            transition-colors hover:bg-blue-700 active:scale-[0.98]"
          to={`/product/${product.parentId ? product.parentId : product.id}`}
        >
          {isGeorgian ? "ყიდვა" : "Buy Now"}
        </Link>
      </div>
    </div>
  );
};

export default memo(Card);