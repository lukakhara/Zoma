// import { useState } from "react";
// import garbageIcon from "../assets/garbage.png";
// import editIcon from "../assets/pencil.png";
// import { useLanguage } from "../context/LanguageContext";


// interface Product {
//   id: number;
//   name: string;
//   image: string;
//   quantity: number;
//   price: number;
//   discount: number;
//   finalPrice: number;
// }

// const Checkout = () => {
//   const { languageGeorgian } = useLanguage();
//   const [selectedPaymentMethod, setSelectedPaymentMethod] =
//     useState<boolean>(false);

//   const [cart, setCart] = useState<Product[]>([
//     {
//       id: 1,
//       name: "ZOMA BAFIX FOAM",
//       image: "src/assets/product.png",
//       quantity: 1,
//       price: 11.65,
//       discount: 1.87,
//       finalPrice: 9.78,
//     },
//     {
//       id: 2,
//       name: "ZOMA BAFIX FOAM",
//       image: "src/assets/product.png",
//       quantity: 1,
//       price: 11.65,
//       discount: 1.87,
//       finalPrice: 9.78,
//     },
//   ]);

 

//   return (
//     <>
//       <main className="flex flex-col gap-4  px-4 ">
//         <h1>Checkout</h1>

//         {/* selected items */}
//         <section className="bg-white rounded-md p-4">
//           <ul className="flex flex-col gap-2">
//             {cart.map((item, index) => (
//               <li
//                 key={index}
//                 className="flex items-center justify-center gap-6 "
//               >
//                 <img
//                   src={item.image}
//                   width={54}
//                   height={107}
//                   alt="product image"
//                 />
//                 {/* leftside */}
//                 <div className={`${index+1 === item.id ? 'border-b-2' : ''
//                   } p-2 border-gray-200 flex`}>
//                   <div className="flex flex-col ">
//                     <h1>{item.name}</h1>
//                     <div className="flex  justify-center gap-4">
//                       <button>{item.quantity}</button>
//                       <button className="cursor-pointer">
//                         <img src={garbageIcon} alt="remove " />
//                       </button>
//                     </div>
//                   </div>
//                   <div className="flex flex-col ">
//                     <div className="flex gap-2">
//                       <p>{item.price}₾</p>
//                       <p className="bg-orange-100 text-white center">
//                         {item.discount}₾
//                       </p>
//                     </div>
//                     <h1 className="bg-yellow-100 center">{item.finalPrice}₾</h1>
//                   </div>
//                 </div>
//               </li>
//             ))}
//           </ul>
//         </section>

//         {selectedPaymentMethod ? (
//           <>
//             {/*  summary section */}
//             <section className="bg-white p-3 z-111">
//               <h1>Summary:</h1>
//               <div>
//                 {/* property / value */}
//                 <p>Total price:</p>
//                 <p>19.56₾</p>
//               </div>
//               <div>
//                 {/* property / value */}
//                 <p>Total discount:</p>
//                 <p>3.74₾</p>
//               </div>
//               <div>
//                 {/* property / value */}
//                 <p>Total price to pay:</p>
//                 <h1>21.02₾</h1>
//               </div>
//             </section>
//             {/*  payment section */}
//             <section className="bg-white">
//               <h1>Payment Method:</h1>
//               <div className="flex flex-col">
//                 <div>
//                   <input
//                     type="radio"
//                     id="tbc-bank"
//                     name="payment_method"
//                     value="TBC Bank"
//                   />
//                   <label htmlFor="tbc-bank">TBC Bank</label>
//                 </div>

//                 <div>
//                   <input
//                     type="radio"
//                     id="bank-of-georgia"
//                     name="payment_method"
//                     value="Bank of Georgia"
//                   />
//                   <label htmlFor="bank-of-georgia">Bank of Georgia</label>
//                 </div>
//                 <div>
//                   <input
//                     type="radio"
//                     id="apple-pay"
//                     name="payment_method"
//                     value="APPLE PAY"
//                   />
//                   <label htmlFor="apple-pay">APPLE PAY</label>
//                 </div>

