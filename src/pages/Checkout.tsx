import { useState } from "react";
import garbageIcon from "/assets/garbage.png";
import editIcon from "/assets/pencil.png";
import tbc from "/assets/Payment/tbc.png";
import bog from "/assets/Payment/image-6.png";
import applePay from "/assets/Payment/apple-pay.png";
import googlePay from "/assets/Payment/google-pay.png";
import warningIcon from "/assets/warning.png";
import { useCartContext } from "../context/CartContext";
import TransactionResult from "./TransactionResult";
import { useNavigate } from "react-router-dom";

const Checkout = () => {
  const [selectedPaymentMethod, setSelectedPaymentMethod] =
    useState<boolean>(false);

  const {
    cartItems,
    totalDiscount,
    totalPrice,
    totalPriceToPay,
    removeFromCart,
    updateQuantity,
  } = useCartContext();

  const navigate = useNavigate();
  const [agreedToTerms, setAgreedToTerms] = useState<boolean>(false);
  const [paymentMethod, setPaymentMethod] = useState<string | null>(null);
  const [errors, setErrors] = useState({ terms: "", payment: "" });

  const handleCheckout = () => {
    const newErrors = { terms: "", payment: "" };

    if (!agreedToTerms) {
      newErrors.terms = "You must agree to terms & conditions";
    }
    if (!paymentMethod) {
      newErrors.payment = "Please select a payment method";
    }

    setErrors(newErrors);

    // only proceed if no errors
    if (!newErrors.terms && !newErrors.payment) {
      navigate("/transaction-result", { state: { success: true } });
      localStorage.setItem("cart", JSON.stringify(cartItems));
    }
  };
  console.log("cartItems111111111111111",cartItems);

  // const [cart, setCart] = useState<Product[]>([
  //   {
  //     id: 1,
  //     name: "ZOMA BAFIX FOAM",
  //     image: "/assets/product.png",
  //     quantity: 1,
  //     price: 11.65,
  //     discount: 1.87,
  //     finalPrice: 9.78,
  //   },
  //   {
  //     id: 2,
  //     name: "ZOMA BAFIX FOAM (600 ml)",
  //     image: "/assets/product.png",
  //     quantity: 1,
  //     price: 11.65,
  //     discount: 1.87,
  //     finalPrice: 9.78,
  //   },
  // ]);

  return (
    <div className="min-h-screen  py-4 md:py-8">
      <h1 className="text-2xl font-bold text-gray-900 mb-4">Checkout</h1>

      {/* ── MOBILE ── */}
      <div className="md:hidden flex flex-col gap-4">
        {/* Cart items */}
        <div className="bg-white rounded-2xl p-4 shadow-sm  flex flex-col gap-4">
          <ul className="flex flex-col divide-y divide-gray-100">
            {cartItems.map((item, index) => (
              <li
                key={index}
                className="flex items-center justify-around gap-3 py-4 first:pt-0 last:pb-0"
              >
                <img
                  src={item.image[0]}
                  alt="product"
                  className="w-[54px] h-[107px] flex-1"
                />

                <div className="flex flex-col gap-2  flex-1">
                  <p className="text-sm font-semibold text-[#2f4a9c]">
                    {item.name}{" "}
                    {item.capacities && `(${item.capacities[0].label})`}
                  </p>
                  <div className="flex items-center gap-2">
                    <button className="border border-gray-300 rounded-lg px-3 py-1 text-sm flex items-center gap-1">
                      {/* {item.quantity} <span className="text-gray-400">▾</span> */}
                    </button>
                    <button
                      className="w-8 h-8 flex items-center justify-center rounded-lg bg-red-100"
                      onClick={() => removeFromCart(item)}
                    >
                      <img
                        src={garbageIcon}
                        alt="remove"
                        className="w-4 h-4 cursor-pointer"
                      />
                    </button>
                  </div>
                </div>
                <div className="flex flex-col items-end gap-1 flex-1">
                  {item.capacities && (
                    <div
                      key={item.capacities[item.selectedCapacityIndex].label}
                      className="flex gap-[3px.84px] flex-col "
                    >
                      <div className="flex items-center gap-[2.5px]">
                        <span className="unactiveStartingPrice rounded-[2.11px] px-[3.87px] py-[0.7px]">
                          {item.capacities[item.selectedCapacityIndex].price}₾
                        </span>
                        <div className="bg-red-100 ">
                          <span className="redDiscount ">
                            -
                            {
                              item.capacities[item.selectedCapacityIndex]
                                .discount
                            }{" "}
                            ₾
                          </span>
                        </div>
                      </div>
                      <span className="goldPrice ">
                        {item.capacities[item.selectedCapacityIndex].finalPrice}
                        ₾
                      </span>
                    </div>
                  )}
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
              {/* {[
                ["Total price:", `${totalPrice.toFixed(2)} ₾`],
                ["Total discount:", `${totalDiscount.toFixed(2)} ₾`],
              ].map(([l, v]) => (
                <div
                  key={l}
                  className="flex justify-between text-sm text-gray-700"
                >
                  <span>{l}</span>
                  <span>{v}</span>
                </div>
              ))} */}
              <div className="flex justify-between text-sm text-gray-700">
                <span>Total price:</span>
                <span>{totalPrice.toFixed(2)} ₾</span>
              </div>
              <div className="flex justify-between text-sm text-gray-700">
                <span>Total discount:</span>
                <span>{totalDiscount.toFixed(2)} ₾</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-700">
                  Total price to pay
                </span>
                <span className="text-xl font-bold text-[#2f4a9c]">
                  {totalPriceToPay.toFixed(2)} ₾
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
                  <img src={googlePay} alt="Google Pay" />
                </div>
              </label>
            </div>

            <label className="terms-toggle ">
              <input type="checkbox" id="terms" className="" />
              <span className="radio-visual bg-[#FFFFFF]! "></span>
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
              {/* {[
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
              ))} */}
              {/* --------------- */}
              <div className="flex justify-between text-sm text-gray-700">
                <span>Total price:</span>
                <span>{totalPrice.toFixed(2)} ₾</span>
              </div>
              <div className="flex justify-between text-sm text-gray-700">
                <span>Total discount:</span>
                <span>{totalDiscount.toFixed(2)} ₾</span>
              </div>
              {/* ------------- */}
              <div className="flex justify-between items-center pt-1">
                <span className="text-sm text-gray-700">
                  Total price to pay
                </span>
                <span className="text-xl font-bold text-[#2f4a9c]">
                  {totalPriceToPay.toFixed(2)} ₾
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
            {cartItems.map((item, index) => (
              <li
                key={index}
                className="flex items-center justify-between gap-4 py-4 first:pt-0 last:pb-0 "
              >
                {/* image and item quantity name delete button */}
                <div className="flex   gap-8 flex-1 ">
                  <img
                    src={item.image[0]}
                    alt="product"
                    className="w-[54px] h-[107px]  object-cover"
                  />
                  {/* item name quanitity delete button */}
                  <div className="flex justify-between gap-4    items-start border-green-300!">
                    <p className="flex-1 text-sm font-helvetocaRegular text-blue-50 text-center flex-wrap">
                      {item.name}
                      {item.capacities &&
                        `(${item.capacities[item.selectedCapacityIndex].label})`}
                    </p>
                    <div className="flex items-center gap-2">
                      <select
                        className="bg-[#F2F2F2] py-2 px-3  center  rounded-3xl text-blue-50 text-xl"
                        name="amount"
                        id="amount"
                        value={item.amount}
                        onChange={(e) =>
                          updateQuantity(
                            item.id,
                            Number(e.target.value),
                            item.selectedCapacityIndex,
                          )
                        }
                      >
                        {Array.from(
                          {
                            length:
                              item.capacities[item.selectedCapacityIndex]
                                .quantity,
                          },
                          (_, i) => (
                            <option key={i + 1} value={i + 1}>
                              {i + 1}
                            </option>
                          ),
                        )}
                      </select>
                      <button
                        className="w-8 h-8 flex items-center justify-center  bg-[#902E2E3B] cursor-pointer
                hover:opacity-90 rounded-[131.45px] "
                        onClick={() => removeFromCart(item)}
                      >
                        <img
                          src={garbageIcon}
                          alt="remove"
                          className="w-4 h-4 "
                        />
                      </button>
                    </div>
                  </div>
                </div>

                <div className="flex flex-col items-end gap-1 min-w-[90px]">
                  <div className="flex items-center gap-1">
                    {item.capacities && (
                      <div
                        key={item.capacities[item.selectedCapacityIndex].label}
                      >
                        <div className="flex items-center gap-1">
                          <span className="unactiveStartingPrice ">
                            {(
                              item.capacities[item.selectedCapacityIndex]
                                ?.price * item.amount
                            ).toFixed(2)}
                            ₾
                          </span>
                          <div className="bg-red-100 rounded-[2.11px] px-[3.87px] py-[0.7px]">
                            <span className="redDiscount ">
                              {(
                                (item.capacities[item.selectedCapacityIndex]
                                  .price -
                                  item.capacities[item.selectedCapacityIndex]
                                    .finalPrice) *
                                item.amount
                              ).toFixed(2)}
                            </span>
                          </div>
                        </div>
                        <span className="goldPrice">
                          {(
                            item.capacities[item.selectedCapacityIndex]
                              ?.finalPrice * item.amount
                          ).toFixed(2)}
                          ₾
                        </span>
                      </div>
                    )}
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>

        {/* Right: summary + payment or delivery */}
        <div className="w-72 flex flex-col gap-4 test border-amber-400">
          <div className="bg-white rounded-2xl p-4 shadow-sm flex flex-col gap-2 test border-pink-500">
            <h2 className="text-lg font-bold text-[#2f4a9c]">Summary:</h2>

            <div className="flex justify-between text-sm text-gray-700">
              <span>Total price:</span>
              <span>{totalPrice.toFixed(2)} ₾</span>
            </div>
            <div className="flex justify-between text-sm text-gray-700">
              <span>Total discount:</span>
              <span>{totalDiscount.toFixed(2)} ₾</span>
            </div>
            {/* ------------ */}
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-700">Total price to pay</span>
              <span className="text-xl font-bold text-[#2f4a9c]">
                {totalPriceToPay.toFixed(2)} ₾
              </span>
            </div>
            {selectedPaymentMethod ? (
              <div>
                <>
                  <div className="bg-white rounded-2xl p-4 shadow-sm flex flex-col gap-3 test border-black">
                    <h2 className="text-lg font-bold text-[#2f4a9c]">
                      Payment Method:
                    </h2>
                    <p className="text-sm text-gray-500">
                      Choose payment method
                    </p>

                    <label className="flex items-center gap-3 cursor-pointer ">
                      <input
                        type="radio"
                        name="payment_method"
                        className="accent-[#2f4a9c]"
                        value="tbc"
                        onChange={(e) => {
                          setPaymentMethod(e.target.value);
                          setErrors((prev) => ({ ...prev, payment: "" }));
                        }}
                      />
                      <img className="size-8.5" src={tbc} alt="TBC Bank" />
                      <span className="text-[16px]  text-[#797979]">
                        TBC Bank
                      </span>
                    </label>
                    <label className="flex items-center gap-3 cursor-pointer ">
                      <input
                        type="radio"
                        name="payment_method"
                        className="accent-[#2f4a9c]"
                        value="bog"
                        onChange={(e) => {
                          setPaymentMethod(e.target.value);
                          setErrors((prev) => ({ ...prev, payment: "" }));
                        }}
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
                        value="apple_pay"
                        onChange={(e) => {
                          setPaymentMethod(e.target.value);
                          setErrors((prev) => ({ ...prev, payment: "" }));
                        }}
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
                        value="google_pay"
                        onChange={(e) => {
                          setPaymentMethod(e.target.value);
                          setErrors((prev) => ({ ...prev, payment: "" }));
                        }}
                      />
                      <div className="w-[62px] h-[34px] border center border-gray-300 rounded-md center">
                        <img src={googlePay} alt="Google Pay" />
                      </div>
                    </label>
                    {errors.payment && (
                      <div className="flex  items-center">
                        <img src={warningIcon} alt="" />
                        <p className="text-red-500 text-sm mt-1">
                          {errors.payment}
                        </p>
                      </div>
                    )}
                  </div>
                </>

                {errors.terms && (
                  <div className="flex  items-center">
                    <img src={warningIcon} alt="" />
                    <p className="text-red-500 text-sm mt-1">{errors.terms}</p>
                  </div>
                )}

                <label className="terms-toggle ">
                  <input
                    type="checkbox"
                    id="terms"
                    className=""
                    checked={agreedToTerms}
                    onChange={(e) => {
                      setAgreedToTerms(e.target.checked);
                      setErrors((prev) => ({ ...prev, terms: "" }));
                    }}
                  />
                  <span className="radio-visual bg-[#FFFFFF]! "></span>

                  <p>I agreee to terms &amp; conditions</p>
                </label>
                <button
                  className="w-full py-3 rounded-2xl bg-[#FDE800] text-blue-50 font-helvetocaMedium text-[16px] cursor-pointer hover:opacity-90 transition-opacity"
                  onClick={() => handleCheckout()}
                >
                  Check Out
                </button>
              </div>
            ) : (
              <button
                onClick={() => setSelectedPaymentMethod(true)}
                disabled={cartItems.length === 0 ? true : false}
                className="w-full py-3 rounded-2xl bg-[#FDE800] text-gray-900 font-bold text-sm cursor-pointer hover:opacity-90 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Buy Now
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
