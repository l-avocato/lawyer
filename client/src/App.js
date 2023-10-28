import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Landing from "./components/LandingPage/Landing";
import Signin from './components/Signin/Signin';
import Signup from './components/Signin/Signup';
import ClientDetails from "./components/clientDetails/ClientDetails";
import NavbarDashboard from "./components/NavbarDashboard/NavbarDashboard";
import SidebarDash from "./components/SidebarDash/SidebarDash";
import Footer from "./components/Footer/Footer";
import AllClient from "./components/AllClient/AllClient.jsx";
import Navbar from "./components/Navbar/Navbar.jsx";
import Landing from "./components/LandingPage/Landing.jsx";

const App = () => {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/landing" element={<Landing />} />
          <Route path="/nav" element={<Navbar />} />
          <Route path="/Signin" element={<Signin />} />
          <Route path="/Signup" element={<Signup />} />

          <Route path="/clientDetails" element={<ClientDetails />} />
          <Route path="/allClient" element={<AllClient />} />
          <Route path="/sidebar" element={<SidebarDash />} />
        </Routes>
      </Router>
    </div>
  
     
      
   
  );
};

export default App;
