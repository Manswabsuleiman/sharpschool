import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { GraduationCap } from "lucide-react";
import AI from "../Components/AI";

const FeeStructure = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  // Parent state from localStorage
  const [parent, setParent] = useState(() => {
    const storedParent = localStorage.getItem("parent");
    return storedParent ? JSON.parse(storedParent) : null;
  });

  // Listen for login/logout
  useEffect(() => {
    const handleLogin = () => {
      const storedParent = localStorage.getItem("parent");
      setParent(storedParent ? JSON.parse(storedParent) : null);
    };
    const handleLogout = () => setParent(null);

    window.addEventListener("parentLogin", handleLogin);
    window.addEventListener("parentLogout", handleLogout);

    return () => {
      window.removeEventListener("parentLogin", handleLogin);
      window.removeEventListener("parentLogout", handleLogout);
    };
  }, []);

  // Auto-hide error
  useEffect(() => {
    if (errorMsg) {
      const timer = setTimeout(() => setErrorMsg(""), 3000);
      return () => clearTimeout(timer);
    }
  }, [errorMsg]);

  // Handle Payment
  const handlePayFees = () => {
    if (!parent) {
      setErrorMsg("Please log in as a Parent to proceed with payments.");
      return;
    }
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      navigate("/payments");
    }, 2000);
  };

  // **Responsive Styles**
  const containerStyle = {
    padding: "20px",
    marginTop: "140px",
    maxWidth: "900px",
    margin: "140px auto 40px auto",
  };

  const buttonWrapper = {
    display: "flex",
    justifyContent: "center",
    marginBottom: "20px",
  };

  const buttonStyle = {
    color: "#fff",
    border: "none",
    borderRadius: "12px",
    padding: "12px 25px",
    fontWeight: "600",
    background: parent ? "#0e35b6ff" : "#aaa",
    cursor: parent ? "pointer" : "not-allowed",
    width: "100%",
    maxWidth: "280px",
    fontSize: "16px",
  };

  const tableContainer = {
    width: "100%",
    overflowX: "auto",
    marginTop: "25px",
  };

  const tableStyle = {
    width: "100%",
    minWidth: "700px",
    borderCollapse: "collapse",
    background: "#fff",
  };

  const thTdStyle = {
    border: "1px solid #ddd",
    padding: "12px",
    textAlign: "left",
    fontSize: "15px",
  };

  const thStyle = {
    ...thTdStyle,
    backgroundColor: "#f4f4f4",
    fontWeight: "700",
  };

  const overlayStyle = {
    display: loading ? "flex" : "none",
    position: "fixed",
    top: 0,
    left: 0,
    width: "100vw",
    height: "100vh",
    backgroundColor: "rgba(3, 7, 30, 0.6)",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 9999,
  };

  const spinnerStyle = {
    border: "6px solid #f3f3f3",
    borderTop: "6px solid #0026ffff",
    borderRadius: "50%",
    width: "60px",
    height: "60px",
    animation: "spin 1s linear infinite",
  };

  return (
    <>
      <div style={containerStyle}>

        {/* Logo + Title */}
        <div style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          gap: "10px",
          marginBottom: "10px"
        }}>
          <GraduationCap size={40} color="#003af9ff" />
          <span style={{ fontSize: "30px", fontWeight: "bold", color: "#0015ffff" }}>
            SharpMind
          </span>
        </div>

        <h2 style={{
          textAlign: "center",
          fontSize: "24px",
          fontWeight: "bold",
          color: "#2a3a5e",
          lineHeight: "32px",
          padding: "0 10px"
        }}>
          SharpMind International School – Fee Structure (January 2026)
        </h2>

        {/* Error Message */}
        {errorMsg && (
          <div style={{
            backgroundColor: "#ffebee",
            color: "#c62828",
            padding: "15px",
            borderRadius: "10px",
            fontWeight: "600",
            textAlign: "center",
            marginTop: "20px",
            border: "1px solid #f44336"
          }}>
            {errorMsg}
          </div>
        )}

        {/* Pay Button */}
        <div style={buttonWrapper}>
          <button
            onClick={handlePayFees}
            disabled={!parent || loading}
            style={buttonStyle}
          >
            {parent ? (loading ? "Processing..." : "Pay Fees Online") : "Login to pay fees"}
          </button>
        </div>

        {/* Table */}
        <div style={tableContainer}>
          <table style={tableStyle}>
            <thead>
              <tr>
                <th style={thStyle}>Level / Category</th>
                <th style={thStyle}>Term Fee (KES) – 2026</th>
                <th style={thStyle}>Notes</th>
              </tr>
            </thead>

            <tbody>
              {[
                ["Kindergarten / Early Years", "180,000", "Standard international KG tuition estimate."],
                ["Primary (Years 1–6)", "230,000 – 360,000", "Fees increase slightly by grade."],
                ["Middle School (Years 7–9)", "350,000", "Typical mid-level international school cost."],
                ["IGCSE (Years 10–11)", "400,000", "Exam preparation years are usually higher."],
                ["A-Level (Years 12–13)", "550,000", "Pre-university advanced program."],
                ["Admission Fee (One-time)", "25,000", "Paid once during enrollment."],
                ["Caution Deposit", "40,000", "Refundable upon exit."],
                ["Boarding (Optional)", "200,000 – 250,000", "If the school has boarding facilities."],
                ["Transport (Optional)", "30,000 – 80,000", "Depends on route and zone."],
              ].map((row, i) => (
                <tr key={i}>
                  <td style={thTdStyle}>{row[0]}</td>
                  <td style={thTdStyle}>{row[1]}</td>
                  <td style={thTdStyle}>{row[2]}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Loading Spinner */}
      <div style={overlayStyle}>
        <div style={spinnerStyle}></div>
      </div>

      {/* Spinner Animation */}
      <style>
        {`
          @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }

          @media (max-width: 600px) {
            h2 {
              font-size: 20px !important;
            }
          }
        `}
      </style>

      <AI />
    </>
  );
};

export default FeeStructure;
