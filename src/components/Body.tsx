import React from 'react'
import Card from './Card.tsx'
import en from '../en.json';
import ka from '../ka.json';

// interface product{
//     product:Object,
// }

interface language{
    languageGeorgian:string
}

const Body = ({languageGeorgian}:language) => {
    const data = languageGeorgian ? ka : en;
    const productData = data.products;

  return (
    <>
        <div className='grid  w-full grid-cols-2 border-2 gap-2 mx-2 '>
            {productData.map((product) => (
                 <Card product={product}/>
            ))}
        </div>
    </>
  )
}

export default Body