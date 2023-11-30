import React, { useEffect, useState } from "react";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import SidebarDash from "../SidebarDash/SidebarDash.jsx";
import NavbarDashboard from "../NavbarDashboard/NavbarDashboard.jsx";
import { FIREBASE_AUTH, db } from "../../firebaseconfig";
import axios from "axios";

const PaymentHistory = () => {
  const [phases, setPhases] = useState([]);
  const [lawyer, setLawyer] = useState({});
  const [refrech, setRefrech] = useState(false);


  const getLawyer = async () => {
    try {
      const loggedInLawyer = FIREBASE_AUTH?.currentUser?.email;
      console.log(loggedInLawyer);
      const res = await axios.get(
        `http://localhost:1128/api/lawyer/getLawyerByEmail/${loggedInLawyer}`
      );
      console.log("this is lawyer", res.data);
      setLawyer(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  const getPhases = async () => {
    try {
      
      const response = await axios.get(
        `http://localhost:1128/api/phase/getPhasesByLawyerId/${lawyer?.id}`
      );
      setPhases(response.data);
      console.log("this is phases", response.data);
    
    } catch (error) {
      console.error("Error fetching phases", error);
    }
  };

  const handleUpdatePayment = async (id) => {
    const phaseToUpdate = phases.find((phase) => phase.id === id);
    try {
      await axios.put(`http://localhost:1128/api/phase/updatePhase/${id}`, {
        IsPaid: !phaseToUpdate.IsPaid,
      });
      setRefrech(!refrech);
    } catch (err) {
      console.log(err);
    }
  };

  const columns = [
    { field: "phaseName", headerName: "Phase Name", width: 250 },
    { field: "price", headerName: "Price", width: 250 },
    {
      field: "payment",
      headerName: "Payment",
      width: 250,
      renderCell: (params) => (
        <div style={{ display: "flex", alignItems: "center" }}>
          <div
            style={{
              padding: "8px",
              borderRadius: "4px",
              backgroundColor: params.row.IsPaid ? "#4CAF50" : "#ff4d4f",
              color: "#fff",
              width:"7rem",
              fontSize: "1.1rem"
            }}
          >
            {params.row.IsPaid ? "Paid" : "Not Paid"}
          </div>
        </div>
      ),
    },
    {
      field: "updatePayment",
      headerName: "Update Payment",
      width: 250,
      renderCell: (params) => (
        <button
          style={{
            backgroundColor: "#2196F3",
            color: "#fff",
            border: "none",
            padding: "8px 16px",
            borderRadius: "4px",
            cursor: "pointer",
          }}
          onClick={(event) => {
            handleUpdatePayment(params.row.id);
            event.preventDefault();
          }}
        >
          Update Payment
        </button>
      ),
    },
  ];

  useEffect(() => {
    getLawyer();
  }, []);

  useEffect(() => {
    getPhases();
  }, [refrech,lawyer]);



  const rows =
    phases && phases.length > 0
      ? phases.map((phase) => ({
          id: phase.id,
          phaseName: phase.label,
          price: phase.price,
          IsPaid: phase.IsPaid,
        }))
      : [];

  return (
    <div style={{ display: "flex" }}>
      <SidebarDash />
      <div style={{ display: "flex", flexDirection: "column", width: "100%" }}>
        <NavbarDashboard />
        <div
          style={{
            flexGrow: 1,
            overflow: "hidden",
            padding: "4rem",
            width: "100%",
            alignItems: "center",
          }}
        >
          <div
            style={{
              width: "100%",
              display: "flex",
              justifyContent: "space-between",
              flexDirection: "column",
            }}
          >
            <DataGrid
              sx={{
                display: "flex",
                gap: "10rem",
                justifyContent: "center",
                alignItems: "center",
                flexDirection: "column",
                flexWrap: "wrap",
              }}
              rows={rows}
              columns={columns}
              pageSize={5}
              rowsPerPageOptions={[5]}
              pagination
              autoHeight
              disableExtendRowFullWidth
              columnBuffer={30}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentHistory;
