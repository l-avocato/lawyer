import React, { useEffect, useState } from "react";
import "./allclient.css";
import Modal from "../AddClient/AddClient.jsx";
import SidebarDash from "../SidebarDash/SidebarDash.jsx";
import NavbarDashboard from "../NavbarDashboard/NavbarDashboard.jsx";
import DataGrid from "./DataGrid.jsx";
import axios from "axios";
import { FIREBASE_AUTH , db } from "../../firebaseconfig";

const AllClient = () => {
  const [users, setUsers] = useState([]);
  const [refrech, setRefrech] = useState(false);
  const [lawyer,setLawyer]=useState({});
  
  const getLawyer = async () => {
    try {
      const loggedInLawyer = FIREBASE_AUTH.currentUser.email;
      console.log(loggedInLawyer);
      const res = await axios.get(`http://localhost:1128/api/lawyer/getLawyerByEmail/${loggedInLawyer}`);
      console.log("this is lawyer",res.data);
      setLawyer(res.data);
    } catch(err) {
      console.log(err);
    }
  };


  const deleteUser = async (id) => {
    try {
      await axios.delete(`http://localhost:1128/api/user/deleteUser/${id}`);
      
    } catch (error) {
      console.error("Error deleting user:", error);
    }
  };



  const getLawyerClients= async()=>{
    try{
      const response= await axios.get(`http://localhost:1128/api/user_lawyer/getClientsByLawyerId/${lawyer.id}`)
      setUsers(response.data[0].users.reverse())
      console.log("this is clients",response.data);
    }catch(error){
      console.error("Error fetching clients", error);
    }
  }


  useEffect(() => {
    getLawyer() 
    
  }, [refrech]);

  useEffect(() => {
    getLawyerClients()
  }, [lawyer]);

  return (
     <div style={{display:'flex', }}>
      <SidebarDash/>
      <div style={{display:'flex',flexDirection:'column',width:'100%'}}>
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
          <Modal lawyer={lawyer} refrech={refrech} setRefrech={setRefrech} />
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