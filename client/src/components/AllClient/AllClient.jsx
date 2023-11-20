import React, { useEffect, useState } from "react";
import "./allclient.css";
import Modal from "../AddClient/AddClient.jsx";
import SidebarDash from "../SidebarDash/SidebarDash.jsx";
import NavbarDashboard from "../NavbarDashboard/NavbarDashboard.jsx";
import DataGrid from "./DataGrid.jsx";
import axios from "axios";


const AllClient = () => {
  const [users, setUsers] = useState([]);
  const [refrech, setRefrech] = useState(false);

  
  const deleteUser = async (id) => {
    try {
      await axios.delete(`http://localhost:1128/api/user/deleteUser/${id}`);
      getUsers(); 
    } catch (error) {
      console.error("Error deleting user:", error);
    }
  };


  const getUsers = async () => {
    try {
      const response = await axios.get("http://localhost:1128/api/user/allUsers");
      setUsers(response.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    getUsers();
  }, [refrech]);

  return (
     <div style={{display:'flex', flexDirection:'column'}}>
      <NavbarDashboard />
      <div style={{display:'flex'}}>
      <SidebarDash/>

      <div className="allPage">
        <div className="firstDiv">
          <button
            className="btnAdd"
            data-bs-toggle="modal"
            data-bs-target="#staticBackdrop"
          >      
            +New Client{" "}
          </button>
          <Modal refrech={refrech} setRefrech={setRefrech} />
        </div>

        <div
          className="table-wrapper table1"
          style={{ width: "70rem", display: "flex", flexDirection: "column"}}
        >
          <DataGrid user={users}
          
          deleteUser={deleteUser} />
        </div>
      </div>
    </div>
     </div>
  );
};

export default AllClient;