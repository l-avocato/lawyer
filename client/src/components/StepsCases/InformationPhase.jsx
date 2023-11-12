import React, { useState } from "react";
import SidebarDash from "../SidebarDash/SidebarDash";

////////////// Information Phase //////////////////

const InformationsPhaseContent = () => {
  return (
    <div
      style={{
        border: "3px solid #ccc",
        padding: "10px",
        boxSizing: "border-box",
        display: "flex",

        justifyContent: "center",
        marginLeft: "290px",
      }}
    >
      <div style={{ display: "flex", flexDirection: "column" }}>
        <h3 style={{ fontWeight: "bold", color: "grey", fontSize: "50px" }}>
          Informations Phase
        </h3>

        <div style={{ marginTop: "10px" }}>
          <h3 style={{ fontSize: "1.2em", color: "green" }}>Name of phase:</h3>
          <h5 style={{ color: "gray" }}>Description</h5>
        </div>

        <br />

        <div style={{ marginTop: "10px" }}>
          <h3 style={{ fontSize: "1.2em", color: "purple" }}>Informations:</h3>
          <h5 style={{ color: "black" }}>All informations</h5>
        </div>
      </div>
    </div>
  );
};
//////////////////////    Documents   ////////////////////////

const DocumentsContent = () => {
  return (
    <div
      style={{
        border: "3px solid #ccc",
        padding: "10px",
        boxSizing: "border-box",
        display: "flex",

        justifyContent: "center",
        marginLeft: "290px",
      }}
    >
      <div style={{ display: "flex", flexDirection: "column" }}>
        <h3 style={{ fontWeight: "bold", color: "grey", fontSize: "50px" }}>
          All documents
        </h3>
        <h3>Documents Content</h3>
      </div>
    </div>
  );
};
//////// Note ////////
const NotesContent = () => {
  return (
    <div
      style={{
        border: "3px solid #ccc",
        padding: "10px",
        boxSizing: "border-box",
        display: "flex",

        justifyContent: "center",
        marginLeft: "290px",
      }}
    >
      <div style={{ display: "flex", flexDirection: "column" }}>
        <h3 style={{ fontWeight: "bold", color: "grey", fontSize: "50px" }}>
          {" "}
          Notes{" "}
        </h3>
        <div className="card bg-light mb-3" style={{ maxWidth: "18rem" }}>
          <div className="card-header">Header</div>
          <div className="card-body">
            <h5 className="card-title">Light card title</h5>
            <p className="card-text">
              Some quick example text to build on the card title and make up the
              bulk of the card's content.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

//////////////////////////////////////////////////////////////////////////////

const InformationPhase = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  const handleItemClick = (index) => {
    setActiveIndex(index);
  };

  const handleAddCard = () => {
    console.log("Adding a new card!");
  };

  return (
    <div>
      <SidebarDash />
      <div>
        <ul
          className="bottom-nav-ul"
          style={{ display: "flex", gap: "5rem", marginLeft: "60px", marginTop: "40px"}}
        >
          <li
            onClick={() => handleItemClick(0)}
            className={`my-text ${activeIndex === 0 ? "highlight" : ""}`}
            style={{ fontSize: "20px", color: "black", fontWeight: "bold" }}
          >
            Informations
          </li>

          <li
            onClick={() => handleItemClick(1)}
            className={`my-text ${activeIndex === 1 ? "highlight" : ""}`}
            style={{ fontSize: "20px", color: "black", fontWeight: "bold" }}
          >
            Documents
          </li>
          <li
            onClick={() => handleItemClick(2)}
            className={`my-text ${activeIndex === 2 ? "highlight" : ""}`}
            style={{ fontSize: "20px", color: "black", fontWeight: "bold" }}
          >
            Notes
          </li>
        </ul>
      </div>

      <div style={{ flex: 2, padding: "20px" }}>
        {activeIndex === 0 && <InformationsPhaseContent />}
        {activeIndex === 1 && <DocumentsContent />}
        {activeIndex === 2 && <NotesContent onAddCard={handleAddCard} />}
      </div>
    </div>
  );
};

export default InformationPhase;
