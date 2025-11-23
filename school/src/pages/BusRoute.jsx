import React, { useState, useEffect } from "react";
import AI from "../Components/AI";

const BusRoute = () => {
  const [isMobile, setIsMobile] = useState(window.innerWidth < 700);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 700);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const container = {
    marginTop: isMobile ? "120px" : "100px",
    width: "100%",
    minHeight: "100vh",
    padding: isMobile ? "15px" : "20px",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    backgroundColor: "#f5f5f5",
    boxSizing: "border-box",
  };

  const titleStyle = {
    fontSize: isMobile ? "22px" : "32px",
    fontWeight: "bold",
    marginTop: isMobile ? "50px" : "50px",
    marginBottom: "20px",
    color: "#1a237e",
    textAlign: "center",
    padding: "0 10px",
  };

  const busImageContainer = {
    width: "100%",
    maxWidth: "800px",
    height: isMobile ? "220px" : "350px",
    borderRadius: "12px",
    marginTop: isMobile ? "20px" : "50px",
    overflow: "hidden",
    marginBottom: "30px",
    boxShadow: "0 4px 10px rgba(0,0,0,0.2)",
  };

  const busImageStyle = {
    width: "100%",
    height: "100%",
    objectFit: "cover",
  };

  const routeBox = {
    width: "100%",
    maxWidth: "850px",
    padding: isMobile ? "15px" : "20px",
    borderRadius: "12px",
    backgroundColor: "white",
    boxShadow: "0 4px 10px rgba(0,0,0,0.15)",
    boxSizing: "border-box",
  };

  const routeTitle = {
    fontSize: isMobile ? "18px" : "24px",
    fontWeight: "bold",
    marginBottom: "15px",
    color: "#333",
    textAlign: isMobile ? "center" : "left",
  };

  const routeList = {
    paddingLeft: isMobile ? "15px" : "20px",
    fontSize: isMobile ? "15px" : "18px",
    lineHeight: "1.7",
  };

  return (
    <div style={container}>
      <h1 style={titleStyle}>SharpMind School Bus Routes</h1>

      {/* Bus Image */}
      <div style={busImageContainer}>
        <img
          src="./Pictures/bus2.png"
          alt="School Bus"
          style={busImageStyle}
        />
      </div>

      {/* Route List */}
      <div style={routeBox}>
        <h2 style={routeTitle}>Daily Pick-Up & Drop-Off Locations (Nakuru)</h2>

        <ul style={routeList}>
          <li>Nakuru Town CBD – Kenyatta Avenue</li>
          <li>Free Area – Pipeline Road</li>
          <li>Shabab Area – Near Westside Mall</li>
          <li>London Estate – Opp. Naka Primary</li>
          <li>Naka Estate – Jacaranda Road</li>
          <li>Kiamunyi – Olive Inn Stage</li>
          <li>Kaptembwa – Main Stage</li>
          <li>Racecourse Area – Racecourse Stage</li>
          <li>Lanets – Highway Junction</li>
          <li>Section 58 – Near Naivas Supermarket</li>
        </ul>
      </div>

      <AI />
    </div>
  );
};

export default BusRoute;
