import React from 'react'
import Card from './Card.tsx'
import productIcon from '../assets/product.png'
import en from '../en.json';
import ka from '../ka.json';

// interface product{
//     productIcon:string,
// }

interface language{
    languageGeorgian:string
}

const Body = ({languageGeorgian}:language) => {
    const data = languageGeorgian ? ka : en;
    const productData = data.products;
    console.log(data);
      console.log(productData);

  return (
    <>
        <div className='test w-full grid-cols-2 bg-red-500'>
            <Card productIcon={productIcon} />
            <Card productIcon={productIcon}/>
        </div>
    </>
  )
}

export default Body