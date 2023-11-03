import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import NavbarDashboard from "../NavbarDashboard/NavbarDashboard";

const SettingSecurity = () => {
  const [oldPasswordVisible, setOldPasswordVisible] = useState(false);
  const [newPasswordVisible, setNewPasswordVisible] = useState(false);
  const [confirmedPasswordVisible, setConfirmedPasswordVisible] = useState(false);
    useState(false);

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
            border: "1px solid #ccc",
            borderRadius: "8px",
            padding: "3rem",
            marginLeft: "6rem",
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

          <button
            type="submit"
            style={{
              backgroundColor: "gold",
              color: "black",
              fontSize: "1.3rem",
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
