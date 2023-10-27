import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Landing from "./components/LandingPage/Landing";
import NavbarDashboard from './components/NavbarDashboard/NavbarDashboard';
import SidebarDash from './components/SidebarDash/SidebarDash';
import Navbar from "./components/Navbar/navbar";
import Footer from "./components/Footer/Footer";

import AllClient from './components/AllClient/AllClient.jsx';

const App = () => {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/landing" element={<Landing />} />





         <Route path="/allClient" element={<AllClient/>} />

         <Route path="/sidebar" element={<SidebarDash />} />

          


        </Routes>
      </Router>
    </div>
  );
}

export default App;
