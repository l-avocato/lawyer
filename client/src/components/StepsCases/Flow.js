import { useState, useCallback } from "react";

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
import axios from "axios"

const rfStyle = {
  backgroundColor: "#B8CEFF",
};
const initialNodes = [
  {
    id: "1",
    data: { label: "open case" },
    position: { x: 0, y: 0 },

    style: {
      background: "gold",
      color: "#333",
      border: "1px solid #222138",
      width: 180,
      borderRadius: "100px",
    },
  },
  {
    id: "2",
    type: "textUpdater",
    data: { label: "first step" },
    position: { x: 100, y: 100 },
    style: {
      background: "gold",
      border: "1px solid #222138",
      width: 180,
      borderRadius: "100px",
    },
  },
  {
    id: "3",
    data: { label: "second step" },
    position: { x: 200, y: 200 },
    style: {
      background: "gold",
      color: "#333",
      border: "1px solid #222138",
      width: 180,
      borderRadius: "100px",
    },
  },
  {
    id: "4",
    data: { label: "3eme step" },
    position: { x: 300, y: 300 },
    style: {
      background: "gold",
      color: "#333",
      border: "1px solid #222138",
      width: 180,
      borderRadius: "100px",
    },
  },
];

const initialEdges = [
  { id: "1-2", source: "1", target: "2", label: "to the", type: "step" },
  { id: "2-3", source: "2", target: "3", label: "what happend", type: "step" },
  { id: "3-4", source: "3", target: "4", label: "to the", type: "step" },
];

function Flow() {
  const [nodes, setNodes] = useState([]);
  const [edges, setEdges] = useState(initialEdges);

  const [selectedEdge, setSelectedEdge] = useState(null);
  const [showEdgeModal, setShowEdgeModal] = useState(false);

  const [ edge , setEdge]= useState([])
  console.log(edge);
  //  const [label, setLabel] = useState("")
  //  const [ x, setX]=useState(0)
  //  const [y, setY]=useState(0)
  // const [color, setColor]= useState("")

  const onConnect = useCallback(
    (params) => setEdges((eds) => addEdge(params, eds)),
    []
  );

  const onNodesChange = useCallback(
    (changes) => setNodes((nds) => applyNodeChanges(changes, nds)),
    [setNodes]
  );
  const onEdgesChange = useCallback(
    (changes) => setEdges((eds) => applyEdgeChanges(changes, eds)),
    [setEdges]
  );

  // const addNode = () => {
  //   const newNode = {
  //     id: String(initialNodes.length + 1),
  //     data: { label: "text" },
  //     position: {
  //       x: 300,
  //       y: 0,
  //     },
  //     style: {
  //       background: "gold",
  //       color: "#333",
  //       border: "1px solid #222138",
  //       width: 180,
  //       borderRadius: "100px",
  //     },
  //   };
  //   initialEdges.push(newNode);
  //   setNodes((node) => [...nodes, newNode]);
  // };

  const fetchData =  async ()=>{
    try {
      const result = await axios.get("http://localhost:1128/api/phase/allPhase")
      setEdge(result.data)

    } catch (error) {
      throw new Error  
    }
  }

  useEffect(() => {
    fetchData()
    setNodes(initialNodes);
  }, [initialNodes.length]);



  const addNode = () => {
    const newNode = {
      label: "New Node", 
      positionX: 0, 
      positionY: 0, 
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
        console.log(createdNode);
          setNodes((prevNodes) => [...prevNodes, createdNode]);
      })
      .catch((error) => {
        console.error("Failed to add a new node:", error);
      });
  };
  


  return (
    <div>
      <NavbarDashboard />

      <div
        style={{
          height: "75%",
          width: "60%",
          position: "absolute",
          top: "15%",
          display: "flex",
          marginLeft: "25rem",
          backgroundColor: "black",
        }}
      >
        <ReactFlow
          nodes={nodes}
          onNodesChange={onNodesChange}
          onNodeClick={(event, edge) => {
            setSelectedEdge(edge);
            setShowEdgeModal(true);
          }}
          // onNodeMouseEnter={()=>}
          edges={edges}
          onEdgesChange={onEdgesChange}
          onConnect={onConnect}
          fitView
          style={rfStyle}
        >
          <Background />

          {showEdgeModal && (
            <div
              className="modal fade show"
              style={{ display: "block", height: "18rem" }}
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
                    <h6>Edge Label: {selectedEdge.label}</h6>
                    {/* Add other edge details as needed */}
                  </div>
                  <div className="modal-footer">
                    <button
                      type="button"
                      className="btn btn-secondary"
                      onClick={() => setShowEdgeModal(false)}
                    >
                      Close
                    </button>
                    <button type="button" className="btn btn-secondary">
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
          right: 40,
          display: "flex",
          gap: "6px",
          flexDirection: "column",
          top: "20rem",
        }}
      >
        <button onClick={addEdge}>Create Step </button>

        <button data-bs-toggle="modal" data-bs-target="#staticBackdrops">
          Edge
        </button>
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
                  />
                  <label for="name">Label</label>

                  <input
                    style={{
                      display: "flex",
                      width: "35rem",
                      borderRadius: "0.5rem",
                      height: "2.5rem",
                    }}
                    type="number"
                    placeholder="Label"
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
                <button type="button" class="btn btn-primary">
                  Insert
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Flow;
