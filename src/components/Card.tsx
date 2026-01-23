import  { useState } from "react";
import playIcon from "../assets/play.png";
import cartIcon from "../assets/cart.png";

interface product {
  id: number;
  name: string;
  categorie: string;
  startingPrice: number;
  endPrice: number;
  quantity: number;
  image: string;
}
interface cardProps {
  product: product;
  languageGeorgian:boolean;
}

const Card = ({ product,languageGeorgian }: cardProps) => {

  const [productId,setProductId] = useState<number>(1);
  console.log(productId);

  return (
    <>
      <div className=" rounded-xl p-2 bg-white">
        <div className="flex justify-between items-center">
          <button className="cursor-pointer size-[23.76px] center">
            <img src={playIcon} className="" alt="playIcon" />
          </button>
          <button className="cursor-pointer size-[27.62px] center bg-blue-100 rounded-full p-2">
            <img className="bg-none size-[14.83px]" src={cartIcon} alt="playIcon" />
          </button>
        </div>
        <img src={product.image[0]} alt="Product image" className="" />
        <div className="flex  flex-col gap-2">
            {/* name and category */}
          <div className="bg-blue text-[#DDDDDD] text-[10px]">{product.categorie}</div>
          <div className="text-[#1A1A1A] text-sm">{product.name}</div>
           {/* prices */}
            <div className="flex items-center  gap-2">
                <div className="bg-[#FDE800] text-xl text-gray-300 font-semibold px-2 rounded-sm">{product.endPrice} ₾</div>
                <div className="text-[#C3C3C3] text-xl line-through">{product.startingPrice}</div>
            </div>
            
            <div className="flex gap-2 ">
                <select className="bg-[#F2F2F2] px-3  center  rounded-2xl text-blue-50 text-xl" name="cars" id="cars">
                    <option  value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                    <option value="4">4</option>
                    <option value="5">5</option>
                    <option value="6">6</option>
                    <option value="7">7</option>
                    <option value="8">8</option>
                    <option value="9">9</option>
                </select>
                   <button className="cursor-pointer bg-blue-50 text-white px-8 py-1 rounded-3xl"
                      onClick={() => setProductId(product.id)}>
                  {languageGeorgian ? "Buy Now" : 'ყიდვა'}</button>
            </div>
        
        </div>
      </div>
    </>
  );
};

export default Card;
