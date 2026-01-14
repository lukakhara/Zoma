import Header from "./Header.tsx";
import Footer from "./Footer.tsx";

interface ProductPageProps {
  languageGeorgian: boolean;
  setLanguageGeorgian(languageGeorgian: boolean): void;
}

const ProductPage = ({languageGeorgian, setLanguageGeorgian }: ProductPageProps) => {
  return (
    <>
        <div className="flex flex-col">
          <Header languageGeorgian={languageGeorgian} setLanguageGeorgian={setLanguageGeorgian}/>
          <Footer languageGeorgian={languageGeorgian}/>
        </div>
     </>
  )
}

export default ProductPage