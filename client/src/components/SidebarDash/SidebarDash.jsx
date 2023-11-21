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
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';

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
      <div className="top-section" style={{display:"flex", justifyContent:"center"}}>
        <img className="new-logo" src={logo} style={{width:'170px', height:'150px', display:'flex',justifyContent:'center'}} />
      </div>
      <div className="new-separator"></div>
      <div className="line"></div>
      <div className="center-section">
        <ul className="new-menu-list">
          <li className="g-1" onClick={() => navigate("/allClient")}>
            <PersonOutlineIcon className="new-icon" />

            <span className="side-title" >
              My Clients
            </span>
          </li>
          <li className="g-1"  onClick={() => navigate("/CaseHistory")}>
            <BusinessCenterIcon className="new-icon" />
            <span
              className="side-title"
             
            >
              My Cases
            </span>
          </li>
          <li className="g-1">
            <NotificationsNoneIcon className="new-icon" />
            <span className="side-title" onClick={() => navigate("/Appointments")}>Appointments</span>
          </li>
          <li className="g-1" onClick={() => navigate("/stat")}>
            <InsertChartIcon className="new-icon" />
            <span className="side-title" >
              Stats
            </span>
          </li>
          <li className="g-1">
            <CalendarMonthIcon className="new-icon" />
            <span className="side-title">Calendar</span>
          </li>
          <li className="g-1"  onClick={() => navigate("/task")}>
            <AssignmentTurnedInIcon className="new-icon" />
            <span className="side-title">
              Tasks
            </span>
          </li>
        
          <li className="g-1"  onClick={() => navigate("/PaymentHistory")}>
            <AssignmentTurnedInIcon className="new-icon" />
            <span className="side-title">
Payment             </span>
          </li>
        
         
         
        </ul>
      </div>
      
    </div>
  );
};

export default SidebarDash;
