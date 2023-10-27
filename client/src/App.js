import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Landing from "./components/LandingPage/Landing";
import NavbarDashboard from './components/NavbarDashboard/NavbarDashboard';
import SidebarDash from './components/SidebarDash/SidebarDash';

const App = () => (
  <div className="App">
    <Router>
      <Routes>
        <Route path="/navbar" element={<Navbar />} />
        <Route path="/landing" element={<Landing />} />
        <Route path="/Footer" element={<Footer />} />
      </Routes>
    </Router>
  </div>
);

export default App;
