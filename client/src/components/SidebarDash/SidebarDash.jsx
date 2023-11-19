import React, { useState } from "react";
import "./style.css";
import DashboardIcon from "@mui/icons-material/Dashboard";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import CreditCardIcon from "@mui/icons-material/CreditCard";
import StoreIcon from "@mui/icons-material/Store";
import InsertChartIcon from "@mui/icons-material/InsertChart";
import SettingsApplicationsIcon from "@mui/icons-material/SettingsApplications";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import NotificationsNoneIcon from "@mui/icons-material/NotificationsNone";
import SettingsSystemDaydreamOutlinedIcon from "@mui/icons-material/SettingsSystemDaydreamOutlined";
import PsychologyOutlinedIcon from "@mui/icons-material/PsychologyOutlined";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import PowerSettingsNewIcon from "@mui/icons-material/PowerSettingsNew";
import AssignmentTurnedInIcon from "@mui/icons-material/AssignmentTurnedIn";
import { Link } from "react-router-dom";
import logo from "../../assets/images/logo.png";
import { useNavigate } from "react-router-dom";
import BusinessCenterIcon from "@mui/icons-material/BusinessCenter";
import CaseHistory from "../CaseHistory/CaseHistory";

const SidebarDash = () => {
  const navigate = useNavigate();

  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [isHoveredProfile, setIsHoveredProfile] = useState(false);
  const [isHoveredSecurity, setIsHoveredSecurity] = useState(false);

  const toggleSettings = () => {
    setIsSettingsOpen(!isSettingsOpen);
  };

  const clearToken = () => {
    try {
      localStorage.removeItem("userToken"); //clearing token when you sign out
      console.log("Token cleared");
    } catch (error) {
      console.error("Error clearing token:", error);
    }
  };

  const logOut = async () => {
    try {
      await clearToken();
      navigate("/");
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  return (
    <div className="new-sidebar">
      <div className="top-section" style={{display:"flex", justifyContent:"center"}}>
        <img className="new-logo" src={logo} />
      </div>
      <div className="new-separator"></div>
      <div className="line"></div>
      <div className="center-section">
        <ul className="new-menu-list">
          <li className="g-1">
            <PersonOutlineIcon className="new-icon" style={{fontSize:'30px'}} />

            <span className="side-title" onClick={() => navigate("/allClient")}>
              My Clients
            </span>
          </li>
          <li className="g-1">
            <BusinessCenterIcon className="new-icon" />
            <span
              className="side-title"
              onClick={() => navigate("/CaseHistory")}
            >
              My Cases
            </span>
          </li>
          <li className="g-1">
            <NotificationsNoneIcon className="new-icon" />
            <span className="side-title">Appointments</span>
          </li>
          <li className="g-1">
            <InsertChartIcon className="new-icon" />
            <span className="side-title" onClick={() => navigate("/stat")}>
              Stats
            </span>
          </li>
          <li className="g-1">
            <NotificationsNoneIcon className="new-icon" />
            <span className="side-title">Notifications</span>
          </li>
          <li className="g-1">
            <AssignmentTurnedInIcon className="new-icon" />
            <span className="side-title" onClick={() => navigate("/task")}>
              Tasks
            </span>
          </li>
          <li onClick={toggleSettings} className="g-1">
            <SettingsApplicationsIcon className="new-icon" />
            <span className="side-title">Settings</span>
          </li>
          {isSettingsOpen && (
            <ul className="settings-dropdown">
              <li className="g-1">
                <SettingsApplicationsIcon className="new-icon" />

                <Link
                  to="../SettingProfil"
                  style={{
                    textDecoration: "none",
                    color: isHoveredProfile ? "black" : "white",
                  }}
                  onMouseEnter={() => setIsHoveredProfile(true)}
                  onMouseLeave={() => setIsHoveredProfile(false)}
                >
                  Edit Profile
                </Link>
              </li>
              <li className="g-1">
                <SettingsApplicationsIcon className="new-icon" />

                <Link
                  to="../SettingSecurity"
                  style={{
                    textDecoration: "none",
                    color: isHoveredSecurity ? "black" : "white",
                  }}
                  onMouseEnter={() => setIsHoveredSecurity(true)}
                  onMouseLeave={() => setIsHoveredSecurity(false)}
                >
                  Edit Security
                </Link>
              </li>
            </ul>
          )}
          <li className="g-1">
            <AccountCircleOutlinedIcon className="new-icon" />
            <span className="side-title">Profile</span>
          </li>
          <li className="g-1">
            <PowerSettingsNewIcon className="new-icon" />
            <span className="side-title" onClick={logOut}>
              Logout
            </span>
          </li>
        </ul>
      </div>
      
    </div>
  );
};

export default SidebarDash;
