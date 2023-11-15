import React, { useEffect, useState } from "react";
import "./PaymentHistory.css";
import Modal from "./addPayment";
import SidebarDash from "../SidebarDash/SidebarDash.jsx";
import NavbarDashboard from "../NavbarDashboard/NavbarDashboard.jsx";
import DataGrid from "./datagrid.jsx";
import axios from "axios";


const PaymentHistory = () => {
  
  const [payments, setPayments] = useState([]);
  console.log("this is user", payments);
  const [refrech, setRefrech] = useState(false);
  const [id,setId]=useState("")

  const deleteUser = async () => {
    console.log(id,"this is the id")
    try {
      await axios.delete(`http://localhost:1128/api/payment/deletePayment/${id}`);
      setRefrech(!refrech);
    } catch (error) {
      console.error("Error deleting user:", error);
    }
  };

  const getPayments = async () => {
    try {
      const response = await axios.get("http://localhost:1128/api/payment/allPayments");
      setPayments(response.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
  

  useEffect(() => {
    getPayments();
  }, [refrech]);

  return (
    <div>
      <NavbarDashboard />
      <div className="allPage">
        <div className="firstDiv">
          <button
            className="buttonAdd"
            data-bs-toggle="modal"
            data-bs-target="#staticBackdrop"
          >
            Add Payment{" "}
          </button>
          <Modal refrech={refrech} setRefrech={setRefrech} />
          <hr />
        </div>

        <div
          className="table-wrapper table1"
          style={{ width: "70rem", display: "flex", flexDirection: "column", marginLeft: "21rem" }}
        >
          <DataGrid payment={payments} deleteUser={deleteUser} setId={setId}    />
        </div>
      </div>
    </div>
  );
};

export default PaymentHistory;