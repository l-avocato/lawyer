import React, { useState } from "react";
import "./style.css";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import NotificationsNoneOutlinedIcon from "@mui/icons-material/NotificationsNoneOutlined";
import ChatBubbleOutlineOutlinedIcon from "@mui/icons-material/ChatBubbleOutlineOutlined";
import SideBarDash from "../SidebarDash/SidebarDash";
// import PowerSettingsNewIcon from "@mui/icons-material/PowerSettingsNew";
import image from "../../assets/images/dev.png"

let isChatOpen, setChatOpen;
const NavbarDashboard = () => {
  [isChatOpen, setChatOpen] = useState(false);
  const toggleChat = () => {
    setChatOpen(!isChatOpen);
  };

  return (
    <div className="new-navbar">
      <div>
        <SideBarDash />
      </div>
      <div className="new-wrapper">
        <div className="new-search">
          <input type="text" placeholder="Search..." />
          <SearchOutlinedIcon />
        </div>
        <div className="new-items">
          <div className="new-item">
            <NotificationsNoneOutlinedIcon className="new-icon" />
            <div className="new-counter">1</div>
          </div>
          {/* <div className="new-item"> 
            <ChatBubbleOutlineOutlinedIcon className="new-icon" /> 
            <div className="new-counter">2</div> 
          </div> */}
          <div className="new-item" onClick={toggleChat}>
            <ChatBubbleOutlineOutlinedIcon className="new-icon" />
            <div className="new-counter">20</div>
            {isChatOpen && (
              <div className="chat-dropdown">
                {/* Replace with your actual chat data */}
                <div className="chat-item">
                  <img
                    src= {image}
                    alt="Profile"
                    className="new-avatar"
                  />
                  <div className="chat-details">
                    <span className="chat-name">John Doe</span>
                    <p className="chat-text">Last message from aziz seen at 10h with leyth and jdidi and farouk...</p>
                  </div>
                </div>
                <div className="chat-item">
                  <img
                    src= {image}
                    alt="Profile"
                    className="new-avatar"
                  />
                  <div className="chat-details">
                    <span className="chat-name">John Doe</span>
                    <p className="chat-text">Last message from aziz seen at 10h with leyth and jdidi and farouk...</p>
                  </div>
                </div>
                {/* Additional chat items go here */}
              </div>
            )}
          </div>
          {/* <PowerSettingsNewIcon className="new-icon" />
          <span className="logout">Logout</span> */}
        </div>
      </div>
    </div>
  );
};

export default NavbarDashboard;
