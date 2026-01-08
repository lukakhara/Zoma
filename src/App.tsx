import './App.css'
import Header from './components/Header.tsx';
import Category from './components/Category.tsx';
import { useState } from 'react';



function App() {
  const [language,setLanguage] = useState('georgian');

  return (
    <>
    <div className='min-h-screen h-full w-full'> 
           <Header language={language} setLanguage={setLanguage} />
          <Category language={language}/>
    </div>
    
    </>
  )
}

export default App
