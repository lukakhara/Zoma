// MY CODE

import play from "/assets/play.png";
import cart from "/assets/cart.png";
import { useTranslation } from "react-i18next";
import {type Product } from "../types"
import productsData from "../locales/products.json";
import i18next from "i18next";
import image from "/assets/product.png";

const ProductPage = () => {
  const {t} = useTranslation();
  const productDataFromTranslation = t("products",{returnObjects:true}) as Product[];
 
  const myProductId = 1;
  const tranlsationSelectedData = productDataFromTranslation[myProductId];
  console.log("first", tranlsationSelectedData);

  

   const productsDataArray = productsData.filter(
     (product) => product.id === myProductId,
   );

  const myNeededProduct = productsDataArray[0];

  console.log(" second ",myNeededProduct);
  const product = { ...tranlsationSelectedData, ...myNeededProduct };
  console.log("merged", product);

  console.log(product.image[0]);

  const languageGeorgian = i18next.language === "ka";

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
              src={`${image}`}
              alt="Product"
              className="max-h-60 object-contain "
            />
            {/* Dots */}
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
              {product.image.map((_, i) => (
                <span
                  key={i}
                  className={`w-2 h-2 rounded-full ${i === 0 ? "bg-[#2f4a9c]" : "bg-gray-300"}`}
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
            <p className="text-sm text-[#2f4a9c] font-medium">
              {product.category}
            </p>
            <h1 className="text-2xl font-bold text-gray-900">{product.name}</h1>
            <p className="text-sm font-semibold text-gray-800 mt-2">
              {product.description}
            </p>
          </div>

          {/* Sizes */}
          <div>
            <p className="text-sm text-gray-500 mb-2">
              {languageGeorgian ? "ზომა:" : "Size:"}
            </p>
            <div className="flex gap-2 flex-wrap">
              {Object.keys(product.capacities).map((size, i) => (
                <button
                  key={size}
                  className={`px-3 py-1.5 rounded-lg border text-sm uppercase font-medium ${i === 1 ? "border-[#2f4a9c] text-[#2f4a9c] font-bold" : "border-gray-300 text-gray-600"}`}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>

          {/* Quantity */}
          <div className="flex items-center gap-2">
            <p className="text-sm text-gray-500">Quantity:</p>
            <button className="border border-gray-300 rounded-lg px-3 py-1 text-sm flex items-center gap-1">
              1 <span className="text-gray-400">▾</span>
            </button>
          </div>

          {/* Pricing */}
          <div className="flex items-center gap-2">
            <span className="text-gray-400 line-through text-sm">
              {product.startingPrice}
            </span>
            <span className="bg-orange-500 text-white text-xs font-semibold px-2 py-0.5 rounded">
              -1.87 ₾
            </span>
            <span className="bg-[#FDE800] text-gray-900 font-bold text-xl px-3 py-0.5 rounded-lg">
              {product.endPrice} ₾
            </span>
          </div>

          {/* Buttons */}
          <div className="flex gap-3">
            <button className="flex-1 py-3 rounded-2xl bg-[#2f4a9c] text-white text-sm font-medium">
              {languageGeorgian ? "იყიდეთ ახლა" : "Buy Now"}
            </button>
            <button className="flex-1 py-3 rounded-2xl border border-gray-300 bg-white text-gray-800 text-sm font-medium flex items-center justify-center gap-2">
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
              {languageGeorgian ? "მოცულობა" : "volume"}:{" "}
              {Object.keys(product.capacities)[0]}
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
            {Object.keys(product.capacities).map((size, i) => (
              <button
                key={size}
                className={`px-3 py-1.5 rounded-lg border text-sm uppercase font-medium ${i === 1 ? "border-[#2f4a9c] text-[#2f4a9c] font-bold" : "border-gray-300 text-gray-600"}`}
              >
                {size}
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
            <button className="border border-gray-300 rounded-lg px-3 py-1 text-sm flex items-center gap-1">
              1 <span className="text-gray-400">▾</span>
            </button>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-gray-400 line-through text-sm">
              {product.startingPrice}
            </span>
            <span className="bg-orange-500 text-white text-xs font-semibold px-2 py-0.5 rounded">
              -1.87 ₾
            </span>
          </div>
        </div>

        <span className="bg-[#FDE800] text-gray-900 font-bold text-xl px-3 py-1 rounded-lg w-fit">
          {product.endPrice} ₾
        </span>

        {/* Buttons */}
        <div className="flex gap-3">
          <button className="flex-1 py-3 rounded-2xl bg-[#2f4a9c] text-white text-sm font-medium">
            {languageGeorgian ? "იყიდეთ ახლა" : "Buy Now"}
          </button>
          <button className="flex-1 py-3 rounded-2xl border border-gray-300 bg-white text-gray-800 text-sm font-medium flex items-center justify-center gap-2">
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
            {languageGeorgian ? "მოცულობა: " : "Volume: "}{" "}
            {Object.keys(product.capacities)[0]}
          </p>
        </div>
      </div>
    </div>
  );
};

export default ProductPage;

// AI GENERATED CODE

// import play from "../assets/play.png";
// import cart from "../assets/cart.png";
// import { useTranslation } from "react-i18next";
// import { type Product } from "../types";
// import productsData from "../locales/products.json";

// const ProductPage = () => {
//   const { t, i18n } = useTranslation();
//   const language = i18n.language;
//   const langaugeGeorgian = language === "ka"; // TEMPORARY

//   const currentProductId = 1;

//   // Translated text data (name, description, category, etc.) from i18n
//   const allTranslatedProducts = t("products", {
//     returnObjects: true,
//   }) as Product[];
//   const currentTranslatedProduct = allTranslatedProducts[currentProductId];

//   // Static data (images, prices, capacities, etc.) from products.json
//   const currentStaticProduct = (productsData as Product[]).filter(
//     (staticProduct) => staticProduct.id === currentProductId,
//   )[0];

//   // Final merged product with all properties from both sources
//   const mergedProduct = {
//     ...currentTranslatedProduct,
//     ...currentStaticProduct,
//   };

//   console.log("Merged Product Data:", mergedProduct);
//   console.log(1);

//   return (
//     <div className="min-h-screen py-4 md:py-8">
//       {/* ── DESKTOP layout ── */}
//       <div className="hidden md:flex gap-8 items-start">
//         <div className="flex flex-col gap-3 w-105 shrink-0">
//           <div className="relative bg-white rounded-2xl p-6 shadow-sm flex items-center justify-center min-h-75">
//             <button className="absolute top-4 left-4 w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center">
//               <img src={play} alt="play" className="w-4 h-4" />
//             </button>
//             <img
//               src={mergedProduct.image[0]}
//               alt="Product"
//               className="max-h-60 object-contain"
//             />
//             <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
//               {mergedProduct.image.map((_, imageIndex) => (
//                 <span
//                   key={imageIndex}
//                   className={`w-2 h-2 rounded-full ${imageIndex === 0 ? "bg-[#2f4a9c]" : "bg-gray-300"}`}
//                 />
//               ))}
//             </div>
//           </div>

//           <div className="flex gap-3">
//             {mergedProduct.image.map((thumbnailSrc, thumbnailIndex) => (
//               <div
//                 key={thumbnailIndex}
//                 className="bg-white rounded-xl p-2 shadow-sm w-24 h-24 flex items-center justify-center"
//               >
//                 <img
//                   src={thumbnailSrc}
//                   alt={`thumbnail-${thumbnailIndex}`}
//                   className="max-h-full object-contain"
//                 />
//               </div>
//             ))}
//           </div>
//         </div>

//         <div className="flex-1 flex flex-col gap-4">
//           <div>
//             <p className="text-sm text-[#2f4a9c] font-medium">
//               {mergedProduct.category}
//             </p>
//             <h1 className="text-2xl font-bold text-gray-900">
//               {mergedProduct.name}
//             </h1>
//             <p className="text-sm font-semibold text-gray-800 mt-2">
//               {mergedProduct.description}
//             </p>
//           </div>

//           <div>
//             <p className="text-sm text-gray-500 mb-2">{langaugeGeorgian ? "ზომა:" : "Size:"}</p>
//             <div className="flex gap-2 flex-wrap">
//               {Object.keys(mergedProduct.capacities).map(
//                 (capacitySize, capacityIndex) => (
//                   <button
//                     key={capacitySize}
//                     className={`px-3 py-1.5 rounded-lg border text-sm uppercase font-medium ${capacityIndex === 1 ? "border-[#2f4a9c] text-[#2f4a9c] font-bold" : "border-gray-300 text-gray-600"}`}
//                   >
//                     {capacitySize}
//                   </button>
//                 ),
//               )}
//             </div>
//           </div>

//           <div className="flex items-center gap-2">
//             <p className="text-sm text-gray-500">{langaugeGeorgian ? "რაოდენობა:" : "Quantity:"}</p>
//             <button className="border border-gray-300 rounded-lg px-3 py-1 text-sm flex items-center gap-1">
//               1 <span className="text-gray-400">▾</span>
//             </button>
//           </div>

//           <div className="flex items-center gap-2">
//             <span className="text-gray-400 line-through text-sm">
//               {mergedProduct.startingPrice}
//             </span>
//             <span className="bg-orange-500 text-white text-xs font-semibold px-2 py-0.5 rounded">
//               -1.87 ₾
//             </span>
//             <span className="bg-[#FDE800] text-gray-900 font-bold text-xl px-3 py-0.5 rounded-lg">
//               {mergedProduct.endPrice} ₾
//             </span>
//           </div>

//           <div className="flex gap-3">
//             <button className="flex-1 py-3 rounded-2xl bg-[#2f4a9c] text-white text-sm font-medium">
//               {langaugeGeorgian ? "იყიდეთ ახლა" : "Buy Now"}
//             </button>
//             <button className="flex-1 py-3 rounded-2xl border border-gray-300 bg-white text-gray-800 text-sm font-medium flex items-center justify-center gap-2">
//               <img src={cart} alt="cart" className="w-4 h-4" />
//               {langaugeGeorgian ? "კალათაში დამატება " : "Add to cart"}
//             </button>
//           </div>

//           <div className="mt-2">
//             <h2 className="text-sm font-bold text-gray-900 mb-1">
//               {langaugeGeorgian ? "აღწერა" : "Description"}
//             </h2>
//             <p className="text-sm text-gray-600 leading-relaxed">
//               {mergedProduct.description}
//             </p>
//             <ul className="mt-2 space-y-0.5">
//               {mergedProduct.instructionsForUse?.map(
//                 (instructionItem, instructionIndex) => (
//                   <li
//                     key={instructionIndex}
//                     className="text-sm text-gray-600 flex gap-2"
//                   >
//                     <span>•</span>
//                     {instructionItem}
//                   </li>
//                 ),
//               )}
//             </ul>
//             {mergedProduct.doNotUse?.map((warningItem, warningIndex) => (
//               <p key={warningIndex} className="text-sm text-gray-600 mt-0.5">
//                 {warningItem}
//               </p>
//             ))}
//             <p className="text-sm text-gray-600 mt-0.5">
//               {mergedProduct.store}
//             </p>
//             <p className="text-sm text-gray-600">
//               {langaugeGeorgian ? "მოცულობა:" : "Volume:"} 
//               {Object.keys(mergedProduct.capacities)[0]}
//             </p>
//           </div>
//         </div>
//       </div>

//       {/* ── MOBILE layout ── */}
//       <div className="md:hidden flex flex-col gap-4">
//         <div>
//           <p className="text-sm text-[#2f4a9c] font-medium">
//             {mergedProduct.category}
//           </p>
//           <h1 className="text-2xl font-bold text-gray-900">
//             {mergedProduct.name}
//           </h1>
//         </div>

//         <div className="relative bg-white rounded-2xl p-6 shadow-sm flex items-center justify-center min-h-[220px]">
//           <button className="absolute top-4 left-4 w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center">
//             <img src={play} alt="play" className="w-4 h-4" />
//           </button>
//           <img
//             src={mergedProduct.image[0]}
//             alt="Product"
//             className="max-h-48 object-contain"
//           />
//           <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
//             {mergedProduct.image.map((_, imageIndex) => (
//               <span
//                 key={imageIndex}
//                 className={`w-2 h-2 rounded-full ${imageIndex === 0 ? "bg-[#2f4a9c]" : "bg-gray-300"}`}
//               />
//             ))}
//           </div>
//         </div>

//         <p className="text-sm font-semibold text-gray-800">
//           {mergedProduct.description}
//         </p>

//         <div>
//           <p className="text-sm text-gray-500 mb-2">Size:</p>
//           <div className="flex gap-2 flex-wrap">
//             {Object.keys(mergedProduct.capacities).map(
//               (capacitySize, capacityIndex) => (
//                 <button
//                   key={capacitySize}
//                   className={`px-3 py-1.5 rounded-lg border text-sm uppercase font-medium ${capacityIndex === 1 ? "border-[#2f4a9c] text-[#2f4a9c] font-bold" : "border-gray-300 text-gray-600"}`}
//                 >
//                   {capacitySize}
//                 </button>
//               ),
//             )}
//           </div>
//         </div>

//         <div className="flex items-center justify-between">
//           <div className="flex items-center gap-2">
//             <p className="text-sm text-gray-500">Quantity:</p>
//             <button className="border border-gray-300 rounded-lg px-3 py-1 text-sm flex items-center gap-1">
//               1 <span className="text-gray-400">▾</span>
//             </button>
//           </div>
//           <div className="flex items-center gap-2">
//             <span className="text-gray-400 line-through text-sm">
//               {mergedProduct.startingPrice}
//             </span>
//             <span className="bg-orange-500 text-white text-xs font-semibold px-2 py-0.5 rounded">
//               -1.87 ₾
//             </span>
//           </div>
//         </div>

//         <span className="bg-[#FDE800] text-gray-900 font-bold text-xl px-3 py-1 rounded-lg w-fit">
//           {mergedProduct.endPrice} ₾
//         </span>

//         <div className="flex gap-3">
//           <button className="flex-1 py-3 rounded-2xl bg-[#2f4a9c] text-white text-sm font-medium">
//             Buy Now
//           </button>
//           <button className="flex-1 py-3 rounded-2xl border border-gray-300 bg-white text-gray-800 text-sm font-medium flex items-center justify-center gap-2">
//             <img src={cart} alt="cart" className="w-4 h-4" />
//             Add to cart
//           </button>
//         </div>

//         <div>
//           <h2 className="text-sm font-bold text-gray-900 mb-1">Description</h2>
//           <p className="text-sm text-gray-600 leading-relaxed">
//             {mergedProduct.description}
//           </p>
//           <ul className="mt-2 space-y-0.5">
//             {mergedProduct.instructionsForUse?.map(
//               (instructionItem, instructionIndex) => (
//                 <li
//                   key={instructionIndex}
//                   className="text-sm text-gray-600 flex gap-2"
//                 >
//                   <span>•</span>
//                   {instructionItem}
//                 </li>
//               ),
//             )}
//           </ul>
//           {mergedProduct.doNotUse?.map((warningItem, warningIndex) => (
//             <p key={warningIndex} className="text-sm text-gray-600 mt-0.5">
//               {warningItem}
//             </p>
//           ))}
//           <p className="text-sm text-gray-600 mt-0.5">{mergedProduct.store}</p>
//           <p className="text-sm text-gray-600">
//             Volume: {Object.keys(mergedProduct.capacities)[0]}
//           </p>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ProductPage;