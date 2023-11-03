import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Signup.css';
import { app } from '../../firebaseconfig';
import { createUserWithEmailAndPassword, getAuth } from "firebase/auth";
import axios from "axios";
function Signup() {
    const navigate = useNavigate()

    const auth = getAuth();
    const [fullName, setFullName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [gender, setGender] = useState("");
    const [papers, setPapers] = useState("https://www.shareicon.net/data/512x512/2016/02/26/724973_plus_512x512.png");
    const [phoneNumber, setPhoneNumber] = useState("");

    const handleSiginUp = () => {
        createUserWithEmailAndPassword(auth, email, password)
            .then((res) => {
                console.log(res);
            })
            .catch((err) => {
                console.log(err);
            });
            navigate('/Signin')
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
                <div className='flex'>
                    <img src={papers} alt="" className='imageUrl'

                    />
                    <input
                        type="file"
                        className='inputImage'
                        onChange={(e) => {
                            handleFile(e);
                        }}
                    />
                </div>

                <form className='form-2'>
                    <input type="text" placeholder="Full Name" className='input1' />
                    <input type="email" placeholder="Email"
                        className='input1'
                        onChange={(e) => {
                            setEmail(e.target.value);
                        }} />
                    <input type="password" placeholder="Password"
                        className='input1'
                        onChange={(e) => {
                            setPassword(e.target.value);
                        }} />
                  

                    <input
                        className='input1'
                        type="number"
                        placeholder="phone Number"
                        onChange={(e) => {
                            setPhoneNumber(e.target.value);
                        }}
                    />
                      <select className="form-select form-select-lg mb-3 selectGender" aria-label="Large select example">
                        <option selected>Gender</option>
                        <option value="1">Male</option>
                        <option value="2">Female</option>
                    </select>
                    <button type="submit" onClick={handleSiginUp} >Sign Up</button>
                </form>
            </div>
        </div>
    );

}

export default Signup;
