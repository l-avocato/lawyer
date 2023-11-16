import "./dashboardStyle.css";
import React, { useEffect, useState } from "react";
import SidebarDash from "../SidebarDash/SidebarDash";
import NavbarDashboard from "../NavbarDashboard/NavbarDashboard";

import axios from "axios";
import FolderIcon from "@mui/icons-material/Folder";
import InsertDriveFileIcon from "@mui/icons-material/InsertDriveFile";
import ControlPointIcon from "@mui/icons-material/ControlPoint";
import AttachFileIcon from "@mui/icons-material/AttachFile";
import DeleteIcon from "@mui/icons-material/Delete";
import Swal from "sweetalert2";
import "react-circular-progressbar/dist/styles.css";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import SearchIcon from '@mui/icons-material/Search';
import FindInPageSharpIcon from '@mui/icons-material/FindInPageSharp';

const InformationPhase = () => {
  // const [files, setFiles] = useState("")
  const [path, setPath] = useState("document");
  const [folders, setFolders] = useState([]);
  const [files, setFiles] = useState([]);
  const [newName, setNewName] = useState("");
  const [nameFile, setNameFile] = useState("");
  const [refrech, setRefrech] = useState(false);

  const getFile = async (e) => {
    const formData = new FormData();
    formData.append("file", e.target.files[0]);
    formData.append("upload_preset", "xhqp21a0");
    console.log(formData);
    // formData.append("cloud_name", "dkcwqbl9d");
    console.log(e);
    try {
      const data = await axios.post(
        "https://api.cloudinary.com/v1_1/dgztaxbvi/upload",
        formData
      );
      console.log(data.data.secure_url);
      setFiles(data.data.secure_url);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchFolder = async () => {
    try {
      const response = await axios.get(
        "http://localhost:1128/api/folder/getAll/folder"
      );
      console.log(response.data);
      setFolders(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const filterFolderByName = async (name) => {
    try {
      const response = await axios.get(
        `http://localhost:1128/api/folder/getAll/${name}`
      );
      setFolders(response.data);
      console.log("filterFolderByName", setFolders);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchFile = async () => {
    try {
      const response = await axios.get(
        "http://localhost:1128/api/file/getAll/files"
      );
      console.log(response.data);
      setFiles(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchFolder();
    fetchFile();
  }, [refrech]);

  const addFolder = async (folderName) => {
    try {
      const response = await axios.post(
        "http://localhost:1128/api/folder/add",
        {
          name: folderName,
        }
      );
      setRefrech(!refrech);
    } catch (error) {
      console.log(error);
    }
  };
  // const addFile = async ()=>{
  //   try {
  //      const response = await axios.post("http://localhost:1128/api/file/add" , {
  //       name:nameFile,
  //      })
  //      setRefrech(!refrech)

  //   } catch (error) {
  //     console.log(error)

  //   }
  // }
  const progress = 70;
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        gap: "1rem",
        width: "100%",
        overflowX: "hidden",
        backgroundColor: "grey",
      }}
    >
      <div style={{ width: "100%" }}>
        <NavbarDashboard />
      </div>
      <div
        style={{
          display: "flex",
          justifyContent: "flex-start",
          marginLeft: "22rem",
          color: "black",
        }}
      >
        <p
          style={{
            fontFamily: "initial",
            fontSize: "30px",
            fontWeight: "bold",
          }}
        >
          Welcome Lawyer Name{" "}
        </p>
      </div>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          gap: "2rem",
          width: "100%",
          marginLeft: "8.9rem",
        }}
      >
        <div className="dashboard_main_container_leith">
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "flex-start",
              gap: "2rem",
            }}
          >
            <div className="dashboard_box_leith">
              {" "}
              <a
                className="documents-container"
                onClick={(e) => {
                  setPath("document");
                }}
              >
                {" "}
                Documents
              </a>{" "}
            </div>
            {/* <div className="dashboard_box_leith"> <a className='documents-container' > Notes</a> </div> */}
            <div className="dashboard_box_leith">
              {" "}
              <a
                className="documents-container"
                onClick={(e) => {
                  setPath("process");
                }}
              >
                {" "}
                Process
              </a>{" "}
            </div>
          </div>
          {path === "document" ? (
            <div className="dashboard_container_leith">
              {/* <div>
              <div className="block1-container">     
                <div className="card">
                  <div className="search-container">
                    <svg
                      fill="none"
                      viewBox="0 0 24 24"
                      height="20"
                      width="20"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        stroke-linejoin="round"
                        stroke-linecap="round"
                        stroke-width="2"
                        stroke="#171718"
                        d="M17.5 17.5L22 22"
                      ></path>
                      <path
                        stroke-linejoin="round"
                        stroke-width="2"
                        stroke="#171718"
                        d="M20 11C20 6.02944 15.9706 2 11 2C6.02944 2 2 6.02944 2 11C2 15.9706 6.02944 20 11 20C15.9706 20 20 15.9706 20 11Z"
                      ></path>
                    </svg>
                    <input
                      placeholder="Search for a quick action"
                      type="search"
                    />
                  </div>

                  <div className="categories">
                    <button type="button">Note</button>
                    <button type="button">File</button>
                    <button type="button">Email</button>
                    <button type="button">Others</button>
                  </div>

                  <div className="results">
                    <p className="label">Best Results</p>

                    <div className="results-list">
                      <div className="entry">
                        <div className="icon">
                          <svg
                            fill="none"
                            viewBox="0 0 24 24"
                            height="20"
                            width="20"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              stroke-linejoin="round"
                              stroke-linecap="round"
                              stroke-width="2"
                              stroke="#171718"
                              d="M13 2H13.2727C16.5339 2 18.1645 2 19.2969 2.79784C19.6214 3.02643 19.9094 3.29752 20.1523 3.60289C21 4.66867 21 6.20336 21 9.27273V11.8182C21 14.7814 21 16.2629 20.5311 17.4462C19.7772 19.3486 18.1829 20.8491 16.1616 21.5586C14.9044 22 13.3302 22 10.1818 22C8.38275 22 7.48322 22 6.76478 21.7478C5.60979 21.3424 4.69875 20.4849 4.26796 19.3979C4 18.7217 4 17.8751 4 16.1818V12"
                            ></path>
                            <path
                              stroke-linejoin="round"
                              stroke-linecap="round"
                              stroke-width="2"
                              stroke="#171718"
                              d="M21 12C21 13.8409 19.5076 15.3333 17.6667 15.3333C17.0009 15.3333 16.216 15.2167 15.5686 15.3901C14.9935 15.5442 14.5442 15.9935 14.3901 16.5686C14.2167 17.216 14.3333 18.0009 14.3333 18.6667C14.3333 20.5076 12.8409 22 11 22"
                            ></path>
                            <path
                              stroke-linecap="round"
                              stroke-width="2"
                              stroke="#171718"
                              d="M11 6L3 6M7 2V10"
                            ></path>
                          </svg>
                        </div>
                        <div className="desc">
                          <label>Create a new File</label>
                          <span>Add a new file to your library list</span>

                        </div>
                      </div>
                      <div className="entry">
                        <div className="icon">
                          <svg
                            fill="none"
                            viewBox="0 0 24 24"
                            height="20"
                            width="20"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              stroke-linejoin="round"
                              stroke-linecap="round"
                              stroke-width="2"
                              stroke="#171718"
                              d="M17.4776 9.01106C17.485 9.01102 17.4925 9.01101 17.5 9.01101C19.9853 9.01101 22 11.0294 22 13.5193C22 15.8398 20.25 17.7508 18 18M17.4776 9.01106C17.4924 8.84606 17.5 8.67896 17.5 8.51009C17.5 5.46695 15.0376 3 12 3C9.12324 3 6.76233 5.21267 6.52042 8.03192M17.4776 9.01106C17.3753 10.1476 16.9286 11.1846 16.2428 12.0165M6.52042 8.03192C3.98398 8.27373 2 10.4139 2 13.0183C2 15.4417 3.71776 17.4632 6 17.9273M6.52042 8.03192C6.67826 8.01687 6.83823 8.00917 7 8.00917C8.12582 8.00917 9.16474 8.38194 10.0005 9.01101"
                            ></path>
                            <path
                              stroke-linejoin="round"
                              stroke-linecap="round"
                              stroke-width="2"
                              stroke="#171718"
                              d="M12 13L12 21M12 13C11.2998 13 9.99153 14.9943 9.5 15.5M12 13C12.7002 13 14.0085 14.9943 14.5 15.5"
                            ></path>
                          </svg>
                        </div>
                        <div className="desc">
                          <label>Upload a file</label>
                          <span>
                            Use your one of your system files to save and edit
                          </span>
                          <input type="file" name="leith" className="filesInput" onChange={(e)=>getFile(e)} accept=".pdf"/>
                        </div>
                    
                      </div>
                      <a href="https://res.cloudinary.com/dgztaxbvi/image/upload/c_pad,b_auto:predominant,fl_preserve_transparency/v1699982811/Sae_1_j9ocrg.jpg?_s=public-apps"  download="Example-PDF-document"
  target="_blank"
  rel="noopener noreferrer">
  <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/8/87/PDF_file_icon.svg/1667px-PDF_file_icon.svg.png" alt="W3Schools" width="104" height="142" />
</a>
                    </div>
                  </div>
                </div>
              </div>
            </div> */}

              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  padding: "1rem",
                }}
              >
                <p style={{ fontSize: "22px", fontWeight: "bold" }}>
                  {" "}
                  File Storage
                </p>
                <button className="btn-files">Uplode files</button>
              </div>

              <div
                style={{ display: "flex", flexDirection: "row", gap: "1rem" }}
              >
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "1.1rem",
                  }}
                >
                  <div className="block-folder">
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        padding: "1rem",
                        overflowY: "scrol",
                      }}
                    >
                      <p style={{ fontSize: "20px" }}> Folder Storage </p>
                      <input type="search" id="site-search" name="q" style={{height:'4vh', borderRadius:'0.5rem', border :'none', width:'220px' }} onChange={(e)=>{setNewName(e.target.value)}}/>
                    <SearchIcon style={{display:'flex', alignItems:'center', fontSize:'35px' , color:'goldenrod'}} onClick={()=>{filterFolderByName(newName)}}/>
                    {/* <FindInPageSharpIcon style={{display:'flex', alignItems:'center', fontSize:'35px' , color:'gold'}}/> */}
                   
                      <button
                        style={{
                          border: "none",
                          width: "40px",
                          borderRadius: "50%",
                          fontSize: "30px",
                          backgroundColor: "goldenrod",
                        }}
                        onClick={() => {
                          Swal.fire({
                            title: "Enter your Folder Name",
                            input: "text",
                            inputLabel: "Folder Name",
                            showCancelButton: true,
                            inputValidator: (value) => {
                              if (!value) {
                                return "You need to write something!";
                              }
                            },
                            customClass: { confirmButton: "color-modal" },
                          }).then(async (result) => {
                            if (result.isConfirmed) {
                              try {
                                await addFolder(result.value);
                              } catch (e) {
                                console.error(e);
                              }
                            }
                          });
                        }}
                      >
                        {" "}
                        +{" "}
                      </button>
                    </div>
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        gap: "1rem",
                        paddingLeft: "2rem",
                      }}
                    >
                      {folders.map((folder, i) => {
                        return (
                          <>
                            <div
                              style={{
                                display: "flex",
                                flexDirection: "row",
                                alignItems: "center",
                                alignText: "center",
                                height: "3rem",
                              }}
                              key={i}
                            >
                              <FolderIcon
                                style={{
                                  color: "goldenrod",
                                  height: "100%",
                                  width: "20%",
                                }}
                              />
                              <p style={{ height: "50%", margin: 0 }}>
                                {folder.name}{" "}
                              </p>
                            </div>
                            <div
                              style={{
                                height: ".01rem",
                                width: "80%",
                                backgroundColor: "grey",
                              }}
                            ></div>
                          </>
                        );
                      })}
                    </div>
                  </div>
                  <div className="block-note">
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        padding: "1rem",
                      }}
                    >
                      <p style={{ fontSize: "20px", fontWeight: "bold" }}>
                        Add Notes
                      </p>
                      <button
                        style={{
                          border: "none",
                          borderRadius: "50%",
                          backgroundColor: "goldenrod",
                          width: "40px",
                          fontSize: "30px",
                        }}
                      >
                        {" "}
                        +{" "}
                      </button>
                    </div>
                    <div style={{ display: "flex", justifyContent: "center" }}>
                      <div
                        style={{
                          width: "47vh",
                          height: "15vh",
                          display: "flex",
                        }}
                      >
                        <div class="card">
                          <div class="comments">
                            <div class="comment-container">
                              <div class="user">
                                <div class="user-pic">
                                  <svg
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    height="20"
                                    width="20"
                                    xmlns="http://www.w3.org/2000/svg"
                                  >
                                    <path
                                      stroke-linejoin="round"
                                      fill="#707277"
                                      stroke-linecap="round"
                                      stroke-width="2"
                                      stroke="#707277"
                                      d="M6.57757 15.4816C5.1628 16.324 1.45336 18.0441 3.71266 20.1966C4.81631 21.248 6.04549 22 7.59087 22H16.4091C17.9545 22 19.1837 21.248 20.2873 20.1966C22.5466 18.0441 18.8372 16.324 17.4224 15.4816C14.1048 13.5061 9.89519 13.5061 6.57757 15.4816Z"
                                    ></path>
                                    <path
                                      stroke-width="2"
                                      fill="#707277"
                                      stroke="#707277"
                                      d="M16.5 6.5C16.5 8.98528 14.4853 11 12 11C9.51472 11 7.5 8.98528 7.5 6.5C7.5 4.01472 9.51472 2 12 2C14.4853 2 16.5 4.01472 16.5 6.5Z"
                                    ></path>
                                  </svg>
                                </div>
                                <div class="user-info">
                                  <span>Yassine Zanina</span>
                                </div>
                              </div>
                              <p class="comment-content">
                                I've been using this product for a few days now
                                and I'm really impressed! The interface is
                                intuitive and easy to
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div class="text-box">
                      <div class="box-container">
                        <textarea placeholder="Add Notes"></textarea>
                        <div>
                          <div
                            class="formatting"
                            style={{
                              display: "flex",
                              justifyContent: "flex-end",
                            }}
                          >
                            <button type="submit" class="send" title="Send">
                              <svg
                                fill="none"
                                viewBox="0 0 24 24"
                                height="18"
                                width="18"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <path
                                  stroke-linejoin="round"
                                  stroke-linecap="round"
                                  stroke-width="2.5"
                                  stroke="#ffffff"
                                  d="M12 5L12 20"
                                ></path>
                                <path
                                  stroke-linejoin="round"
                                  stroke-linecap="round"
                                  stroke-width="2.5"
                                  stroke="#ffffff"
                                  d="M7 9L11.2929 4.70711C11.6262 4.37377 11.7929 4.20711 12 4.20711C12.2071 4.20711 12.3738 4.37377 12.7071 4.70711L17 9"
                                ></path>
                              </svg>
                            </button>
                            <AttachFileIcon />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div style={{ display: "flex", justifyContent: "flex-end" }}>
                  <div className="block-file">
                    <div
                      style={{
                        display: "flex",
                        padding: "1rem",
                        flexDirection: "column",
                        overflowY: "scrol",
                      }}
                    >
                      <div
                        style={{
                          display: "flex",
                          flexDirection: "row",
                          justifyContent: "space-between",
                        }}
                      >
                        <p style={{ fontSize: "20px", margin: 0 }}>
                          {" "}
                          File Storage{" "}
                        </p>
                        <button
                          style={{
                            border: "none",
                            width: "40px",
                            borderRadius: "50%",
                            fontSize: "30px",
                            backgroundColor: "goldenrod",
                          }}
                        >
                          {" "}
                          +{" "}
                        </button>
                        <input
                          type="file"
                          style={{
                            position: "absolute",
                            right: "17rem",
                            width: "10%",
                            opacity: 0,
                          }}
                          onChange={(e) => {
                            getFile(e);
                          }}
                          accept=".pdf"
                        />
                      </div>

                      {files.map((files, i) => {
                        return (
                          <div style={{ height: "80%" }}>
                            <div>
                              <div
                                style={{
                                  display: "flex",
                                  flexDirection: "row",
                                  alignItems: "center",
                                  alignText: "center",
                                  height: "3rem",
                                }}
                              >
                                <InsertDriveFileIcon
                                  style={{
                                    color: "goldenrod",
                                    height: "100%",
                                    width: "20%",
                                  }}
                                />
                                <p style={{ height: "50%", margin: 0 }}>
                                  {files.name}{" "}
                                </p>
                                {/* <DeleteIcon /> */}
                              </div>
                              <div
                                style={{
                                  height: ".01rem",
                                  width: "80%",
                                  backgroundColor: "grey",
                                }}
                              ></div>
                            </div>
                            <br />
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="dashboard_container_leith">
              <h1>alah yehdik ya leith</h1>
            </div>
          )}
        </div>
        <div className="side_agenda">
          <div
            style={{
              display: "flex",
              padding: "3rem",
              flexDirection: "column",
              gap: "3rem",
            }}
          >
            <p
              style={{
                fontFamily: "initial",
                fontSize: "25px",
                fontWeight: "bold",
              }}
            >
              Progress Case
            </p>
            <CircularProgressbar
              value={progress}
              text={`${progress}%`}
              styles={buildStyles({
                textSize: "30px",
                pathColor: "goldenrod",
                textColor: "black",
                trailColor: "#d6d6d6",
              })}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default InformationPhase;
