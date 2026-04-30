import { useState } from "react";
import garbageIcon from "/assets/garbage.png";
import editIcon from "/assets/pencil.png";
import tbc from "/assets/Payment/tbc.png";
import bog from "/assets/Payment/image-6.png";
import applePay from "/assets/Payment/apple-pay.png";
import googlePay from "/assets/Payment/google-pay.png";

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
  const [selectedPaymentMethod, setSelectedPaymentMethod] =
    useState<boolean>(false);

  const [cart, setCart] = useState<Product[]>([
    {
      id: 1,
      name: "ZOMA BAFIX FOAM",
      image: "/assets/product.png",
      quantity: 1,
      price: 11.65,
      discount: 1.87,
      finalPrice: 9.78,
    },
    {
      id: 2,
      name: "ZOMA BAFIX FOAM (600 ml)",
      image: "/assets/product.png",
      quantity: 1,
      price: 11.65,
      discount: 1.87,
      finalPrice: 9.78,
    },
  ]);

  return (
    <div className="min-h-screen  py-4 md:py-8">
      <h1 className="text-2xl font-bold text-gray-900 mb-4">Checkout</h1>

      {/* ── MOBILE ── */}
      <div className="md:hidden flex flex-col gap-4">
        {/* Cart items */}
        <div className="bg-white rounded-2xl p-4 shadow-sm">
          <ul className="flex flex-col divide-y divide-gray-100">
            {cart.map((item, index) => (
              <li
                key={index}
                className="flex items-center gap-3 py-4 first:pt-0 last:pb-0"
              >
                <img
                  src={item.image}
                  alt="product"
                  className="w-14 object-contain"
                />
                <div className="flex flex-1 justify-between items-center">
                  <div className="flex flex-col gap-2">
                    <p className="text-sm font-semibold text-[#2f4a9c]">
                      {item.name}
                    </p>
                    <div className="flex items-center gap-2">
                      <button className="border border-gray-300 rounded-lg px-3 py-1 text-sm flex items-center gap-1">
                        {item.quantity} <span className="text-gray-400">▾</span>
                      </button>
                      <button className="w-8 h-8 flex items-center justify-center rounded-lg bg-red-100">
                        <img
                          src={garbageIcon}
                          alt="remove"
                          className="w-4 h-4 cursor-pointer"
                        />
                      </button>
                    </div>
                  </div>
                  <div className="flex flex-col items-end gap-1">
                    <div className="flex items-center gap-1">
                      <span className="text-gray-400 line-through text-xs">
                        {item.price}₾
                      </span>
                      <span className="bg-orange-500 text-white text-xs font-semibold px-1.5 py-0.5 rounded">
                        -{item.discount}₾
                      </span>
                    </div>
                    <span className="bg-[#FDE800] text-gray-900 font-bold text-sm px-2 py-0.5 rounded-lg">
                      {item.finalPrice}₾
                    </span>
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
              {[
                ["Total price:", "19.56 ₾"],
                ["Total discount:", "3.74 ₾"],
              ].map(([l, v]) => (
                <div
                  key={l}
                  className="flex justify-between text-sm text-gray-700"
                >
                  <span>{l}</span>
                  <span>{v}</span>
                </div>
              ))}
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-700">
                  Total price to pay
                </span>
                <span className="text-xl font-bold text-[#2f4a9c]">
                  21.02 ₾
                </span>
              </div>
            </div>

            {/* Payment */}
            <div className="bg-white rounded-2xl p-4 shadow-sm flex flex-col gap-3">
              <h2 className="text-lg font-bold text-[#2f4a9c]">
                Payment Method:
              </h2>
              <p className="text-sm text-gray-500">Choose payment method</p>
            
               <label className="flex items-center gap-3 cursor-pointer ">
                  <input
                    type="radio"
                    name="payment_method"
                    className="accent-[#2f4a9c]"
                  />
                  <img className="size-8.5" src={tbc} alt="TBC Bank" />
                  <span className="text-[16px]  text-[#797979]">TBC Bank</span>
                </label>
                <label className="flex items-center gap-3 cursor-pointer ">
                  <input
                    type="radio"
                    name="payment_method"
                    className="accent-[#2f4a9c]"
                  />
                  <img className="" src={bog} alt="Bank of Georgia" />
                  <span className="text-[16px]  text-[#797979]">
                    Bank of Georgia
                  </span>
                </label>
                <label className="flex items-center gap-3 cursor-pointer ">
                  <input
                    type="radio"
                    name="payment_method"
                    className="accent-[#2f4a9c]"
                  />

                  <img
                    className="w-[63px] h-[42px]  border center border-gray-300 rounded-md "
                    src={applePay}
                    alt="Apple Pay"
                  />
                </label>
                <label className="flex items-center gap-3 cursor-pointer ">
                  <input
                    type="radio"
                    name="payment_method"
                    className="accent-[#2f4a9c]"
                  />
                  <div className="w-[62px] h-[34px] border center border-gray-300 rounded-md center">
                    <img  src={googlePay} alt="Google Pay" />
                  </div>
                </label>
              </div>

              <label className="terms-toggle ">
                <input type="checkbox" id="terms" className=""/>
                <span className="radio-visual bg-[#FFFFFF]! " ></span>
                <p>I agreee to terms &amp; conditions</p>
              </label>
              <button className="w-full py-3 rounded-2xl bg-[#FDE800] text-blue-50 font-helvetocaMedium text-[16px] cursor-pointer hover:opacity-90 transition-opacity">
                Check Out 
              </button>
              
          
          </>
        ) : (
          <>
            {/* Delivery details */}
            <div className="bg-white rounded-2xl p-4 shadow-sm flex flex-col gap-3">
              <div className="flex justify-between items-center">
                <h2 className="text-lg font-bold text-[#2f4a9c]">
                  Delivery details:
                </h2>
                <button className="flex items-center gap-1 text-sm text-gray-500">
                  Edit <img src={editIcon} alt="edit" className="w-3 h-3" />
                </button>
              </div>
              <div className="flex justify-between text-sm text-gray-700">
                <span>Delivery address:</span>
                <span>Tbilisi, Rustaveli 1, 01212</span>
              </div>
              <div className="flex justify-between text-sm text-gray-700">
                <span>Mobile:</span>
                <span>555 555 555</span>
              </div>
            </div>

            {/* Summary */}
            <div className="bg-white rounded-2xl p-4 shadow-sm flex flex-col gap-2">
              <h2 className="text-lg font-bold text-[#2f4a9c]">Summary:</h2>
              {[
                ["Total price:", "19.56 ₾"],
                ["Total discount:", "3.74 ₾"],
                ["Delivery:", "5.20 ₾"],
              ].map(([l, v]) => (
                <div
                  key={l}
                  className="flex justify-between text-sm text-gray-700"
                >
                  <span>{l}</span>
                  <span>{v}</span>
                </div>
              ))}
              <div className="flex justify-between items-center pt-1">
                <span className="text-sm text-gray-700">
                  Total price to pay
                </span>
                <span className="text-xl font-bold text-[#2f4a9c]">
                  21.02 ₾
                </span>
              </div>
            </div>

            <button
              onClick={() => setSelectedPaymentMethod(true)}
              className="w-full py-3 rounded-2xl bg-[#FDE800] text-gray-900 font-bold text-sm cursor-pointer"
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
              <li
                key={index}
                className="flex items-center gap-4 py-4 first:pt-0 last:pb-0"
              >
                <img
                  src={item.image}
                  alt="product"
                  className="w-12 object-contain"
                />
                <p className="flex-1 text-sm font-semibold text-[#2f4a9c]">
                  {item.name}
                </p>
                <button className="border border-gray-300 rounded-lg px-3 py-1 text-sm flex items-center gap-1">
                  {item.quantity} <span className="text-gray-400">▾</span>
                </button>
                <button
                  className="w-8 h-8 flex items-center justify-center rounded-lg bg-red-100 cursor-pointer
                hover:opacity-90"
                >
                  <img src={garbageIcon} alt="remove" className="w-4 h-4 " />
                </button>
                <div className="flex flex-col items-end gap-1 min-w-[90px]">
                  <div className="flex items-center gap-1">
                    <span className="text-gray-400 line-through text-xs">
                      {item.price}₾
                    </span>
                    <span className="bg-orange-500 text-white text-xs font-semibold px-1.5 py-0.5 rounded">
                      -{item.discount}₾
                    </span>
                  </div>
                  <span className="bg-[#FDE800] text-gray-900 font-bold text-sm px-2 py-0.5 rounded-lg">
                    {item.finalPrice}₾
                  </span>
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
                {[
                  ["Total price:", "19.56 ₾"],
                  ["Total discount:", "3.74 ₾"],
                ].map(([l, v]) => (
                  <div
                    key={l}
                    className="flex justify-between text-sm text-gray-700"
                  >
                    <span>{l}</span>
                    <span>{v}</span>
                  </div>
                ))}
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-700">
                    Total price to pay
                  </span>
                  <span className="text-xl font-bold text-[#2f4a9c]">
                    21.02 ₾
                  </span>
                </div>
              </div>

              <div className="bg-white rounded-2xl p-4 shadow-sm flex flex-col gap-3">
                <h2 className="text-lg font-bold text-[#2f4a9c]">
                  Payment Method:
                </h2>
                <p className="text-sm text-gray-500">Choose payment method</p>
              
                <label className="flex items-center gap-3 cursor-pointer ">
                  <input
                    type="radio"
                    name="payment_method"
                    className="accent-[#2f4a9c]"
                  />
                  <img className="size-8.5" src={tbc} alt="TBC Bank" />
                  <span className="text-[16px]  text-[#797979]">TBC Bank</span>
                </label>
                <label className="flex items-center gap-3 cursor-pointer ">
                  <input
                    type="radio"
                    name="payment_method"
                    className="accent-[#2f4a9c]"
                  />
                  <img className="" src={bog} alt="Bank of Georgia" />
                  <span className="text-[16px]  text-[#797979]">
                    Bank of Georgia
                  </span>
                </label>
                <label className="flex items-center gap-3 cursor-pointer ">
                  <input
                    type="radio"
                    name="payment_method"
                    className="accent-[#2f4a9c]"
                  />

                  <img
                    className="w-[63px] h-[42px]  border center border-gray-300 rounded-md "
                    src={applePay}
                    alt="Apple Pay"
                  />
                </label>
                <label className="flex items-center gap-3 cursor-pointer ">
                  <input
                    type="radio"
                    name="payment_method"
                    className="accent-[#2f4a9c]"
                  />
                  <div className="w-[62px] h-[34px] border center border-gray-300 rounded-md center">
                    <img  src={googlePay} alt="Google Pay" />
                  </div>
                </label>
              </div>

              <label className="terms-toggle ">
                <input type="checkbox" id="terms" className=""/>
                <span className="radio-visual bg-[#FFFFFF]! " ></span>
                <p>I agreee to terms &amp; conditions</p>
              </label>
              <button className="w-full py-3 rounded-2xl bg-[#FDE800] text-blue-50 font-helvetocaMedium text-[16px] cursor-pointer hover:opacity-90 transition-opacity">
                Check Out 
              </button>
            </>
          ) : (
            <>
              <div className="bg-white rounded-2xl p-4 shadow-sm flex flex-col gap-2">
                <h2 className="text-lg font-bold text-[#2f4a9c]">Summary:</h2>
                {[
                  ["Total price:", "19.56 ₾"],
                  ["Total discount:", "3.74 ₾"],
                  ["Delivery:", "5.20 ₾"],
                ].map(([l, v]) => (
                  <div
                    key={l}
                    className="flex justify-between text-sm text-gray-700"
                  >
                    <span>{l}</span>
                    <span>{v}</span>
                  </div>
                ))}
                <div className="flex justify-between items-center pt-1">
                  <span className="text-sm text-gray-700">
                    Total price to pay
                  </span>
                  <span className="text-xl font-bold text-[#2f4a9c]">
                    21.02 ₾
                  </span>
                </div>
              </div>

              <button
                onClick={() => setSelectedPaymentMethod(true)}
                className="w-full py-3 rounded-2xl bg-[#FDE800] text-gray-900 font-bold text-sm cursor-pointer hover:opacity-90 transition-opacity"
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
