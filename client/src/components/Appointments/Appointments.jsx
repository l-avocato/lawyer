import React from "react";
import NavbarDashboard from "../NavbarDashboard/NavbarDashboard";
import Aziz from "../Aziz/Aziz";
import Appointment from "./Appointments.css";
import Example from "../Example/Example";
import { Flex } from "antd";
import SidebarDash from "../SidebarDash/SidebarDash";
import { display } from "@mui/system";

const Appointments = () => {
  return (
    <div>
      <div style={{ display: "flex" }}>
        <SidebarDash />
        <div>
          <NavbarDashboard />{" "}
          <div className="apointment">
            <div className="table">
              <Aziz />
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
      </div>
    </div>
  );
};

export default Appointments;
