import React, { useState, useEffect } from "react";
import axios from "axios";
import SidebarDash from "../SidebarDash/SidebarDash";
import photo from "../../assets/images/va.png";
import "./style.css";
import Flow from "../StepsCases/Flow";
import { useNavigate } from "react-router-dom";
import { Box } from "@mui/system";
import { Button } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import NavbarDashboard from "../NavbarDashboard/NavbarDashboard";
import { useLocation } from "react-router-dom";
import { Card, CardContent, Typography } from "@mui/material";

import Person2Icon from "@mui/icons-material/Person2";
import FormatListNumberedIcon from "@mui/icons-material/FormatListNumbered";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import FormatShapesIcon from "@mui/icons-material/FormatShapes";

const CaseProfile = () => {
  const location = useLocation();
  const hisCase = location.state.case;
  const [caseData, setCaseData] = useState({});
  const [documents, setDocuments] = useState([]);
  const [id, setId] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCaseDetails = async () => {
      try {
        const response = await axios.get(
          `http://localhost:1128/api/case/case/${hisCase.id}`
        );
        const fetchedCaseData = response.data;
        setId(fetchedCaseData.id);
        setCaseData(fetchedCaseData);
        setDocuments(fetchedCaseData.documents || []);
      } catch (error) {
        console.error("Error fetching case details", error);
      }
    };

    fetchCaseDetails();
  }, [id]);

  return (
    <div style={{ display: "flex" }}>
      <SidebarDash />
      <div style={{ display: "flex", flexDirection: "column", width: "100%" }}>
        <NavbarDashboard />

        <div
          style={{
            display: "flex",
            gap: "2rem",
            padding: "1rem",
            justifyContent: "center",
            marginTop: "1rem",
          }}
        >
          <div
            className="card-case"
            style={{
              backgroundColor: "white",
              width: "14rem",
              height: "10rem",
              display: "flex",
              flexDirection: "column",
              gap: "1rem",
              borderRadius: "1rem",
            }}
          >
            <div
              style={{
                display: "flex",
                gap: "1rem",
                justifyContent: "center",
                backgroundColor: "black",
                borderRadius: "1rem 1rem 0 0 ",
              }}
            >
              <h3
                style={{
                  fontFamily: "sans-serif",
                  fontWeight: "bold",
                  color: "goldenrod",
                  marginTop: "0.5rem",
                  fontSize: "1.5rem",
                }}
              >
                Case Title
              </h3>
            </div>
            <div
              style={{ backgroundColor: "white", height: "1px", width: "100%" }}
            ></div>
            <div>
              <h3 style={{ fontFamily: "inherit", color: "black" }}>
                {hisCase.title}
              </h3>
            </div>
          </div>

          <div
            className="card-case"
            style={{
              backgroundColor: "white",
              width: "14rem",
              height: "10rem",
              display: "flex",
              gap: "1rem",
              flexDirection: "column",
              borderRadius: "1rem",
            }}
          >
            <div
              style={{
                display: "flex",
                gap: "1rem",
                justifyContent: "center",
                backgroundColor: "black",
                borderRadius: "1rem 1rem 0 0 ",
              }}
            >
              <h3
                style={{
                  fontFamily: "sans-serif",
                  fontWeight: "bold",
                  color: "goldenrod",
                  marginTop: "0.5rem",
                  fontSize: "1.5rem",
                }}
              >
                Case Number
              </h3>
            </div>
            <div
              style={{ backgroundColor: "white", height: "1px", width: "100%" }}
            ></div>
            <div>
              <h3 style={{ fontFamily: "inherit", color: "black" }}>
                {hisCase.number}
              </h3>
            </div>
          </div>
          <div
            className="card-case"
            style={{
              backgroundColor: "white",
              width: "14rem",
              height: "10rem",
              display: "flex",
              gap: "1rem",
              flexDirection: "column",
              borderRadius: "1rem",
            }}
          >
            <div
              style={{
                display: "flex",
                gap: "1rem",
                justifyContent: "center",
                backgroundColor: "black",
                borderRadius: "1rem 1rem 0 0 ",
              }}
            >
              <h3
                style={{
                  fontFamily: "sans-serif",
                  fontWeight: "bold",
                  color: "goldenrod",
                  marginTop: "0.5rem",
                  fontSize: "1.5rem",
                }}
              >
                Client Name
              </h3>
            </div>
            <div
              style={{ backgroundColor: "white", height: "1px", width: "100%" }}
            ></div>
            <div>
              <h3 style={{ fontFamily: "inherit", color: "black" }}>
                {hisCase.fullName}
              </h3>
            </div>
          </div>
          <div
            className="card-case"
            style={{
              backgroundColor: "white",
              width: "14rem",
              height: "10rem",
              display: "flex",
              gap: "1rem",
              flexDirection: "column",
              borderRadius: "1rem",
            }}
          >
            <div
              style={{
                display: "flex",
                gap: "1rem",
                justifyContent: "center",
                backgroundColor: "black",
                borderRadius: "1rem 1rem 0 0 ",
              }}
            >
              <h3
                style={{
                  fontFamily: "sans-serif",
                  fontWeight: "bold",
                  color: "goldenrod",
                  marginTop: "0.5rem",
                  fontSize: "1.5rem",
                }}
              >
                Opened At{" "}
              </h3>
            </div>
            <div
              style={{ backgroundColor: "white", height: "1px", width: "100%" }}
            ></div>
            <div>
              <h3 style={{ fontFamily: "inherit", color: "black" }}>
                {" "}
                {hisCase.createdAt}
              </h3>
            </div>
          </div>
        </div>
        <div style={{ display: "flex", justifyContent: "center" }}>
          <div
            className="card-case"
            style={{
              backgroundColor: "white",
              width: "62rem",
              height: "21.5rem",
            }}
          >
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                marginTop: "1.5rem",
              }}
            >
              <h3
                style={{
                  fontFamily: "sans-serif",
                  fontWeight: "bold",
                  color: "goldenrod",
                }}
              >
                {" "}
                CASE DETAILS{" "}
              </h3>
            </div>
            <div
              style={{
                display: "flex",
                justifyContent: "flex-start",
                padding: "1rem",
              }}
            >
              <h3 style={{ fontFamily: "inherit" }}> {hisCase.details} </h3>
            </div>
          </div>
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            marginTop: "1.2rem",
          }}
        >
          <Button
            className="btnCheckStep"
            onClick={() => navigate("/Flow", { state: { case: hisCase } })}
            style={{
              border: "none",
              color: "BLACK",
              fontSize: "1.2rem",
              width: "20rem",
              height: "3.5rem",
              background:
                "linear-gradient(to right, #b38728, #dbd381, #aa771c)",
            }}
          >
            Check Steps
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CaseProfile;
