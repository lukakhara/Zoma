import Header from "./Header.tsx";
import Footer from "./Footer.tsx";
import play from "../assets/play.png";
import cart from "../assets/cart.png";
import en from "../en.json";
import ka from "../ka.json";

// when from home page  item is clicked then this component must get id of that product that is clicked and use information about it.

interface ProductPageProps {
  languageGeorgian: boolean;
  setLanguageGeorgian(languageGeorgian: boolean): void;
}

const ProductPage = ({
  languageGeorgian,
  setLanguageGeorgian,
}: ProductPageProps) => {
  const data = languageGeorgian ? ka : en;
  const products = data.products;
  const productId = 1; // TEMPORARY
  const product = products[productId];
  // NOW WE USE INDEX 0 TEMPORARELY!

  return (
    <>
      <div className="flex flex-col ">
        <Header
          languageGeorgian={languageGeorgian}
          setLanguageGeorgian={setLanguageGeorgian}
        />
        <main className="p-5">
          <h4>{product.categorie}</h4>
          <h1>{product.categorie}</h1>
          <section className="flex justify-center">
            <button>
              <img src={play} alt="play icon" />
            </button>
            <img src={product.image[0]} alt="" />
            <ul className="flex gap-2">
              {product.image.map((item) => (
                <li className="size-2 rounded-full bg-gray-100"></li>
              ))}
            </ul>
          </section>
          <h1>Cleaning agen designet to remove scale from bathroom surfaces</h1>
          <h3>Size:</h3>
          <ul className="flex gap-2">
            {["500ML", "600ML", "2.5L", "5L"].map((item) => (
              <li className="border rounded-md p-1">{item}</li>
            ))}
          </ul>
          <div>
            <div>
              <h2>quantity:</h2>
              <button>1</button>
            </div>
            {/* prices section */}
            <div className="">
              <div className="flex gap-1">
                <h2 className="text-[#C3C3C3] text-xl line-through">11.65$</h2>
                <h2 className="bg-orange-100 text-xl text-gray-300 font-semibold px-2 rounded-sm text-white">
                  -1.87$
                </h2>
              </div>

              <h1 className="bg-[#FDE800] text-xl text-gray-300 font-semibold px-2 rounded-sm">
                9.78l
              </h1>
            </div>
            <div className="flex gap-2 items-center justify-between">
              <button className="bg-blue-50 text-white text-center px-4 py-1">
                Buy Now
              </button>
              <button className="flex gap-2 justify-center items-center px-2 bg-white text-blue-50">
                <img src={cart} alt="cart icon" />
                Add to cart
              </button>
            </div>
            <section>
              <h1>Description</h1>
              <p>
                Zoma Bafix Foam is a ready-to-use, foaming cleaning agent
                designed to remove scale from bathroom surfaces. It effectively
                eliminates limescale and other types of dirt. Suitable for use
                on undamaged porcelain, ceramic, and enamel sanitary surfaces.
                Instructions for use: Spray onto the surface Wait for 5–10
                minutes Scrub the surface Wipe and rinse thoroughly Do not
                mix Zoma Bafix Foam with chlorine-containing products. Do not
                use on acid-sensitive surfaces such as marble and others. Store
                at temperatures between 5°C and 35°C. Volume: 600 ml
              </p>
            </section>
          </div>
        </main>
        <Footer languageGeorgian={languageGeorgian} />
      </div>
    </>
  );
};

export default ProductPage;
