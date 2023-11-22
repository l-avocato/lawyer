import React, { useState ,useRef, useEffect} from "react";
import axios from "axios";
import NavbarDashboard from "../NavbarDashboard/NavbarDashboard";
import { db } from "../../firebaseconfig";
import { updateDoc, doc } from "firebase/firestore";
import { GoogleMap, Marker } from "@react-google-maps/api";
import "./Style.css";
import SidebarDash from "../SidebarDash/SidebarDash";
import { getAuth } from "firebase/auth";

const Settings = () => {
  const [papers, setPapers] = useState("");
  const [fullName, setFullName] = useState("");
  const [adress, setAdress] = useState("");
  const [latitude, setLatitude] = useState("");
  const [longitude, setLongitude] = useState("");
  const [isMenuOpen, setMenuOpen] = useState(false);
  const [user,setUser] =  useState({});
  const position = { lat: parseFloat(latitude) || 51.505, lng: parseFloat(longitude) || -0.09 };
  const menuRef = useRef(null);

 const auth = getAuth();
 const handleGetUser = async (user) =>{
  await axios.get(`http://localhost:1128/api/lawyer/getLawyerByEmail/${user}`)
  .then((res)=>{
    setUser(res.data);
  })
  .catch((err)=>{
    console.log(err)
  })
}


  const [isModalVisible, setIsModalVisible] = useState(false);
  const showModal = () => setIsModalVisible(true);
  const hideModal = () => setIsModalVisible(false);

  
  const handleFile = async (e) => {
    const formData = new FormData();
    formData.append("file", e.target.files[0]);
    formData.append("upload_preset", "oztadvnr");
    try {
      const response = await axios.post("https://api.cloudinary.com/v1_1/dl4qexes8/upload", formData);
      setPapers(response.data.secure_url);
    } catch (error) {
      console.error(error);
    }
  };

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

  useEffect(()=>{
    handleGetUser(auth.currentUser.email)
    setPapers(user.ImageUrl)
  },[])
  

  return ( 
    <div style={{display:'flex'}}>
      <SidebarDash/>
      <div style={{ display:'flex',flexDirection:'column',width:'100%' }}>
      <NavbarDashboard />
        <div style={{display:'flex',justifyContent:'center',alignItems:'center',width:'100%',height:'100%'}}>
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
          <div style={{display:'flex', flexDirection:'column', justifyContent:'center', alignItems:'center', gap:'1rem'}}>
          <button
            type="button"
            style={{
              backgroundColor: "gold",
              color: "black",
              fontSize: "1.3rem",
              border: "none",
              borderRadius: "8px",
              cursor: "pointer",
             width:'550px',
             height: "40px"


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
              width:'550px',
              height: "40px"

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
            <div className="modal-map">
              <div className="modal-content">
                <GoogleMap
                  center={position}
                  zoom={13}
                  mapContainerStyle={{ height: "600px", width: "100%" }}
                >
                  <Marker position={position} />
                </GoogleMap>
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
