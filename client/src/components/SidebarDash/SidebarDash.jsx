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
import { Link } from "react-router-dom";
import logo from "../../assets/images/logo.png";
import { useNavigate } from "react-router-dom";

const SidebarDash = () => {
  const navigate = useNavigate();

  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [isHoveredProfile, setIsHoveredProfile] = useState(false);
  const [isHoveredSecurity, setIsHoveredSecurity] = useState(false);

  const toggleSettings = () => {
    setIsSettingsOpen(!isSettingsOpen);
  };

  return (
    <div className="new-sidebar">
      <div className="top-section">
        <img className="new-logo" src={logo} />
      </div>
      <hr className="new-separator" />
      <div className="center-section">
        <ul className="new-menu-list">
          <li>
            <PersonOutlineIcon className="new-icon" />

            <span className="side-title" onClick={() => navigate("/allClient")}>
              My Clients
            </span>
          </li>
          <li>
            <InsertChartIcon className="new-icon" />
            <span className="side-title">Stats</span>
          </li>
          <li>
            <NotificationsNoneIcon className="new-icon" />
            <span className="side-title">Notifications</span>
          </li>
          <li onClick={toggleSettings}>
            <SettingsApplicationsIcon className="new-icon" />
            <span className="side-title">Settings</span>
          </li>
          {isSettingsOpen && (
            <ul className="settings-dropdown">
              <li>
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
              <li>
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
          <li>
            <AccountCircleOutlinedIcon className="new-icon" />
            <span className="side-title">Profile</span>
          </li>
          <li>
            <PowerSettingsNewIcon className="new-icon" />
            <span className="side-title" onClick={() => navigate("/")}>
              Logout
            </span>
          </li>
        </ul>
      </div>
      <div className="new-bottom">
        <div className="new-color-option"></div>
        <div className="new-color-option"></div>
      </div>
    </div>
  );
};

export default SidebarDash;
