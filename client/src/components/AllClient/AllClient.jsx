import React, { useEffect, useState } from "react";
import "./allclient.css";
import Modal from "../AddClient/AddClient.jsx";
import SidebarDash from "../SidebarDash/SidebarDash.jsx";
import { db } from "../../firebaseconfig.js";
import { collection, doc, getDocs, deleteDoc } from "firebase/firestore";
import NavbarDashboard from "../NavbarDashboard/NavbarDashboard.jsx";
import DataGrid from "./DataGrid.jsx"



const AllClient = () => {
  const [user, setUser] = useState([]);
  const userCollectionRef = collection(db, "user");
  const [refrech, setRefrech]= useState(false)

  const deleteUser = async (id) => {
    const userDoc = doc(db, "user", id);
    await deleteDoc(userDoc);
    setRefrech(!refrech)
  };

  const getUser = async () => {
    try {
      const result = await getDocs(userCollectionRef);
      const users = result.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));
      setUser(users);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
  useEffect(() => {
   
    getUser();
  }, [refrech]);

  console.log(user);

  

  return (
    <div>
      <NavbarDashboard/>
        <div className="allPage">
          <div className="firstDiv">
            {/* <p className="titleClient">Client List </p> */}
            <button
              className="btnAdd"
              data-bs-toggle="modal"
              data-bs-target="#staticBackdrop"
            >
              +New Client{" "}
            </button>
            <Modal refrech={refrech} setRefrech={setRefrech} />
            <hr />
          </div>

          <div className="table-wrapper table1" style={{width:'70rem', display:'flex', flexDirection:"column", marginLeft:'21rem'}}>
            <DataGrid user={user} deleteUser={deleteUser} />
            {/* <table class="table align-middle mb-0 ">
              <thead class="bg-light">
                <tr>
                  <th> Full Name</th>
                  <th>Phone Number</th>
                  <th>Cin </th>
                  <th>Email</th>
                  <th>Actions</th>
                </tr>
              </thead>

              {user.map((e) => {
                return (
                  <tbody>
                    <tr>
                      <td>
                        <div className="d-flex align-items-center">
                          <img
                            src={e.imageUrl}
                            alt=""
                            style={{ width: "45px", height: "45px" }}
                            className="rounded-circle"
                          />
                          <div className="ms-3">
                            <p className="fw-bold mb-1">{e.fullName}</p>
                          </div>
                        </div>
                      </td>
                      <td>
                        <p className="fw-normal mb-1">{e.PhoneNumber}</p>
                      </td>
                      <td>
                        <p className="fw-normal mb-1">{e.cin}</p>
                      </td>
                      <td>{e.email}</td>
                      <td>
                        <div className="d-flex gap-3">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="16"
                            height="16"
                            fill="currentColor"
                            class="bi bi-trash3"
                            viewBox="0 0 16 16"
                            onClick={() => {
                              console.log(e); 
                              deleteUser(e.id);
                            }}
                          >
                            <path
                              d="M6.5 1h3a.5.5 0 0 1 .5.5v1H6v-1a.5.5 0 0 1 .5-.5ZM11 2.5v-1A1.5 1.5 0 0 0 9.5 0h-3A1.5 1.5 0 0 0 5 1.5v1H2.506a.58.58 0 0 0-.01 0H1.5a.5.5 0 0 0 0 1h.538l.853 10.66A2 2 0 0 0 4.885 16h6.23a2 2 0 0 0 1.994-1.84l.853-10.66h.538a.5.5 0 0 0 0-1h-.995a.59.59 0 0 0-.01 0H11Zm1.958 1-.846 10.58a1 1 0 0 1-.997.92h-6.23a1 1 0 0 1-.997-.92L3.042 3.5h9.916Zm-7.487 1a.5.5 0 0 1 .528.47l.5 8.5a.5.5 0 0 1-.998.06L5 5.03a.5.5 0 0 1 .47-.53Zm5.058 0a.5.5 0 0 1 .47.53l-.5 8.5a.5.5 0 1 1-.998-.06l.5-8.5a.5.5 0 0 1 .528-.47ZM8 4.5a.5.5 0 0 1 .5.5v8.5a.5.5 0 0 1-1 0V5a.5.5 0 0 1 .5-.5Z"
                              
                            />
                          </svg>
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="16"
                            height="16"
                            fill="currentColor"
                            class="bi bi-eye"
                            viewBox="0 0 16 16"
                          >
                            <path d="M16 8s-3-5.5-8-5.5S0 8 0 8s3 5.5 8 5.5S16 8 16 8zM1.173 8a13.133 13.133 0 0 1 1.66-2.043C4.12 4.668 5.88 3.5 8 3.5c2.12 0 3.879 1.168 5.168 2.457A13.133 13.133 0 0 1 14.828 8c-.058.087-.122.183-.195.288-.335.48-.83 1.12-1.465 1.755C11.879 11.332 10.119 12.5 8 12.5c-2.12 0-3.879-1.168-5.168-2.457A13.134 13.134 0 0 1 1.172 8z" />
                            <path d="M8 5.5a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5zM4.5 8a3.5 3.5 0 1 1 7 0 3.5 3.5 0 0 1-7 0z" />
                          </svg>
                        </div>
                      </td>
                    </tr>
                  </tbody>
                );
              })}
            </table> */}
          </div>
        </div>
    </div>
  );
};

export default AllClient;
