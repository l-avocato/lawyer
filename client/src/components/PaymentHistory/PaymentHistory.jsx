import React, { useEffect, useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import SidebarDash from "../SidebarDash/SidebarDash.jsx";
import NavbarDashboard from "../NavbarDashboard/NavbarDashboard.jsx";
import { FIREBASE_AUTH, db } from "../../firebaseconfig";
import axios from "axios";

const PaymentHistory = () => {
  const [phases, setPhases] = useState([]);
  const [lawyer, setLawyer] = useState({});
  const [refrech, setRefrech] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

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
      setIsLoading(true);
      const response = await axios.get(
        `http://localhost:1128/api/phase/getPhasesByLawyerId/${lawyer?.id}`
      );
      setPhases(response.data);
      console.log("this is phases", response.data);
      setIsLoading(false);
    } catch (error) {
      console.error("Error fetching phases", error);
      setIsLoading(false);
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
    { field: "phaseName", headerName: "Phase Name", width: 150 },
    { field: "price", headerName: "Price", width: 110 },
    {
      field: "payment",
      headerName: "Payment",
      width: 130,
      renderCell: (params) => (
        <div style={{ display: "flex", alignItems: "center" }}>
          <div
            style={{
              padding: "8px",
              borderRadius: "4px",
              backgroundColor: params.row.IsPaid ? "#4CAF50" : "#ff4d4f",
              color: "#fff",
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
      width: 160,
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
          onClick={() => handleUpdatePayment(params.row.id)}
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
  }, [refrech, lawyer]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

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
        <div style={{ flexGrow: 1, overflow: "hidden", padding: "80px" }}>
          <DataGrid
            rows={rows}
            columns={columns}
            pageSize={5}
            rowsPerPageOptions={[5]}
            pagination
          />
        </div>
      </div>
    </div>
  );
};

export default PaymentHistory;
