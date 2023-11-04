import React, { useState } from "react";
import axios from "axios";
import NavbarDashboard from "../NavbarDashboard/NavbarDashboard";
import { db } from "../../firebaseconfig";
import { updateDoc, doc } from "firebase/firestore";

const Settings = () => {
  const [papers, setPapers] = useState("");
  const [fullName, setFullName] = useState("");
  const [adress, setAdress] = useState("");

  const handleFile = async (e) => {
    const formData = new FormData();
    formData.append("file", e.target.files[0]);
    formData.append("upload_preset", "oztadvnr");
    await axios
      .post("https://api.cloudinary.com/v1_1/dl4qexes8/upload", formData)
      .then((response) => {
        setPapers(response.data["secure_url"]);
      })
      .catch((error) => {
        throw error;
      });
  };

  const lawyersCollectionRef = doc(db, "lawyers", "EIKiyaY44S1xWenxPxVh");
  const updateLawyerData = async () => {
    try {
      await updateDoc(lawyersCollectionRef, {
        fullName: fullName,
        adress: adress,
        image: papers,
      });
    } catch (error) {
      console.log("Error updating lawyer", error);
    }
  };

  return (
    <div>
      <NavbarDashboard />
      <div style={{ flex: 1 }}>
        <form
          style={{
            width: "50%",
            display: "flex",
            flexDirection: "column",
            padding: "3rem",
            marginLeft: "35rem",
            gap: "0.5rem",
            marginBottom: "2rem",
            border: "0.3rem solid #ccc",
            borderRadius: "8px",
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
            }}
          >
            Edit Profile
          </p>

          <div className="flex">
            <img
              src={papers}
              alt=""
              className="imageUrl"
              style={{ width: "8rem", height: "8rem" }}
            />
            <input
              type="file"
              className="inputImage"
              onChange={(e) => {
                handleFile(e);
              }}
            />
          </div>

          <div className="form-outline mb-2">
            <input
              type="text"
              placeholder="Full name"
              id="form6Example3"
              className="form-control"
              style={{ fontSize: "18px" }}
              onChange={(e) => {
                setFullName(e.target.value);
              }}
            />
            <label className="form-label" htmlFor="form6Example3">
              Full Name
            </label>
          </div>
          <div className="form-outline mb-2">
            <input
              type="text"
              placeholder="Adress"
              id="form6Example3"
              className="form-control"
              style={{ fontSize: "18px" }}
              onChange={(e) => {
                setAdress(e.target.value);
              }}
            />
            <label className="form-label" htmlFor="form6Example3">
              Address
            </label>
          </div>

          <button
            type="submit"
            style={{
              backgroundColor: "gold",
              color: "black",
              fontSize: "1.3rem",
            }}
            onClick={(e) => {
              e.preventDefault();
              updateLawyerData();
            }}
          >
            Update
          </button>
        </form>
       
      </div>
    </div>
  );
};

export default Settings;
