import { useState } from "react";
import garbageIcon from "/assets/garbage.png";
import editIcon from "/assets/pencil.png";
import tbc from "/assets/Payment/tbc.png";
import bog from "/assets/Payment/image-6.png";
import applePay from "/assets/Payment/apple-pay.png";
import googlePay from "/assets/Payment/google-pay.png";
import warningIcon from "/assets/warning.png";
import { useCartContext } from "../context/CartContext";
import { useNavigate } from "react-router-dom";
import { useCartProducts } from "../context/UseCartProducts";
import { placeOrder } from "../services/orderService";

const Checkout = () => {
  const cartItems = useCartProducts();
  const [selectedPaymentMethod, setSelectedPaymentMethod] =
    useState<boolean>(false);

  const { removeFromCart, updateQuantity, clearCart } = useCartContext();

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
      const order = placeOrder(cartItems);
      navigate("/transaction-result", { state: { success: true } });
      clearCart();
    }
  };

  const totalPrice = cartItems.reduce((total, item) => {
    return total + item.price * item.quantity;
  }, 0);

  const totalPriceToPay = cartItems.reduce((total, item) => {
    return total + item.finalPrice * item.quantity;
  }, 0);

  const totalDiscount = totalPrice - totalPriceToPay;

  return (
    <div className="min-h-screen  py-4 md:py-8">
      <h1 className="text-2xl font-bold text-gray-900 mb-4">Checkout</h1>

      {/* ── MOBILE ── */}
      <div className="md:hidden flex flex-col gap-4">
        {/* Cart items */}
        <div className="bg-white rounded-2xl p-4 shadow-sm  flex flex-col gap-4">
          <ul className="flex flex-col divide-y divide-[#E6E6E6]">
            {cartItems.map((item, index) => (
              <li
                key={index}
                className="flex items-center justify-between gap-4 py-4 first:pt-0 last:pb-0 "
              >
                {/* image and item quantity name delete button */}
                <div className="flex   gap-8 flex-1 ">
                  <img
                    src={item.image}
                    alt="product"
                    className="w-[54px] h-[107px]  object-cover"
                  />
                  {/* item name quanitity delete button */}
                  <div className="flex flex-col gap-[13px]      ">
                    <p className=" text-sm  font-helvetocaRegular text-blue-50 text-center ">
                      {item.name} ({item.label})
                    </p>
                    <div className="flex items-center gap-2 ">
                      <select
                        className="bg-[#F2F2F2] py-2 px-3  center  rounded-3xl text-blue-50 text-xl"
                        name="amount"
                        id="amount"
                        value={item.quantity}
                        onChange={(e) =>
                          updateQuantity(item.id, Number(e.target.value))
                        }
                      >
                        {Array.from(
                          {
                            length: item.amount,
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
                        onClick={() => removeFromCart(item.id)}
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

                <div className="flex flex-col items-end gap-1 min-w-[90px] ">
                  <div
                    className="flex flex-col items-center gap-1 "
                    key={item.label}
                  >
                    <div className="flex items-center gap-1">
                      <span className="unactiveStartingPrice text-[11.25px] text-[#C3C3C3]">
                        {(item.price * item.quantity).toFixed(2)}₾
                      </span>
                      <div className="text-[#FFFFFF] bg-red-100 rounded-[2.11px] px-[3.87px] py-[0.7px]">
                        -
                        {(
                          (item.price - item.finalPrice) *
                          item.quantity
                        ).toFixed(2)}{" "}
                        ₾
                      </div>
                    </div>
                    <span className="goldPrice text-[19.57px] text-[#474h747] leading-[13.58px] px-[6.71px] py-[8px]">
                      {(item.finalPrice * item.quantity).toFixed(2)}₾
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
                    className="accent-[#2f4a9c] size-3"
                />
                <img className="size-8.5 rounded-[7px]" src={tbc} alt="TBC Bank" />
                <span className="text-[16px]  text-[#797979]">TBC Bank</span>
              </label>
              <label className="flex items-center gap-3 cursor-pointer ">
                <input
                  type="radio"
                  name="payment_method"
                     className="accent-[#2f4a9c] size-3"
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
                    className="accent-[#2f4a9c] size-3"
                />
                <div className="w-[62px] h-[34px] border center  border-gray-300 rounded-md flex items-center justify-center">
                  <img
                    src={applePay}
                    alt="Apple Pay"
                  />
                </div>
              </label>
              <label className="flex items-center gap-3 cursor-pointer ">
                <input
                  type="radio"
                  name="payment_method"
                  className="accent-[#2f4a9c] size-3"
                />
                <div className="w-[62px] h-[34px] border center px-[6px] py-[7px] border-gray-300 rounded-md flex items-center justify-center">
                  <img src={googlePay} alt="Google Pay" />
                </div>
              </label>
            </div>

            <label className="terms-toggle  px-4">
              <input type="checkbox" id="terms" className="size-3"  />
              <span className="radio-visual size-3! bg-[#FFFFFF]! "></span>
              <p className="text-[#797979] font-normal ">I agreee to terms &amp; conditions</p>
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
                <h2 className="text-[18px] font-medium text-[#2f4a9c]">
                  Delivery details:
                </h2>
                <button className="flex items-center gap-1 text-sm text-[#2E4790]">
                  Edit <img src={editIcon} alt="edit" className="w-3 h-3" />
                </button>
              </div>
              <div className="flex justify-between text-sm text-gray-700">
                <span className="checkoutLeftText">Delivery address:</span>
                <span className="text-[#161F28]">
                  Tbilisi, Rustaveli 1, 01212
                </span>
              </div>
              <div className="flex justify-between text-sm text-gray-700">
                <span className="checkoutLeftText">Mobile:</span>
                <span className="text-[#161F28] text-[14px]">555 555 555</span>
              </div>
            </div>

            {/* Summary */}
            <div className="bg-white rounded-2xl p-4 shadow-sm flex flex-col gap-2">
              <h2 className="text-lg font-bold text-[#2f4a9c]">Summary:</h2>

              <div className="flex justify-between text-sm text-gray-700">
                <span className="checkoutLeftText">Total price:</span>
                <span className="text-[#161F28]   text-[16px]">
                  {totalPrice.toFixed(2)} ₾
                </span>
              </div>
              <div className="flex justify-between text-sm text-gray-700">
                <span className="checkoutLeftText ">Total discount:</span>
                <span className="text-[#161F28]   text-[16px]">
                  {totalDiscount.toFixed(2)} ₾
                </span>
              </div>
              {/* ------------- */}
              <div className="flex justify-between text-sm text-gray-700">
                <span className="checkoutLeftText">Delivery</span>
                <span className="text-[#161F28]   text-[16px]">5.20 ₾</span>
              </div>
              <div className="flex justify-between items-center pt-1">
                <span className="checkoutLeftText">Total price to pay</span>
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
                    src={item.image}
                    alt="product"
                    className="w-[54px] h-[107px]  object-cover"
                  />
                  {/* item name quanitity delete button */}
                  <div className="flex justify-between gap-4    items-start border-green-300!">
                    <p className="flex-1 text-sm font-helvetocaRegular text-blue-50 text-center flex-wrap">
                      {item.name} ({item.label})
                    </p>
                    <div className="flex items-center gap-2 ">
                      <select
                        className="bg-[#F2F2F2] py-2 px-3  center  rounded-3xl text-blue-50 text-xl"
                        name="amount"
                        id="amount"
                        value={item.quantity}
                        onChange={(e) =>
                          updateQuantity(item.id, Number(e.target.value))
                        }
                      >
                        {Array.from(
                          {
                            length: item.amount,
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
                        onClick={() => removeFromCart(item.id)}
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
                    <div key={item.label}>
                      <div className="flex items-center gap-1">
                        <span className="unactiveStartingPrice ">
                          {(item.price * item.quantity).toFixed(2)}₾
                        </span>
                        <div className="bg-red-100 rounded-[2.11px] px-[3.87px] py-[0.7px]">
                          <span className="redDiscount ">
                            {(
                              (item.price - item.finalPrice) *
                              item.quantity
                            ).toFixed(2)}
                          </span>
                        </div>
                      </div>
                      <span className="goldPrice">
                        {(item.finalPrice * item.quantity).toFixed(2)}₾
                      </span>
                    </div>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>

        {/* Right: summary + payment or delivery */}
        <div className="w-72 flex flex-col gap-4  ">
          <div className="bg-white rounded-2xl p-4 shadow-sm flex flex-col gap-2 ">
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
              <div className="flex flex-col gap-3 ">
                <h2 className="text-lg font-bold text-[#2f4a9c]">
                  Payment Method:
                </h2>
                <p className="text-sm text-gray-500">Choose payment method</p>

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
                  <span className="text-[16px]  text-[#797979]">TBC Bank</span>
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
            ) : (
              <></>
            )}
          </div>
          {selectedPaymentMethod ? (
            <div>
              {" "}
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
              className=" w-full py-3 rounded-2xl bg-[#FDE800] text-gray-900 font-bold text-sm cursor-pointer hover:opacity-90 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Buy Now
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Checkout;
