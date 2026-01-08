import './App.css'
import Header from './components/Header.tsx';
import Category from './components/Category.tsx';
import { useState } from 'react';



function App() {
  const [languageGeorgian,setLanguageGeorgian] = useState(true);

  return (
    <>
    <div className='min-h-screen h-full w-full'> 
           <Header languageGeorgian={languageGeorgian} setLanguageGeorgian={setLanguageGeorgian} />
          <Category languageGeorgian={languageGeorgian}/>
    </div>
    
    </>
  )
}

export default App
