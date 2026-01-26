import { useState } from "react";
import garbageIcon from "../assets/garbage.png";
import editIcon from "../assets/pencil.png";

interface checkoutProps {
  languageGeorgian: boolean;
}

interface Product {
  id: number;
  name: string;
  image: string;
  quantity: number;
  price: number;
  discount: number;
  finalPrice: number;
}

const Checkout = ({ languageGeorgian }: checkoutProps) => {
  const [selectedPaymentMethod, setSelectedPaymentMethod] =
    useState<boolean>(false);

  const [cart, setCart] = useState<Product[]>([
    {
      id: 1,
      name: "ZOMA BAFIX FOAM",
      image: "src/assets/product.png",
      quantity: 1,
      price: 11.65,
      discount: 1.87,
      finalPrice: 9.78,
    },
    {
      id: 2,
      name: "ZOMA BAFIX FOAM",
      image: "src/assets/product.png",
      quantity: 1,
      price: 11.65,
      discount: 1.87,
      finalPrice: 9.78,
    },
  ]);

 

  return (
    <>
      <main className="flex flex-col gap-4  px-4 ">
        <h1>Checkout</h1>

        {/* selected items */}
        <section className="bg-white rounded-md p-4">
          <ul className="flex flex-col gap-2">
            {cart.map((item, index) => (
              <li
                key={index}
                className="flex items-center justify-center gap-6 "
              >
                <img
                  src={item.image}
                  width={54}
                  height={107}
                  alt="product image"
                />
                {/* leftside */}
                <div className={`${index+1 === item.id ? 'border-b-2' : ''
                  } p-2 border-gray-200 flex`}>
                  <div className="flex flex-col ">
                    <h1>{item.name}</h1>
                    <div className="flex  justify-center gap-4">
                      <button>{item.quantity}</button>
                      <button className="cursor-pointer">
                        <img src={garbageIcon} alt="remove " />
                      </button>
                    </div>
                  </div>
                  <div className="flex flex-col ">
                    <div className="flex gap-2">
                      <p>{item.price}₾</p>
                      <p className="bg-orange-100 text-white center">
                        {item.discount}₾
                      </p>
                    </div>
                    <h1 className="bg-yellow-100 center">{item.finalPrice}₾</h1>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </section>

        {selectedPaymentMethod ? (
          <>
            {/*  summary section */}
            <section className="bg-white p-3 z-111">
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
                <p>Total price to pay:</p>
                <h1>21.02₾</h1>
              </div>
            </section>
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
            <input type="radio" />
            <label htmlFor="">I agree to terms & conditions</label>
            <button className="text-center bg-yellow-100 cursor-pointer">
              Checkout
            </button>
          </>
        ) : (
          <>
            {/* delivery details section */}
            <section className="bg-white p-3 flex flex-col gap-4 ">
              {/* header of section */}
              <div className="flex justify-between">
                <h1 className="text-2xl">Delivery details</h1>
                <button className="flex items-center gap-2 cursor-pointer">
                  Edit
                  <img src={editIcon} className="size-3.25" alt="Edit button" />
                </button>
              </div>
              <div className="flex flex-col gap-2">
                {/* address */}
                <div className="flex justify-between items-center">
                  {/* property / value */}
                  <p>Delivery address:</p>
                  <p>Tbilisi,Rustaveli 1, 01212</p>
                </div>
                {/* mobile phone number */}
                <div className="flex justify-between">
                  {/* property / value */}
                  <p>Mobile:</p>
                  <p>555 555 555</p>
                </div>
              </div>
            </section>
            {/*  summary section */}
            <section className="bg-white p-3">
              <h1 className="text-2xl">Summary:</h1>
              <div className="flex flex-col gap-2">
                <div className="flex  justify-between">
                  {/* property / value */}
                  <p>Total price:</p>
                  <p>19.56₾</p>
                </div>
                <div className="flex  justify-between">
                  {/* property / value */}
                  <p>Total discount:</p>
                  <p>3.74₾</p>
                </div>
                <div className="flex  justify-between">
                  {/* property / value */}
                  <p>Delivery:</p>
                  <p>5.20₾</p>
                </div>
                <div className="flex  justify-between">
                  {/* property / value */}
                  <p>Total price to pay:</p>
                  <h1 className="text-2xl">21.02₾</h1>
                </div>
              </div>
            </section>
            <button className="text-center bg-yellow-100 cursor-pointer z-111"
            onClick={() => setSelectedPaymentMethod(!selectedPaymentMethod)} >
              Buy Now
            </button>
          </>
        )}
      </main>
    </>
  );
};

export default Checkout;
