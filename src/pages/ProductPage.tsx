// MY CODE

import play from "/assets/play.png";
import cart from "/assets/cart.png";
import { useTranslation } from "react-i18next";
import { type Capacity, type Product } from "../types";
import productsData from "../locales/products.json";
import i18next from "i18next";
import { useParams } from "react-router";
import { useEffect, useEffectEvent, useState } from "react";

const ProductPage = () => {
  const { t } = useTranslation();
  const productDataFromTranslation = t("products", {
    returnObjects: true,
  }) as Product[];
  const { id } = useParams<{ id: string }>();
  // State to track which product image is currently active (for the main display)
  const [activeImage, setActiveImage] = useState<number>(0);
  const [quantity, setQuantity] = useState<number>(1);

  // Check if the current language is Georgian
  const languageGeorgian = i18next.language === "ka";

  // Convert the ID from the URL to a number and find the corresponding product data from both the translation and the static JSON, then merge them together
  const myProductId = Number(id);
  const tranlsationSelectedData = productDataFromTranslation[myProductId];
  // Get the product data from products.json based on the ID from the URL
  const productsDataArray = productsData.filter(
    (product) => product.id === myProductId,
  );
  const myNeededProduct = productsDataArray[0];

  // Merge the translated data and the static data into a single product object
  const product = { ...tranlsationSelectedData, ...myNeededProduct };

  const [volume, setVolume] = useState<string>(product.capacities[0].label);

  // const selectedProduct = {product.capacities}

  const capacity =
    product.capacities.find((c) => c.label === volume) || product.capacities[0];

  
  console.log("ID", capacity);


  return (
    <div className="min-h-screen  py-4 md:py-8">
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
              src={`${product.image[activeImage]}`}
              alt="Product"
              className="max-h-60 object-contain "
            />
            {/* Dots */}
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
              {product.image.map((_, i) => (
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
            {product.image.map((img, i) => (
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
            <div className="flex gap-2 flex-wrap">
              {product.capacities.map((i, index) => (
                <button
                  key={index}
                  className={`px-3 py-1.5 font-helvetocaMedium leading-[19.48px]  rounded-lg  text-[16px] uppercase 
                    ${volume === i.label ? "border-blue-50 text-blue-50 border-2 font-hevletocaBold" : "border-[#B2B2B2] text-[#B2B2B2] border cursor-pointer"}
                        `}
                  onClick={() => setVolume(i.label)}
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
                className="bg-[#F2F2F2] py-2 px-3  center  rounded-3xl text-blue-50 text-xl"
                name="amount"
                id="amount"
                onChange={(e) => setQuantity(parseInt(e.target.value))}
              >
                {Array.from({ length: capacity.quantity }, (_, i) => (
                  <option key={i + 1} value={i + 1}>
                    {i + 1}
                  </option>
                ))}
              </select>
            </button>
          </div>

          {/* Pricing */}
          <div className="flex items-center gap-2">
            <span className=" text-sm 
            unactiveStartingPrice">
              {(capacity.price*quantity).toFixed(2)} ₾
            </span>
            <div className="">
              
              <span className="bg-red-100 text-white text-xs font-semibold px-2 py-0.5 rounded">
                -{parseFloat((capacity.price - capacity.finalPrice).toFixed(2))*quantity}{" "}
                ₾
              </span>
            </div>

            <span className="  px-3 py-0.5 rounded-lg goldPrice">
              {(capacity.finalPrice*quantity).toFixed(2)} ₾
            </span>
          </div>

          {/* Buttons */}
          <div className="flex gap-3">
            <button className="flex-1 py-3 rounded-2xl bg-[#2f4a9c] text-white text-sm font-medium cursor-pointer">
              {languageGeorgian ? "იყიდეთ ახლა" : "Buy Now"}
            </button>
            <button className="flex-1 py-3 rounded-2xl border border-gray-300 bg-white text-gray-800 text-sm font-medium flex items-center justify-center gap-2
            cursor-pointer">
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
              {capacity.label.toLocaleLowerCase()}
              
            </p>
          </div>
        </div>
      </div>

      {/* ── MOBILE layout ── */}
      <div className="md:hidden flex flex-col gap-4">
        {/* Category + name */}
        <div>
          <p className="text-sm text-[#2f4a9c] font-medium">
            {product.category}
          </p>
          <h1 className="text-2xl font-bold text-gray-900">{product.name}</h1>
        </div>

        {/* Main image */}
        <div className="relative bg-white rounded-2xl p-6 shadow-sm flex items-center justify-center min-h-[220px]">
          <button className="absolute top-4 left-4 w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center">
            <img src={play} alt="play" className="w-4 h-4" />
          </button>
          <img
            src={product.image[0]}
            alt="Product"
            className="max-h-48 object-contain"
          />
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
            {product.image.map((_, i) => (
              <span
                key={i}
                className={`w-2 h-2 rounded-full ${i === 0 ? "bg-[#2f4a9c]" : "bg-gray-300"}`}
              />
            ))}
          </div>
        </div>

        <p className="text-sm font-semibold text-gray-800">
          {product.description}
        </p>

        {/* Sizes */}
        <div>
          <p className="text-sm text-gray-500 mb-2">Size:</p>
          <div className="flex gap-2 flex-wrap">
            {product.capacities.map((cap, i) => (
              <button
                key={i}
                onClick={() => setVolume(cap.label)}
                className={`px-3 py-1.5 rounded-lg border text-sm uppercase font-medium 
      ${volume === cap.label ? "border-[#2f4a9c] text-[#2f4a9c] font-bold" : "border-gray-300 text-gray-600"}`}
              >
                {cap.label}
              </button>
            ))}
          </div>
        </div>

        {/* Quantity + pricing */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <p className="text-sm text-gray-500">
              {languageGeorgian ? "რაოდენობა:" : "Quantity:"}
            </p>
            <select
              className="bg-[#F2F2F2] py-2 px-3  center  rounded-3xl text-blue-50 text-xl"
              name="amount"
              id="amount"
              onChange={e => setQuantity(parseInt((e.target.value)))}
              
            >
              {Array.from({ length: capacity.quantity }, (_, i) => (
                <option key={i + 1} value={i + 1}>
                  {i + 1}
                </option>
              ))}
            </select>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-gray-400 line-through text-sm">
              {(capacity.price*quantity).toFixed(2)} ₾
            </span>
            <div>
              <span className="bg-red-100 text-white text-xs font-semibold px-2 py-0.5 rounded redDiscount">
                -{parseFloat((capacity.price - capacity.finalPrice).toFixed(2))}{" "}
                ₾
              </span>
            </div>
          </div>
        </div>

        <span className="bg-[#FDE800] text-gray-900 font-bold text-xl px-3 py-1 rounded-lg w-fit">
          {(capacity.finalPrice*quantity).toFixed(2)} ₾
        </span>

        {/* Buttons */}
        <div className="flex gap-3">
          <button className="flex-1 py-3 rounded-2xl bg-[#2f4a9c] text-white text-sm font-medium  cursor-pointer">
            {languageGeorgian ? "იყიდეთ ახლა" : "Buy Now"}
          </button>
          <button className="flex-1 py-3 rounded-2xl border border-gray-300 bg-white text-gray-800 text-sm font-medium flex items-center justify-center gap-2 cursor-pointer">
            <img src={cart} alt="cart" className="w-4 h-4" />
            {languageGeorgian ? "დამატება კალათაში" : "Add to cart"}
          </button>
        </div>

        {/* Description */}
        <div>
          <h2 className="text-sm font-bold text-gray-900 mb-1">
            {languageGeorgian ? "აღწერა" : "Description"}
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
            {languageGeorgian ? "მოცულობა: " : "Volume: "}
            {capacity.label.toLocaleLowerCase()}
          </p>
        </div>
      </div>
    </div>
  );
};

export default ProductPage;
