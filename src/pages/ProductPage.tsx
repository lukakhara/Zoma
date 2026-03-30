// import play from "../assets/play.png";
// import cart from "../assets/cart.png";
// import en from "../en.json";
// import ka from "../ka.json";
// import { useLanguage } from "../context/LanguageContext";

// // when from home page  item is clicked then this component must get id of that product that is clicked and use information about it.

// interface ProductPageProps {
//   languageGeorgian: boolean;
// }

// const ProductPage = () => {
//   const { languageGeorgian } = useLanguage();
//   const data = languageGeorgian ? ka : en;
//   const products = data.products;
//   const productId = 1; // TEMPORARY
//   const product = products[productId];
//   // NOW WE USE INDEX 0 TEMPORARELY!

  

//   return (
//     <>
//       <div className="flex flex-col ">
       
//         <main className="p-5">
//           <h4>{product.categorie}</h4>
//           <h1>{product.name}</h1>
//           <section className="flex justify-center">
//             <button>
//               <img src={play} alt="play icon" />
//             </button>
//             <img src={product.image[0]} alt="Product image" />
//             <ul className="flex gap-2">
//               {product.image.map((item) => (
//                 <li className="size-2 rounded-full "></li>
//               ))}
//             </ul>
//           </section>
//           <h1>{product.description}</h1>
//           <h3>Size:</h3>
//           <ul className="flex gap-2">
//             {Object.keys(product.capacities).map((item) => (
//               <li className="border rounded-md p-1 uppercase">{item}</li>
//             ))}
//           </ul>
//           <div>
//             <div>
//               <h2>quantity:</h2>
//               <button>1</button>
//             </div>
//             {/* prices section */}
//             <div className="">
//               <div className="flex gap-1">
//                 <h2 className="text-[#C3C3C3] text-xl line-through">{product.startingPrice}</h2>
//                 <h2 className="bg-orange-100 text-xl text-gray-300 font-semibold px-2 rounded-sm text-white">
//                   -1.87$
//                 </h2>
//               </div>

//               <h1 className="bg-[#FDE800] text-xl text-gray-300 font-semibold px-2 rounded-sm">
//                {product.endPrice}
//               </h1>
//             </div>
//             <div className="flex gap-2 items-center justify-between">
//               <button className="bg-blue-50 text-white text-center px-4 py-1">
//                 Buy Now
//               </button>
//               <button className="flex gap-2 justify-center items-center px-2 bg-white text-blue-50">
//                 <img src={cart} alt="cart icon" />
//                 Add to cart
//               </button>
//             </div>
//             <section>
//               <h1>Description</h1>
//               <p>{product.description}</p>
//               <ul className="list-disc">
//                 {
//                   product.instructionsForUse?.map((item,index) => (
//                        <li key={index}>{item}</li>
//                   ))
//                 }
//               </ul>
//                {
//                   product.doNotUse?.map((item,index) => (
//                        <p key={index}>{item}</p>
//                   ))
//                 }
//               <p>{product.store}</p>
//               <p>{Object.keys(product.capacities)[0]}</p>
//             </section>
//           </div>
//         </main>
//       </div>
//     </>
//   );
// };

// export default ProductPage;



import play from "../assets/play.png";
import cart from "../assets/cart.png";
import en from "../en.json";
import ka from "../ka.json";
import { useLanguage } from "../context/LanguageContext";

