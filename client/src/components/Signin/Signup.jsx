import React,{useState} from 'react';
import './Signup.css';
import { app } from '../../firebaseconfig';
import { createUserWithEmailAndPassword, getAuth } from "firebase/auth";
import axios from "axios";
function Signup() {
    const auth = getAuth();
    const [fullName, setFullName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [gender, setGender] = useState("");
    const [papers, setPapers] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("");
  
    const handleSiginUp = () => {
      createUserWithEmailAndPassword(auth, email, password)
        .then((res) => {
          console.log(res);
        })
        .catch((err) => {
          console.log(err);
        });
    };
  
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
    
  return (
    <div className="signup-container">
      <div className="signup-content">
        <h1>Get started</h1>
        <form className='form-2'>
          <input type="text" placeholder="Full Name" />
          <input type="email" placeholder="Email" 
            onChange={(e) => {
                setEmail(e.target.value);
              }}/>
          <input type="password" placeholder="Password" 
                 onChange={(e) => {
                    setPassword(e.target.value);
                  }}/>
                   <select name="" id="">
        <option value="Male">Male</option>
        <option value="Female">Female</option>
      </select>
      <input
        type="file"
        onChange={(e) => {
          handleFile(e);
        }}
      />
      <p>{papers}</p>
      <input
        type="number"
        placeholder="phone Number"
        onChange={(e) => {
          setPhoneNumber(e.target.value);
        }}
      />
          <button type="submit" onClick={handleSiginUp}>Sign Up</button>
        </form>
      </div>
    </div>
  );
}

export default Signup;
