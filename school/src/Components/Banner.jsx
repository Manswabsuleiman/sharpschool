import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const CourseFinder = () => {
  const navigate = useNavigate();
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const isMobile = windowWidth < 768;
  const isTablet = windowWidth >= 768 && windowWidth < 1024;

  return (
    <div
      style={{
        display: "flex",
        flexDirection: isMobile ? "column" : "row",
        alignItems: "stretch",
        width: "100%",
        minHeight: "70vh",
        margin: 0,
        padding: 0,
        boxSizing: "border-box",
      }}
    >
      {/* Left Image Section */}
      <div style={{ flex: 1, minWidth: "300px", height: isMobile ? "250px" : "auto" }}>
        <img
          src="./Pictures/Banner.png"
          alt="Students Learning"
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            display: "block",
          }}
        />
      </div>

      {/* Right Form Section */}
      <div
        style={{
          flex: 1,
          minWidth: "300px",
          backgroundColor: "#0A1F44",
          color: "white",
          padding: isMobile ? "30px 20px" : isTablet ? "40px 30px" : "50px 40px",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          boxSizing: "border-box",
        }}
      >
        <p
          style={{
            color: "#1E90FF",
            fontSize: isMobile ? "12px" : "14px",
            marginBottom: "10px",
          }}
        >
          JOIN THE BEST AT SHARPMIND SCHOOL
        </p>

        <h2
          style={{
            fontSize: isMobile ? "24px" : isTablet ? "28px" : "32px",
            fontWeight: "700",
            marginBottom: "20px",
          }}
        >
          Unlock Your Child’s Full Potential
        </h2>

        <p
          style={{
            fontSize: isMobile ? "14px" : "16px",
            lineHeight: "1.6",
            marginBottom: "25px",
            opacity: 0.8,
          }}
        >
          At SharpMind School, we nurture excellence, inspire creativity, and empower future leaders.
        </p>

        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            gap: "10px",
            marginBottom: "20px",
          }}
        >
          <input
            type="text"
            placeholder="Student Name"
            style={{
              flex: 1,
              padding: isMobile ? "10px 12px" : "12px 15px",
              borderRadius: "6px",
              border: "1px solid #1E90FF",
              backgroundColor: "#0A1F44",
              color: "white",
              margin: 0,
            }}
          />
          <input
            type="email"
            placeholder="Parent Email"
            style={{
              flex: 1,
              padding: isMobile ? "10px 12px" : "12px 15px",
              borderRadius: "6px",
              border: "1px solid #1E90FF",
              backgroundColor: "#0A1F44",
              color: "white",
              margin: 0,
            }}
          />
        </div>

        <button
          onClick={() => navigate("/admission")}
          style={{
            padding: isMobile ? "10px 20px" : "12px 25px",
            backgroundColor: "#1E90FF",
            border: "none",
            borderRadius: "6px",
            color: "white",
            fontWeight: "700",
            cursor: "pointer",
            width: isMobile ? "100%" : "fit-content",
            margin: 0,
          }}
        >
          APPLY NOW
        </button>
      </div>
    </div>
  );
};

export default CourseFinder;