const ProductPage = () => {
  const { languageGeorgian } = useLanguage();
  const data = languageGeorgian ? ka : en;
  const products = data.products;
  const productId = 1;
  const product = products[productId];

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
            <img src={product.image[0]} alt="Product" className="max-h-60 object-contain" />
            {/* Dots */}
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
              {product.image.map((_, i) => (
                <span key={i} className={`w-2 h-2 rounded-full ${i === 0 ? "bg-[#2f4a9c]" : "bg-gray-300"}`} />
              ))}
            </div>
          </div>

          {/* Thumbnails */}
          <div className="flex gap-3">
            {product.image.map((img, i) => (
              <div key={i} className="bg-white rounded-xl p-2 shadow-sm w-24 h-24 flex items-center justify-center">
                <img src={img} alt={`thumb-${i}`} className="max-h-full object-contain" />
              </div>
            ))}
          </div>
        </div>

        {/* Right: details */}
        <div className="flex-1 flex flex-col gap-4">
          <div>
            <p className="text-sm text-[#2f4a9c] font-medium">{product.categorie}</p>
            <h1 className="text-2xl font-bold text-gray-900">{product.name}</h1>
            <p className="text-sm font-semibold text-gray-800 mt-2">{product.description}</p>
          </div>

          {/* Sizes */}
          <div>
            <p className="text-sm text-gray-500 mb-2">Size:</p>
            <div className="flex gap-2 flex-wrap">
              {Object.keys(product.capacities).map((size, i) => (
                <button key={size} className={`px-3 py-1.5 rounded-lg border text-sm uppercase font-medium ${i === 1 ? "border-[#2f4a9c] text-[#2f4a9c] font-bold" : "border-gray-300 text-gray-600"}`}>
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
            <span className="text-gray-400 line-through text-sm">{product.startingPrice}</span>
            <span className="bg-orange-500 text-white text-xs font-semibold px-2 py-0.5 rounded">-1.87 ₾</span>
            <span className="bg-[#FDE800] text-gray-900 font-bold text-xl px-3 py-0.5 rounded-lg">{product.endPrice} ₾</span>
          </div>

          {/* Buttons */}
          <div className="flex gap-3">
            <button className="flex-1 py-3 rounded-2xl bg-[#2f4a9c] text-white text-sm font-medium">
              Buy Now
            </button>
            <button className="flex-1 py-3 rounded-2xl border border-gray-300 bg-white text-gray-800 text-sm font-medium flex items-center justify-center gap-2">
              <img src={cart} alt="cart" className="w-4 h-4" />
              Add to cart
            </button>
          </div>

          {/* Description */}
          <div className="mt-2">
            <h2 className="text-sm font-bold text-gray-900 mb-1">Description</h2>
            <p className="text-sm text-gray-600 leading-relaxed">{product.description}</p>
            <ul className="mt-2 space-y-0.5">
              {product.instructionsForUse?.map((item, i) => (
                <li key={i} className="text-sm text-gray-600 flex gap-2"><span>•</span>{item}</li>
              ))}
            </ul>
            {product.doNotUse?.map((item, i) => (
              <p key={i} className="text-sm text-gray-600 mt-0.5">{item}</p>
            ))}
            <p className="text-sm text-gray-600 mt-0.5">{product.store}</p>
            <p className="text-sm text-gray-600">Volume: {Object.keys(product.capacities)[0]}</p>
          </div>
        </div>
      </div>

      {/* ── MOBILE layout ── */}
      <div className="md:hidden flex flex-col gap-4">
        {/* Category + name */}
        <div>
          <p className="text-sm text-[#2f4a9c] font-medium">{product.categorie}</p>
          <h1 className="text-2xl font-bold text-gray-900">{product.name}</h1>
        </div>

        {/* Main image */}
        <div className="relative bg-white rounded-2xl p-6 shadow-sm flex items-center justify-center min-h-[220px]">
          <button className="absolute top-4 left-4 w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center">
            <img src={play} alt="play" className="w-4 h-4" />
          </button>
          <img src={product.image[0]} alt="Product" className="max-h-48 object-contain" />
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
            {product.image.map((_, i) => (
              <span key={i} className={`w-2 h-2 rounded-full ${i === 0 ? "bg-[#2f4a9c]" : "bg-gray-300"}`} />
            ))}
          </div>
        </div>

        <p className="text-sm font-semibold text-gray-800">{product.description}</p>

        {/* Sizes */}
        <div>
          <p className="text-sm text-gray-500 mb-2">Size:</p>
          <div className="flex gap-2 flex-wrap">
            {Object.keys(product.capacities).map((size, i) => (
              <button key={size} className={`px-3 py-1.5 rounded-lg border text-sm uppercase font-medium ${i === 1 ? "border-[#2f4a9c] text-[#2f4a9c] font-bold" : "border-gray-300 text-gray-600"}`}>
                {size}
              </button>
            ))}
          </div>
        </div>

        {/* Quantity + pricing */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <p className="text-sm text-gray-500">Quantity:</p>
            <button className="border border-gray-300 rounded-lg px-3 py-1 text-sm flex items-center gap-1">
              1 <span className="text-gray-400">▾</span>
            </button>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-gray-400 line-through text-sm">{product.startingPrice}</span>
            <span className="bg-orange-500 text-white text-xs font-semibold px-2 py-0.5 rounded">-1.87 ₾</span>
          </div>
        </div>

        <span className="bg-[#FDE800] text-gray-900 font-bold text-xl px-3 py-1 rounded-lg w-fit">{product.endPrice} ₾</span>

        {/* Buttons */}
        <div className="flex gap-3">
          <button className="flex-1 py-3 rounded-2xl bg-[#2f4a9c] text-white text-sm font-medium">Buy Now</button>
          <button className="flex-1 py-3 rounded-2xl border border-gray-300 bg-white text-gray-800 text-sm font-medium flex items-center justify-center gap-2">
            <img src={cart} alt="cart" className="w-4 h-4" />
            Add to cart
          </button>
        </div>

        {/* Description */}
        <div>
          <h2 className="text-sm font-bold text-gray-900 mb-1">Description</h2>
          <p className="text-sm text-gray-600 leading-relaxed">{product.description}</p>
          <ul className="mt-2 space-y-0.5">
            {product.instructionsForUse?.map((item, i) => (
              <li key={i} className="text-sm text-gray-600 flex gap-2"><span>•</span>{item}</li>
            ))}
          </ul>
          {product.doNotUse?.map((item, i) => (
            <p key={i} className="text-sm text-gray-600 mt-0.5">{item}</p>
          ))}
          <p className="text-sm text-gray-600 mt-0.5">{product.store}</p>
          <p className="text-sm text-gray-600">Volume: {Object.keys(product.capacities)[0]}</p>
        </div>
      </div>

    </div>
  );
};

export default ProductPage;