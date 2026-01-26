import Card from './Card.tsx'
import en from '../en.json';
import ka from '../ka.json';


interface language{
    languageGeorgian:boolean;
}

const Body = ({languageGeorgian}:language) => {
    const data = languageGeorgian ? en : ka;
    const productData = data.products;

  return (
    <>
        <div className='grid  w-full grid-cols-2 gap-6 px-2.5 md:pb-22 m-auto md:grid-cols-3 lg:grid-colsh-4 xl:grid-cols-5 2xl:grid-cols-6 md:px-30  '>
            {productData.map((product) => (
                 <Card product={product} languageGeorgian={languageGeorgian}/>
            ))}
        </div>
    </>
  )
}

export default Body