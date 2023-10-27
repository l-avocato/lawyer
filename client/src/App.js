import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Landing from "./components/LandingPage/Landing";
import ClientDetails from "./components/clientDetails/ClientDetails";

const App = () => {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/landing" element={<Landing />} />

          <Route path="/clientDetails" element={<ClientDetails />} />
          
        </Routes>
      </Router>
    </div>
  );
};

export default App;
