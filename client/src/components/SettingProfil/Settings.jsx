import React, { useState, useRef, useEffect } from "react";
import axios from "axios";
import NavbarDashboard from "../NavbarDashboard/NavbarDashboard";
import { FIREBASE_AUTH, db } from "../../firebaseconfig";
import { updateDoc, doc } from "firebase/firestore";
import { GoogleMap, Marker } from "@react-google-maps/api";
import "./Style.css";
import SidebarDash from "../SidebarDash/SidebarDash";
import { getAuth } from "firebase/auth";
import GpsFixedIcon from '@mui/icons-material/GpsFixed';
import RoomIcon from '@mui/icons-material/Room';

const Settings = () => {
  const [papers, setPapers] = useState("");
  const [fullName, setFullName] = useState("");
  const [adress, setAdress] = useState("");
  const [latitude, setLatitude] = useState("");
  const [longitude, setLongitude] = useState("");
  const [isMenuOpen, setMenuOpen] = useState(false);
  const [markerClicked, setMarkerClicked] = useState(true);
  const [user, setUser] = useState({});
  const position = {
    lat: parseFloat(latitude) || 51.505,
    lng: parseFloat(longitude) || -0.09,
  };
  const menuRef = useRef(null);



let mapping = [
  {
      "featureType": "all",
      "elementType": "labels.text.fill",
      "stylers": [
          {
              "saturation": 36
          },
          {
              "color": "#000000"
          },
          {
              "lightness": 40
          }
      ]
  },
  {
      "featureType": "all",
      "elementType": "labels.text.stroke",
      "stylers": [
          {
              "visibility": "on"
          },
          {
              "color": "#000000"
          },
          {
              "lightness": 16
          }
      ]
  },
  {
      "featureType": "all",
      "elementType": "labels.icon",
      "stylers": [
          {
              "visibility": "off"
          }
      ]
  },
  {
      "featureType": "administrative",
      "elementType": "geometry.fill",
      "stylers": [
          {
              "color": "#000000"
          },
          {
              "lightness": 20
          }
      ]
  },
  {
      "featureType": "administrative",
      "elementType": "geometry.stroke",
      "stylers": [
          {
              "color": "#000000"
          },
          {
              "lightness": 17
          },
          {
              "weight": 1.2
          }
      ]
  },
  {
      "featureType": "landscape",
      "elementType": "geometry",
      "stylers": [
          {
              "color": "#000000"
          },
          {
              "lightness": 20
          }
      ]
  },
  {
      "featureType": "poi",
      "elementType": "geometry",
      "stylers": [
          {
              "color": "#000000"
          },
          {
              "lightness": 21
          }
      ]
  },
  {
      "featureType": "road.highway",
      "elementType": "geometry.fill",
      "stylers": [
          {
              "color": "#000000"
          },
          {
              "lightness": 17
          }
      ]
  },
  {
      "featureType": "road.highway",
      "elementType": "geometry.stroke",
      "stylers": [
          {
              "color": "#000000"
          },
          {
              "lightness": 29
          },
          {
              "weight": 0.2
          }
      ]
  },
  {
      "featureType": "road.arterial",
      "elementType": "geometry",
      "stylers": [
          {
              "color": "#000000"
          },
          {
              "lightness": 18
          }
      ]
  },
  {
      "featureType": "road.local",
      "elementType": "geometry",
      "stylers": [
          {
              "color": "#000000"
          },
          {
              "lightness": 16
          }
      ]
  },
  {
      "featureType": "transit",
      "elementType": "geometry",
      "stylers": [
          {
              "color": "#000000"
          },
          {
              "lightness": 19
          }
      ]
  },
  {
      "featureType": "water",
      "elementType": "geometry",
      "stylers": [
          {
              "color": "#000000"
          },
          {
              "lightness": 17
          }
      ]
  }
]







  const auth = getAuth();
  const handleGetUser = async (user) => {
    await axios
      .get(`http://localhost:1128/api/lawyer/getLawyerByEmail/${user}`)
      .then((res) => {
        setUser(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const [isModalVisible, setIsModalVisible] = useState(false);
  const showModal = () => setIsModalVisible(true);
  const hideModal = () => setIsModalVisible(false);

  
  const handleFile = async (e) => {
    const formData = new FormData();
    formData.append("file", e.target.files[0]);
    formData.append("upload_preset", "oztadvnr");
    try {
      const response = await axios.post(
        "https://api.cloudinary.com/v1_1/dl4qexes8/upload",
        formData
      );
      setPapers(response.data.secure_url);
    } catch (error) {
      console.error(error);
    }
  };

  const center = {
    lat: latitude,
    lng: longitude
  };

console.log(latitude,longitude,"those are lang lat ");




  const getLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const latitude = position.coords.latitude;
          const longitude = position.coords.longitude;
          setLatitude(latitude);
          setLongitude(longitude);
        },
        (error) => {
          console.error(error);
        }
      );
    } else {
      console.error("Geolocation is not supported by this browser.");
    }
  };

  const lawyersCollectionRef = doc(db, "lawyers", "EIKiyaY44S1xWenxPxVh");

  const updateLawyerData = async () => {
    try {
      await updateDoc(lawyersCollectionRef, {
        fullName: fullName,
        adress: adress,
        imageUrl: papers,
        latitude: parseFloat(latitude),
        longitude: parseFloat(longitude),
      });
      hideModal();
    } catch (error) {
      console.error("Error updating lawyer", error);
    }
  };


  const updateProfil = ()=>{
    const email=FIREBASE_AUTH.currentUser.email

    try {
      axios.put(`http://localhost:1128/api/lawyer/updateLawyer/${email}`, {
   fullName: fullName,
   ImageUrl: papers, 
   adress: adress,
         longitude: parseFloat(longitude),
           latitude: parseFloat(latitude),


      })
    } catch (error) {
      console.log(error)
    }

  }


  useEffect(() => {
    handleGetUser(auth.currentUser.email);
    setPapers(user.ImageUrl);
  }, []);

  return (
    <div style={{ display: "flex" }}>
      <SidebarDash />
      <div style={{ display: "flex", flexDirection: "column", width: "100%" }}>
        <NavbarDashboard />
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            width: "100%",
            height: "100%",
          }}
        >
          <form
            style={{
              width: "50%",
              display: "flex",
              flexDirection: "column",
              padding: "3rem",
              // marginLeft: "35rem",
              gap: "0.5rem",
              // marginBottom: "2rem",
              border: "0.1rem solid #ccc",
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
                  setAdress(e.target.value);
                }}
              />
              <label className="form-label" htmlFor="form6Example3"></label>
            </div>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                gap: "1rem",
              }}
               >
              <button
                type="button"
                style={{
                  backgroundColor: "gold",
                  color: "black",
                  fontSize: "1.3rem",
                  border: "none",
                  borderRadius: "8px",
                  cursor: "pointer",
                  width: "550px",
                  height: "40px",
                }}
                onClick={()=>{
updateProfil()
                }}
              >
                Update
              </button>
              <button
                type="button"
                style={{
                  backgroundColor: "gold",
                  color: "black",
                  fontSize: "1.3rem",
                  border: "none",
                  borderRadius: "8px",
                  cursor: "pointer",
                  width: "550px",
                  height: "40px",
                }}
                onClick={() => {
                  showModal();
                  getLocation();
                }}
              >
                Update Localisation
              </button>
            </div>

            {isModalVisible && (
              <div className="modal-map2">
                <div className="modal-content1">
                  <GoogleMap
                    center={center}
                    zoom={16}
                    mapContainerStyle={{ height: "600px", width: "100%",color:"black" }}
                    options={{
                      styles:mapping 
                    }}
                    
                    
                  >
                    <Marker position={{lat:latitude ,lng:longitude}} icon={"https://www.cp-desk.com/wp-content/uploads/2019/02/map-marker-free-download-png.png"}  />
                  </GoogleMap>
                  <GpsFixedIcon  className="markerPosition" onClick={()=>{
                    setMarkerClicked(!markerClicked)
                    getLocation()
                  }} style={{
                    position:"absolute",
                    top:"23.5rem",
                    left:"32.2rem",
                    color:`${markerClicked?"gold":"red"}`
                  

                  }} 
                  />
                  <button className="close-btn" onClick={() => hideModal()}>
                    Close
                  </button>
                </div>
              </div>
            )}
          </form>
        </div>
      </div>
    </div>
  );
  
};

export default Settings;
