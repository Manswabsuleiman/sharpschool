import React from "react";
import Footer from "../Components/Footer";
import AI from "../Components/AI";

const SchoolUniform = () => {
  const container = {
    marginTop: "120px",
    padding: "20px",
    textAlign: "center",
  };

  const titleStyle = {
    fontSize: "28px",
    fontWeight: "700",
    marginBottom: "25px",
    marginTop: "35px",
    color: "#333",
  };

  const imageWrapper = {
    display: "flex",
    justifyContent: "center",
    gap: "20px",
    flexWrap: "wrap",
    width: "100%",
  };

  const imgStyle = {
    width: "250px",
    maxWidth: "90%", // <--- responsive scaling
    height: "auto",
    borderRadius: "12px",
    boxShadow: "0 4px 10px rgba(0,0,0,0.15)",
  };

  return (
    <div style={container}>
      <h2 style={titleStyle}>SharpMind School Uniform</h2>

      <div style={imageWrapper}>
        <img src="./Pictures/uniform.png" alt="" style={imgStyle} />
        <img src="./Pictures/uniform6.png" alt="" style={imgStyle} />
        <img src="./Pictures/uniform3.png" alt="" style={imgStyle} />
      </div>

      <AI />
    </div>
  );
};

export default SchoolUniform;
