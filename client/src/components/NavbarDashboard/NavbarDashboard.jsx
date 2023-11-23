// import React, { useState,useEffect } from "react";
// import "./style.css";
// import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
// import NotificationsNoneOutlinedIcon from "@mui/icons-material/NotificationsNoneOutlined";
// import ChatBubbleOutlineOutlinedIcon from "@mui/icons-material/ChatBubbleOutlineOutlined";
// import SideBarDash from "../SidebarDash/SidebarDash";
// // import PowerSettingsNewIcon from "@mui/icons-material/PowerSettingsNew";
// import image from "../../assets/images/dev.png"



import * as React from 'react';
import { styled, alpha } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import InputBase from '@mui/material/InputBase';
import Badge from '@mui/material/Badge';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import SearchIcon from '@mui/icons-material/Search';
import AccountCircle from '@mui/icons-material/AccountCircle';
import MailIcon from '@mui/icons-material/Mail';
import NotificationsIcon from '@mui/icons-material/Notifications';
import MoreIcon from '@mui/icons-material/MoreVert';
import Avatar from '@mui/material/Avatar';
import Tooltip from '@mui/material/Tooltip';
import SidebarDash from '../SidebarDash/SidebarDash';
import { getAuth } from 'firebase/auth';
import axios from 'axios';
import { useNavigate } from "react-router-dom";


const pages = ['Products', 'Pricing', 'Blog'];
const settings = ['Setting Profil', 'Setting Security', 'Logout'];






const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginRight: theme.spacing(2),
  width: '100%',
  [theme.breakpoints.up('sm')]: {
    marginLeft: theme.spacing(3),
    width: 'auto',
  },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',

}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: '20ch',
  
    },
  },
}));




// let isChatOpen, setChatOpen;
// let isNotificationsOpen, setNotificationsOpen;
const NavbarDashboard = () => {
 
  const navigate = useNavigate();


  

 
  // [isChatOpen, setChatOpen] = useState(false);
  // [isNotificationsOpen, setNotificationsOpen] = useState(false);
  // const toggleChat = () => {
  //   setChatOpen(!isChatOpen);
  //   setNotificationsOpen(false);
  // };
  // const toggleNotifications = (e) => {
  //   e.stopPropagation(); 
  //   setNotificationsOpen(!isNotificationsOpen);
  //   setChatOpen(false);
  // };
  // const closeNotificationDropdown = () => {
  //   setNotificationsOpen(false);
  // };
  // useEffect(() => {

  //   document.addEventListener("click", closeNotificationDropdown);

    
  //   return () => {
  //     document.removeEventListener("click", closeNotificationDropdown);
  //   };
  // }, []); 

  const auth = getAuth();
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);
  const [user,setUser] = React.useState({})
  const [currentUser,setCurrentUser] = React.useState({});
  
    const [anchorEl, setAnchorEl] = React.useState(null);
    const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
    

  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const handleSettingProfilClick = () => {
    navigate('/SettingProfil');
    handleCloseUserMenu(); 
  };
  
  const handleSettingSecurityClick = () => {
    navigate('/SettingSecurity');
    handleCloseUserMenu(); 
  };
  const handleLogOut = ()=>{
    logOut()
  }
 

  const isMenuOpen = Boolean(anchorEl);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    handleMobileMenuClose();
  };

  const handleMobileMenuOpen = (event) => {
    setMobileMoreAnchorEl(event.currentTarget);
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

  const menuId = 'primary-search-account-menu';
  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      id={menuId}
      keepMounted
      transformOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      <MenuItem onClick={handleMenuClose}>Profile</MenuItem>
      <MenuItem onClick={handleMenuClose}>My account</MenuItem>
    </Menu>
  );

  const mobileMenuId = 'primary-search-account-menu-mobile';
  const renderMobileMenu = (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      id={mobileMenuId}
      keepMounted
      transformOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
    >
      <MenuItem>
        <IconButton size="large" aria-label="show 4 new mails" color="inherit">
          <Badge badgeContent={4} color="error">
            <MailIcon />
          </Badge>
        </IconButton>
        <p>Messages</p>
      </MenuItem>
      <MenuItem>
        <IconButton
          size="large"
          aria-label="show 17 new notifications"
          color="inherit"
        >
          <Badge badgeContent={17} color="error">
            <NotificationsIcon />
          </Badge>
        </IconButton>
        <p>Notifications</p>
      </MenuItem>
      <MenuItem onClick={handleOpenUserMenu}>
        <IconButton
          size="large"
          aria-label="account of current user"
          aria-controls="primary-search-account-menu"
          aria-haspopup="true"
          color="inherit"
        >
          <AccountCircle />
        </IconButton>
        <p>Profile</p>
      </MenuItem>
    </Menu>
  );


const handleGetUser = async (user) =>{
  // console.log(user.email);
    setUser(user);
  await axios.get(`http://localhost:1128/api/lawyer/getLawyerByEmail/${user.email}`)
  .then((res)=>{
    setCurrentUser(res.data);
  })
  .catch((err)=>{
    console.log(err)
  })
}

