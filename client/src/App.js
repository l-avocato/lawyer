import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Landing from "./components/LandingPage/Landing";
import Signin from './components/Signin/Signin';
import Signup from './components/Signin/Signup';
import NavbarDashboard from './components/NavbarDashboard/NavbarDashboard';
import SidebarDash from './components/SidebarDash/SidebarDash';

const App = () => {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/landing" element={<Landing />} />
          <Route path="/Signin" element={<Signin />} />
          <Route path="/Signup" element={<Signup />} />
        </Routes>
      </Router>
    </div>
  
     
      
   
  );
}

export default App;
