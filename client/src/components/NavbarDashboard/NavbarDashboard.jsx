import React, { useState, useEffect } from "react";
import "./style.css";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import NotificationsNoneOutlinedIcon from "@mui/icons-material/NotificationsNoneOutlined";
import ChatBubbleOutlineOutlinedIcon from "@mui/icons-material/ChatBubbleOutlineOutlined";
import SideBarDash from "../SidebarDash/SidebarDash";
// import PowerSettingsNewIcon from "@mui/icons-material/PowerSettingsNew";
import image from "../../assets/images/dev.png";

let isChatOpen, setChatOpen;
let isNotificationsOpen, setNotificationsOpen;
const NavbarDashboard = () => {
  [isChatOpen, setChatOpen] = useState(false);
  [isNotificationsOpen, setNotificationsOpen] = useState(false);
  const toggleChat = () => {
    setChatOpen(!isChatOpen);
    setNotificationsOpen(false);
  };
  const toggleNotifications = (e) => {
    e.stopPropagation(); // Stop the event from reaching the document click listener
    setNotificationsOpen(!isNotificationsOpen);
    setChatOpen(false);
  };
  const closeNotificationDropdown = () => {
    setNotificationsOpen(false);
  };
  useEffect(() => {
    // Add event listener to close notification dropdown on outside click
    document.addEventListener("click", closeNotificationDropdown);

    // Cleanup the event listener on component unmount
    return () => {
      document.removeEventListener("click", closeNotificationDropdown);
    };
  }, []); // Empty dependency array ensures the effect runs only once

  return (
    
      <div className="new-wrapper" style={{alignSelf:"auto"}}>
        <div className="new-search">
          <input type="text" placeholder="Search..." />
          <SearchOutlinedIcon />
        </div>
        <div className="new-items">
          <div className="new-item" onClick={(e) => toggleNotifications(e)}>
            <NotificationsNoneOutlinedIcon className="new-icon" />
            <div className="new-counter">1</div>
            {isNotificationsOpen && (
              <div className="notifications-dropdown">
                <div className="notification-item">
                  <img src={image} alt="Notification" className="new-avatar" />
                  <div className="notification-details">
                    <span className="notification-text">
                      New notification from aymen instuctor at rbk
                    </span>
                  </div>
                </div>
              </div>
            )}
          </div>
          <div className="new-item" onClick={toggleChat}>
            <ChatBubbleOutlineOutlinedIcon className="new-icon" />
            <div className="new-counter">20</div>
            {isChatOpen && (
              <div className="chat-dropdown">
                <div className="chat-item">
                  <img src={image} alt="Profile" className="new-avatar" />
                  <div className="chat-details">
                    <span className="chat-name">John Doe</span>
                    <p className="chat-text">
                      Last message from aziz seen at 10h with leyth and jdidi
                      and farouk...
                    </p>
                  </div>
                </div>
                <div className="chat-item">
                  <img src={image} alt="Profile" className="new-avatar" />
                  <div className="chat-details">
                    <span className="chat-name">John Doe</span>
                    <p className="chat-text">
                      Last message from aziz seen at 10h with leyth and jdidi
                      and farouk...
                    </p>
                  </div>
                </div>
                
              </div>
            )}
          </div>
        </div>
      </div>
  
  );
};

export default NavbarDashboard;
