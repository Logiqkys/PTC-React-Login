import React from "react";
import TableComponent from "../components/Table/TableComponent";

const ViewerPage: React.FC = () => {
  return (
    <div
      style={{
        padding: "2rem",
        backgroundColor: "#f4f4f9",
        minHeight: "100vh",
      }}
    >
      <header style={{ marginBottom: "1.5rem", textAlign: "center" }}>
        <h1 style={{ fontSize: "2rem", color: "#333", marginBottom: "0.5rem" }}>
          Table
        </h1>
        <h2 style={{ fontSize: "1.2rem", color: "#666" }}>Role: Viewer</h2>
      </header>
      <TableComponent isEditable={false} />
    </div>
  );
};

export default ViewerPage;
