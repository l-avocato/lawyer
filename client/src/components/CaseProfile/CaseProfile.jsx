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

const CaseProfile = () => {
  const location = useLocation();
  const hisCase = location.state.case;
  console.log("case profile", hisCase);
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
        console.log("Case details:", fetchedCaseData);
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
        <Box className="container">
          <Box className="main-content">
            <Box className="case-details">
              <Box
                className="case-info-box"
                sx={{
                  position: "relative",
                  display: "flex",
                  border: "1px solid #ccc",
                  borderRadius: "8px",
                  marginBottom: "20px",
                  backgroundColor: "#f5f5f5",
                  boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
                  justifyContent: "center",
                }}
              >
                <Box className="case-info" sx={{ flex: "1" }}>
                  <h2>{hisCase.title}</h2>
                  <p>Case Number: {hisCase.number}</p>
                  <p>Client: {hisCase.fullName}</p>
                  <p>Created At: {hisCase.createdAt}</p>
                </Box>
                <Box
                  className="profile-pic"
                  sx={{
                    width: "80px",
                    height: "80px",
                    borderRadius: "50%",
                    overflow: "hidden",
                  }}
                >
                  <img
                    src={photo}
                    alt="Profile"
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                    }}
                  />
                </Box>
              </Box>
              <Button
                className="button"
                onClick={() => navigate("/Flow", { state: { case: hisCase } })}
              >
                Check Steps
              </Button>
              <Box
                className="additional-details"
                sx={{
                  marginTop: "20px",
                  display: "flex",
                  justifyContent: "center",
                }}
              >
                <Card sx={{ minWidth: "100%", minHeight: 300 }}>
                  <CardContent>
                    <Typography variant="h5" component="div">
                      Case Details
                    </Typography>
                    <Typography variant="body2">{hisCase.details}</Typography>
                  </CardContent>
                </Card>
              </Box>
            </Box>
          </Box>
        </Box>
      </div>
    </div>
  );
};

export default CaseProfile;
