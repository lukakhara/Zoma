import Category from "../components/Category";
import Body from "../components/Body";
import { useState } from "react";

const Home = () => {
    const [filter, setFilter] = useState('Cleaning');

  return (
    <>
      <div>
        <Category setFilter={setFilter} filter={filter}/>
        <Body filter={filter} />
      </div>
    </>
  );
};

export default Home;
