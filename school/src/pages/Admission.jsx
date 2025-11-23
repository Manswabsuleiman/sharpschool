import React, { useState } from "react";
import Footer from "../Components/Footer";
import AI from "../Components/AI";

const Admission = () => {
  const [formData, setFormData] = useState({
    childName: "",
    dob: "",
    gender: "",
    class: "",
    parentName: "",
    parentID: "",
    email: "",
    phone: "",
    address: "",
  });

  const [isLoading, setIsLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    try {
      const response = await fetch("http://localhost:8000/send-email", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (data.success) {
        setSubmitted(true);
        setFormData({
          childName: "",
          dob: "",
          gender: "",
          class: "",
          parentName: "",
          parentID: "",
          email: "",
          phone: "",
          address: "",
        });
        setTimeout(() => setSubmitted(false), 4000);
      } else {
        setError(data.error || "Failed to send email");
      }
    } catch (err) {
      setError("Server error, please try again later");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div style={{ marginTop: "130px" }}>
      {/* HERO IMAGE */}
      <img
        src="./Pictures/snap.png"
        alt="SharpMind School"
        style={{
          width: "100%",
          height: "auto",
          display: "block",
          maxHeight: "350px",
          objectFit: "cover",
        }}
      />

      {/* FORM CONTAINER */}
      <div
        style={{
          padding: "20px",
          maxWidth: "800px",
          margin: "0 auto",
        }}
      >
        <h2
          style={{
            textAlign: "center",
            marginBottom: "25px",
            color: "#0e35b6ff",
            fontSize: "26px",
          }}
        >
          SharpMind Admission Form
        </h2>

        <form
          onSubmit={handleSubmit}
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "15px",
          }}
        >
          <input
            type="text"
            name="childName"
            placeholder="Child Full Name"
            value={formData.childName}
            onChange={handleChange}
            required
            style={inputStyle}
          />

          <input
            type="date"
            name="dob"
            value={formData.dob}
            onChange={handleChange}
            required
            style={inputStyle}
          />

          <select
            name="gender"
            value={formData.gender}
            onChange={handleChange}
            required
            style={inputStyle}
          >
            <option value="">Select Gender</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
            <option value="Other">Other</option>
          </select>

          <select
            name="class"
            value={formData.class}
            onChange={handleChange}
            required
            style={inputStyle}
          >
            <option value="">Select Class / Grade</option>
            {[
              "Kindergarten",
              "Year 1",
              "Year 2",
              "Year 3",
              "Year 4",
              "Year 5",
              "Year 6",
              "Year 7",
              "Year 8",
              "Year 9",
              "IGCSE Year 10",
              "IGCSE Year 11",
              "A-Level Year 12",
              "A-Level Year 13",
            ].map((c, i) => (
              <option key={i} value={c}>
                {c}
              </option>
            ))}
          </select>

          <input
            type="text"
            name="parentName"
            placeholder="Parent / Guardian Full Name"
            value={formData.parentName}
            onChange={handleChange}
            required
            style={inputStyle}
          />

          <input
            type="text"
            name="parentID"
            placeholder="Parent ID / Passport Number"
            value={formData.parentID}
            onChange={handleChange}
            required
            style={inputStyle}
          />

          <input
            type="email"
            name="email"
            placeholder="Email Address"
            value={formData.email}
            onChange={handleChange}
            required
            style={inputStyle}
          />

          <input
            type="tel"
            name="phone"
            placeholder="Phone Number"
            value={formData.phone}
            onChange={handleChange}
            required
            style={inputStyle}
          />

          <textarea
            name="address"
            placeholder="Residential Address"
            value={formData.address}
            onChange={handleChange}
            required
            rows="3"
            style={{ ...inputStyle, resize: "none" }}
          ></textarea>

          <button type="submit" style={buttonStyle}>
            {isLoading ? "Submitting..." : "Submit Admission Form"}
          </button>
        </form>

        {error && (
          <p style={{ color: "red", marginTop: "10px", fontWeight: "600" }}>
            {error}
          </p>
        )}
      </div>

      {/* SUCCESS MESSAGE */}
      {submitted && <div style={successStyle}>Form submitted successfully!</div>}

      {/* OVERLAY LOADING SPINNER */}
      {isLoading && (
        <div style={overlayStyle}>
          <div style={spinnerStyle}></div>
        </div>
      )}

      <Footer />
      <AI />
    </div>
  );
};

/* -----------------------------
   INPUT + BUTTON STYLES
----------------------------- */
const inputStyle = {
  padding: "12px 15px",
  borderRadius: "6px",
  border: "1px solid #0e35b6ff",
  outline: "none",
  fontSize: "15px",
};

const buttonStyle = {
  padding: "14px",
  backgroundColor: "#0e35b6ff",
  color: "#fff",
  fontWeight: "700",
  border: "none",
  borderRadius: "6px",
  cursor: "pointer",
  fontSize: "16px",
  transition: "0.3s",
};

/* -----------------------------
   LOADING OVERLAY
----------------------------- */
const overlayStyle = {
  position: "fixed",
  top: 0,
  left: 0,
  width: "100vw",
  height: "100vh",
  backgroundColor: "rgba(8, 8, 36, 0.8)",
  backdropFilter: "blur(4px)",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  zIndex: 1000,
};

const spinnerStyle = {
  width: "60px",
  height: "60px",
  border: "6px solid #fff",
  borderTop: "6px solid #1E90FF",
  borderRadius: "50%",
  animation: "spin 1s linear infinite",
};

/* Inject spinner keyframes */
const sheet = document.styleSheets[0];
sheet.insertRule(
  `@keyframes spin { 0% { transform: rotate(0deg);} 100% { transform: rotate(360deg);} }`,
  sheet.cssRules.length
);

/* -----------------------------
   SUCCESS POPUP
----------------------------- */
const successStyle = {
  position: "fixed",
  bottom: "240px",
  left: "50%",
  transform: "translateX(-50%)",
  backgroundColor: "#022fc2ff",
  color: "white",
  padding: "15px 25px",
  borderRadius: "8px",
  fontWeight: "700",
  fontSize: "16px",
  animation: "slideUp 0.7s ease forwards",
  zIndex: 1001,
};

sheet.insertRule(
  `@keyframes slideUp {
     0% { transform: translateX(-50%) translateY(80px); opacity:0; }
     100% { transform: translateX(-50%) translateY(0); opacity:1; }
   }`,
  sheet.cssRules.length
);

export default Admission;
