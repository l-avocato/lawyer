import React, { useEffect, useState } from "react";
import "./allclient.css";
import Modal from "../AddClient/AddClient.jsx";
import SidebarDash from "../SidebarDash/SidebarDash.jsx";
import NavbarDashboard from "../NavbarDashboard/NavbarDashboard.jsx";
import DataGrid from "./DataGrid.jsx";
import axios from "axios";

const AllClient = () => {
  const [users, setUsers] = useState([]);
  console.log("this is user", users);
  const [refrech, setRefrech] = useState(false);

  const deleteUser = async (id) => {
    try {
      await axios.delete(`http://localhost:1128/api/user/deleteUser/${id}`);
      setRefrech(!refrech);
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
    <div>
      <NavbarDashboard />
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
          <hr />
        </div>

        <div
          className="table-wrapper table1"
          style={{ width: "70rem", display: "flex", flexDirection: "column", marginLeft: "21rem" }}
        >
          <DataGrid user={users} deleteUser={deleteUser} />
        </div>
      </div>
    </div>
  );
};

export default AllClient;