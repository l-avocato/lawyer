import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Signin from "./components/Signin/Signin";
import Signup from "./components/Signin/Signup";
import ClientDetails from "./components/clientDetails/ClientDetails";
import NavbarDashboard from "./components/NavbarDashboard/NavbarDashboard";
import SidebarDash from "./components/SidebarDash/SidebarDash";
import AllClient from "./components/AllClient/AllClient.jsx";
import Navbar from "./components/Navbar/Navbar";
import PaymentReceipt from "./components/Payment/PaymentReceipt";
import PaymentHistory from "./components/PaymentHistory/PaymentHistory";
import Landing from "./components/LandingPage/Landing";
import SettingSecurity from "./components/SettingSecurity/SettingSecurity.jsx";
import SettingProfil from "./components/SettingProfil/Settings.jsx";
import StepsCases from "./components/StepsCases/StepsCases.jsx";
import Diagramme from "./components/Diagramme/Diagramme.jsx";
import Flow from "./components/StepsCases/Flow.js";
import CaseHistory from "./components/CaseHistory/CaseHistory.jsx";
const App = () => {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/PaymentHistory" element={<PaymentHistory />} />
          <Route path="/" element={<Landing />} />
          <Route path="/nav" element={<Navbar />} />
          <Route path="/Signin" element={<Signin />} />
          <Route path="/Signup" element={<Signup />} />
          <Route path="/clientDetails" element={<ClientDetails />} />
          <Route path="/PaymentReceipt" element={<PaymentReceipt />} />
          <Route path="/allClient" element={<AllClient />} />
          <Route path="/sidebar" element={<SidebarDash />} />
          <Route path="/navbar" element={<NavbarDashboard />} />
          <Route path="/settingSecurity" element={<SettingSecurity />} />
          <Route path="/settingProfil" element={<SettingProfil />} />
          <Route path="/stepsCases" element={<StepsCases />} />
          <Route path="/diagramme" element={<Diagramme />} />
          <Route path="/flow" element={<Flow />} />
          <Route path="/CaseHistory" element={< CaseHistory/>} />
        </Routes>
      </Router>
    </div>
  );
};

export default App;
