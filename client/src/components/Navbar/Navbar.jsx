import React, { useState } from "react";
import "../../components/Navbar/styles.css";
import "./styles.css";
import { useNavigate } from "react-router-dom";
import { Modal, Button, Form } from 'react-bootstrap';
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { db } from "../../firebaseconfig";
import { addDoc, collection } from "firebase/firestore";

function Navbar() {
  const navigate = useNavigate();
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  

  const [showSignup, setShowSignup] = useState(false);

  const handleCloseSignup = () => setShowSignup(false);
  const handleShowSignup = () => setShowSignup(true);


  const auth = getAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSignIn = () => {
    signInWithEmailAndPassword(auth, email, password)
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);

      });
      navigate('/Allclient')
  };

  return (
    <div id="navBar">
      <div className="topSection">

        <div className="rightSection">
          <div className="navBarLinks">
            <ul className="ul">
              <li>Home</li>
              <li>About us</li>
              <li>
                Services
                <i className="fa fa-angle-down"></i>
              </li>
              <li>
                Contact
                <i className="fa fa-angle-down"></i>
              </li>
              <li onClick={handleShow}>Login</li>
              <Modal show={show} onHide={handleClose} size="xl" style={{alignSelf:'center',left:200,top:50}} >
                <Modal.Header closeButton>
                 <Modal.Title style={{marginLeft:290}}>Login</Modal.Title>
                </Modal.Header>
                  <Modal.Body>
                   <div style={{display: 'flex'}}>
                     <img src="https://i.pinimg.com/564x/03/b0/eb/03b0eb5b973e4a65d3a63fc0fe3cf7e1.jpg" alt="Lawyer" style={{width: '70%',height:500,marginRight:50,marginLeft:-16,marginTop:-16,marginBottom:-16}} /> 
                       <Form onSubmit={handleSignIn} style={{width: '100%',marginTop:40}}>
                        <Form.Group controlId="formBasicEmail">
                         <Form.Label>Email address</Form.Label>
                           <Form.Control type="email" placeholder="Enter email" style={{fontSize: '1.5rem'}}  onChange={(e) => {
                             setEmail(e.target.value);
                           }} />
                       </Form.Group>

                      <Form.Group controlId="formBasicPassword">
                        <Form.Label>Password</Form.Label>
                         <Form.Control type="password" placeholder="Password" style={{fontSize: '1.5rem'}} 
                          onChange={(e) => {
                            setPassword(e.target.value);
                          }} />
                      </Form.Group>
                      <Form.Group controlId="formBasicCheckbox">
                      <Form.Check type="checkbox" label="Remember me" style={{marginTop:10}}/>
                      </Form.Group>
                      <Button variant="primary" type="submit" style={{fontSize: '1.5rem',marginTop:100}}>
                       Submit
                      </Button>
                      </Form>
                      </div>
                      </Modal.Body>
                      </Modal>
                      <li onClick={handleShowSignup}>Sign Up</li>

                      <Modal show={showSignup} onHide={handleCloseSignup}  size="xl" style={{alignSelf:'center',left:200,top:10}}>
  <Modal.Dialog className="custom-modal-dialog" style={{marginTop:-20,border:"none"}}>
    <Modal.Header closeButton >
      <Modal.Title style={{marginLeft:290}}>Sign Up</Modal.Title>
    </Modal.Header>
    <Modal.Body>
      <div style={{display: 'flex'}}>
        <img src="https://i.pinimg.com/564x/f1/8f/5c/f18f5c7c3a6d1208330de82a7f5489e7.jpg" alt="Lawyer" style={{width: '51%',height:650,marginRight:50,marginLeft:-16,marginTop:-16,marginBottom:-16}} /> 
        <Form  style={{width: '100%', marginTop:40}}>
          <Form.Group controlId="formFullName">
            <Form.Label>Full Name</Form.Label>
            <Form.Control type="text" placeholder="Enter full name" style={{fontSize: '1.5rem'}} />
          </Form.Group>

          <Form.Group controlId="formEmail">
            <Form.Label>Email</Form.Label>
            <Form.Control type="email" placeholder="Enter email" style={{fontSize: '1.5rem'}} />
          </Form.Group>

          <Form.Group controlId="formPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control type="password" placeholder="Enter password" style={{fontSize: '1.5rem'}} />
          </Form.Group>

          <Form.Group controlId="formConfirmPassword">
            <Form.Label>Confirm Password</Form.Label>
            <Form.Control type="password" placeholder="Confirm password" style={{fontSize: '1.5rem'}} />
          </Form.Group>

           <Form.Group controlId="formPhoneNumber">
            <Form.Label>Phone Number</Form.Label>
            <Form.Control type="tel" placeholder="Enter phone number" style={{fontSize: '1.5rem'}} />
          </Form.Group> 

           <Form.Group controlId="formGender">
            <Form.Label>Gender</Form.Label>
            <Form.Select style={{fontSize: '1.5rem'}}>
              <option>Select gender</option>
              <option>Male</option>
              <option>Female</option>
              <option>Other</option>
            </Form.Select>
          </Form.Group> 

          <Button variant="primary" type="submit" style={{fontSize: '1.5rem', marginTop:40}}>
            Submit
          </Button>
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
