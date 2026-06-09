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
import { useTranslation } from "react-i18next";

const Checkout = () => {
  const {t} = useTranslation('translation', { keyPrefix: 'checkout' });
  const cartItems = useCartProducts();
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState(false);
  const { removeFromCart, updateQuantity, clearCart } = useCartContext();
  const navigate = useNavigate();
  const [agreedToTerms, setAgreedToTerms] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState<string | null>(null);
  const [errors, setErrors] = useState({ terms: "", payment: "" });

  const handleCheckout = () => {
    const newErrors = { terms: "", payment: "" };
    if (!agreedToTerms)
      newErrors.terms = "You must agree to terms & conditions";
    if (!paymentMethod) newErrors.payment = "Please select a payment method";
    setErrors(newErrors);
    if (!newErrors.terms && !newErrors.payment) {
      placeOrder(cartItems);
      navigate("/transaction-result", { state: { success: true } });
      clearCart();
    }
  };

  const totalPrice = cartItems.reduce(
    (t, item) => t + item.price * item.quantity,
    0,
  );
  const totalPriceToPay = cartItems.reduce(
    (t, item) => t + item.finalPrice * item.quantity,
    0,
  );
  const totalDiscount = totalPrice - totalPriceToPay;

  return (
    <div className="min-h-screen py-4 md:py-8">
      <h1 className="text-2xl font-bold text-gray-900 mb-4">{t('checkout')} </h1>

      <div className="flex flex-col md:flex-row gap-4 md:gap-6 items-start">
        {/* ── LEFT: Cart Items ── */}
        <div className="w-full md:flex-1 bg-white rounded-2xl p-4 shadow-sm">
          <ul className="flex flex-col divide-y divide-[#E6E6E6]">
            {cartItems.map((item, index) => (
              <li
                key={index}
                className="flex items-center justify-between gap-4 py-4 first:pt-0 last:pb-0"
              >
                {/* Image + name/qty/delete */}
                <div className="flex gap-2 md:gap-8 flex-1 ">
                  <img
                    src={item.image}
                    alt="product"
                    className="w-[54px] h-[107px] object-cover"
                  />

                  {/* name + controls — stacked on mobile, row on desktop */}
                  <div className="flex flex-col lg:flex-row items-start gap-[20px] md:gap-2 lg:gap-9 flex-1   ">
                    <p
                      className="text-sm font-helvetocaRegular text-blue-50 text-center  flex-wrap
                    md:w-[225px] md:min-w-[225px] "
                    >
                      {item.name} ({item.label})
                    </p>

                    <div className="flex items-center gap-2 md:gap-4 lg:gap-5  ">
                      <select
                        className="bg-[#F2F2F2] py-2 px-3 rounded-3xl text-blue-50 text-xl "
                        name="amount"
                        id="amount"
                        value={item.quantity}
                        onChange={(e) =>
                          updateQuantity(item.id, Number(e.target.value))
                        }
                      >
                        {Array.from({ length: item.amount }, (_, i) => (
                          <option key={i + 1} value={i + 1}>
                            {i + 1}
                          </option>
                        ))}
                      </select>

                      <button
                        className="w-8 h-8 flex items-center justify-center bg-[#902E2E3B] cursor-pointer hover:opacity-90 rounded-[131.45px] shrink-0 "
                        onClick={() => removeFromCart(item.id)}
                      >
                        <img
                          src={garbageIcon}
                          alt="remove"
                          className="w-4 h-4"
                        />
                      </button>
                    </div>
                  </div>
                </div>

                {/* Pricing */}
                <div className="flex flex-col items-end gap-1 min-w-[90px]">
                  <div
                    className="flex items-center gap-1 flex-col"
                    key={item.label}
                  >
                    <div className="flex items-center gap-1 md:gap-2">
                      <span className="unactiveStartingPrice text-[11.25px] text-[#C3C3C3]">
                        {(item.price * item.quantity).toFixed(2)}₾
                      </span>
                      <div className="text-[#FFFFFF] bg-red-100 rounded-[2.11px] px-[3.87px] py-[0.7px]">
                        <span className="redDiscount text-[11.25px]">
                          -
                          {(
                            (item.price - item.finalPrice) *
                            item.quantity
                          ).toFixed(2)}{" "}
                          ₾
                        </span>
                      </div>
                    </div>
                    <span className="goldPrice text-[19.57px] text-[#474747] leading-[13.58px] px-[6.71px] py-[8px]">
                      {(item.finalPrice * item.quantity).toFixed(2)}₾
                    </span>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>

        {/* ── RIGHT: Summary + Payment/Delivery ── */}
        <div className="w-full md:w-72 flex flex-col gap-4">
          {/* Delivery details — only shown before payment step */}
          {!selectedPaymentMethod && (
            <div className="flex bg-white rounded-2xl p-4 shadow-sm md:hidden flex-col gap-3">
              <div className="flex justify-between items-center">
                <h2 className="text-[18px] font-medium text-[#2f4a9c]">
                 {t('deliveryDetails')} 
                </h2>
                <button className="flex items-center gap-1 text-sm text-[#2E4790]">
                {t('edit')} <img src={editIcon} alt="edit" className="w-3 h-3" />
                </button>
              </div>
              <div className="flex justify-between text-sm text-gray-700">
                <span className="checkoutLeftText">{t('deliveryAddress')}: </span>
                <span className="text-[#161F28]">
                 Tbilisi, Rustaveli 1, 01212
                </span>
              </div>
              <div className="flex justify-between text-sm text-gray-700">
                <span className="checkoutLeftText">{t('mobile')}:</span>
                <span className="text-[#161F28] text-[14px]">555 555 555</span>
              </div>
            </div>
          )}

          {/* Summary */}
          <div className="bg-white rounded-2xl p-4 shadow-sm flex flex-col gap-2">
            <h2 className="text-lg font-bold text-[#2f4a9c]">{t('summary')}:</h2>
            <div className="flex justify-between text-sm text-gray-700">
              <span className="checkoutLeftText">{t('totalPrice')}:</span>
              <span className="text-[#161F28] text-[16px]">
                {totalPrice.toFixed(2)} ₾
              </span>
            </div>
            <div className="flex justify-between text-sm text-gray-700">
              <span className="checkoutLeftText">{t('totalDiscount')}:</span>
              <span className="text-[#161F28] text-[16px]">
                {totalDiscount.toFixed(2)} ₾
              </span>
            </div>
            {/* {!selectedPaymentMethod && (
              <div className="md:hidden flex justify-between text-sm text-gray-700">
                <span className="checkoutLeftText">Delivery</span>
                <span className="text-[#161F28] text-[16px]">5.20 ₾</span>
              </div>
            )} */}
            <div className="flex justify-between items-center pt-1">
              <span className="checkoutLeftText text-sm text-gray-700 ">
                {t('TotalPriceToPay')}
              </span>
              <span className="text-xl font-bold text-[#2f4a9c] text-nowrap">
                {totalPriceToPay.toFixed(2)} ₾
              </span>
            </div>
          </div>

          {/* Payment method — only shown on payment step */}
          {selectedPaymentMethod && (
            <div className="bg-white rounded-2xl p-4 shadow-sm flex flex-col gap-3">
              <h2 className="text-lg font-bold text-[#2f4a9c]">
               {t('PaymentMethod')}:
              </h2>
              <p className="text-sm text-gray-500">{t('choosePaymentMethod')} </p>
              {[
                {
                  value: "tbc",
                  label: t('TbcBank'),
                  img: tbc,
                  imgClass: "size-8.5 rounded-[7px]",
                },
                {
                  value: "bog",
                  label: t('bankOfGeorgia'),
                  img: bog,
                  imgClass: "",
                },
              ].map(({ value, label, img, imgClass }) => (
                <label
                  key={value}
                  className="flex items-center gap-3 cursor-pointer"
                >
                  <input
                    type="radio"
                    name="payment_method"
                    className="accent-[#2f4a9c] size-3"
                    value={value}
                    onChange={(e) => {
                      setPaymentMethod(e.target.value);
                      setErrors((prev) => ({ ...prev, payment: "" }));
                    }}
                  />
                  <img className={imgClass} src={img} alt={label} />
                  <span className="text-[16px] text-[#797979]">{label}</span>
                </label>
              ))}

              <label className="flex items-center gap-3 cursor-pointer">
                <input
                  type="radio"
                  name="payment_method"
                  className="accent-[#2f4a9c] size-3"
                  value="apple_pay"
                  onChange={(e) => {
                    setPaymentMethod(e.target.value);
                    setErrors((prev) => ({ ...prev, payment: "" }));
                  }}
                />
                <div className="w-[62px] h-[34px] border border-gray-300 rounded-md flex items-center justify-center">
                  <img src={applePay} alt={t('applePay')}  />
                </div>
              </label>

              <label className="flex items-center gap-3 cursor-pointer">
                <input
                  type="radio"
                  name="payment_method"
                  className="accent-[#2f4a9c] size-3"
                  value="google_pay"
                  onChange={(e) => {
                    setPaymentMethod(e.target.value);
                    setErrors((prev) => ({ ...prev, payment: "" }));
                  }}
                />
                <div className="w-[62px] h-[34px] border border-gray-300 rounded-md flex items-center justify-center px-[6px] py-[7px]">
                  <img src={googlePay} alt={t('googlePay')} />
                </div>
              </label>

              {errors.payment && (
                <div className="flex items-center gap-1">
                  <img src={warningIcon} alt={t('warningIcon')} />
                  <p className="text-red-500 text-sm">{errors.payment}</p>
                </div>
              )}
            </div>
          )}

          {/* Terms + CTA */}
          {selectedPaymentMethod ? (
            <div className="flex flex-col gap-3 ">
              {errors.terms && (
                <div className="flex items-center gap-1">
                  <img src={warningIcon} alt="{t('warningIcon')}" />
                  <p className="text-red-500 text-sm">{errors.terms}</p>
                </div>
              )}
              <label className="terms-toggle px-4 md:px-0 " >
                <input
                  type="checkbox"
                  id="terms"
                  className="size-3"
                  checked={agreedToTerms}
                  onChange={(e) => {
                    setAgreedToTerms(e.target.checked);
                    setErrors((prev) => ({ ...prev, terms: "" }));
                  }}
                />
                <span className="radio-visual  bg-[#FFFFFF]! " />
                <p className="text-[#797979] font-normal">
                  {t('iAgreeToTermsAndConditions')}
                </p>
              </label>
              <button
                className="w-full py-3 rounded-2xl bg-[#FDE800] text-blue-50 font-helvetocaMedium text-[16px] cursor-pointer hover:opacity-90 transition-opacity"
                onClick={handleCheckout}
              >
               {t('checkout')}
              </button>
            </div>
          ) : (
            <button
              onClick={() => setSelectedPaymentMethod(true)}
              disabled={cartItems.length === 0}
              className="w-full py-3 rounded-2xl bg-[#FDE800] text-gray-900 font-bold text-sm cursor-pointer hover:opacity-90 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {t('buyNow')}
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Checkout;
