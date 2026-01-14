import React from 'react'
import Card from './Card.tsx'
import en from '../en.json';
import ka from '../ka.json';

// interface product{
//     product:Object,
// }

interface language{
    languageGeorgian:boolean;
}

const Body = ({languageGeorgian}:language) => {
    const data = languageGeorgian ? ka : en;
    const productData = data.products;

  return (
    <>
        <div className='grid  w-full grid-cols-2 border-2 gap-2 px-2.5 m-auto md:grid-cols-3 lg:grid-colsh-4 xl:grid-cols-5 2xl:grid-cols-6 xl:px-20'>
            {productData.map((product) => (
                 <Card product={product} languageGeorgian={languageGeorgian}/>
            ))}
        </div>
    </>
  )
}

export default Body