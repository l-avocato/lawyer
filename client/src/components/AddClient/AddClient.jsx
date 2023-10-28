import React, { useState } from "react";
import "./AddClient.css";
import axios from "axios";

const AddClient = () => {
  const [papers, setPapers] = useState("");

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
              />
              <label for="floatingInput">Full Name</label>
            </div>
            <div class="form-floating">
              <select class="form-select" id="floatingSelectGrid">
                <option value="1">Male</option>
                <option value="2">Female</option>
              </select>
              <label for="floatingSelectGrid">select a gender</label>
            </div>
            <div class="form-floating">
              <input
                type="email"
                class="form-control"
                id="floatingPassword"
                placeholder="Email"
              />
              <label for="floatingPassword">Adress Email</label>
            </div>
            <div class="form-floating">
              <input
                type="text"
                class="form-control"
                id="floatingPassword"
                placeholder="Phone Number"
              />
              <label for="floatingPassword">Phone Number</label>
            </div>
            <div class="form-floating">
              <input
                type="number"
                class="form-control"
                id="floatingPassword"
                placeholder="Cin"
              />
              <label for="floatingPassword">Cin</label>
            </div>

            <div class="modal-footer">
              <button
                class="btn btn-outline-secondary"
                type="button"
                id="inputGroupFileAddon04"
                data-bs-dismiss="modal"
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
