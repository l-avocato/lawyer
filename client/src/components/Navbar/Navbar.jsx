import React, { useState,useEffect } from "react";
import "../../components/Navbar/styles.css";
import "./styles.css";
import { useNavigate } from "react-router-dom";
import { Modal, Button, Form } from "react-bootstrap";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { db } from "../../firebaseconfig";
import { addDoc, collection } from "firebase/firestore";
import axios from "axios";
import { Link } from "react-scroll";
import { useDispatch } from "react-redux";
import { signupLawyer } from "../../store/signUpLawyer";
import e from "cors";

function Navbar() {
  const navigate = useNavigate();
  const [show, setShow] = useState(false);
  const[categoryData,setCategoryData] = useState([])
  const dispatch = useDispatch();

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [showSignup, setShowSignup] = useState(false);

  const handleCloseSignup = () => setShowSignup(false);
  const handleShowSignup = () => setShowSignup(true);

  const auth = getAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fullName, setFullName] = useState("");
  const [gender, setGender] = useState("");
  const [papers, setPapers] = useState(
    "https://www.shareicon.net/data/512x512/2016/02/26/724973_plus_512x512.png"
  );
  const [phoneNumber, setPhoneNumber] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [speciality, setSpeciality]= useState(0);
  const lawyerCollectionRef = collection(db, "lawyers");
console.log("============================>",categoryData);
const fetchCategory = async ()=>{
  try {
    const response = await axios.get("http://localhost:1128/api/category/allCategories")
 setCategoryData(response.data)
  } catch (error) {
    throw new Error(error)
  }
}

