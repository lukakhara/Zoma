import Category from "../components/Category";
import Body from "../components/Body";
import { useEffect, useState } from "react";
import { useLanguage } from "../context/LanguageContext";

const Home = () => {
  const { languageGeorgian } = useLanguage();

  const [filter, setFilter] = useState<string>(
    languageGeorgian ? "დასუფთავება" : "Cleaning",
  );

  useEffect(() => {
    setFilter(languageGeorgian ? "დასუფთავება" : "Cleaning");
  }, [languageGeorgian]);

  return (
    <>
      <div>
        <Category setFilter={setFilter} filter={filter} />
        <Body filter={filter} />
      </div>
    </>
  );
};

export default Home;
