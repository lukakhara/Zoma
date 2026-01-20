import './App.css'
import { useState } from 'react';
import Home from './components/Home.tsx';
import ProductPage from './components/ProductPage.tsx';
import Checkout from './components/Checkout.tsx';


function App() {
  const [languageGeorgian,setLanguageGeorgian] = useState(true);

  
  return (
    <>
    <div className='min-h-screen h-full w-full bg-gray-200'> 
      <Home languageGeorgian={languageGeorgian} setLanguageGeorgian={setLanguageGeorgian}/>
         {/* <ProductPage languageGeorgian={languageGeorgian} setLanguageGeorgian={setLanguageGeorgian}/>   */}
         {/* <Checkout  languageGeorgian={languageGeorgian} setLanguageGeorgian={setLanguageGeorgian}/> */}
         
    </div>
    
    </>
  )
}

export default App