console.log("====>=====>======>======>=====>",speciality);
  const handleSignIn = (event) => {
    event.preventDefault();
    signInWithEmailAndPassword(auth, email, password)
      .then((res) => {
        console.log(res);
        if (res.user) {
          console.log("this is access token", res.user.accessToken);
          localStorage.setItem('userToken', res.user.accessToken);
        }
        navigate("/allClient");
      })
      .catch((error) => {
        console.error(error);
      });
  };


  const handleSignUp = (event) => {
    event.preventDefault();
    if (password !== confirmPassword) {
      alert("Passwords do not match");
      return;
    }


    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;

        const formData = {
          email: email,
          password: password,
          ImageUrl: papers,
          fullName: fullName,
          gender: gender,
          phoneNumber: phoneNumber,
          categoryId:speciality
        };

        dispatch(signupLawyer(formData))
          .then((res) => {
            navigate("/allClient");
          })
          .catch((error) => {
            alert(error.message, "sign up failed");
          });
      })
      .catch((error) => {
        // const errorCode = error.code;
        // const errorMessage = error.message;
        // alert(errorMessage, "sign up failed");
        console.log(error);
        // ..
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

useEffect(() => {
  fetchCategory()
},[])

  return (
    <div id="navBar">
      <div className="topSection">
        <div className="rightSection">
          <div className="navBarLinks">
            <ul className="ul">
              <li>Home</li>
              <li>About us</li>
              <li>
                <Link
                  activeClass="active"
                  to="services"
                  spy={true}
                  smooth={true}
                  offset={-70}
                  duration={200}
                >
                  Services
                </Link>
              </li>
              <li>
                Contact
                <i className="fa fa-angle-down"></i>
              </li>
              <li onClick={handleShow}>Login</li>
              <Modal
                show={show}
                onHide={handleClose}
                // size="xl"
                style={{ display:'flex', width: '60rem', height: '40rem'}}
              >
                <Modal.Header closeButton style={{display:'flex', justifyContent:'center', alignItems:'center'}}>
                  <Modal.Title style={{fontSize:'30px', fontWeight:'bold', color:'white' }}>Login</Modal.Title>
                </Modal.Header>
                <Modal.Body style={{display:'flex', width:'470px', height:'350px'}}>
                  <div style={{display:'flex', gap:'2rem' }}>
                    <img
                      src="https://i.pinimg.com/564x/03/b0/eb/03b0eb5b973e4a65d3a63fc0fe3cf7e1.jpg"
                      alt="Lawyer"
                      style={{
                        width: "50%",
                      
                      }}
                    />
                    <Form
                      onSubmit={handleSignIn}
                      style={{display:'flex', flexDirection:'column', gap:'2rem'}}
                    >
                      <Form.Group controlId="formBasicEmail">
                        <Form.Label style={{ fontWeight:'bold'}}>Email address</Form.Label>
                        <Form.Control
                          type="email"
                          placeholder="Enter email"
                          style={{ fontSize: "16px" }}
                          onChange={(e) => {
                            setEmail(e.target.value);
                          }}
                        />
                      </Form.Group>

                      <Form.Group controlId="formBasicPassword">
                        <Form.Label style={{ fontWeight:'bold'}}>Password</Form.Label>
                        <Form.Control
                          type="password"
                          placeholder="Password"
                          style={{ }}
                          onChange={(e) => {
                            setPassword(e.target.value);
                          }}
                        />
                      </Form.Group>
                      <Form.Group controlId="formBasicCheckbox">
                        <Form.Check
                          type="checkbox"
                          label="Remember me"
                        />
                      </Form.Group>
                     <div style={{display:'flex' , alignItems:'center', justifyContent:'center', width:'100%'}}>
                     <Button
                        variant="primary"
                        type="submit"
                        style={{ fontSize: "1.2rem" }}  >
                        Submit
                      </Button>
                     </div>
                    </Form>
                  </div>
                </Modal.Body>
              </Modal>

           <li onClick={handleShowSignup}>Sign Up</li>


              <Modal
                show={showSignup}
                onHide={handleCloseSignup}
                size='lg'
              >
                <Modal.Dialog
                  className="custom-modal-dialog"
                  style={{  border: "none" , width: "100%", height:'300px'}}
                >
                  <Modal.Header closeButton >
                    <Modal.Title style={{fontSize:'30px', fontWeight:'bold', color:'white' , alignItems:'center'}}>
                      Sign Up
                    </Modal.Title>
                  </Modal.Header>
                  <Modal.Body
                  
                  >
                    <div  style={{display:'flex', justifyContent:'center'}}>

                      <img
                        src="https://i.pinimg.com/564x/f1/8f/5c/f18f5c7c3a6d1208330de82a7f5489e7.jpg"
                        alt="Lawyer"
                        style={{
                        height: "650px",
                        width: "350px",
                        padding: "2rem" 
                         
                        }}
                      />
                     
                      <Form
                        onSubmit={(event) => {
                          handleSignUp(event);
                        }}
                        style={{display: "flex", flexDirection:'column', width: "100%"}}
                      >
                                            <img src={papers} alt="" style={{width:'80px', height:'80px', borderRadius:'50%', marginLeft:'9rem'}} />

                        <Form.Group controlId="formImage">
                          
                          <Form.Label>Profile Image</Form.Label>
                          <Form.Control type="file" onChange={handleFile} style={{opacity:1}} />
                          <div>

                          </div>
                        </Form.Group>
                        
                        <Form.Group controlId="formFullName">
                          <Form.Label>Full Name</Form.Label>
                          <Form.Control
                            type="text"
                            placeholder="Enter full name"
                            style={{ fontSize: "14px" }}
                            onChange={(e) => setFullName(e.target.value)}
                          />
                        </Form.Group>

                        <Form.Group controlId="formEmail">
                          <Form.Label>Email</Form.Label>
                          <Form.Control
                            type="email"
                            placeholder="Enter email"
                            style={{ fontSize: "14px" }}
                            onChange={(e) => setEmail(e.target.value)}
                          />
                        </Form.Group>

                        <Form.Group controlId="formPassword">
                          <Form.Label>Password</Form.Label>
                          <Form.Control
                            type="password"
                            
                            placeholder="Enter password"
                            style={{ fontSize: "14px" }}
                            onChange={(e) => setPassword(e.target.value)}
                          />
                        </Form.Group>

                        <Form.Group controlId="formConfirmPassword">
                          <Form.Label>Confirm Password</Form.Label>
                          <Form.Control
                            type="password"
                            placeholder="Confirm password"
                            style={{ fontSize: "14px" }}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                          />
                        </Form.Group>

                        <Form.Group controlId="formPhoneNumber">
                          <Form.Label>Phone Number</Form.Label>
                          <Form.Control
                            type="tel"
                            placeholder="Enter phone number"
                            style={{ fontSize: "14px" }}
                            onChange={(e) => setPhoneNumber(e.target.value)}
                          />
                        </Form.Group>

                        <Form.Group controlId="formGender">
                          <Form.Label>Gender</Form.Label>
                          <Form.Select
                            style={{ fontSize: "14px" }}
                            onChange={(e) => setGender(e.target.value)}
                          >
                            <option>Select gender</option>
                            <option>Male</option>
                            <option>Female</option>
                            <option>Other</option>
                          </Form.Select>
                        </Form.Group>
                        <Form.Group controlId="formGender">
                          <Form.Label>Speciality</Form.Label>
                          <Form.Select
  style={{ fontSize: "14px" }}
  onChange={(e) => setSpeciality(e.target.value)}
>
  <option>Select Speciality</option>
  {categoryData.map((e) => (
    <option key={e.id} value={e.id}>
      {e.name}
    </option>
  ))}
</Form.Select>
                        </Form.Group>
                         <div style={{display:'flex', justifyContent:'center', padding:'1rem'}}>
                          
                        <Button
                          variant="primary"
                          type="submit"
                          style={{ fontSize: "1.3rem", backgroundColor:'goldenrod' }}
                        >
                          Submit
                        </Button>
                         </div>
                      </Form>
                    </div>
                  </Modal.Body>
                </Modal.Dialog>
              </Modal>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Navbar;
