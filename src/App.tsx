import './App.css'
import Header from './components/Header';
import Category from './components/Category';
import { useState } from 'react';

const [language,setLanguage] = useState('georgian');


function App() {

  return (
    <>
    <div className='min-h-screen h-full w-full'> 
           <Header language={language} setLanguage={setLanguage} />
          <Category/>
    </div>
    
    </>
  )
}

export default App
