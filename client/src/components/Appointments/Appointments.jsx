import React, { useEffect, useState } from "react";
import NavbarDashboard from "../NavbarDashboard/NavbarDashboard";
import Aziz from "../Aziz/Aziz";
import Appointment from "./Appointments.css";
import Example from "../Example/Example";
import axios from 'axios'

const Appointments = () => {
  const [appointments,setAppointments] = useState([])
  const [id,setId]=useState("")
  const [refrech, setRefrech] = useState(false);

  const deleteAppointment = async (id) => {
    console.log(id,"this is the id")
    // /deleteAppointment
    try {
      const x = await axios.delete(`http://localhost:1128/api/appointment/deleteAppointment/${id}`);
      setRefrech(!refrech);
      console.log("deleted");
    } catch (error) {
      console.error("Error deleting user:", error);
    }
  };
  
  const getAppointments = async () => {
    try {
      const response = await axios.get('http://localhost:1128/api/appointment/getAppointments');
      console.log("this is the response", response.data);
      setAppointments(response.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
  useEffect(()=>{
    getAppointments();
  },[])
  return (
    <div>
      <div>
        <NavbarDashboard />
      </div>
      <div className="apointment">
        <div className="table">
          <Aziz appointments={appointments} deleteAppointment={deleteAppointment} setId={setId}  />
        </div>
        <div className="extra">
          <div className="upcoming">
            <div className="scrollable-content">
              {/* Add your text or other content here */}
              <p className="upcoming-title">Upcoming Appointments</p>
              <div className="cardAndBorder">
                <div
                  className="appointment-item1 border-black p-1"
                  style={{ borderRadius: "3%" }}>
                  <div className="imageWithTitle flex g-10 ">
                    <img
                      src={require("../../assets/images/user11.avif")}
                      alt="Appointment 1"
                      style={{ marginTop: "0.1rem" }}
                    />{" "}
                    <div className="appointment1-text">
                      <p>Farouk Mestiri</p>
                      <p> 15-08-2023 Monday</p>
                    </div>
                  </div>
                  <p
                    className=" flex jcc align-center"
                    style={{
                      width: "40%",
                      height: "3rem",
                      flexDirection: "row",
                    }}>
                    11h:30 || 11h:45
                  </p>
                </div>
                <div
                  className="borderBlack"
                  style={{
                    width: "100%",
                    background: "gray",
                    height: "0.1px",
                  }}></div>
              </div>
            </div>
          </div>
          <div className="statistics">
            {" "}
            <Example />{" "}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Appointments;
