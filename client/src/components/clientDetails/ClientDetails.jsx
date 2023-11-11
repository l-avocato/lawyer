import React, { useState } from "react";
import SidebarDash from "../SidebarDash/SidebarDash";
import "./clientDetails.css";
import image from "../../assets/images/dev.png";
// import Profile from "../aziz/Aziz"
import  Avatar  from "./avatar.jpg";
import banner from "./lawyer77.avif"
import { useLocation } from "react-router-dom";


const ClientDetails = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const handleItemClick = (index) => {
    setActiveIndex(index);
  };

  const location = useLocation()
const record = location.state
console.log(record.user);

const date = new Date(record.user.birthDate)

  return (
    <div className="profileDetails">
      <SidebarDash />
      <div className="client-details-container">
      <div className="profile-header-main-container">
      <div className="profile-header">
        <div className="cover-photo">
          <img src={banner} alt="" />
        </div>
        <div className="profile-header-container">
          <div className="profile-photo">
            <img src={record.user.ImageUrl} alt="" />
            <div className="camera_icon_avatar">
              <svg
                style={{cursor:'pointer'}}
                xmlns="http://www.w3.org/2000/svg"
                width="18"
                height="18"
                fill="white"
                class="bi bi-camera-fill"
                viewBox="0 0 16 16"
              >
                <path d="M10.5 8.5a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0z" />
                <path d="M2 4a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2h-1.172a2 2 0 0 1-1.414-.586l-.828-.828A2 2 0 0 0 9.172 2H6.828a2 2 0 0 0-1.414.586l-.828.828A2 2 0 0 1 3.172 4H2zm.5 2a.5.5 0 1 1 0-1 .5.5 0 0 1 0 1zm9 2.5a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0z" />
              </svg>
            </div>
          </div>
          <div className="profile-info">
            <p>{record.user.fullName}</p>
            <div className="profile-info-adress">
              <div className="profile-info-adress-wrap">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  fill="rgb(119, 119, 119)"
                  class="bi bi-building-check"
                  viewBox="0 0 16 16"
                >
                  <path d="M12.5 16a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7Zm1.679-4.493-1.335 2.226a.75.75 0 0 1-1.174.144l-.774-.773a.5.5 0 0 1 .708-.708l.547.548 1.17-1.951a.5.5 0 1 1 .858.514Z" />
                  <path d="M2 1a1 1 0 0 1 1-1h10a1 1 0 0 1 1 1v6.5a.5.5 0 0 1-1 0V1H3v14h3v-2.5a.5.5 0 0 1 .5-.5H8v4H3a1 1 0 0 1-1-1V1Z" />
                  <path d="M4.5 2a.5.5 0 0 0-.5.5v1a.5.5 0 0 0 .5.5h1a.5.5 0 0 0 .5-.5v-1a.5.5 0 0 0-.5-.5h-1Zm3 0a.5.5 0 0 0-.5.5v1a.5.5 0 0 0 .5.5h1a.5.5 0 0 0 .5-.5v-1a.5.5 0 0 0-.5-.5h-1Zm3 0a.5.5 0 0 0-.5.5v1a.5.5 0 0 0 .5.5h1a.5.5 0 0 0 .5-.5v-1a.5.5 0 0 0-.5-.5h-1Zm-6 3a.5.5 0 0 0-.5.5v1a.5.5 0 0 0 .5.5h1a.5.5 0 0 0 .5-.5v-1a.5.5 0 0 0-.5-.5h-1Zm3 0a.5.5 0 0 0-.5.5v1a.5.5 0 0 0 .5.5h1a.5.5 0 0 0 .5-.5v-1a.5.5 0 0 0-.5-.5h-1Zm3 0a.5.5 0 0 0-.5.5v1a.5.5 0 0 0 .5.5h1a.5.5 0 0 0 .5-.5v-1a.5.5 0 0 0-.5-.5h-1Zm-6 3a.5.5 0 0 0-.5.5v1a.5.5 0 0 0 .5.5h1a.5.5 0 0 0 .5-.5v-1a.5.5 0 0 0-.5-.5h-1Zm3 0a.5.5 0 0 0-.5.5v1a.5.5 0 0 0 .5.5h1a.5.5 0 0 0 .5-.5v-1a.5.5 0 0 0-.5-.5h-1Z" />
                </svg>
                <p>{record.user.phoneNumber}</p>
              </div>
              <div className="profile-info-adress-wrap">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  fill="rgb(119, 119, 119)"
                  class="bi bi-geo-alt"
                  viewBox="0 0 16 16"
                >
                  <path d="M12.166 8.94c-.524 1.062-1.234 2.12-1.96 3.07A31.493 31.493 0 0 1 8 14.58a31.481 31.481 0 0 1-2.206-2.57c-.726-.95-1.436-2.008-1.96-3.07C3.304 7.867 3 6.862 3 6a5 5 0 0 1 10 0c0 .862-.305 1.867-.834 2.94zM8 16s6-5.686 6-10A6 6 0 0 0 2 6c0 4.314 6 10 6 10z" />
                  <path d="M8 8a2 2 0 1 1 0-4 2 2 0 0 1 0 4zm0 1a3 3 0 1 0 0-6 3 3 0 0 0 0 6z" />
                </svg>

                <p>{record.user.adress}</p>
              </div>
              <div className="profile-info-adress-wrap">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  fill="rgb(119, 119, 119)"
                  class="bi bi-calendar-week"
                  viewBox="0 0 16 16"
                >
                  <path d="M11 6.5a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-1a.5.5 0 0 1-.5-.5v-1zm-3 0a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-1a.5.5 0 0 1-.5-.5v-1zm-5 3a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-1a.5.5 0 0 1-.5-.5v-1zm3 0a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-1a.5.5 0 0 1-.5-.5v-1z" />
                  <path d="M3.5 0a.5.5 0 0 1 .5.5V1h8V.5a.5.5 0 0 1 1 0V1h1a2 2 0 0 1 2 2v11a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V3a2 2 0 0 1 2-2h1V.5a.5.5 0 0 1 .5-.5zM1 4v10a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V4H1z" />
                </svg>
                <p>{date.toLocaleDateString("en-US")}</p>
              

              </div>
            </div>
          </div>
          <div className="profile-header-statistics">
            <div className="profile-card">
              <p>$4.550</p>
              <p>Earning</p>
            </div>
            <div className="profile-card">
              <p>$4.550</p>
              <p>Projects</p>
            </div>
            <div className="profile-card">
              <p>$4.550</p>
              <p>Success Rate</p>
            </div>
          </div>
          <div className="bottom-nav">
            <ul className="bottom-nav-ul">
              <li
                onClick={() => handleItemClick(0)}
                className={`my-text ${activeIndex === 0 ? "highlight" : ""}`}
              >
                Overview
              </li>
              <li
                onClick={() => handleItemClick(1)}
                className={`my-text ${activeIndex === 1 ? "highlight" : ""}`}
              >
                Projects
              </li>
              <li
                onClick={() => handleItemClick(2)}
                className={`my-text ${activeIndex === 2 ? "highlight" : ""}`}
              >
                Documents
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
      </div>
    </div>
  );
};

export default ClientDetails;
