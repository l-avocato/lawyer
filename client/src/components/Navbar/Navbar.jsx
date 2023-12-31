import React, { useState, useEffect } from "react";
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
import EmailIcon from "@mui/icons-material/Email";
import VpnKeyIcon from "@mui/icons-material/VpnKey";
import PersonIcon from "@mui/icons-material/Person";
import LocalPhoneIcon from "@mui/icons-material/LocalPhone";
import Swal from "sweetalert2";

function Navbar() {
  const navigate = useNavigate();
  const [show, setShow] = useState(false);
  const [categoryData, setCategoryData] = useState([]);
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
  const [speciality, setSpeciality] = useState(0);
  const lawyerCollectionRef = collection(db, "lawyers");
  const fetchCategory = async () => {
    try {
      const response = await axios.get(
        "http://localhost:1128/api/category/allCategories"
      );
      setCategoryData(response.data);
    } catch (error) {
      throw new Error(error);
    }
  };

  const handleSignIn = (event) => {
    event.preventDefault();
    signInWithEmailAndPassword(auth, email, password)
      .then((res) => {
        console.log(res);
        if (res.user) {
          localStorage.setItem("userToken", res.user.accessToken);
        }
        navigate("/allClient");
        Swal.fire({
          position: "center",
          // icon: "success",
          title: `welcome`,
          showConfirmButton: false,
          timer: 1500,
          imageUrl:
            "https://media.tenor.com/dJAu3uWJNZQAAAAC/kais-said-kais-saied.gif",
        });
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
          categoryId: speciality,
        };

        dispatch(signupLawyer(formData))
          .then((res) => {})
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
    fetchCategory();
  }, []);

  return (
    <div className="topSection">
      <div className="rightSection">
        <div className="navBarLinks">
          <ul className="ul">
            <li id="navbar_link">Home</li>
            <li id="navbar_link" onClick={(e)=>{
              e.preventDefault();
              window.scrollTo(100000,100000)
            }} >About us</li>
            <li id="navbar_link">
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
            <li id="navbar_link">
              Contact
              <i className="fa fa-angle-down"></i>
            </li>
          </ul>
          <ul className="ul">
            <li id="navbar_link" onClick={handleShow}>
              Login
            </li>
            <Modal
              show={show}
              onHide={handleClose}
              size="large"
              style={{
                display: "flex",
                width: "100rem",
                height: "40rem",
                padding: "2rem",
              }}
            >
              <Modal.Header
                closeButton
                style={{
                  background:
                    "linear-gradient(to right, #b38728, #fbf5b7, #aa771c)",
                }}
              >
                <Modal.Title
                  style={{
                    fontSize: "30px",
                    fontWeight: "bold",
                    color: "white",
                    alignItems: "center",
                  }}
                >
                  Sign In
                </Modal.Title>
              </Modal.Header>

              <Modal.Body
                style={{ display: "flex", width: "500px", height: "350px" }}
              >
                <div style={{ display: "flex", gap: "2rem" }}>
                  <img
                    src="https://i.pinimg.com/564x/03/b0/eb/03b0eb5b973e4a65d3a63fc0fe3cf7e1.jpg"
                    alt="Lawyer"
                    style={{
                      width: "50%",
                    }}
                  />
                  <Form
                    onSubmit={handleSignIn}
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      gap: "2rem",
                    }}
                  >
                    <Form.Group controlId="formBasicEmail">
                      <Form.Label>Email address</Form.Label>
                      <div
                        style={{
                          display: "flex",
                          flexDirection: "row",
                          gap: "1rem",
                          justifyContent: "center",
                          alignItems: "center",
                        }}
                      >
                        <EmailIcon
                          style={{
                            width: "20px",
                            height: "20px",
                            color: "goldenrod",
                          }}
                        />
                        <Form.Control
                          type="email"
                          placeholder="Enter email"
                          style={{ fontSize: "16px" }}
                          onChange={(e) => {
                            setEmail(e.target.value);
                          }}
                        />
                      </div>
                    </Form.Group>

                    <Form.Group controlId="formBasicPassword">
                      <Form.Label style={{}}>Password</Form.Label>
                      <div
                        style={{
                          display: "flex",
                          flexDirection: "row",
                          gap: "1rem",
                          justifyContent: "center",
                          alignItems: "center",
                        }}
                      >
                        <VpnKeyIcon
                          style={{
                            width: "20px",
                            height: "20px",
                            color: "goldenrod",
                          }}
                        />
                        <Form.Control
                          type="password"
                          placeholder="Password"
                          style={{}}
                          onChange={(e) => {
                            setPassword(e.target.value);
                          }}
                        />
                      </div>
                    </Form.Group>
                    <Form.Group controlId="formBasicCheckbox">
                      <Form.Check type="checkbox" label="Remember me" />
                    </Form.Group>
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        width: "100%",
                      }}
                    >
                      <Button
                        variant="primary"
                        type="submit"
                        style={{
                          fontSize: "1.2rem",
                          background:
                            "linear-gradient(to right, #b38728, #fbf5b7, #aa771c)",
                          border: "none",
                          color: "black",
                        }}
                      >
                        Submit
                      </Button>
                    </div>
                  </Form>
                </div>
              </Modal.Body>
            </Modal>

            <li id="navbar_link" onClick={handleShowSignup}>
              Register
            </li>

            <Modal
              show={showSignup}
              onHide={handleCloseSignup}
              size="lg"
              style={{}}
            >
              <Modal.Header
                closeButton
                style={{
                  background:
                    "linear-gradient(to right, #b38728, #fbf5b7, #aa771c)",
                }}
              >
                <Modal.Title
                  style={{
                    fontSize: "30px",
                    fontWeight: "bold",
                    color: "white",
                    alignItems: "center",
                  }}
                >
                  Sign Up
                </Modal.Title>
              </Modal.Header>
              <Modal.Body style={{ borderRadius: "2rem" }}>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    gap: "1rem",
                  }}
                >
                  <img
                    src="https://i.pinimg.com/564x/f1/8f/5c/f18f5c7c3a6d1208330de82a7f5489e7.jpg"
                    alt="Lawyer"
                    style={{
                      height: "500px",
                      width: "300px",
                      padding: "1rem",
                      borderRadius: "4rem",
                      boxShadow: "0px 3px 8px rgba(0, 0, 0, 0.24)",
                    }}
                  />

                  <Form
                    onSubmit={(event) => {
                      handleSignUp(event);
                    }}
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      width: "100%",
                    }}
                  >
                    <img
                      src={papers}
                      alt=""
                      style={{
                        width: "90px",
                        height: "90px",
                        borderRadius: "0 20% 0 20% ",
                        marginLeft: "10.5rem",
                        marginBottom :'1.5rem'
                      }}
                    />

                    <Form.Group
                      controlId="formImage"
                      style={{
                        position: "absolute",
                        marginTop: "4.5%",
                        opacity: "0",
                      }}
                    >
                      <Form.Control
                        type="file"
                        onChange={handleFile}
                        style={{ opacity: 1 }}
                      />
                      <div></div>
                    </Form.Group>
                      <div style={{display:'flex',flexDirection:'column',gap:'1rem'}} >
                      <div
                      style={{
                        display: "flex",
                        flexDirection: "row",
                        justifyContent: "space-around",
                      }}
                    >
                      <Form.Group
                        controlId="formFullName"
                        style={{
                          display: "flex",
                          flexDirection: "column",
                          alignItems: "flex-start",
                          justifyContent: "center",
                        }}
                      >
                        <div style={{display:'flex',gap:'0.3rem'}} >
                        <PersonIcon
                          style={{
                            width: "18px",
                            height: "18px",
                            color: "goldenrod",
                          }}
                        />
                          <Form.Label style={{ fontSize: "15px" }}>
                            Full Name
                          </Form.Label>
                        </div>
                        <div
                          style={{
                            display: "flex",
                            flexDirection: "row",
                            gap: "1rem",
                            justifyContent: "center",
                            alignItems: "center",
                          }}
                        >
                          <Form.Control
                            type="text"
                            placeholder="Enter full name"
                            style={{ fontSize: "14px" }}
                            onChange={(e) => setFullName(e.target.value)}
                          />
                        </div>
                      </Form.Group>

                      <Form.Group controlId="formEmail">
                      <div style={{display:'flex',gap:'0.3rem'}}>
                        <EmailIcon
                          style={{
                            width: "18px",
                            height: "18px",
                            color: "goldenrod",
                          }}
                        />
                        <Form.Label style={{ fontSize: "15px" }}>
                          Email
                        </Form.Label>
                      </div>
                        <div
                          style={{
                            display: "flex",
                            flexDirection: "row",
                            gap: "1rem",
                            justifyContent: "center",
                            alignItems: "center",
                          }}
                        >
                          <Form.Control
                            type="email"
                            placeholder="Enter email"
                            style={{ fontSize: "14px" }}
                            onChange={(e) => setEmail(e.target.value)}
                          />
                        </div>
                      </Form.Group>
                    </div>

                    <div
                      style={{
                        display: "flex",
                        flexDirection: "row",
                        justifyContent: "space-around",
                      }}
                    >
                      <Form.Group controlId="formPassword">
                        <div style={{display:'flex',gap:'0.3rem'}} >
                        <VpnKeyIcon
                          style={{
                            width: "18px",
                            height: "18px",
                            color: "goldenrod",
                          }}
                        />
                        <Form.Label style={{ fontSize: "15px" }}>
                          Password
                        </Form.Label>
                        </div>

                        <div
                          style={{
                            display: "flex",
                            flexDirection: "row",
                            gap: "1rem",
                            justifyContent: "center",
                            alignItems: "center",
                          }}
                        >

                          <Form.Control
                            type="password"
                            placeholder="Enter password"
                            style={{ fontSize: "14px" }}
                            onChange={(e) => setPassword(e.target.value)}
                          />
                        </div>
                      </Form.Group>

                      <Form.Group controlId="formConfirmPassword">
                       <div style={{display:'flex',gap:'0.3rem'}} >
                       <VpnKeyIcon
                          style={{
                            width: "18px",
                            height: "18px",
                            color: "goldenrod",
                          }}
                        />
                        <Form.Label style={{ fontSize: "15px" }}>
                          {" "}
                          Confirm Password
                        </Form.Label>
                       </div>

                        <div
                          style={{
                            display: "flex",
                            flexDirection: "row",
                            gap: "1rem",
                            justifyContent: "center",
                            alignItems: "center",
                          }}
                        >

                          <Form.Control
                            type="password"
                            placeholder="Confirm password"
                            style={{ fontSize: "14px" }}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                          />
                        </div>
                      </Form.Group>
                    </div>

                    <div
                      style={{
                        display: "flex",
                        flexDirection: "row",
                        justifyContent: "space-around",
                      }}
                    >
                      <Form.Group controlId="formPhoneNumber">
                        <div style={{display:'flex',gap:'0.3rem'}} >
                        <LocalPhoneIcon
                          style={{
                            width: "18px",
                            height: "18px",
                            color: "goldenrod",
                          }}
                        />
                        <Form.Label style={{ fontSize: "15px" }}>
                          Phone Number
                        </Form.Label>
                        </div>
                        <div
                          style={{
                            display: "flex",
                            flexDirection: "row",
                            gap: "1rem",
                            justifyContent: "center",
                            alignItems: "center",
                          }}
                        >
                          <Form.Control
                            type="number"
                            placeholder="Enter phone number"
                            style={{ fontSize: "14px" }}
                            onChange={(e) => setPhoneNumber(e.target.value)}
                          />
                        </div>
                      </Form.Group>
                    </div>
                      </div>

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
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "center",
                        padding: "0.5rem",
                      }}
                    >
                      <Button
                        variant="primary"
                        type="submit"
                        style={{
                          fontSize: "1.6rem",
                          background:
                            "linear-gradient(to right, #b38728, #fbf5b7, #aa771c)",
                          border: "none",
                        }}
                        onClick={() => {
                          Swal.fire({
                            position: "center",
                            // icon: "success",
                            title: `Thank you ${fullName} your account has been created`,
                            showConfirmButton: false,
                            timer: 1500,
                            imageUrl: `${papers}`,
                          });
                          handleCloseSignup();
                        }}
                      >
                        Submit
                      </Button>
                    </div>
                  </Form>
                </div>
              </Modal.Body>
            </Modal>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Navbar;
