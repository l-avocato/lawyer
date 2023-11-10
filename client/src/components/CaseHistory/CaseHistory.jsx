import React, { useState, useEffect } from "react";
import "./style.css";
import SidebarDash from "../SidebarDash/SidebarDash";
import axios from "axios";

function CaseHistory() {
  const [user, setUser] = useState({ imageUrl: "" });

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get("/api/user");
        setUser(response.data);
      } catch (error) {
        console.error("Error fetching user data", error);
      }
    };

    fetchUserData();
  }, []);

  return (
    <div className="container">
      <SidebarDash />
      <div className="client-cases">
        <img src={user.imageUrl} alt="User Image" />
        <h1 name={user.fullName} />
      </div>
    </div>
  );
}

export default CaseHistory;
