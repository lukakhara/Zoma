import React from "react";
import playIcon from "../assets/play.png";
import cartIcon from "../assets/cart.png";

interface product{
    id:number,
    name: string,
    categorie: string,
    startingPrice: number,
    endPrice: number,
    quantity: number,
    icon: string
}
interface cardProps{
    product:product,
}


const Card = ({product} : cardProps) => {
    console.log(product);

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
        <img src={product.icon} alt="" />
        <div className="bg-blue text-yellow-50">
            {product.quantity}
        </div>
      </div>
    </>
  );
};

export default Card;
