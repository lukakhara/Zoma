import React from "react";
import playIcon from "../assets/play.png";
import cartIcon from "../assets/cart.png";
import { FormControl, InputLabel, NativeSelect } from "@mui/material";

interface product {
  id: number;
  name: string;
  categorie: string;
  startingPrice: number;
  endPrice: number;
  quantity: number;
  icon: string;
}
interface cardProps {
  product: product;
}

const Card = ({ product }: cardProps) => {
  console.log(product);

  return (
    <>
      <div className="border-1 rounded-xl p-2 bg-white">
        <div className="flex justify-between items-center">
          <button className="cursor-pointer">
            <img src={playIcon} alt="playIcon" />
          </button>
          <button className="cursor-pointer">
            <img src={cartIcon} alt="playIcon" />
          </button>
        </div>
        <img src={product.icon} alt="" />
        <div>
            {/* name and category */}
          <div className="bg-blue text-[#DDDDDD] ">{product.categorie}</div>
          <div className="text-[#1A1A1A]">{product.name}</div>
           {/* prices */}
            <div className="flex items-center justify-between">
                <div className="bg-[#FDE800]">{product.endPrice}</div>
                <div className="text-[#C3C3C3]">{product.startingPrice}</div>
            </div>
            
            <div>
                <select className="bg-[#F2F2F2]" name="cars" id="cars">
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                    <option value="4">4</option>
                    <option value="5">5</option>
                    <option value="6">6</option>
                    <option value="7">7</option>
                    <option value="8">8</option>
                    <option value="9">9</option>
                </select>
                <button className="cursor-pointer">buy</button>
            </div>
        
        </div>
      </div>
    </>
  );
};

export default Card;
