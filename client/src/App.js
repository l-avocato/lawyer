import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Landing from "./components/LandingPage/Landing";
import NavbarDashboard from './components/NavbarDashboard/NavbarDashboard';
import SidebarDash from './components/SidebarDash/SidebarDash';

const App = () => {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/landing" element={<Landing />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
