import React, { useState, useEffect } from "react";
import SidebarDash from "../SidebarDash/SidebarDash";
import axios from "axios";
import "./style.css";

const CaseProfile = () => {
  const [cases, setCases] = useState([]);
  const [users, setUsers] = useState([]);
  const [data, setData] = useState([]);
  useEffect(() => {
    const fetchCasesData = async () => {
      try {
        const response = await axios.get(
          "http://localhost:1128/api/case/allCases"
        );
        setCases(response.data);
        const data2 = response.data.map((data) => {
          return {
            id: data._id,
            fullName: data.user?.fullName,
            imageUrl: data.user?.ImageUrl,
            title: data.title,
            number: data.number,
            createdAt: data.createdAt,
            details: data.details,
          };
        });
        console.log("this is data 2 ", data2);
        setData(data2);
        console.log(response.data, "im cases");
      } catch (error) {
        console.error("Error fetching user data", error);
      }
    };

    fetchCasesData();
  }, []);

  const [activeIndex, setActiveIndex] = useState(0);

  const handleItemClick = (index) => {
    setActiveIndex(index);
  };

  return (
    <div className="profileDetails">
      <SidebarDash />
      <div className="client-details-container">
        <div className="profile-header-main-container">
          <div className="profile-header">
            <div className="cover-photo">
              {/* <img src={banner} alt="" /> */}
            </div>
            <div className="profile-header-container">
              <div className="profile-photo">
                {data.length > 0 && (
                  <img
                    src={data[0].imageUrl}
                    alt="Profile Image"
                  />
                )}
            
              </div>
              <div className="profile-info">
                <p>{data.length > 0 && data[0].title}</p>
                <div className="profile-info-address">
                  <div className="profile-info-address-wrap">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      fill="rgb(119, 119, 119)"
                      className="bi bi-building-check"
                      viewBox="0 0 16 16"
                    >
                      <path d="M12.166 8.94c-.524 1.062-1.234 2.12-1.96 3.07A31.493 31.493 0 0 1 8 14.58a31.481 31.481 0 0 1-2.206-2.57c-.726-.95-1.436-2.008-1.96-3.07C3.304 7.867 3 6.862 3 6a5 5 0 0 1 10 0c0 .862-.305 1.867-.834 2.94zM8 16s6-5.686 6-10A6 6 0 0 0 2 6c0 4.314 6 10 6 10z" />
                      <path d="M8 8a2 2 0 1 1 0-4 2 2 0 0 1 0 4zm0 1a3 3 0 1 0 0-6 3 3 0 0 0 0 6z" />
                    </svg>
                    <p>{data.length > 0 && data[0].fullName}</p>
                  </div>
                  <div className="profile-info-address-wrap">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      fill="rgb(119, 119, 119)"
                      className="bi bi-geo-alt"
                      viewBox="0 0 16 16"
                    >
                      <path d="M12.166 8.94c-.524 1.062-1.234 2.12-1.96 3.07A31.493 31.493 0 0 1 8 14.58a31.481 31.481 0 0 1-2.206-2.57c-.726-.95-1.436-2.008-1.96-3.07C3.304 7.867 3 6.862 3 6a5 5 0 0 1 10 0c0 .862-.305 1.867-.834 2.94zM8 16s6-5.686 6-10A6 6 0 0 0 2 6c0 4.314 6 10 6 10z" />
                      <path d="M8 8a2 2 0 1 1 0-4 2 2 0 0 1 0 4zm0 1a3 3 0 1 0 0-6 3 3 0 0 0 0 6z" />
                    </svg>
                    <p>{data.length > 0 && data[0].createdAt}</p>
                  </div>
                  <div className="profile-info-address-wrap">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      fill="rgb(119, 119, 119)"
                      className="bi bi-calendar-week"
                      viewBox="0 0 16 16"
                    >
                      <path d="M11 6.5a.5.5 0 1 1 .5-.5h1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-1a.5.5 0 0 1-.5-.5v-1zm-3 0a.5.5 0 1 1 .5-.5h1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-1a.5.5 0 0 1-.5-.5v-1zm-5 3a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-1a.5.5 0 0 1-.5-.5v-1zm3 0a.5.5 0 1 1 .5-.5h1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-1a.5.5 0 0 1-.5-.5v-1zm3 0a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-1a.5.5 0 0 1-.5-.5v-1z" />
                      <path d="M3.5 0a.5.5 0 0 1 .5.5V1h8V.5a.5.5 0 0 1 1 0V1h1a2 2 0 0 1 2 2v11a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V3a2 2 0 0 1 2-2h1V.5a.5.5 0 0 1 .5-.5zM1 4v10a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V4H1z" />
                    </svg>
                    <p>{data.length > 0 && data[0].details}</p>
                  </div>
                </div>
              </div>
              <div className="profile-header-statistics">
              <p className="details" style = {{marginTop:"-40px"}}>case Details</p>
                <div className="profile-card" style={{width:"500px",height:"90px"}}>
                
                  <p>{data.length > 0 && data[0].details}</p>
                 
                </div>
              </div>
              <div className="bottom-nav">
                <ul className="bottom-nav-ul">
                  <li
                    onClick={() => handleItemClick(0)}
                    className={`my-text ${activeIndex === 0 ? "highlight" : ""}`}
                  >
                    documents
                  </li>
                  <li
                    onClick={() => handleItemClick(1)}
                    className={`my-text ${activeIndex === 1 ? "highlight" : ""}`}
                  >
                    phases
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

export default CaseProfile;
