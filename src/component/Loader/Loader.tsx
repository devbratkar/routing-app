import React from "react";
import "../../styles/Loader.css";

const Loader: React.FC = () => {
  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
      className="loader"
    >
      <span className="loader-text">L</span>
      <span className="loader-text">O</span>
      <span className="loader-text">A</span>
      <span className="loader-text">D</span>
      <span className="loader-text">I</span>
      <span className="loader-text">N</span>
      <span className="loader-text">G</span>
    </div>
  );
};

export default Loader;
