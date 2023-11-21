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
import AddIcon from '@mui/icons-material/Add';
import { useNavigate } from "react-router-dom";
import SidebarDash from "../SidebarDash/SidebarDash.jsx";


const rfStyle = {
  backgroundColor: "white",
};

function Flow() {
  const [nodes, setNodes] = useState([]);
  const [edges, setEdges] = useState([]);
  const [selectedEdge, setSelectedEdge] = useState(null);
  const [showEdgeModal, setShowEdgeModal] = useState(false);
  const [refresh, setRefresh] = useState(false);
  // const [clicked, setClicked] = useState(false);
  const [newLabel, setNewLabel] = useState("");
  const [source, setSource] = useState("");
  const [target, setTarget] = useState("");

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
    [refresh]
  );

  // const HoverModal = ({ nodeInfo, onClose }) => {
  //   return (
  //     <div className="hover-modal">
  //       <h3>Node Information</h3>
  //       <p>ID: {nodeInfo.id}</p>
  //       <button onClick={onClose}>Close</button>
  //     </div>
  //   );
  // };

  const onNodesChange = useCallback(
    (changes) => setNodes((nds) => applyNodeChanges(changes, nds)),
    [setNodes]
  );
  const onEdgesChange = useCallback(
    (changes) =>
      setEdges((eds) => {
        applyEdgeChanges(changes, eds);
      }),
    [setEdges]
  );
  const fetchData = async () => {
    try {
      const result = await axios.get(
        "http://localhost:1128/api/phase/allPhase"
      );

      if (result.data.length) {
        const newNodes = result.data.map((data) => {
          return {
            id: String(data.id),
            data: { label: data.label },
            position: {
              x: data.positionX,
              y: data.positionY,
            },
            style: {
              background: "gold",
              color: "#333",
              border: "1px solid #222138",
              width: 180,
              borderRadius: "100px",
            },
          };
        });
        setNodes((prev) => [...prev, ...newNodes]);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const fetchEdge = async () => {
    try {
      const result = await axios.get(
        "http://localhost:1128/api/edge/getAll/edge"
      );

      if (result.data.length) {
        const newEdge = result.data.map((data) => {
          return {
            id: String(data.source + "-" + data.target),
            source: String(data.source),
            target: String(data.target),
            label: data.label,
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
    fetchData();
    fetchEdge();
  }, [refresh]);

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
    try {
      await axios.delete(`http://localhost:1128/api/phase/remove/${id}`);
      console.log(`Node with ID ${id} deleted successfully.`);
      setRefresh((prev) => !prev);
    } catch (error) {
      console.error("Error deleting node:", error);
    }
  };

  const updateNodeName = async (id) => {
    try {
      await axios.put(`http://localhost:1128/api/phase/update/${id}`, {
        label: newLabel,
      });
      setRefresh(!refresh);
      // console.log("Node updated:", response.data);
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

  return (
    <div style={{display:'flex'}} >
      <SidebarDash/>
      <div style={{display:'flex',flexDirection:'column',width:'100%'}}>
      <NavbarDashboard />

<div
  style={{
    height: "85%",
    width: "78%",
    position: "absolute",
    top: "12%",
    display: "flex",
    padding:'1rem',
  }}
>

  <ReactFlow
    nodes={nodes}
    onNodesChange={onNodesChange}
    onNodeClick={(event, edge) => {
      setSelectedEdge(edge);
      setShowEdgeModal(true);
      // console.log(selectedEdge?.id)
    }}
    
    onNodeMouseEnter={() => {}}
    edges={edges}
    onEdgesChange={onEdgesChange}
    onConnect={onConnect}
    onNodeDragStop={onNodeDragStop}
    fitView
    style={rfStyle}
  >
    <Background />


    {showEdgeModal && (
      <div
        className="modal fade show"
        style={{ display: "block", position: "relative" }}
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">Edge Details</h5>
              <button
                type="button"
                className="btn-close"
                onClick={() => setShowEdgeModal(false)}
              ></button>
            </div>
            <div className="modal-body">
              <h6>Edge ID: {selectedEdge.id}</h6>
              <input
                name="text"
                class="input"
                placeholder="Update Edge Name"
                style={{
                  width: "500px",
                  borderRadius: "0.75rem",
                  padding: "0.5rem",
                  marginLeft: "4rem",
                  border: "2px solid #f0f0f0",
                  transition: " all 0.2s ease-in-out",
                }}
                onChange={(e) => {
                  setNewLabel(e.target.value);
                }}
              ></input>
            </div>
            <div
              className="modal-footer"
              style={{
                display: "flex",
                justifyContent: "space-between",
                marginLeft: "0.5rem",
              }}
            >
              <DeleteForeverIcon
                style={{
                  color: "gold",
                  height: "40px",
                  width: "40px",
                  borderRadius: "50%",
                  cursor: "pointer",
                }}
                onClick={() => {
                  deleteNode(selectedEdge.id);
                  setShowEdgeModal(false);
                }}
              />
              <EditNoteIcon
                style={{
                  color: "gold",
                  height: "45px",
                  width: "45px",
                  cursor: "pointer",
                }}
                onClick={() => {
                  updateNodeName(selectedEdge.id);
                  setShowEdgeModal(false);
                }}
              />

              <button
                type="button"
                style={{
                  height: "45px",
                  width: "120px",
                  transition: "0.2s",
                  border: "none",
                  borderRadius:'1rem'
                }}
                onClick={() => navigate("/informations")}
              >
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
    top: "20rem",
  }}
>
  <button onClick={addNode} style={{width:'7rem', height:'4rem', backgroundColor:'goldenrod', border:"none", borderRadius:'1rem'}}>Create Step </button>
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
    aria-hidden="true"
  >
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
            aria-label="Close"
          ></button>
        </div>
        <div class="modal-body">
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "1rem",
            }}
          >
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
            data-bs-dismiss="modal"
          >
            Close
          </button>
          <button
            type="button"
            class="btn btn-primary"
            onClick={() => {
              AddEdge();
            }}
          >
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
