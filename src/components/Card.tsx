import React from "react";
import playIcon from "../assets/play.png";
import cartIcon from "../assets/cart.png";

interface product{
    productIcon:string,
}


const Card = ({productIcon} : product) => {
  return (
    <>
      <div>
        <div className="flex justify-between items-center">
          <button>
            <img src={playIcon} alt="playIcon" />
          </button>
          <button>
            <img src={cartIcon} alt="playIcon" />
          </button>
        </div>
        <img src={productIcon} alt="" />
        <div>
            
        </div>
      </div>
    </>
  );
};

export default Card;
