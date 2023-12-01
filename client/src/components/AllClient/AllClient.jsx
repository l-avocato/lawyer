import React, { useEffect, useState } from "react";
import "./allclient.css";
import Modal from "../AddClient/AddClient.jsx";
import SidebarDash from "../SidebarDash/SidebarDash.jsx";
import NavbarDashboard from "../NavbarDashboard/NavbarDashboard.jsx";
import DataGrid from "./DataGrid.jsx";
import axios from "axios";
import { FIREBASE_AUTH, db } from "../../firebaseconfig";
import { useLocation } from "react-router-dom";

const AllClient = () => {
  const location = useLocation();
  const state = location.state;

  const [users, setUsers] = useState([]);
  const [refrech, setRefrech] = useState(false);
  const [lawyer, setLawyer] = useState({});

  const getLawyer = async () => {
    try {
      const loggedInLawyer = FIREBASE_AUTH?.currentUser?.email;
      const res = await axios.get(
        `http://localhost:1128/api/lawyer/getLawyerByEmail/${loggedInLawyer}`
      );
      setLawyer(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  const deleteUser = async (id) => {
    try {
      await axios.delete(`http://localhost:1128/api/user/deleteUser/${id}`);
      setRefrech(!refrech);
    } catch (error) {
      console.error("Error deleting user:", error);
    }
  };

  const getLawyerClients = async () => {
    try {
      const response = await axios.get(
        `http://localhost:1128/api/user_lawyer/getClientsByLawyerId/${lawyer?.id}`
      );
      setUsers(response.data[0]?.users?.reverse());
      console.log("this is clients", response.data);
    } catch (error) {
      console.error("Error fetching clients", error);
    }
  };

  useEffect(() => {
    getLawyer();
  }, []);

  useEffect(() => {
    getLawyerClients();
  }, [lawyer, refrech]);

  return (
    <div style={{ display: "flex" }}>
      <SidebarDash />
      <div style={{ display: "flex", flexDirection: "column", width: "100%" }}>
        <NavbarDashboard />

        <div className="allPageUser">
          <div className="firstDiv-user">
            <button
              className="btnAdd-client"
              data-bs-toggle="modal"
              data-bs-target="#staticBackdrop"
            >
              +New Client
            </button>
          </div>
          <Modal lawyer={lawyer} refrech={refrech} setRefrech={setRefrech} />

          <div style={{ width: "100%", alignItems: "center", padding: "1rem" }}>
            <DataGrid user={users} deleteUser={deleteUser} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AllClient;