React.useEffect(()=>{
  handleGetUser(auth.currentUser)
},[])




  return (
    // <div className="new-navbar">
    
    //   <div className="new-wrapper">
    //     <div className="new-search">
    //       <input type="text" placeholder="Search..." />
    //       <SearchOutlinedIcon />
    //     </div>
    //     <div className="new-items">
    //     <div className="new-item" onClick={(e) => toggleNotifications(e)}>
    //         <NotificationsNoneOutlinedIcon className="new-icon" />
    //         <div className="new-counter">1</div>
    //         {isNotificationsOpen && (
    //           <div className="notifications-dropdown">
    //             {/* Replace with your actual notification data */}
    //             <div className="notification-item">
    //               <img
    //                 src={image}
    //                 alt="Notification"
    //                 className="new-avatar"
    //               />
    //               <div className="notification-details">
    //                 <span className="notification-text">New notification from aymen instuctor at rbk</span>
    //               </div>
    //             </div>
    //             {/* Additional notification items go here */}
    //           </div>
    //         )}
    //       </div>
    //       <div className="new-item" onClick={toggleChat}>
    //         <ChatBubbleOutlineOutlinedIcon className="new-icon" />
    //         <div className="new-counter">20</div>
    //         {isChatOpen && (
    //           <div className="chat-dropdown">
    //             {/* Replace with your actual chat data */}
    //             <div className="chat-item">
    //               <img
    //                 src= {image}
    //                 alt="Profile"
    //                 className="new-avatar"
    //               />
    //               <div className="chat-details">
    //                 <span className="chat-name">John Doe</span>
    //                 <p className="chat-text">Last message from aziz seen at 10h with leyth and jdidi and farouk...</p>
    //               </div>
    //             </div>
    //             <div className="chat-item">
    //               <img
    //                 src= {image}
    //                 alt="Profile"
    //                 className="new-avatar"
    //               />
    //               <div className="chat-details">
    //                 <span className="chat-name">John Doe</span>
    //                 <p className="chat-text">Last message from aziz seen at 10h with leyth and jdidi and farouk...</p>
    //               </div>
    //             </div>
    //             {/* Additional chat items go here */}
    //           </div>
    //         )}
    //       </div>
    //       {/* <PowerSettingsNewIcon className="new-icon" />
    //       <span className="logout">Logout</span> */}
    //     </div>
    //   </div>
    // </div>

  
      <div style={{width:'100%',marginLeft:'0%'}}>
      <Box sx={{ flexGrow: 1   }}>
        


        <AppBar position="static" style={{backgroundColor:"black",display:"flex",justifyContent:"flex-end",gap:"3rem",width:"100%",flexDirection:"row"}}>
          <Toolbar style={{display:"flex",flexDirection:"row",gap:"10rem"}} >
            
            <Search  >
              <SearchIconWrapper >
                <SearchIcon />
              </SearchIconWrapper>
              <StyledInputBase
              
                placeholder="Search…"
                inputProps={{ 'aria-label': 'search' }}
                sx={{width:"30rem" }}
              />
            </Search>
            <Box sx={{ flexGrow: 1 }} />
            <Box sx={{ display: { xs: 'none', md: 'flex' },gap:"1rem" }}>
              <IconButton size="large" aria-label="show 4 new mails" color="inherit">
                <Badge badgeContent={4} color="error" >
                  <MailIcon onClick={()=>{navigate('/chat')}}/>
                </Badge>
              </IconButton>
              <IconButton
                size="large"
                aria-label="show 17 new notifications"
                color="inherit"
              >
                <Badge badgeContent={17} color="error">
                  <NotificationsIcon />
                </Badge>
              </IconButton>
              <span style={{width:"8rem" , backgroundColor:"white",color:"black",alignItems:"center",borderRadius:"5%",height:"6vh",display:"flex",justifyContent:"center",alignSelf:"center"}}>
           Hi,Maitre {currentUser.fullName}
          </span>
              {/* <IconButton  sx={{ p: 0 }} onClick={handleOpenUserMenu}>
                  <Avatar alt="Remy Sharp" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSIdnbpLPcyWkaN4kk6F6rvvgHxBJkDnxjQ9UnabCIPmA&s" />
                </IconButton> */}
                 <Box sx={{ flexGrow: 0 }}>
              <Tooltip title="Open settings">
                <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                  <Avatar alt="Remy Sharp" src={currentUser.ImageUrl} style={{width:'55px', height:'55px'}} />
                </IconButton>
              </Tooltip>
              <Menu
                sx={{ mt: '45px' }}
                id="menu-appbar"
                anchorEl={anchorElUser}
                anchorOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                open={Boolean(anchorElUser)}
                onClose={handleCloseUserMenu}

                
                >
                {settings.map((setting) => (
                  <MenuItem key={setting} onClick={() => 
                  setting === 'Setting Profil' ? handleSettingProfilClick() : 
                 setting ===  'Setting Security' ? handleSettingSecurityClick() : 
                   handleLogOut()
                  
                  }>
                  
                    <Typography
                       
                  
                  textAlign="center">{setting}
                  </Typography>
                  </MenuItem>
                ))}
              </Menu>
            </Box>
            </Box>
            <Box sx={{ display: { xs: 'flex', md: 'none' } }}>
              <IconButton
                size="large"
                aria-label="show more"
                aria-controls={mobileMenuId}
                aria-haspopup="true"
                onClick={handleMobileMenuOpen}
                color="inherit"
              >
                <MoreIcon />
              </IconButton>
            </Box>
          </Toolbar>
        </AppBar>
        {renderMobileMenu}
        {renderMenu}
        </Box>
      </div>
     
    
    
 
    
  );
};

export default NavbarDashboard;
