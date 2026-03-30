import Category from "../components/Category";
import Body from "../components/Body";
import { useState } from "react";
import { useLanguage } from "../context/LanguageContext";
import en from "../en.json";
import ka from "../ka.json";

const Home = () => {
  const { languageGeorgian } = useLanguage();
  const data = languageGeorgian ? ka : en;

  const [filterIndex, setFilterIndex] = useState<number>(0);

  // derived — no state needed, no useEffect needed
  const filter = Object.values(data.categories)[filterIndex];

  
  const handleFilter = (category: string) => {
    const index = Object.values(data.categories).indexOf(category);
    setFilterIndex(index);
  };
  
  

  return (
    <div>
      <Category setFilter={handleFilter} filter={filter} />
      <Body filter={filter} />
    </div>
  );
};

export default Home;
