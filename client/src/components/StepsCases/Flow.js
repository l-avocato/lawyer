import { useState, useCallback } from "react";
import "./StepsCases.css";
import ReactFlow, {
  Controls,
  Background,
  applyNodeChanges,
  applyEdgeChanges,
  MiniMap,
  addEdge,
} from "reactflow";
import "reactflow/dist/style.css";
import NavbarDashboard from "../NavbarDashboard/NavbarDashboard.jsx";
import { useEffect } from "react";
import axios from "axios";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import EditNoteIcon from "@mui/icons-material/EditNote";
import AddIcon from "@mui/icons-material/Add";
import { useNavigate } from "react-router-dom";
import SidebarDash from "../SidebarDash/SidebarDash.jsx";
import Swal from "sweetalert2";
import { FIREBASE_AUTH, db } from "../../firebaseconfig";
import { useLocation } from "react-router-dom";

const rfStyle = {
  backgroundColor: "white",
};

function Flow() {
  const location = useLocation();
  const caseHistory = location?.state?.case;
  const [nodes, setNodes] = useState([]);
  const [edges, setEdges] = useState([]);
  const [selectedEdge, setSelectedEdge] = useState(null);
  const [showEdgeModal, setShowEdgeModal] = useState(false);
  const [refresh, setRefresh] = useState(false);
  // const [clicked, setClicked] = useState(false);
  const [newLabel, setNewLabel] = useState("");
  const [source, setSource] = useState("");
  const [target, setTarget] = useState("");
  const [price, setPrice] = useState(0);
  const [description, setDescription] = useState("");
  const [lawyer, setLawyer] = useState({});

  console.log("this is nodes", nodes);

  const navigate = useNavigate();

  const onConnect = useCallback(
    (params) => {
      setEdges((prevEdges) => {
        const updatedEdges = addEdge(params, prevEdges);

        axios
          .post("http://localhost:1128/api/edge/add", {
            label: "",
            source: JSON.parse(updatedEdges[updatedEdges.length - 1].source),
            target: JSON.parse(updatedEdges[updatedEdges.length - 1].target),
            type: "step",
          })
          .then((res) => {
            console.log("this is res", res.data);
            setRefresh(!refresh);
          })
          .catch((err) => console.log(err));

        return updatedEdges;
      });
    },
    [refresh],
  );

  const getLawyer = async () => {
    try {
      const loggedInLawyer = FIREBASE_AUTH.currentUser.email;
      console.log(loggedInLawyer);
      const res = await axios.get(
        `http://localhost:1128/api/lawyer/getLawyerByEmail/${loggedInLawyer}`,
      );
      console.log("this is lawyer", res.data);
      setLawyer(res.data);
    } catch (err) {
      console.log(err);
    }
  };
  const onNodesChange = useCallback(
    (changes) => setNodes((nds) => applyNodeChanges(changes, nds)),
    [setNodes],
  );
  const onEdgesChange = useCallback(
    (changes) =>
      setEdges((eds) => {
        applyEdgeChanges(changes, eds);
      }),
    [setEdges],
  );

  const fetchData = async () => {
    try {
      const res = await axios.get(
        `http://localhost:1128/api/phase/allPhase/${caseHistory.id}`,
      );
      const result = res.data.phases;
      console.log("this is res", result);
      if (result.length) {
        const newNodes = result.map((data) => {
          return {
            id: String(data.id),
            data: { label: data.label, description: data.description },
            position: {
              x: data.positionX,
              y: data.positionY,
            },
            style: {
              background:
                "linear-gradient(to right, #b38728, #fbf5b7, #aa771c)",
              color: "black",
              border: "none",
              width: 200,
              borderRadius: "10px",
            },
          };
        });
        setNodes(newNodes);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const fetchEdge = async () => {
    try {
      const result = await axios.get(
        "http://localhost:1128/api/edge/getAll/edge",
      );

      if (result.data.length) {
        const newEdge = result.data.map((data) => {
          return {
            id: String(data.source + "-" + data.target),
            source: String(data.source),
            target: String(data.target),
            label: data.label,
            description: data.description,
            type: "step",
          };
        });
        setEdges(newEdge);
      }
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getLawyer();
  }, []);

  useEffect(() => {
    fetchData(1);
    fetchEdge();
  }, [lawyer, refresh]);

  const AddEdge = async () => {
    const NewEdge = {
      source: source,
      target: target,
      label: newLabel,
      type: "step",
    };
    try {
      await axios.post("http://localhost:1128/api/edge/add", NewEdge);
      setRefresh(!refresh);
    } catch (error) {
      console.log(error);
    }
  };

  const addNode = () => {
    const newNode = {
      label: "New Node",
      positionX: 250,
      positionY: 150,
      background: "gold",
      color: "#333",
      border: "1px solid #222138",
      width: 180,
      borderRadius: "100px",
      caseId: caseHistory.id,
      lawyerId: lawyer.id,
    };

    axios
      .post("http://localhost:1128/api/phase/add", newNode)
      .then((response) => {
        const createdNode = response.data;
        setRefresh(!refresh);
      })
      .catch((error) => {
        console.error("Failed to add a new node:", error);
      });
  };

  const deleteNode = async (id) => {
    await axios
      .delete(`http://localhost:1128/api/phase/remove/${id}`)
      .then((res) => setRefresh(!refresh))
      .catch((error) => {
        console.error("Error deleting node:", error);
      });
  };

  const updateNodeName = async (id) => {
    try {
      await axios.put(`http://localhost:1128/api/phase/update/${id}`, {
        label: newLabel,
        price: price,
        description: description,
      });
      setRefresh(!refresh);
    } catch (error) {
      console.error("Error updating node:", error);
    }
  };
  const onNodeDragStop = (event, node) => {
    const { id, position } = node;

    axios
      .put(`http://localhost:1128/api/phase/update/${id}`, {
        positionX: position.x,
        positionY: position.y,
      })
      .then((response) => {
        console.log("Node position updated:", response.data);
      })
      .catch((error) => {
        console.error("Error updating node position:", error);
      });
  };

  useEffect(() => {
    fetchData();
    fetchEdge();
  }, [refresh]);

  return (
    <div style={{ display: "flex" }}>
      <SidebarDash />
      <div style={{ display: "flex", flexDirection: "column", width: "100%" }}>
        <NavbarDashboard />

        <div
          style={{
            height: "85%",
            width: "87%",
            position: "absolute",
            top: "12%",
            display: "flex",
            padding: "1rem",
          }}>
          <ReactFlow
            nodes={nodes}
            onNodesChange={onNodesChange}
            onNodeClick={(event, edge) => {
              setSelectedEdge(edge);

              setShowEdgeModal(true);
              console.log("this is selectededge", edge);
            }}
            // nodeTypes={{ special: NodeWithIcon }}
            onNodeMouseEnter={() => {}}
            edges={edges}
            onEdgesChange={onEdgesChange}
            onConnect={onConnect}
            onNodeDragStop={onNodeDragStop}
            fitView
            style={rfStyle}>
            <Background />

            {showEdgeModal && (
              <div
                className="modal fade show"
                style={{ display: "block", position: "relative" }}>
                <div className="modal-dialog">
                  <div className="modal-content">
                    <div
                      className="modal-header"
                      // style={{  background: "linear-gradient(to right, #b38728, #fbf5b7, #aa771c)"}}
                    >
                      <h5
                        className="modal-title"
                        style={{
                          display: "flex",
                          justifyContent: "center",
                          alignItems: "center",
                        }}>
                        Phase Details
                      </h5>
                      <button
                        type="button"
                        className="btn-close"
                        onClick={() => setShowEdgeModal(false)}></button>
                    </div>

                    <div
                      className="modal-body"
                      style={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        gap: "2rem",
                      }}>
                      {/* <h6>Edge ID: {selectedEdge.id}</h6> */}

                      <input
                        name="text"
                        class="input"
                        placeholder="Update Edge Name"
                        style={{
                          width: "140px",
                          fontSize: "12px",

                          borderRadius: "0.75rem",
                          padding: "0.5rem",

                          border: "2px solid #f0f0f0",
                          transition: " all 0.2s ease-in-out",
                        }}
                        onChange={(e) => {
                          setNewLabel(e.target.value);
                        }}></input>
                      <input
                        type="number"
                        name="payment"
                        class="input"
                        placeholder="Payment (optional)"
                        style={{
                          width: "140px",
                          fontSize: "12px",
                          borderRadius: "0.75rem",
                          padding: "0.5rem",

                          border: "2px solid #f0f0f0",
                          transition: " all 0.2s ease-in-out",
                        }}
                        onChange={(e) => setPrice(e.target.value)}></input>
                    </div>
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        marginTop: "1rem",
                      }}>
                      <input
                        name="text"
                        className="input"
                        placeholder="Add description of the phase"
                        style={{
                          width: "380px",
                          height: "100px",
                          fontSize: "14px",
                          borderRadius: "0.5rem",
                          padding: "2rem",
                          overflowY: "auto",
                          // border: "1px solid grey",
                          transition: "all 0.2s ease-in-out",
                        }}
                        onChange={(e) => {
                          setDescription(e.target.value);
                        }}
                      />
                    </div>
                    <div
                      className="modal-footer"
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        marginLeft: "0.5rem",
                      }}>
                      <DeleteForeverIcon
                        style={{
                          color: "goldenrod",
                          height: "30px",
                          width: "30px",
                          borderRadius: "50%",
                          cursor: "pointer",
                        }}
                        onClick={() => {
                          setShowEdgeModal(false);
                          Swal.fire({
                            title: "Are you sure to delete this phase ?",
                            icon: "warning",
                            showCancelButton: true,
                            confirmButtonColor: "#3085d6",
                            cancelButtonColor: "#d33",
                            confirmButtonText: "Yes, delete it!",
                          }).then((result) => {
                            if (result.isConfirmed) {
                              deleteNode(selectedEdge.id);

                              Swal.fire({
                                title: "Deleted!",
                                text: "Your Phase has been deleted.",
                                icon: "success",
                              });
                            }
                          });
                        }}
                      />
                      <EditNoteIcon
                        style={{
                          color: "goldenrod",
                          height: "30px",
                          width: "30px",
                          cursor: "pointer",
                        }}
                        onClick={() => {
                          updateNodeName(selectedEdge.id);
                          setShowEdgeModal(false);
                          Swal.fire({
                            title: "Updated!",
                            icon: "success",
                            customClass: {
                              confirmButton: "custom-ok-button-class",
                            },
                            showCancelButton: false,
                            confirmButtonText: "OK",
                          });
                        }}
                      />

                      <button
                        type="button"
                        style={{
                          height: "40px",
                          width: "100px",
                          transition: "0.5s",
                          border: "none",
                          borderRadius: "1rem",
                          fontSize: "12px",
                          color: "black",
                          background: "goldenrod",
                        }}
                        onClick={() =>
                          navigate("/informations", {
                            state: { phase: selectedEdge },
                          })
                        }>
                        See All details
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}
            <MiniMap
              nodeStrokeColor={(n) => {
                if (n.style?.background) return n.style.background;
                if (n.type === "input") return "#0041d0";
                if (n.type === "output") return "#ff0072";
                if (n.type === "default") return "#1a192b";
                return "#eee";
              }}
              nodeColor={(n) => {
                if (n.style?.background) return n.style.background;
                return "#fff";
              }}
              nodeBorderRadius={2}
            />

            <Controls />
          </ReactFlow>
        </div>

        <div
          style={{
            position: "absolute",
            right: 10,
            display: "flex",
            flexDirection: "column",
            top: "25rem",
          }}>
          <button
            onClick={addNode}
            style={{
              width: "4rem",
              height: "4rem",
              fontSize: "3rem",
              textAlign: "center",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              background:
                "linear-gradient(to right, #b38728, #fbf5b7, #aa771c)",
              border: "none",
              borderRadius: "1rem",
              transition: "0.5s",
              borderRadius: "50%",

              fontWeight: "600",
            }}
            className="plusbutton">
            +
          </button>
          {/* <button data-bs-toggle="modal" data-bs-target="#staticBackdrops">
    Edge
  </button> */}
          {/* <AddIcon onClick={addNode} style={{color:'green' , fontSize:'50px', display:'flex' , backgroundColor:'whi'}} /> */}

          <div
            class="modal fade"
            id="staticBackdrops"
            data-bs-backdrop="static"
            data-bs-keyboard="false"
            tabindex="-1"
            aria-labelledby="staticBackdropLabel"
            aria-hidden="true">
            <div class="modal-dialog">
              <div class="modal-content">
                <div class="modal-header">
                  <h1 class="modal-title fs-5" id="staticBackdropLabel">
                    {" "}
                    Insert Initial edge{" "}
                  </h1>
                  <button
                    type="button"
                    class="btn-close"
                    data-bs-dismiss="modal"
                    aria-label="Close"></button>
                </div>
                <div class="modal-body">
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      gap: "1rem",
                    }}>
                    <label for="name">Source:</label>

                    <input
                      style={{
                        display: "flex",
                        width: "35rem",
                        borderRadius: "0.5rem",
                        height: "2.5rem",
                      }}
                      type="string"
                      placeholder="Source"
                      onChange={(e) => {
                        setSource(e.target.value);
                      }}
                    />
                    <label for="name">target:</label>

                    <input
                      style={{
                        display: "flex",
                        width: "35rem",
                        borderRadius: "0.5rem",
                        height: "2.5rem",
                      }}
                      type="number"
                      placeholder="Target"
                      onChange={(e) => {
                        setTarget(e.target.value);
                      }}
                    />
                    <label for="name">Label</label>

                    <input
                      style={{
                        display: "flex",
                        width: "35rem",
                        borderRadius: "0.5rem",
                        height: "2.5rem",
                      }}
                      type="text"
                      placeholder="Label"
                      onChange={(e) => {
                        setNewLabel(e.target.value);
                      }}
                    />
                  </div>
                </div>
                <div class="modal-footer">
                  <button
                    type="button"
                    class="btn btn-secondary"
                    data-bs-dismiss="modal">
                    Close
                  </button>
                  <button
                    type="button"
                    class="btn btn-primary"
                    onClick={() => {
                      AddEdge();
                    }}>
                    Insert
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Flow;
