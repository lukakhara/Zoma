import Category from "../components/Category";
import Body from "../components/Body";

import { useLanguage } from "../context/LanguageContext";

const Home = () => {
  const { languageGeorgian, setLanguageGeorgian } = useLanguage();
  return (
    <>
      <div>
        <Category languageGeorgian={languageGeorgian} />
        <Body languageGeorgian={languageGeorgian} />
      </div>
    </>
  );
};

export default Home;
