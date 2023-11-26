import React, { useState ,useRef, useEffect} from "react";
import axios from "axios";
import NavbarDashboard from "../NavbarDashboard/NavbarDashboard";
import { db } from "../../firebaseconfig";
import { updateDoc, doc } from "firebase/firestore";
import { GoogleMap, Marker } from "@react-google-maps/api";
import "./Style.css";
import SidebarDash from "../SidebarDash/SidebarDash";
import { FIREBASE_AUTH  } from "../../firebaseconfig";
import Swal from "sweetalert2";
import EditNoteIcon from '@mui/icons-material/EditNote';


const Settings = () => {



const [fullName, setFullName] = useState("");
const [adress, setAdress] = useState("");
const [phoneNumber, setPhoneNumber] = useState("");
const [latitude, setLatitude] = useState("");
const [longitude, setLongitude] = useState("");
const [isMenuOpen, setMenuOpen] = useState(false);
const [user,setUser] =  useState({});
const [papers, setPapers] = useState('https://cdn.icon-icons.com/icons2/564/PNG/512/Add_Image_icon-icons.com_54218.png') 
  const position = { lat: parseFloat(latitude) || 51.505, lng: parseFloat(longitude) || -0.09 };
  const menuRef = useRef(null);


  const email=FIREBASE_AUTH?.currentUser?.email
  
const handleGetUser = async () =>{
  console.log(email);

 if(email){await axios.get(`http://localhost:1128/api/lawyer/getLawyerByEmail/${email}`)
  .then((res)=>{
    console.log(res.data)
    setUser(res.data);
  })
  .catch((err)=>{
    console.log(err)
  })}
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

  const updateProfil = ()=>{
    const email=FIREBASE_AUTH.currentUser.email

    try {
      axios.put(`http://localhost:1128/api/lawyer/updateLawyer/${email}`, {
   fullName: fullName,
   ImageUrl: papers, 
   adress: adress, 
   phoneNumber: phoneNumber,
         longitude: parseFloat(longitude),
           latitude: parseFloat(latitude),


      })
    } catch (error) {
      console.log(error)
    }

  }

  // const lawyersCollectionRef = doc(db, "lawyers", "EIKiyaY44S1xWenxPxVh");

  // const updateLawyerData = async () => {
  //   try {
  //     await updateDoc(lawyersCollectionRef, {
  //       fullName: fullName,
  //       adress: adress,
  //       imageUrl: papers,
  //       latitude: parseFloat(latitude),
  //       longitude: parseFloat(longitude),
  //     });
  //     hideModal();
  //   } catch (error) {
  //     console.error("Error updating lawyer", error);
  //   }
  // };

  useEffect(()=>{
    handleGetUser()
    setPapers(user.ImageUrl)
    setFullName(user.fullName)
    setAdress(user.adress)
    setPhoneNumber(user.phoneNumber)
  },[])
  

  return ( 
    <div style={{display:'flex'}}>
      <SidebarDash/>
      <div style={{ display:'flex',flexDirection:'column',width:'100%' }}>
      <NavbarDashboard />
        <div style={{display:'flex',justifyContent:'center',alignItems:'center',width:'100%',height:'100%' }}>
        <form
          style={{
            // width: "50%",
            display: "flex",
            flexDirection: "row",
            padding: "2rem",
            gap: "16rem",
            borderRadius: "8px",
            backgroundColor:'#f8f8f8',
            width:'90%',
            alignItems: "center",
            justifyContent: "center",
          }}
        >
              <div style={{display:'flex',flexDirection:'column'}} >
            <img
              src={papers || 'https://cdn.icon-icons.com/icons2/564/PNG/512/Add_Image_icon-icons.com_54218.png'}
              alt=""
              className="imageUrl"
              style={{ width: "22rem", height: "22rem", borderRadius: "8% 0  8% 0",}}
            />
            <EditNoteIcon style={{height:'3rem',width:'3rem',marginLeft:'45%',color:'goldenrod'}} />
            <input
              type="file"
              className="inputImage"
              onChange={(e) => {
                handleFile(e);
              }}
              
            />
          
          </div>
        <div style={{display:'flex', flexDirection:'', gap:'5rem'}}>
          
          <div style={{marginTop:'2rem'}}>
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
          <div className="form-outline mb-2">
            <input
              type="text"
              placeholder="Full name"
              id="form6Example3"
              className="form-control"
              style={{ fontSize: "20px" }}
              onChange={(e) => {
                setFullName(e.target.value);
              }}
              value={fullName}
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
              value={adress}
            />
            <label className="form-label" htmlFor="form6Example3"></label>
          </div> 
        
          <div className="form-outline mb-2">
            <input
              type="number"
              placeholder="Phone number"
              id="form6Example3"
              className="form-control"
              style={{ fontSize: "18px" }}
              onChange={(e) => {
                setPhoneNumber(e.target.value);
              }}
              value={phoneNumber}
            />
            <label className="form-label" htmlFor="form6Example3"></label>
          </div>
         
          <div style={{display:'flex', flexDirection:'column', justifyContent:'center', alignItems:'center', gap:'1rem'}}>
          <button
            type="button"
           
            id="btnUpdate"

            onClick={()=>{updateProfil()
              Swal.fire({
                position: "top-end",
                icon: "success",
                title: "Your Update has been saved",
                showConfirmButton: false,
                timer: 1500
              });
            }}
            
          >
            Update 
          </button>
          <button
            type="button"
            id="btnUpdate"
       
            onClick={() => {
              showModal();
              getLocation();
            }}
          >
            Update Localisation
          </button>
</div>     
          </div>
        </div>
      

       
          
          {isModalVisible && (
            <div className="modal-map2">
              <div className="modal-content1">
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
