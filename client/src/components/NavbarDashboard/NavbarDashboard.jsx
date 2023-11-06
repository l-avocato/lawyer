import React from "react";
import "./style.css"; 
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import NotificationsNoneOutlinedIcon from "@mui/icons-material/NotificationsNoneOutlined";
import ChatBubbleOutlineOutlinedIcon from "@mui/icons-material/ChatBubbleOutlineOutlined";
import SideBarDash from "../SidebarDash/SidebarDash"
import PowerSettingsNewIcon from '@mui/icons-material/PowerSettingsNew';

const NavbarDashboard = () => {
  return (
    <div className="new-navbar"> 
    <div>
      <SideBarDash/>
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
          <div className="new-item"> 
            <ChatBubbleOutlineOutlinedIcon className="new-icon" /> 
            <div className="new-counter">2</div> 
          </div>
          {/* <PowerSettingsNewIcon className="new-icon" />
          <span className="logout">Logout</span> */}
        </div>
      </div>
    </div>
  );
};

export default NavbarDashboard;
