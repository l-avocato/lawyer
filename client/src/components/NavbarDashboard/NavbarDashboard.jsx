import React, { useState } from 'react';
import './style.css'
import msg from "../../assets/chat-left.svg"
import bell from "../../assets/bell.svg"
import logout from "../../assets/box-arrow-left.svg"

const Navbar = () => {
  const [messagesDropdownOpen, setMessagesDropdownOpen] = useState(false);
  const [notificationsDropdownOpen, setNotificationsDropdownOpen] = useState(false);

  const toggleMessagesDropdown = () => {
    setMessagesDropdownOpen(!messagesDropdownOpen);
    // Close notifications dropdown if open
    setNotificationsDropdownOpen(false);
  };

  const toggleNotificationsDropdown = () => {
    setNotificationsDropdownOpen(!notificationsDropdownOpen);
    // Close messages dropdown if open
    setMessagesDropdownOpen(false);
  };

  return (
    <div className="navbar">
      <div className="search-bar">
        <input type="text" placeholder="Search..." />
      </div>
      <div className="dropdown" onClick={toggleMessagesDropdown}>
        <img src={msg} alt="" />
        {messagesDropdownOpen && (
          <div className="dropdown-content">
            {/* Message items go here */}
            <a href="#">Message 1</a>
            <a href="#">Message 2</a>
            <a href="#">Message 3</a>
          </div>
        )}
      </div>
      <div className="dropdown" onClick={toggleNotificationsDropdown}>
        <img src={bell} alt="" />
        {notificationsDropdownOpen && (
          <div className="dropdown-content">
            {/* Notification items go here */}
            <a href="#">Notification 1</a>
            <a href="#">Notification 2</a>
            <a href="#">Notification 3</a>
          </div>
        )}
      </div>
      <img src={logout} alt="" />
      {/* <div className="logout-btn">Logout</div> */}
    </div>
  );
};

export default Navbar;