//                 <div>
//                   <input
//                     type="radio"
//                     id="google-pay"
//                     name="payment_method"
//                     value="GOOGLE PAY"
//                   />
//                   <label htmlFor="google-pay">GOOGLE PAY</label>
//                 </div>
//               </div>
//             </section>
//             <input type="radio" />
//             <label htmlFor="">I agree to terms & conditions</label>
//             <button className="text-center bg-yellow-100 cursor-pointer">
//               Checkout
//             </button>
//           </>
//         ) : (
//           <>
//             {/* delivery details section */}
//             <section className="bg-white p-3 flex flex-col gap-4 ">
//               {/* header of section */}
//               <div className="flex justify-between">
//                 <h1 className="text-2xl">Delivery details</h1>
//                 <button className="flex items-center gap-2 cursor-pointer">
//                   Edit
//                   <img src={editIcon} className="size-3.25" alt="Edit button" />
//                 </button>
//               </div>
//               <div className="flex flex-col gap-2">
//                 {/* address */}
//                 <div className="flex justify-between items-center">
//                   {/* property / value */}
//                   <p>Delivery address:</p>
//                   <p>Tbilisi,Rustaveli 1, 01212</p>
//                 </div>
//                 {/* mobile phone number */}
//                 <div className="flex justify-between">
//                   {/* property / value */}
//                   <p>Mobile:</p>
//                   <p>555 555 555</p>
//                 </div>
//               </div>
//             </section>
//             {/*  summary section */}
//             <section className="bg-white p-3">
//               <h1 className="text-2xl">Summary:</h1>
//               <div className="flex flex-col gap-2">
//                 <div className="flex  justify-between">
//                   {/* property / value */}
//                   <p>Total price:</p>
//                   <p>19.56₾</p>
//                 </div>
//                 <div className="flex  justify-between">
//                   {/* property / value */}
//                   <p>Total discount:</p>
//                   <p>3.74₾</p>
//                 </div>
//                 <div className="flex  justify-between">
//                   {/* property / value */}
//                   <p>Delivery:</p>
//                   <p>5.20₾</p>
//                 </div>
//                 <div className="flex  justify-between">
//                   {/* property / value */}
//                   <p>Total price to pay:</p>
//                   <h1 className="text-2xl">21.02₾</h1>
//                 </div>
//               </div>
//             </section>
//             <button className="text-center bg-yellow-100 cursor-pointer z-111"
//             onClick={() => setSelectedPaymentMethod(!selectedPaymentMethod)} >
//               Buy Now
//             </button>
//           </>
//         )}
//       </main>
//     </>
//   );
// };

// export default Checkout;



import { useState } from "react";
import garbageIcon from "../assets/garbage.png";
import editIcon from "../assets/pencil.png";
import { useLanguage } from "../context/LanguageContext";

interface Product {
  id: number;
  name: string;
  image: string;
  quantity: number;
  price: number;
  discount: number;
  finalPrice: number;
}

