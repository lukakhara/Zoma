import Header from "./Header.tsx";
import Footer from "./Footer.tsx";
import { useState } from "react";

interface checkoutProps {
  languageGeorgian: boolean;
  setLanguageGeorgian(languageGeorgian: boolean): void;
}

const Checkout = ({ languageGeorgian, setLanguageGeorgian }: checkoutProps) => {
  const [selectedPaymentMethod, setSelectedPaymentMethod] =
    useState<boolean>(false);

  return (
    <>
      <Header
        languageGeorgian={languageGeorgian}
        setLanguageGeorgian={setLanguageGeorgian}
      />
      <main className="flex flex-col gap-4 test px-4">
        <h1>Checkout</h1>

        {/* selected items */}
        <section className="bg-white rounded-md p-4">
            <ul>
                <li className="flex test">
                    <img src="" alt="product image" />
                    {/* leftside */}
                    <div className="flex flex-col test">
                        <h1>Zoma Bafix Foam</h1>
                        <button>1</button>
                        <button><img src="" alt="remove " /></button>
                    </div>
                    <div className="flex flex-col test">
                        <div className="flex">
                            <p>11.65₾</p>
                            <p>-1.87₾</p>
                        </div>
                        <h1>9.78₾</h1>
                    </div>
                </li>
            </ul>
        </section>

        {/* delivery details section */}
        <section className="bg-white">
          {/* header of section */}
          <div>
            <h1>Delivery details</h1>
            <button>
              Edit
              <img src="" alt="" />
            </button>
          </div>
          {/* body of section */}
          <div>
            {/* address */}
            <div>
              {/* property / value */}
              <p>Delivery address:</p>
              <p>Tbilisi,Rustaveli 1, 01212</p>
            </div>
            {/* mobile phone number */}
            <div>
              {/* property / value */}
              <p>Mobile:</p>
              <p>555 555 555</p>
            </div>
          </div>
        </section>

        {selectedPaymentMethod ? (
          <>
            {/*  payment section */}
            <section className="bg-white">
              <h1>Payment Method:</h1>
              <div className="flex flex-col">
                <div>
                  <input
                    type="radio"
                    id="tbc-bank"
                    name="payment_method"
                    value="TBC Bank"
                  />
                  <label htmlFor="tbc-bank">TBC Bank</label>
                </div>

                <div>
                  <input
                    type="radio"
                    id="bank-of-georgia"
                    name="payment_method"
                    value="Bank of Georgia"
                  />
                  <label htmlFor="bank-of-georgia">Bank of Georgia</label>
                </div>
                <div>
                  <input
                    type="radio"
                    id="apple-pay"
                    name="payment_method"
                    value="APPLE PAY"
                  />
                  <label htmlFor="apple-pay">APPLE PAY</label>
                </div>

                <div>
                  <input
                    type="radio"
                    id="google-pay"
                    name="payment_method"
                    value="GOOGLE PAY"
                  />
                  <label htmlFor="google-pay">GOOGLE PAY</label>
                </div>
              </div>
            </section>
          </>
        ) : (
          <>
            {/*  summary section */}
            <section className="bg-white">
              <h1>Summary:</h1>
              <div>
                {/* property / value */}
                <p>Total price:</p>
                <p>19.56₾</p>
              </div>
              <div>
                {/* property / value */}
                <p>Total discount:</p>
                <p>3.74₾</p>
              </div>
              <div>
                {/* property / value */}
                <p>Delivery:</p>
                <p>5.20₾</p>
              </div>
              <div>
                {/* property / value */}
                <p>Total price to pay:</p>
                <h1>21.02₾</h1>
              </div>
            </section>
            <button className="text-center">Buy Now</button>
          </>
        )}

        <button className="text-center">Check Out</button>
      </main>

      <Footer languageGeorgian={languageGeorgian} />
    </>
  );
};

export default Checkout;
