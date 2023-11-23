import React, { useState, useEffect } from "react";

import axios from "axios";
import { Button, Space } from "antd";
import Box from "@mui/system/Box";
import { useNavigate } from "react-router-dom";
import SidebarDash from "../SidebarDash/SidebarDash";
import { DataGrid } from "@mui/x-data-grid";
import NavbarDashboard from "../NavbarDashboard/NavbarDashboard";
import { FIREBASE_AUTH , db } from "../../firebaseconfig";
// import { useLocation } from "react-router-dom";

const CaseHistory = () => {
  const [cases, setCases] = useState([]);
  const [data, setData] = useState([]);
  const navigate = useNavigate();
  const [lawyer,setLawyer]=useState({});
  
  


  const fetchCasesData = async () => {
    try {
      const loggedInLawyer = FIREBASE_AUTH.currentUser.email;
    
      const response = await axios.get(`http://localhost:1128/api/case/case/lawyer/${loggedInLawyer}`);
      setCases(response.data);

      const data2 = response.data.map((data) => ({
        id: data.id ,
        fullName: data.user?.fullName,
        imageUrl: data.user?.ImageUrl,
        title: data.title,
        number: data.number,
        createdAt: data.createdAt.slice(0,10),
        details: data.details,
      }));
      setData(data2);
    } catch (error) {
      console.error("Error fetching user data", error);
    }
  };

  useEffect(() => {
    fetchCasesData();
  }, []); // useEffect will now run whenever lawyer changes


  const handleView = (id) => {
    console.log("View case with ID:", id);
    navigate(`/CaseProfile/${id}`);
  };

  const handleDelete = async (id) => {
    try {
      console.log("Deleting case with ID:", id);
      await axios.delete(`http://localhost:1128/api/case/deleteCase/${id}`);
      console.log("Successfully deleted case with ID:", id);
      setData((prevData) => prevData.filter((item) => item.id !== id));
    } catch (error) {
      console.error("Error deleting case:", error.message);
    }
  };

  const columns = [
    { field: "id", headerName: "ID", width: 90 },
    {
      field: "imageUrl",
      headerName: "Image",
      sortable: false,
      width: 150,
      renderCell: (params) => (
        <img
          src={params.row.imageUrl}
          alt="User Image"
          style={{ width: "50px", height: "50px", borderRadius: "50%" }}
        />
      ),
    },
    { field: "fullName", headerName: "Full name", width: 150 },
    { field: "title", headerName: "Title", width: 150 },
    { field: "number", headerName: "Number", width: 150 },
    { field: "createdAt", headerName: "Opened At", width: 150 },
    { field: "details", headerName: "Details", width: 150 },
   
    {
      field: "actions",
      headerName: "Actions",
      sortable: false,
      width: 200,
      renderCell: (params) => (
        <Space size="middle">
          <Button
            type="primary"
            onClick={() => navigate(`/CaseProfile` ,{state:{case:params.row}})}
            style={{fontSize:'12px'}}

          >
            View Phases
          </Button>
          <Button type="danger"  style={{backgroundColor:'red',color:'white', fontSize:'12px'}} onClick={() => handleDelete(params.row.id)}>
            Delete
          </Button>
        </Space>
      ),
    },
  ];

  return (
    <div style={{ display: "flex" }}>
      <SidebarDash />
      <div style={{ display: "flex", flexDirection: "column", width: "100%" }}>
        <NavbarDashboard/>
       <div style={{height:'100%',width:'100%',display:'flex',
            justifyContent:'center',
            alignItems:'center',}}>
       <Box
          sx={{
            // flex: 1,
            // overflow: "hidden",
            width: "90%",
            height: "60%",
            
          }}
        >
          <DataGrid
            rows={data}
            columns={columns}
            pageSizeOptions={[5]}
            disableRowSelectionOnClick
          />
        </Box>
       </div>
      </div>
    </div>
  );
};

export default CaseHistory;