const Checkout = () => {
  const { languageGeorgian } = useLanguage();
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState<boolean>(false);

  const [cart, setCart] = useState<Product[]>([
    { id: 1, name: "ZOMA BAFIX FOAM", image: "src/assets/product.png", quantity: 1, price: 11.65, discount: 1.87, finalPrice: 9.78 },
    { id: 2, name: "ZOMA BAFIX FOAM (600 ml)", image: "src/assets/product.png", quantity: 1, price: 11.65, discount: 1.87, finalPrice: 9.78 },
  ]);

  return (
    <div className="min-h-screen  p-4 md:p-8">
      <h1 className="text-2xl font-bold text-gray-900 mb-4">Checkout</h1>

      {/* ── MOBILE ── */}
      <div className="md:hidden flex flex-col gap-4">

        {/* Cart items */}
        <div className="bg-white rounded-2xl p-4 shadow-sm">
          <ul className="flex flex-col divide-y divide-gray-100">
            {cart.map((item, index) => (
              <li key={index} className="flex items-center gap-3 py-4 first:pt-0 last:pb-0">
                <img src={item.image} alt="product" className="w-14 object-contain" />
                <div className="flex flex-1 justify-between items-center">
                  <div className="flex flex-col gap-2">
                    <p className="text-sm font-semibold text-[#2f4a9c]">{item.name}</p>
                    <div className="flex items-center gap-2">
                      <button className="border border-gray-300 rounded-lg px-3 py-1 text-sm flex items-center gap-1">
                        {item.quantity} <span className="text-gray-400">▾</span>
                      </button>
                      <button className="w-8 h-8 flex items-center justify-center rounded-lg bg-red-100">
                        <img src={garbageIcon} alt="remove" className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                  <div className="flex flex-col items-end gap-1">
                    <div className="flex items-center gap-1">
                      <span className="text-gray-400 line-through text-xs">{item.price}₾</span>
                      <span className="bg-orange-500 text-white text-xs font-semibold px-1.5 py-0.5 rounded">-{item.discount}₾</span>
                    </div>
                    <span className="bg-[#FDE800] text-gray-900 font-bold text-sm px-2 py-0.5 rounded-lg">{item.finalPrice}₾</span>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>

        {selectedPaymentMethod ? (
          <>
            {/* Summary */}
            <div className="bg-white rounded-2xl p-4 shadow-sm flex flex-col gap-2">
              <h2 className="text-lg font-bold text-[#2f4a9c]">Summary:</h2>
              {[["Total price:", "19.56 ₾"], ["Total discount:", "3.74 ₾"]].map(([l, v]) => (
                <div key={l} className="flex justify-between text-sm text-gray-700">
                  <span>{l}</span><span>{v}</span>
                </div>
              ))}
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-700">Total price to pay</span>
                <span className="text-xl font-bold text-[#2f4a9c]">21.02 ₾</span>
              </div>
            </div>

            {/* Payment */}
            <div className="bg-white rounded-2xl p-4 shadow-sm flex flex-col gap-3">
              <h2 className="text-lg font-bold text-[#2f4a9c]">Payment Method:</h2>
              <p className="text-sm text-gray-500">Choose payment method</p>
              {[
                { id: "tbc", label: "TBC Bank", emoji: "🏦" },
                { id: "bog", label: "Bank of Georgia", emoji: "🏧" },
                { id: "apple", label: "Apple Pay", badge: "Apple Pay" },
                { id: "google", label: "Google Pay", badge: "Google Pay" },
              ].map((m) => (
                <label key={m.id} className="flex items-center gap-3 cursor-pointer">
                  <input type="radio" name="payment_method" value={m.id} className="accent-[#2f4a9c]" />
                  {m.badge ? (
                    <span className="border border-gray-300 rounded-md px-3 py-1 text-xs font-semibold">{m.badge}</span>
                  ) : (
                    <span className="text-sm text-gray-700">{m.emoji} {m.label}</span>
                  )}
                </label>
              ))}
            </div>

            <label className="flex items-center gap-2 text-sm text-gray-600 cursor-pointer">
              <input type="checkbox" className="accent-[#2f4a9c]" />
              I agreee to terms &amp; conditions
            </label>

            <button className="w-full py-3 rounded-2xl bg-[#FDE800] text-gray-900 font-bold text-sm">
              Check Out
            </button>
          </>
        ) : (
          <>
            {/* Delivery details */}
            <div className="bg-white rounded-2xl p-4 shadow-sm flex flex-col gap-3">
              <div className="flex justify-between items-center">
                <h2 className="text-lg font-bold text-[#2f4a9c]">Delivery details:</h2>
                <button className="flex items-center gap-1 text-sm text-gray-500">
                  Edit <img src={editIcon} alt="edit" className="w-3 h-3" />
                </button>
              </div>
              <div className="flex justify-between text-sm text-gray-700">
                <span>Delivery address:</span><span>Tbilisi, Rustaveli 1, 01212</span>
              </div>
              <div className="flex justify-between text-sm text-gray-700">
                <span>Mobile:</span><span>555 555 555</span>
              </div>
            </div>

            {/* Summary */}
            <div className="bg-white rounded-2xl p-4 shadow-sm flex flex-col gap-2">
              <h2 className="text-lg font-bold text-[#2f4a9c]">Summary:</h2>
              {[["Total price:", "19.56 ₾"], ["Total discount:", "3.74 ₾"], ["Delivery:", "5.20 ₾"]].map(([l, v]) => (
                <div key={l} className="flex justify-between text-sm text-gray-700">
                  <span>{l}</span><span>{v}</span>
                </div>
              ))}
              <div className="flex justify-between items-center pt-1">
                <span className="text-sm text-gray-700">Total price to pay</span>
                <span className="text-xl font-bold text-[#2f4a9c]">21.02 ₾</span>
              </div>
            </div>

            <button
              onClick={() => setSelectedPaymentMethod(true)}
              className="w-full py-3 rounded-2xl bg-[#FDE800] text-gray-900 font-bold text-sm"
            >
              Buy Now
            </button>
          </>
        )}
      </div>

      {/* ── DESKTOP ── */}
      <div className="hidden md:flex gap-6 items-start">

        {/* Left: cart items */}
        <div className="flex-1 bg-white rounded-2xl p-4 shadow-sm">
          <ul className="flex flex-col divide-y divide-gray-100">
            {cart.map((item, index) => (
              <li key={index} className="flex items-center gap-4 py-4 first:pt-0 last:pb-0">
                <img src={item.image} alt="product" className="w-12 object-contain" />
                <p className="flex-1 text-sm font-semibold text-[#2f4a9c]">{item.name}</p>
                <button className="border border-gray-300 rounded-lg px-3 py-1 text-sm flex items-center gap-1">
                  {item.quantity} <span className="text-gray-400">▾</span>
                </button>
                <button className="w-8 h-8 flex items-center justify-center rounded-lg bg-red-100">
                  <img src={garbageIcon} alt="remove" className="w-4 h-4" />
                </button>
                <div className="flex flex-col items-end gap-1 min-w-[90px]">
                  <div className="flex items-center gap-1">
                    <span className="text-gray-400 line-through text-xs">{item.price}₾</span>
                    <span className="bg-orange-500 text-white text-xs font-semibold px-1.5 py-0.5 rounded">-{item.discount}₾</span>
                  </div>
                  <span className="bg-[#FDE800] text-gray-900 font-bold text-sm px-2 py-0.5 rounded-lg">{item.finalPrice}₾</span>
                </div>
              </li>
            ))}
          </ul>
        </div>

        {/* Right: summary + payment or delivery */}
        <div className="w-72 flex flex-col gap-4">
          {selectedPaymentMethod ? (
            <>
              <div className="bg-white rounded-2xl p-4 shadow-sm flex flex-col gap-2">
                <h2 className="text-lg font-bold text-[#2f4a9c]">Summary:</h2>
                {[["Total price:", "19.56 ₾"], ["Total discount:", "3.74 ₾"]].map(([l, v]) => (
                  <div key={l} className="flex justify-between text-sm text-gray-700">
                    <span>{l}</span><span>{v}</span>
                  </div>
                ))}
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-700">Total price to pay</span>
                  <span className="text-xl font-bold text-[#2f4a9c]">21.02 ₾</span>
                </div>
              </div>

              <div className="bg-white rounded-2xl p-4 shadow-sm flex flex-col gap-3">
                <h2 className="text-lg font-bold text-[#2f4a9c]">Payment Method:</h2>
                <p className="text-sm text-gray-500">Choose payment method</p>
                {[
                  { id: "tbc", label: "TBC Bank", emoji: "🏦" },
                  { id: "bog", label: "Bank of Georgia", emoji: "🏧" },
                  { id: "apple", badge: "Apple Pay" },
                  { id: "google", badge: "Google Pay" },
                ].map((m) => (
                  <label key={m.id} className="flex items-center gap-3 cursor-pointer">
                    <input type="radio" name="payment_method" value={m.id} className="accent-[#2f4a9c]" />
                    {m.badge ? (
                      <span className="border border-gray-300 rounded-md px-3 py-1 text-xs font-semibold">{m.badge}</span>
                    ) : (
                      <span className="text-sm text-gray-700">{m.emoji} {m.label}</span>
                    )}
                  </label>
                ))}
              </div>

              <label className="flex items-center gap-2 text-sm text-gray-600 cursor-pointer">
                <input type="checkbox" className="accent-[#2f4a9c]" />
                I agreee to terms &amp; conditions
              </label>

              <button className="w-full py-3 rounded-2xl bg-[#FDE800] text-gray-900 font-bold text-sm">
                Check Out
              </button>
            </>
          ) : (
            <>
              <div className="bg-white rounded-2xl p-4 shadow-sm flex flex-col gap-2">
                <h2 className="text-lg font-bold text-[#2f4a9c]">Summary:</h2>
                {[["Total price:", "19.56 ₾"], ["Total discount:", "3.74 ₾"], ["Delivery:", "5.20 ₾"]].map(([l, v]) => (
                  <div key={l} className="flex justify-between text-sm text-gray-700">
                    <span>{l}</span><span>{v}</span>
                  </div>
                ))}
                <div className="flex justify-between items-center pt-1">
                  <span className="text-sm text-gray-700">Total price to pay</span>
                  <span className="text-xl font-bold text-[#2f4a9c]">21.02 ₾</span>
                </div>
              </div>

              <button
                onClick={() => setSelectedPaymentMethod(true)}
                className="w-full py-3 rounded-2xl bg-[#FDE800] text-gray-900 font-bold text-sm"
              >
                Buy Now
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Checkout;