import React, { useState, useMemo } from "react";
import axios from "axios";
import NavbarDashboard from "../NavbarDashboard/NavbarDashboard";
import { db } from "../../firebaseconfig";
import { updateDoc, doc } from "firebase/firestore";
import SidebarDash from "../SidebarDash/SidebarDash";
import defaultpic from "../../assets/images/default.png";
import { GoogleMap, Marker, useJsApiLoader } from "@react-google-maps/api";

const ProfileDetails = () => {
  const [papers, setPapers] = useState("");
  const [fullName, setFullName] = useState("");
  const [address, setAddress] = useState("");
  const [mapVisible, setMapVisible] = useState(false);
  const [map, setMap] = React.useState(null);

  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: "AIzaSyBJCGfd16u9ZMNd8v2rmZYqz6s2b4VGA1c",
  });

  const handleFile = async (e) => {
    const formData = new FormData();
    formData.append("file", e.target.files[0]);
    formData.append("upload_preset", "oztadvnr");
    try {
      const response = await axios.post(
        "https://api.cloudinary.com/v1_1/dl4qexes8/upload",
        formData
      );
      setPapers(response.data["secure_url"]);
    } catch (error) {
      console.error("Error uploading file:", error);
    }
  };


  const lawyersCollectionRef = doc(db, "lawyers", "EIKiyaY44S1xWenxPxVh");
  const updateLawyerData = async () => {
    try {
      await updateDoc(lawyersCollectionRef, {
        fullName: fullName,
        address: address,
        imageUrl: papers,
      });
    } catch (error) {
      console.error("Error updating lawyer", error);
    }
  };

  const handleMapToggle = () => {
    setMapVisible(!mapVisible);
  };

  return (
    <div>
      <NavbarDashboard />
      <SidebarDash />

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
            marginTop: "-6rem",
          }}
        >
          <p
            style={{
              fontSize: "2.5rem",
              fontFamily: "",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: "1rem",
              marginLeft: "-60rem",
              marginTop: "6rem",
            }}
          >
            Edit Profile
          </p>
          <div className="flex">
            <img
              src={papers || defaultpic}
              alt=""
              className="imageUrl"
              style={{
                width: "8rem",
                height: "8rem",
                backgroundSize: "cover",
              }}
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
            <label className="form-label" htmlFor="form6Example3"></label>
          </div>
          <div className="form-outline mb-2">
            <input
              type="text"
              placeholder="Address"
              id="form6Example3"
              className="form-control"
              style={{ fontSize: "18px" }}
              onChange={(e) => {
                setAddress(e.target.value);
              }}
            />
            <label className="form-label" htmlFor="form6Example3"></label>
          </div>
          {mapVisible && (
            <div
              className="map"
              style={{
                width: "100%",
                height: "400px",
                backgroundColor: "lightgray",
              }}
            >
              <GoogleMap
                mapContainerClassName="map"
                // center={center}
                zoom={10}
        
              >
                <Marker position={{ lat: 18.52043, lng: 73.856743 }} />
              </GoogleMap>
            </div>
          )}

          <button
            type="button"
            style={{
              backgroundColor: "gold",
              color: "black",
              fontSize: "1.3rem",
              marginTop: "8rem",
            }}
            onClick={(e) => {
              e.preventDefault();
              updateLawyerData();
            }}
          >
            Update
          </button>
          <button
            type="button"
            style={{
              backgroundColor: "green",
              color: "white",
              fontSize: "1.3rem",
              marginTop: "2rem",
            }}
            onClick={handleMapToggle}
          >
            Toggle Map
          </button>
        </form>
      </div>
    </div>
  );
};

export default ProfileDetails;
