import React, { useState } from "react";
import "./AddClient.css";
import axios from "axios";

const AddClient = ({ lawyer, refrech, setRefrech }) => {
  const [papers, setPapers] = useState("");
  const [fullName, setfullName] = useState("");
  const [email, setEmail] = useState("");
  const [cin, setCin] = useState(0);
  const [PhoneNumber, setPhoneNumber] = useState(0);
  const [gender, setGender] = useState("male");
  const [address, setAddress] = useState("");
  const [birthDate, setBirthDate] = useState("");
  const [userId, setUserId] = useState(0);

  const handleFile = async (e) => {
    const formData = new FormData();
    formData.append("file", e.target.files[0]);
    formData.append("upload_preset", "oztadvnr");
    await axios
      .post("https://api.cloudinary.com/v1_1/dl4qexes8/upload", formData)
      .then((response) => {
        console.log(response.data.url);
        setPapers(response.data.url);
      })
      .catch((error) => {
        throw error;
      });
  };

  const creacteUser = async () => {
    try {
      const response = await axios.post(
        "http://localhost:1128/api/user/addUser",
        {
          fullName: fullName,
          email: email,
          CIN: cin,
          phoneNumber: PhoneNumber,
          ImageUrl: papers,
          gender: gender,
          adress: address,
          birthDate: birthDate,
        }
      );
      const userId = response.data.id;
      addUserAndLawyerId(userId);
      setRefrech(!refrech);
    } catch (error) {
      console.error("Error creating user:", error);
    }
  };

  const addUserAndLawyerId = async (userId) => {
    const lawyerId = lawyer.id;
    try {
      const response = await axios.post(
        "http://localhost:1128/api/user_lawyer/addUser_Lawyer",
        {
          userId: userId,
          lawyerId: lawyerId,
        }
      );
      console.log(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
   





<div>
<div
  className="modal fade"
  id="staticBackdrop"
  data-bs-backdrop="static"
  data-bs-keyboard="false"
  tabindex="-1"
  aria-labelledby="staticBackdropLabel"
  aria-hidden="true"
>
<div className="modal-dialog">
          <div className="modal-content" >
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="staticBackdropLabel">
                Create a new clients
              </h1>
            </div>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                gap: "1rem",
                width: "100%",
                marginBottom: "1rem",
                marginTop: "1rem",
              }}
            >
              <img
                src={papers}
                alt=""
                style={{ borderRadius: "50%", width: "130px", height: "130px" }}
              />

              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  width: "100%",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    gap: "3rem",
                    width: "100%",
                  }}
                >
                  <div className="form-floating">
                    <label for="formFile" className="form-label"></label>
                    <input
                      className="form-control"
                      type="file"
                      id="formFile"
                      onChange={(e) => {
                        handleFile(e);
                      }}
                    />
                  </div>
                  <div className="form-floating ">
                    <input
                      type="date"
                      className="form-control"
                      id="floatingInput"
                      placeholder="Full Name"
                      onChange={(e) => {
                        setBirthDate(e.target.value);
                      }}
                    />
                    <label for="floatingInput">Birth Date</label>
                  </div>
                </div>
              </div>

              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  gap: "3rem",
                  width: "100%",
                }}
              >
                <div className="form-floating ">
                  <input
                    type="text"
                    className="form-control"
                    id="floatingInput"
                    placeholder="Full Name"
                    onChange={(e) => {
                      setfullName(e.target.value);
                    }}
                  />
                  <label for="floatingInput">Full Name</label>
                </div>
                <div className="form-floating">
                  <select
                    className="form-select"
                    id="floatingSelectGrid"
                    onChange={(e) => {
                      setGender(e.target.value);
                    }}
                  >
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                  </select>
                  <label for="floatingSelectGrid">select a gender</label>
                </div>
              </div>
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  gap: "3rem",
                  width: "100%",
                }}
              >
                <div className="form-floating">
                  <input
                    type="email"
                    className="form-control"
                    id="floatingPassword"
                    placeholder="Email"
                    onChange={(e) => {
                      setEmail(e.target.value);
                    }}
                  />
                  <label for="floatingPassword">Adress Email</label>
                </div>
                <div className="form-floating">
                  <input
                    type="text"
                    className="form-control"
                    id="floatingPassword"
                    placeholder="Phone Number"
                    onChange={(e) => {
                      setPhoneNumber(e.target.value);
                    }}
                  />
                  <label for="floatingPassword">Phone Number</label>
                </div>
              </div>
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  gap: "3rem",
                  width: "100%",
                }}
              >
                <div className="form-floating">
                  <input
                    type="number"
                    className="form-control"
                    id="floatingPassword"
                    placeholder="Cin"
                    onChange={(e) => {
                      setCin(e.target.value);
                    }}
                  />
                  <label for="floatingPassword">Cin</label>
                </div>
                <div className="form-floating">
                  <input
                    type="string"
                    className="form-control"
                    id="floatingPassword"
                    placeholder="Cin"
                    onChange={(e) => {
                      setAddress(e.target.value);
                    }}
                  />
                  <label for="floatingPassword">Address</label>
                </div>
              </div>
            </div>
            <div className="modal-footer">
              <button
                className="btn btn-outline-secondary"
                type="button"
                id="inputGroupFileAddon04"
                data-bs-dismiss="modal"
                onClick={creacteUser}
              >
                Add New Client
              </button>
              <button
                type="button"
                className="btn btn-outline-secondary"
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
