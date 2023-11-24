import "./dashboardStyle.css";
import React, { useEffect, useState, useRef } from "react";
import SidebarDash from "../SidebarDash/SidebarDash";
import NavbarDashboard from "../NavbarDashboard/NavbarDashboard";
import axios from "axios";
import FolderIcon from "@mui/icons-material/Folder";
import InsertDriveFileIcon from "@mui/icons-material/InsertDriveFile";
import ControlPointIcon from "@mui/icons-material/ControlPoint";
import AttachFileIcon from "@mui/icons-material/AttachFile";
import Swal from "sweetalert2";
import "react-circular-progressbar/dist/styles.css";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import SearchIcon from "@mui/icons-material/Search";
import Flickity from "react-flickity-component";
import ReactDOM from "react-dom";
import "./style.css";
import "./flickity.css";
import DeleteOutlineRoundedIcon from "@mui/icons-material/DeleteOutlineRounded";
import CachedRoundedIcon from "@mui/icons-material/CachedRounded";
import EditIcon from "@mui/icons-material/Edit";
import { Nav } from "react-bootstrap";
import { getAuth } from "firebase/auth";
import { useLocation } from "react-router-dom";
import { FIREBASE_AUTH } from "../../firebaseconfig";

const InformationPhase = () => {
  const location = useLocation();
  const phase = location?.state?.phase;
  console.log("this is phase", phase);

  const [path, setPath] = useState("document");
  const [folders, setFolders] = useState([]);
  const [files, setFiles] = useState([]);
  const [newName, setNewName] = useState("");
  const [nameFile, setNameFile] = useState("");
  const [refrech, setRefrech] = useState(false);
  const [search, setSearch] = useState("");
  const [pdf, setPdf] = useState("");
  const [folderId, setFolderId] = useState("");
  const [pdfName, setPdfName] = useState(1);
  /////////state note ////////////
  const [notes, setNotes] = useState([]);
  const [comment, setComment] = useState("");
  const [type, setType] = useState("");
  const [fileNote, setFileNote] = useState(null);
  const [user, setUser] = useState({});

  const getFile = async (e) => {
    const formData = new FormData();
    formData.append("file", e.target.files[0]);
    formData.append("upload_preset", "xhqp21a0");
    console.log(e);
    try {
      const data = await axios.post(
        "https://api.cloudinary.com/v1_1/dgztaxbvi/upload",
        formData
      );
      console.log(data.data);
      setPdf(data.data.secure_url);
      setPdfName(data.data.original_filename);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchFolder = async () => {
    try {
      const response = await axios.get(
        `http://localhost:1128/api/folder/getAll/${phase.id}`
      );
      console.log("this is folder", response.data);
      setFolders(response.data.folders);
    } catch (error) {}
  };

  const filterFolderByName = async (name) => {
    try {
      const response = await axios.get(
        `http://localhost:1128/api/folder/getAll/${name}`
      );
      setFolders(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchFileByFolder = async () => {
    try {
      const response = await axios.get(
        `http://localhost:1128/api/file/getFolder/${folderId}`
      );
      setFiles(response.data);
      console.log();
    } catch (error) {
      console.log(error);
    }
  };

  const flickityRef = useRef(null);

  const fetchNote = async (id) => {
    try {
      const response = await axios.get(
        `http://localhost:1128/api/note/allNotes/${phase.id}`
      );
      console.log("this is note", response.data);
      setNotes(response.data.notes);
      console.log("this is notes ", setNotes);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (flickityRef.current) {
      new Flickity(flickityRef.current, {});
    }
    fetchFolder();
    fetchFileByFolder();
    fetchNote();
    handleGetUser();
  }, [refrech, folderId]);

  const addFolder = async (folderName) => {
    try {
      const response = await axios.post(
        "http://localhost:1128/api/folder/add",
        {
          name: folderName,
          phaseId: phase.id,
        }
      );
      setRefrech(!refrech);
    } catch (error) {
      console.log(error);
    }
  };

  const addFile = async (e) => {
    const formData = new FormData();
    formData.append("file", e.target.files[0]);
    formData.append("upload_preset", "xhqp21a0");

    try {
      const data = await axios.post(
        "https://api.cloudinary.com/v1_1/dgztaxbvi/upload",
        formData
      );
      console.log(data.data);

      await axios.post("http://localhost:1128/api/file/add", {
        name: data.data.original_filename + ".pdf",
        folderId: folderId,
        link: data.data.secure_url,
      });
      setRefrech(!refrech);
    } catch (error) {
      console.log(error);
    }
  };

  const onButtonClick = (pdfLink) => {
    const pdfUrl = pdfLink;
    const link = document.createElement("a");
    link.href = pdfUrl;
    link.download = pdfName;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const auth = getAuth();

  const handleGetUser = async () => {
    const email = FIREBASE_AUTH.currentUser.email;

    await axios
      .get(`http://localhost:1128/api/lawyer/getLawyerByEmail/${email}`)
      .then((res) => {
        setUser(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const addNotes = async (comment, type, file) => {
    const email = FIREBASE_AUTH.currentUser.email;
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", "xhqp21a0");
    try {
      const data = await axios.post(
        "https://api.cloudinary.com/v1_1/dgztaxbvi/upload",
        formData
      );

      await axios.post("http://localhost:1128/api/note/addNote", {
        comment: comment,
        type: type,
        attachedFile: data.data.secure_url,
        attachedFileName: data.data.original_filename + ".pdf",
        phaseId: phase.id,
        email,
      });
      setRefrech(!refrech);
    } catch (error) {
      console.log(error);
    }
  };

  const handleDelete = async (id) => {
    try {
      const response = await axios.delete(
        `http://localhost:1128/api/note/note/${id}`
      );
      setRefrech(!refrech);
    } catch (error) {
      console.log(error);
    }
  };

  const updateNote = async (id) => {
    try {
      console.log("this is comment", comment);
      await axios.put(`http://localhost:1128/api/note/note/${id}`, {
        comment: document.getElementById("swal-input2").value,
      });
      setRefrech(!refrech);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div
      style={{
        display: "flex",
        width: "100%",
      }}
    >
      <div style={{ display: "flex", width: "100%" }}>
        {/* <div
        style={{
          display: "flex",
          justifyContent: "flex-start",
          marginLeft: "22rem",
          color: "black",
        }}
      >

        <p
        style={{ fontSize: "25px", fontWeight: "bold", fontFamily: "serif" }}
        >
        Welcome Lawyer Name{" "}
        </p>
      </div> */}
        <SidebarDash />
        <div
          style={{ display: "flex", flexDirection: "column", width: "100%" }}
        >
          <NavbarDashboard />

          <div
            style={{
              display: "flex",
              justifyContent: "center",
              width: "100%",
              gap: "4rem",
            }}
          >
            <div className="side_agenda">
              <div
                style={{
                  display: "flex",
                  padding: "2rem",
                  flexDirection: "column",
                  gap: "1rem",
                }}
              >
                <p
                  style={{
                    fontFamily: "revert",
                    fontSize: "25px",
                    fontWeight: 1000,
                  }}
                >
                  Name of the Phase : {phase.data.label}
                </p>
                <p>
                  {" "}
                  description of this casee
                  {phase.data.description}
                </p>

                <img
                  src={require("../../assets/images/progress case.png")}
                  alt=""
                  style={{ width: "185px", height: "210px" }}
                />
              </div>
              <div></div>
            </div>
            <div className="dashboard_main_container_leith">
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "flex-start",
                  gap: "5rem",
                }}
              >
                <div className="dashboard_box_leith">
                  <a
                    className="documents-container1"
                    onClick={(e) => {
                      setPath("document");
                    }}
                  >
                    Documents
                  </a>
                </div>
                <div className="dashboard_box_leith">
                  <a
                    className="documents-container1"
                    onClick={(e) => {
                      setPath("process");
                    }}
                  >
                    Notes
                  </a>{" "}
                </div>
              </div>
              {path === "document" ? (
                <div className="dashboard_container_leith">
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
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
                          <p
                            style={{
                              fontSize: "23px",
                              fontWeight: 1000,
                              fontFamily: "revert",
                            }}
                          >
                            Folder Storage
                          </p>
                          <input
                            type="search"
                            id="site-search"
                            name="q"
                            style={{
                              height: "4vh",
                              borderRadius: "0.5rem",
                              width: "120px",
                            }}
                            onChange={(e) => {
                              setNewName(e.target.value);
                            }}
                          />
                          <SearchIcon
                            style={{
                              display: "flex",
                              alignItems: "center",
                              fontSize: "30px",
                              color: "goldenrod",
                            }}
                          />

                          <button
                            style={{
                              border: "none",
                              width: "45px",
                              height: "45px",
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
                          {folders
                            .filter((el) =>
                              el.name
                                .toLowerCase()
                                .includes(newName.toLowerCase())
                            )
                            .map((folder, i) => {
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
                                    className="fixed"
                                    key={i}
                                  >
                                    <FolderIcon
                                      style={{
                                        color: "goldenrod",
                                        height: "100%",
                                        width: "20%",
                                        cursor: "pointer",
                                      }}
                                      onClick={() => {
                                        console.log(
                                          "this is folderId",
                                          folder.id
                                        );
                                        setFolderId(folder.id);
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
                    </div>

                    <div
                      style={{ display: "flex", justifyContent: "flex-end" }}
                    >
                      <div className="block-file">
                        <div
                          style={{
                            display: "flex",
                            padding: "1rem",
                            flexDirection: "column",
                            overflowY: "scrol",
                            gap: "1.5rem",
                          }}
                        >
                          <div
                            style={{
                              display: "flex",
                              flexDirection: "row",
                              justifyContent: "space-between",
                            }}
                          >
                            <p
                              style={{
                                fontSize: "23px",
                                fontWeight: 1000,
                                fontFamily: "revert",
                              }}
                            >
                              {" "}
                              File Storage{" "}
                            </p>
                            <button
                              style={{
                                border: "none",
                                width: "45px",
                                height: "45px",
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
                                right: "2rem",
                                width: "10%",
                                opacity: 0,
                              }}
                              onChange={(e) => {
                                // getFile(e);
                                addFile(e);
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
                                        cursor: "pointer",
                                      }}
                                      onClick={() => {
                                        onButtonClick(files.link);
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
                ////////////////// note ///////////////////////
                <div className="dashboard_container_leith">
                  <div
                    style={{
                      fontSize: "20px",
                      padding: "1rem",
                      display: "flex",
                      justifyContent: "space-between",
                    }}
                  >
                    <p style={{ fontSize: "25px" }}>My Notes</p>
                    <button
                      style={{
                        border: "none",
                        width: "7rem",
                        height: "2.5rem",
                        borderRadius: "1rem",
                        backgroundColor: "goldenrod",
                      }}
                      onClick={async () => {
                        const { value: result } = await Swal.fire({
                          title: "Enter your Note",
                          html:
                            '<input id="swal-input3" class="swal2-input" style="width: 350px;" placeholder="Add your Note">' +
                            '<input type="file" id="swal-input4" class="swal2-input" style="width: 350px;" placeholder="Add your File">' +
                            '<select id="swal-input2" class="swal2-input">' +
                            '<option value="">Select...</option>' +
                            '<option value="urgent">urgent</option>' +
                            '<option value="personnel">Personnel</option>' +
                            '<option value="notes">Notes</option>' +
                            "</select>",
                          cancelButtonText: "Cancel",
                          showCancelButton: true,
                          focusConfirm: false,
                          preConfirm: () => {
                            const comment =
                              document.getElementById("swal-input3").value;
                            const type =
                              document.getElementById("swal-input2").value;
                            const fileNote =
                              document.getElementById("swal-input4").files[0];

                            return { comment, type, fileNote };
                          },
                          customClass: { confirmButton: "color-modal" },
                        });

                        if (result) {
                          const { comment, type, fileNote } = result;
                          setComment(comment);
                          setType(type);
                          setFileNote(fileNote);

                          addNotes(comment, type, fileNote);
                        }
                      }}
                    >
                      Add note
                    </button>
                  </div>
                  <div>
                    <Flickity options={{ initialIndex: 1 }}>
                      {notes.map((notes, i) => {
                        return (
                          <div
                            style={{
                              display: "flex",
                              gap: "3rem",
                              marginRight: "2rem",
                              alignItems: "center",
                            }}
                          >
                            <div
                              className="card"
                              style={{
                                width: "22rem",
                                height: "22rem",
                                backgroundColor:
                                  notes.type === "urgent"
                                    ? "#5F9EA0		"
                                    : notes.type === "personnel"
                                    ? "#8FBC8F	"
                                    : notes.type === "notes"
                                    ? "#FFD700		"
                                    : null,
                                borderRadius: "2rem 0 2rem 0",
                              }}
                            >
                              <div className="card-body">
                                <div
                                  style={{
                                    display: "flex",
                                    justifyContent: "space-between",
                                  }}
                                >
                                  <EditIcon
                                    style={{ color: "white" }}
                                    onClick={async () => {
                                      await Swal.fire({
                                        title: "Update Note",
                                        html: `
                                          <textarea id="swal-input2" class="swal2-textarea" rows="4" style="width: 75%;" placeholder='update the note'></textarea>
                                        `,
                                        focusConfirm: false,
                                        showCancelButton: true,
                                        preConfirm: () => {
                                          const commentValue =
                                            document.getElementById(
                                              "swal-input2"
                                            ).value;
                                          setComment(commentValue);

                                          return updateNote(notes.id);
                                        },
                                        customClass: {
                                          confirmButton: "color-modal",
                                          cancelButton: "color-modal",
                                        },
                                      }).then(() => {
                                        Swal.fire({
                                          position: "center",
                                          icon: "success",
                                          title:
                                            "Your note is updated successfully",
                                          showConfirmButton: false,
                                          timer: 1500,
                                        });
                                      });
                                    }}
                                  />
                                  <DeleteOutlineRoundedIcon
                                    style={{ color: "white" }}
                                    onClick={() => {
                                      Swal.fire({
                                        title: "Are you sure?",
                                        text: "You won't be able to revert this!",
                                        icon: "warning",
                                        showCancelButton: true,
                                        confirmButtonColor: "#3085d6",
                                        cancelButtonColor: "#d33",
                                        confirmButtonText: "Yes, delete it!",
                                      }).then((result) => {
                                        if (result.isConfirmed) {
                                          handleDelete(notes.id); // Call your delete function here
                                          Swal.fire({
                                            title: "Deleted!",
                                            text: "Your file has been deleted.",
                                            icon: "success",
                                          });
                                        }
                                      });
                                    }}
                                  />
                                </div>
                                <div
                                  style={{
                                    display: "flex",
                                    justifyContent: "flex-start",
                                    gap: "2rem",
                                    padding: "1rem",
                                  }}
                                >
                                  <img
                                    src={user.ImageUrl}
                                    alt=""
                                    style={{
                                      width: "30px",
                                      width: "35px",
                                      borderRadius: "50%",
                                    }}
                                  />
                                  <h5>{user.fullName}</h5>
                                </div>
                                <div
                                  style={{
                                    height: "0.5%",
                                    width: "100%",
                                    backgroundColor: "black",
                                  }}
                                ></div>
                                <div>
                                  <p
                                    className="card-text"
                                    style={{ marginTop: "2rem" }}
                                  >
                                    {notes.comment}
                                  </p>
                                </div>
                              </div>
                              {notes.attachedFile && (
                                <div style={{ height: "auto" }}>
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
                                          width: "10%",
                                          cursor: "pointer",
                                        }}
                                        onClick={() => {
                                          onButtonClick(notes.attachedFile);
                                        }}
                                      />
                                      <p
                                        style={{
                                          height: "50%",
                                          margin: 0,
                                          fontSize: "0.9rem",
                                        }}
                                      >
                                        {notes.attachedFileName}
                                      </p>
                                    </div>
                                  </div>
                                  <br />
                                </div>
                              )}
                              <div></div>

                              <div
                                style={{
                                  borderTop: "1px solid #ccc",
                                  padding: "1rem",
                                  // marginTop: "1rem",
                                  display: "flex",
                                  justifyContent: "space-between",
                                }}
                              >
                                <p
                                  style={{
                                    fontSize: "15px",
                                    border: "solid 1px grey",
                                    borderRadius: "4rem",
                                    width: "6rem",
                                  }}
                                >
                                  {notes.type}
                                </p>
                                <p>{notes.createdAt.slice(0, 10)}</p>
                              </div>
                            </div>
                          </div>
                        );
                      })}
                    </Flickity>
                  </div>
                </div>

                ///////////////// / //////////////////////////////////////////////
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InformationPhase;
