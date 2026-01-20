import Header from "./Header.tsx";
import Footer from "./Footer.tsx";

interface checkoutProps {
  languageGeorgian: boolean;
  setLanguageGeorgian(languageGeorgian: boolean): void;
}

const Checkout = ({ languageGeorgian, setLanguageGeorgian }: checkoutProps) => {
  return (
    <>
      <Header
        languageGeorgian={languageGeorgian}
        setLanguageGeorgian={setLanguageGeorgian}
      />
      <main>
        <h1>Checkout</h1>
        {/* items section */}
        <section></section>

        {/* delivery details section */}
        <section>
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

        {/*  summary section */}
        <section>
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
      </main>
      <Footer languageGeorgian={languageGeorgian} />
    </>
  );
};

export default Checkout;
