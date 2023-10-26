import React from 'react'
import { Routes, Route } from "react-router-dom";
import Signin from './components/Signin/Signin'

const App = () => {
  return (
    <div>
        
      <Routes>
        <Route path="/SIGNin" element={<Signin />}></Route>
        </Routes>
    
    </div>
  
     
      
   
  );
}

export default App
