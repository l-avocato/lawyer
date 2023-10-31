import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Signin from "./components/Signin/Signin";
import Signup from "./components/Signin/Signup";
import ClientDetails from "./components/clientDetails/ClientDetails";
import NavbarDashboard from "./components/NavbarDashboard/NavbarDashboard";
import SidebarDash from "./components/SidebarDash/SidebarDash";
import AllClient from "./components/AllClient/AllClient.jsx";
import Landing from "./components/LandingPage/Landing";
import Navbar from "./components/Navbar/Navbar";
import PaymentReceipt from "./components/Payment/PaymentReceipt";
import PaymentHistory from "./components/PaymentHistory/PaymentHistory";

const App = () => {
  return (
    <div className="App">
      <Router>
        <Routes>
         <Route path="/PaymentHistory" element={<PaymentHistory />} />
          <Route path="/landing" element={<Landing />} />
          <Route path="/nav" element={<Navbar />} />
          <Route path="/Signin" element={<Signin />} />
          <Route path="/Signup" element={<Signup />} />
          <Route path="/clientDetails" element={<ClientDetails />} />
          <Route path="/PaymentReceipt" element={<PaymentReceipt />} />
          <Route path="/allClient" element={<AllClient />} />
          <Route path="/sidebar" element={<SidebarDash />} />
          <Route path="/nav" element={<NavbarDashboard />} />
        </Routes>
      </Router>
    </div>
  );
};

export default App;
