import { useState } from "react";
import { useCartProducts } from "../context/UseCartProducts";
import { type CardProps } from "../types";

export default function MyOrders() {
  const cartItems = useCartProducts();
  const [orderedItems, setOrderedItems] = useState(cartItems);

  const totalPriceToPay = orderedItems.reduce((total, item) => {
    return total + item.finalPrice * item.quantity;
  }, 0);

  return (
    <div className="min-h-screen  py-4 md:py-8 ">
      <div className="bg-white rounded-2xl shadow-sm overflow-hidden ">
        {/* ── DESKTOP TABLE (md and above) ── */}
        <div className="hidden md:block ">
          {/* Top header row */}
          <div className="grid grid-cols-5 border-b border-[#C3C3C3] ">
            {["Order Number", "Date", "Quantity", "Price", "Status"].map(
              (h) => (
                <div
                  key={h}
                  className="border-r border-[#EEEEEE] px-6 py-4 text-sm font-semibold text-gray-800 text-center"
                >
                  {h}
                </div>
              ),
            )}
          </div>

          {/* Order summary row */}
          <div className="grid grid-cols-5 border-b border-[#C3C3C3]   ">
            <div className="px-6 py-4 text-sm text-gray-700 text-center border-r border-[#EEEEEE]">
              #123456
            </div>
            <div className="px-6 py-4 text-sm text-gray-700 text-center border-r border-[#EEEEEE]">
              12 September 2025
            </div>
            <div className="px-6 py-4 text-sm text-gray-700 text-center border-r border-[#EEEEEE]">
              {orderedItems.length} products
            </div>
            <div className="px-6 py-4 text-sm text-gray-700 text-center border-r border-[#EEEEEE]">
              {totalPriceToPay.toFixed(2)} ₾
            </div>
            <div className="px-6 py-4 text-center">
              <span className="bg-yellow-300 text-gray-900 text-xs font-semibold px-3 py-1.5 rounded-lg">
                Is Being Delivered
              </span>
            </div>
          </div>

          {/* Product detail header row */}
          <div className="grid grid-cols-5 ">
            {["Image", "Product", "Quantity", "Price", "Total"].map((h) => (
              <div
                key={h}
                className="px-6 py-3 text-sm font-semibold text-gray-800 text-center border-r border-[#EEEEEE]"
              >
                {h}
              </div>
            ))}
          </div>

          {/* Product row */}
          {orderedItems.map((item, index) => (
            <div key={index} className="grid grid-cols-5 items-center ">
              <div className="px-6 py-5 flex justify-center border-r border-[#EEEEEE]">
                <img src={item.image} alt="" />
              </div>
              <div className="px-6 py-5 text-sm text-gray-700 leading-relaxed border-r border-[#EEEEEE] h-full flex flex items-center justify-center">
                {"item description"}
              </div>
              <div className="px-6 py-5 text-sm text-gray-700 text-center border-r border-[#EEEEEE] h-full flex items-center justify-center">
                {item.quantity}
              </div>
              <div className="px-6 py-5 text-sm text-center border-r border-[#EEEEEE] h-full flex flex-col items-center justify-center">
                <div className="line-through text-gray-400 ">{item.price}₾</div>
                <div className="text-gray-700">{item.finalPrice}</div>
              </div>
              <div className="px-6 py-5 text-sm text-gray-700 text-center">
                {item.quantity * item.finalPrice}
              </div>
            </div>
          ))}
        </div>

        {/* ── MOBILE LIST (below md) ── */}
        <div className="md:hidden">
          {/* Each row is label + value */}
          {[
            { label: "Order Number", value: "#123456" },
            { label: "Date", value: "12 September 2025" },
            { label: "Quantity", value: "2 products" },
            { label: "Price", value: "199.00 ₾" },
          ].map((row) => (
            <div
              key={row.label}
              className="flex justify-between items-center px-5 py-3.5 border-b border-gray-100"
            >
              <span className="text-sm font-semibold text-gray-800">
                {row.label}
              </span>
              <span className="text-sm text-gray-700">{row.value}</span>
            </div>
          ))}

          {/* Status row */}
          <div className="flex justify-between items-center px-5 py-3.5 border-b border-gray-100">
            <span className="text-sm font-semibold text-gray-800">Status</span>
            <span className="bg-yellow-300 text-gray-900 text-xs font-semibold px-3 py-1.5 rounded-lg">
              Is Being Delivered
            </span>
          </div>

          {/* Image row */}
          <div className="flex justify-between items-start px-5 py-4 border-b border-gray-100">
            <span className="text-sm font-semibold text-gray-800">Image</span>
            <div className="w-32 h-32 rounded-xl bg-gray-200" />
          </div>

          {/* Product row */}
          <div className="flex justify-between items-start px-5 py-3.5 border-b border-gray-100">
            <span className="text-sm font-semibold text-gray-800">Product</span>
            <span className="text-sm text-gray-700 text-right max-w-[55%]">
              Cleaning agent designed to remove scale from bathroom surfaces.
            </span>
          </div>

          {/* Quantity */}
          <div className="flex justify-between items-center px-5 py-3.5 border-b border-gray-100">
            <span className="text-sm font-semibold text-gray-800">
              Quantity
            </span>
            <span className="text-sm text-gray-700">2</span>
          </div>

          {/* Price with strikethrough */}
          <div className="flex justify-between items-center px-5 py-3.5 border-b border-gray-100">
            <span className="text-sm font-semibold text-gray-800">Price</span>
            <div className="flex gap-2 text-sm">
              <span className="line-through text-gray-400">299.00 ₾</span>
              <span className="text-gray-700">199.00 ₾</span>
            </div>
          </div>

          {/* Total */}
          <div className="flex justify-between items-center px-5 py-3.5">
            <span className="text-sm font-semibold text-gray-800">Total</span>
            <span className="text-sm text-gray-700">199.00 ₾</span>
          </div>
        </div>
      </div>
    </div>
  );
}
