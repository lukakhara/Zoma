import play from "/assets/play.png";
import cart from "/assets/cart.png";
import { useTranslation } from "react-i18next";
import { type Product } from "../types";
import productsData from "../locales/products.json";
import { useParams } from "react-router";
import { useState, useEffect } from "react";
import { useCartContext } from "../context/CartContext";

const ProductPage = () => {
  const { t, i18n } = useTranslation();
  const productDataFromTranslation = t("products", {
    returnObjects: true,
  }) as Product[];
  const { id } = useParams<{ id: string }>();
  const { addToCart } = useCartContext();
  const [activeImage, setActiveImage] = useState<number>(0);
  const languageGeorgian = i18n.language === "ka";


  const [selectCapacityIndex, setSelectCapacityIndex] = useState(0);

  const product = productDataFromTranslation[Number(id)];

  const capacities = productsData.filter(
    (product) => Number(product.parentId) === Number(id),
  );

  const selectedId = capacities[selectCapacityIndex].id;

  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    setQuantity(1);
    setActiveImage(0);
  }, [selectCapacityIndex]);

  return (
    <div className="min-h-screen  py-4 md:py-8 ">
      {/* ── DESKTOP layout ── */}
      <div className="hidden md:flex gap-8 items-start">
        {/* Left: main image + thumbnails */}
        <div className="flex flex-col gap-3 w-105 shrink-0">
          {/* Main image card */}
          <div className="relative bg-white rounded-2xl p-6 shadow-sm flex items-center justify-center min-h-75">
            <button className="absolute top-4 left-4 w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center">
              <img src={play} alt="play" className="w-4 h-4" />
            </button>
            {/* here is needed data from difrend json file */}
            <img
              src={capacities[selectCapacityIndex].images[activeImage]}
              alt="Product"
              className="max-h-60 object-contain"
            />
            {/* Dots */}
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
              {capacities[selectCapacityIndex].images.map((_, i) => (
                <span
                  key={i}
                  className={`w-2 h-2 rounded-full  ${i === activeImage ? "bg-[#2f4a9c]" : "bg-gray-300 cursor-pointer hover:opacity-65 "}`}
                  onClick={() => setActiveImage(i)}
                />
              ))}
            </div>
          </div>

          {/* Thumbnails */}
          <div className="flex gap-3">
            {capacities[selectCapacityIndex].images.map((img, i) => (
              <div
                key={i}
                className="bg-white rounded-xl p-2 shadow-sm w-24 h-24 flex items-center justify-center"
              >
                <img
                  src={img}
                  alt={`thumb-${i}`}
                  className="max-h-full object-contain"
                />
              </div>
            ))}
          </div>
        </div>

        {/* Right: details */}
        <div className="flex-1 flex flex-col gap-4">
          <div>
            <p className="text-sm  text-blue-50 font-medium font-helvetocaMedium leading-4">
              {product.category}
            </p>
            <h1 className="text-2xl font-helvetocaRegular font-normal text-gray-900">
              {product.name}
            </h1>
            <p className="text-[18px]   text-[#000000]  leading-[19.48px] mt-2 font-helvetocaMedium font-medium ">
              {product.description}
            </p>
          </div>

          {/* Sizes */}
          <div>
            <p className="text-[16px] font-medium font-helvetocaMedium text-[#B8B8B8] mb-2 leading-[19.48px]">
              {languageGeorgian ? "ზომა:" : "Size:"}
            </p>
            <div className="flex gap-2 flex-wrap ">
              {capacities.map((i, index) => (
                <button
                  key={index}
                  className={` px-3 py-1.5 font-helvetocaMedium leading-[19.48px]  rounded-lg  text-[16px] uppercase 
                      ${index === selectCapacityIndex ? "border-blue-50 text-blue-50 border-2 font-hevletocaBold" : "border-[#B2B2B2] text-[#B2B2B2] border cursor-pointer"}
                          `}
                  onClick={() => setSelectCapacityIndex(index)}
                >
                  {i.label}
                </button>
              ))}
            </div>
          </div>

          {/* Quantity */}
          <div className="flex items-center gap-2">
            <p className="text-[16px] font-medium font-helvetocaMedium text-[#B8B8B8] mb-2 leading-[19.48px]">
              {languageGeorgian ? "რაოდენობა:" : "Quantity:"}
            </p>
            <button className=" rounded-lg px-3 py-1 text-sm flex items-center gap-1 font-normal ">
              <select
                className="bg-[#F2F2F2] py-2 px-3  centeredFlex  rounded-3xl text-blue-50 text-xl"
                name="amount"
                id="amount"
                value={quantity}
                onChange={(e) => setQuantity(Number(e.target.value))}
              >
                {Array.from(
                  { length: capacities[selectCapacityIndex].amount },
                  (_, i) => (
                    <option key={i + 1} value={i + 1}>
                      {i + 1}
                    </option>
                  ),
                )}
              </select>
            </button>
          </div>

          {/* Pricing */}
          <div className="flex items-center gap-2">
            <span
              className=" text-sm 
              unactiveStartingPrice"
            >
              {capacities[selectCapacityIndex].price.toFixed(2)} ₾
            </span>
            <div className="">
              <span className="bg-red-100 text-white text-xs font-semibold px-2 py-0.5 rounded">
                -
                {(
                  (capacities[selectCapacityIndex].price -
                    capacities[selectCapacityIndex].finalPrice) *
                  quantity
                ).toFixed(2)}
                ₾
              </span>
            </div>

            <span className="  px-3 py-0.5 rounded-lg goldPrice">
              {(capacities[selectCapacityIndex].finalPrice * quantity).toFixed(
                2,
              )}{" "}
              ₾
            </span>
          </div>

          {/* Buttons */}
          <div className="flex gap-3">
            <button className="flex-1 py-3 rounded-2xl bg-[#2f4a9c] text-white text-sm font-medium cursor-pointer">
              {languageGeorgian ? "იყიდეთ ახლა" : "Buy Now"}
            </button>
            <button
              className="flex-1 py-3 rounded-2xl border border-gray-300 bg-white text-gray-800 text-sm font-medium centeredFlex gap-2
              cursor-pointer"
              onClick={() => addToCart(String(selectedId),quantity)}
            >
              <img src={cart} alt="cart" className="w-4 h-4" />
              {languageGeorgian ? "დამატება კალათაში" : "Add to cart"}
            </button>
          </div>

          {/* Description */}
          <div className="mt-2">
            <h2 className="text-sm font-bold text-gray-900 mb-1">
              Description
            </h2>
            <p className="text-sm text-gray-600 leading-relaxed">
              {product.description}
            </p>
            <ul className="mt-2 space-y-0.5">
              {product.instructionsForUse?.map((item, i) => (
                <li key={i} className="text-sm text-gray-600 flex gap-2">
                  <span>•</span>
                  {item}
                </li>
              ))}
            </ul>
            {product.doNotUse?.map((item, i) => (
              <p key={i} className="text-sm text-gray-600 mt-0.5">
                {item}
              </p>
            ))}
            <p className="text-sm text-gray-600 mt-0.5">{product.store}</p>
            <p className="text-sm text-gray-600">
              {languageGeorgian ? "მოცულობა" : "volume"}:
              {capacities[selectCapacityIndex].label.toLocaleLowerCase()}
            </p>
          </div>
        </div>
      </div>

      {/* ── MOBILE layout ── */}
      <div className="md:hidden flex flex-col gap-4 ">
        {/* Category + name */}
        <div>
          <p className="text-sm text-[#2f4a9c] font-medium">
            {product.category}
          </p>
          <h1 className="text-[22px] font-normal text-[#1A1A1A]">{product.name}</h1>
        </div>

        {/* Main image */}
        <div className="relative bg-white rounded-[20px] p-6 shadow-sm centeredFlex min-h-[220px]">
          <button className="absolute top-4 left-4 w-8 h-8 rounded-full bg-gray-200 centeredFlex">
            <img src={play} alt="play" className="w-4 h-4" />
          </button>
          <img
            src={capacities[selectCapacityIndex].images[activeImage]}
            alt="Product"
            className="max-h-48 object-contain"
          />
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
            {capacities[selectCapacityIndex].images.map((_, i) => (
              <span
                key={i}
                className={`w-2 h-2 rounded-full ${i === activeImage ? "bg-[#2f4a9c]" : "bg-gray-300 cursor-pointer hover:opacity-65"}`}
                onClick={() => setActiveImage(i)}
              />
            ))}
          </div>
        </div>

        <p className="text-[18px] font-semibold text-gray-800 leading-[19.48px]">
          {product.description}
        </p>

        {/* Sizes */}
        <div>
          <p className="text-[14px] font-medium font-helvetocaMedium text-[#B8B8B8] mb-2 leading-[19.48px]">
            {languageGeorgian ? "ზომა:" : "Size:"}
          </p>
          <div className="flex gap-[14px] flex-wrap">
            {capacities.map((cap, index) => (
              <button
                key={index}
                className={`px-3 py-1.5 font-helvetocaMedium leading-[19.48px] rounded-[10px] text-[14px] uppercase
            ${
              index === selectCapacityIndex
                ? "border-blue-50 text-blue-50 border-2 font-hevletocaBold"
                : "border-[#B2B2B2] text-[#B2B2B2] border cursor-pointer"
            }`}
                onClick={() => setSelectCapacityIndex(index)}
              >
                {cap.label}
              </button>
            ))}
          </div>
        </div>

        {/* Quantity + pricing */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <p className="text-sm text-[#B8B8B8]">
              {languageGeorgian ? "რაოდენობა:" : "Quantity:"}
            </p>
            <select
              className="bg-[#F2F2F2] py-2 px-3 centeredFlex rounded-3xl text-blue-50 text-[18px]"
              name="amount"
              id="amount"
              value={quantity}
              onChange={(e) => setQuantity(Number(e.target.value))}
            >
              {Array.from(
                { length: capacities[selectCapacityIndex].amount },
                (_, i) => (
                  <option key={i + 1} value={i + 1}>
                    {i + 1}
                  </option>
                ),
              )}
            </select>
          </div>
          <div className="flex flex-col gap-2 items-end ">
            <div className="flex justify-between w-full">
              <span className="text-sm unactiveStartingPrice">
                {capacities[selectCapacityIndex].price.toFixed(2)} ₾
              </span>
              <span className="bg-red-100 text-white text-xs  px-2 py-0.5 rounded font-medium">
                -
                {(
                  (capacities[selectCapacityIndex].price -
                    capacities[selectCapacityIndex].finalPrice) *
                  quantity
                ).toFixed(2)}
                ₾
              </span>
            </div>

            <span className="pl-2.5 pr-[14px]  py-[9.53px] rounded-[3px] goldPrice w-fit text-[27.83px]  align-self-end font-medium leading-[19.3px]">
              {(capacities[selectCapacityIndex].finalPrice * quantity).toFixed(
                2,
              )}{" "}
              ₾
            </span>
          </div>
        </div>

        {/* Buttons */}
        <div className="flex gap-3">
          <button className="flex-1 py-3 rounded-[10px] bg-[#2f4a9c] text-white text-sm font-medium  cursor-pointer">
            {languageGeorgian ? "იყიდეთ ახლა" : "Buy Now"}
          </button>
          <button
            className="flex-1 py-3 rounded-[10px]   bg-[rgba(255,255,255,0.83)] text-gray-800 text-sm font-medium centeredFlex gap-2 cursor-pointer"
            onClick={() => {
              addToCart(String(selectedId),quantity);
            }}
          >
            <img src={cart} alt="cart" className="w-4 h-4" />
            {languageGeorgian ? "დამატება კალათაში" : "Add to cart"}
          </button>
        </div>
            {/* divider */}
            <div className="border-t-4 border-[#DBDBDB]">

            </div>
        {/* Description */}
        <div className="text-[#898989]">
          <h2 className="text-[18px] font-medium text-[#000000]! mb-1">
            {languageGeorgian ? "აღწერა" : "Description"}
          </h2>
          <p className="text-sm  leading-relaxed">
            {product.description}
          </p>
          <ul className="mt-2 space-y-0.5 ">
            {product.instructionsForUse?.map((item, i) => (
              <li key={i} className="text-sm  flex gap-2">
                <span>•</span>
                {item}
              </li>
            ))}
          </ul>
          {product.doNotUse?.map((item, i) => (
            <p key={i} className="text-sm  mt-0.5">
              {item}
            </p>
          ))}
          <p className="text-sm  mt-0.5 ">{product.store}</p>
          <p className="text-sm ">
            {languageGeorgian ? "მოცულობა: " : "Volume: "}
            {capacities[selectCapacityIndex].label.toLocaleLowerCase()}
          </p>
        </div>
      </div>
    </div>
  );
};

export default ProductPage;
