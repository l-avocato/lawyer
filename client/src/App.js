import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Landing from "./components/LandingPage/Landing";
import Navbar from "./components/Navbar/Navbar";
import Footer from "./components/Footer/Footer";

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
