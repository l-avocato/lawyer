import React, {  useState } from "react";
import "./AddClient.css";
import axios from "axios";
import {db} from "../../firebaseconfig.js"

import {addDoc, collection} from "firebase/firestore";

const AddClient = ({refrech, setRefrech}) => {
  const [papers, setPapers] = useState("");
  const [fullName, setfullName] = useState("");
  const [email, setEmail] = useState("");
  const [cin, setCin]=useState(0);
  const [PhoneNumber, setPhoneNumber]=useState(0)
  const [gender,setGender]=useState("male")
  const userCollectionRef = collection(db, "user")

 

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

  

  const creacteUser = async () => {
    try {
      await addDoc(userCollectionRef, {
        fullName: fullName,
        email: email,
        cin: cin,
        PhoneNumber: PhoneNumber,
        imageUrl : papers,
        gender:gender
      }
      );
      setRefrech(!refrech)
    } catch (error) {
      console.error("Error creating user:", error);
    }
  };
  return (
    <div>
      <div
        class="modal fade"
        id="staticBackdrop"
        data-bs-backdrop="static"
        data-bs-keyboard="false"
        tabindex="-1"
        aria-labelledby="staticBackdropLabel"
        aria-hidden="true"
      >
        <div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-header">
              <h1 class="modal-title fs-5" id="staticBackdropLabel">
                Create a new clients
              </h1>
            </div>
            <img src={papers} alt="" style={{borderRadius:"50%", width:"130px", height:"130px", marginLeft:"300px", marginTop:"1rem"}} />


            <div class="form-floating">
              <label for="formFile" class="form-label"></label>
              <input
                class="form-control"
                type="file"
                id="formFile"
                onChange={(e) => {
                  handleFile(e);
                }}
              />
            </div>

            <div class="form-floating ">
              <input
                type="text"
                class="form-control"
                id="floatingInput"
                placeholder="Full Name"
                onChange={((e)=>{setfullName(e.target.value)})}
              />
              <label for="floatingInput">Full Name</label>
            </div>
            <div class="form-floating">
              <select class="form-select" id="floatingSelectGrid" onChange={((e)=>{ setGender(e.target.value)})} >
                <option value="Male" >Male</option>
                <option value="Female">Female</option>
              </select>
              <label for="floatingSelectGrid">select a gender</label>
            </div>
            <div class="form-floating">
              <input
                type="email"
                class="form-control"
                id="floatingPassword"
                placeholder="Email"
                onChange={((e)=>{setEmail(e.target.value)})}
              />
              <label for="floatingPassword">Adress Email</label>
            </div>
            <div class="form-floating">
              <input
                type="text"
                class="form-control"
                id="floatingPassword"
                placeholder="Phone Number"
                onChange={((e)=>{setPhoneNumber(e.target.value)})}
              />
              <label for="floatingPassword">Phone Number</label>
            </div>
            <div class="form-floating">
              <input
                type="number"
                class="form-control"
                id="floatingPassword"
                placeholder="Cin"
                onChange={((e)=>{setCin(e.target.value)})}
              />
              <label for="floatingPassword">Cin</label>
            </div>

            <div class="modal-footer">
              <button
                class="btn btn-outline-secondary"
                type="button"
                id="inputGroupFileAddon04"
                data-bs-dismiss="modal"
                onClick={creacteUser}
              >
                Add New Client
              </button>
              <button
                type="button"
                class="btn btn-outline-secondary"
                data-bs-dismiss="modal"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddClient;
