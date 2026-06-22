import play from "/assets/play.png";
import cart from "/assets/cart.png";
import { useTranslation } from "react-i18next";
import { type Product } from "../types";
import productsData from "../locales/products.json";
import { Link, useParams } from "react-router";
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

  const formatLabel = (label: string) => {
    if (!languageGeorgian) return label.toLocaleLowerCase();
    return label.toLocaleLowerCase().replace(/ml/g, "მლ").replace(/l\b/g, "ლ");
  };

  useEffect(() => {
    setQuantity(1);
    setActiveImage(0);
  }, [selectCapacityIndex]);

  return (
    <div className="min-h-screen  py-4 md:py-8  ">
      {/* ── DESKTOP layout ── */}
      <div className="md:flex gap-8 items-start ">
        {/* Left: main image + thumbnails */}
        <div className="flex flex-col gap-3  shrink-0  w-full md:w-1/2">
          <div className="md:hidden">
            <p className="text-sm  text-blue-50 font-medium font-helvetocaMedium leading-4">
              {product.category}
            </p>
            <h1 className="text-2xl font-helvetocaRegular font-normal text-gray-900">
              {product.name}
            </h1>
          </div>
          {/* Main image card */}
          <div className="relative bg-white rounded-2xl md:p-6 shadow-sm flex items-center justify-center min-h-75  p-none">
            <button className="absolute top-4 left-4 w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center">
              <img src={play} alt="play" className="w-4 h-4" />
            </button>
            {/* here is needed data from difrend json file */}
            <img
              src={capacities[selectCapacityIndex].images[activeImage]}
              alt="Product"
              className="max-h-60 object-contain  "
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
          <div className="md:flex gap-3 hidden ">
            {capacities[selectCapacityIndex].images.map((img, i) => (
              <div
                key={i}
                className="bg-white rounded-xl p-2 shadow-sm size-24 md:size-45 flex items-center justify-center flex-1"
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
        <div className="flex-1 flex flex-col gap-4 ">
          <div>
            <p className="text-sm  text-blue-50 font-medium font-helvetocaMedium leading-4 hidden md:block first-letter:uppercase">
              {product.category}
            </p>
            <h1 className="text-2xl font-helvetocaRegular font-normal text-gray-900 hidden md:block">
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
                  key={i.label}
                  className={` px-3 py-1.5 font-helvetocaMedium leading-[19.48px]  rounded-lg  text-[16px] uppercase 
                      ${index === selectCapacityIndex ? "border-blue-50 text-blue-50 border-2 font-hevletocaBold" : "border-[#B2B2B2] text-[#B2B2B2] border cursor-pointer"}
                          `}
                  onClick={() => setSelectCapacityIndex(index)}
                >
                  {formatLabel(i.label)}
                </button>
              ))}
            </div>
          </div>
          {/* divider of quanity and price */}
          <div className=" flex justify-between md:justify-start md:flex-col md:items-start  md:gap-8">
            {/* Quantity */}
            <div className="flex md:items-center items-baseline  gap-2  ">
              <p className="text-[16px] font-medium font-helvetocaMedium text-[#B8B8B8] mb-2 md:mb-0 leading-[19.48px]">
                {languageGeorgian ? "რაოდენობა:" : "Quantity:"}
              </p>
                <select
                  className="bg-[#F2F2F2] py-2 text-center px-1 md:px-2  centeredFlex  rounded-3xl text-blue-50 text-xl"
                  name="amount"
                  id="amount"
                  value={quantity}
                  onChange={(e) => setQuantity(Number(e.target.value))}
                >
                  {Array.from(
                    { length: capacities[selectCapacityIndex].amount },
                    (_, i) => (
                      <option key={i} value={i + 1}>
                        {i + 1}
                      </option>
                    ),
                  )}
                </select>       
            </div>

            {/* Pricing */}
            <div className="flex items-end gap-2  flex-col  md:flex-row md:items-center">
              <div className="flex gap-2 items-center">
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
              </div>

              <span className="  px-3 py-0.5 rounded-lg goldPrice ">
                {(
                  capacities[selectCapacityIndex].finalPrice * quantity
                ).toFixed(2)}{" "}
                ₾
              </span>
            </div>
          </div>

          {/* Buttons */}
          <div className="flex gap-3 relative h-[47px]">
            <Link
              to="/checkout"
              className="flex-1 py-3 rounded-2xl bg-[#2f4a9c] text-white text-sm font-medium cursor-pointer text-center align-middle "
              onClick={() => addToCart(String(selectedId), quantity)}
            >
              {languageGeorgian ? "იყიდეთ ახლა" : "Buy Now"}
            </Link>

            <button
              className="flex-1 py-3 rounded-2xl  bg-white text-gray-800 text-sm font-medium centeredFlex gap-2 
              cursor-pointer  "
              onClick={() => addToCart(String(selectedId), quantity)}
            >
              <img src={cart} alt="cart" className="w-4 h-4 ml-3" />
              {languageGeorgian ? "დამატება კალათაში" : "Add to cart"}
            </button>
          </div>

                {/* hr */}
                <div className="border-t-4 border-[#DBDBDB] w-screen relative left-1/2 -translate-x-1/2 md:hidden"></div>

          {/* Description */}
          <div className="mt-2 leading-[19.48px]">
            <h2 className="text-[18px] h font-medium text-[#000000] mb-1 tracking-[0%] ">
              Description
            </h2>
            <p className="text-sm text-gray-600  leading-[19.48px]">
              {product.description}
            </p>
            <ul className="md:mt-2  ">
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
              {formatLabel(capacities[selectCapacityIndex].label)}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductPage;
