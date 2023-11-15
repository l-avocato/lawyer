import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import NavbarDashboard from "../NavbarDashboard/NavbarDashboard";
import { db } from "../../firebaseconfig";
import { doc, updateDoc } from "firebase/firestore";
import { green } from "@mui/material/colors";

const SettingSecurity = () => {
  const [oldPasswordVisible, setOldPasswordVisible] = useState(false);
  const [newPasswordVisible, setNewPasswordVisible] = useState(false);
  const [confirmedPasswordVisible, setConfirmedPasswordVisible] = useState(false);

  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmedPassword, setConfirmedPassword] = useState("");
  const [alertMessage, setAlertMessage] = useState(""); // State variable for alert message

  const togglePasswordVisibility = (field) => {
    switch (field) {
      case "oldPassword":
        setOldPasswordVisible(!oldPasswordVisible);
        break;
      case "newPassword":
        setNewPasswordVisible(!newPasswordVisible);
        break;
      case "confirmedPassword":
        setConfirmedPasswordVisible(!confirmedPasswordVisible);
        break;
      default:
        break;
    }
  };

  const lawyersCollectionRef = doc(db, "lawyers", "EIKiyaY44S1xWenxPxVh");

  const updatePassword = async () => {
    if (newPassword !== confirmedPassword) {
      setAlertMessage("New password and confirmed password do not match.");
      return;
    }
    
    try {
      await updateDoc(lawyersCollectionRef, {
        password: newPassword,
      });
      setAlertMessage("Password updated successfully!");
    } catch (error) {
      console.error("Error updating password", error);
      setAlertMessage("An error occurred while updating the password.");
    }
  };

  return (
    <div>
      <NavbarDashboard />
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <form
          style={{
            width: "50%",
            display: "flex",
            flexDirection: "column",
            gap: "2rem",
            border: "0.1rem solid #ccc",
            borderRadius: "8px",
            padding: "3rem",
            marginLeft: "20rem",
          }}
          onSubmit={(e) => {
            e.preventDefault();
            updatePassword();
          }}
        >
          <p
            style={{
              fontSize: "2.5rem",
              fontFamily: "-moz-initial",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: "1rem",
              color: "black",
            }}
          >
            Edit Security
          </p>

          {/* Old Password Input */}
          <div className="form-outline mb-2" style={{ position: "relative" }}>
            <input
              type={oldPasswordVisible ? "text" : "password"}
              placeholder="Old Password"
              id="form6Example1"
              className="form-control"
              style={{ fontSize: "18px" }}
              onChange={(e) => {
                setOldPassword(e.target.value);
              }}
            />
            <FontAwesomeIcon
              icon={oldPasswordVisible ? faEye : faEyeSlash}
              className="password-icon"
              onClick={() => togglePasswordVisibility("oldPassword")}
              style={{
                position: "absolute",
                right: "10px",
                top: "50%",
                transform: "translateY(-50%)",
                cursor: "pointer",
              }}
            />
          </div>

          {/* New Password Input */}
          <div className="form-outline mb-2" style={{ position: "relative" }}>
            <input
              type={newPasswordVisible ? "text" : "password"}
              placeholder="New Password"
              id="form6Example2"
              className="form-control"
              style={{ fontSize: "18px" }}
              onChange={(e) => {
                setNewPassword(e.target.value);
              }}
            />
            <FontAwesomeIcon
              icon={newPasswordVisible ? faEye : faEyeSlash}
              className="password-icon"
              onClick={() => togglePasswordVisibility("newPassword")}
              style={{
                position: "absolute",
                right: "10px",
                top: "50%",
                transform: "translateY(-50%)",
                cursor: "pointer",
              }}
            />
          </div>

          {/* Confirmed Password Input */}
          <div className="form-outline mb-2" style={{ position: "relative" }}>
            <input
              type={confirmedPasswordVisible ? "text" : "password"}
              placeholder="Confirmed Password"
              id="form6Example3"
              className="form-control"
            
              style={{ fontSize: "18px" }}
              onChange={(e) => {
                setConfirmedPassword(e.target.value);
              }}
            />
            <FontAwesomeIcon
              icon={confirmedPasswordVisible ? faEye : faEyeSlash}
              className="password-icon"
              onClick={() => togglePasswordVisibility("confirmedPassword")}
              style={{
                position: "absolute",
                right: "10px",
                top: "50%",
                transform: "translateY(-50%)",
                cursor: "pointer",
              }}
            />
          </div>

          {/* Alert */}
          {alertMessage && (
            <div className="alert alert-danger" style={{backgroundColor:"#d1e7dd", borderColor:'#226656', color:"#226656"}}>{alertMessage}</div>
          )}

          <button
            type="submit"
            style={{
             backgroundColor: "gold",
              color: "black",
              fontSize: "1.3rem", 
              border: "none",
              borderRadius: "8px",
              padding: "10px 20px",
              cursor: "pointer",
            }}
          
          >
            Update Password
          </button>
        </form>
      </div>
    </div>
  );
};

export default SettingSecurity;
