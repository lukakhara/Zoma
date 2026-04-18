import Category from "../components/Category";
import Body from "../components/Body";
import { useState } from "react";


const Home = () => {

const [filter, setFilter] = useState<string>('');


  return (
    <div>
      <Category setFilter={setFilter} filter={filter} />
      <Body filter={filter} />
    </div>
  );
};

export default Home;



// const [filterIndex, setFilterIndex] = useState<number>(0);

  // // derived — no state needed, no useEffect needed
  // const filter = Object.values(data.categories)[filterIndex];

  
  // const handleFilter = (category: string) => {
  //   const index = Object.values(data.categories).indexOf(category);
  //   setFilterIndex(index);
  // };