import './App.css'
import Header from './components/Header.tsx';
import Category from './components/Category.tsx';
import { useState } from 'react';
import Body from './components/Body.tsx';



function App() {
  const [languageGeorgian,setLanguageGeorgian] = useState(true);

  return (
    <>
    <div className='min-h-screen h-full w-full bg-gray-200'> 
           <Header languageGeorgian={languageGeorgian} setLanguageGeorgian={setLanguageGeorgian} />
          <Category languageGeorgian={languageGeorgian}/>
          <Body languageGeorgian={languageGeorgian}/>
    </div>
    
    </>
  )
}

export default App
