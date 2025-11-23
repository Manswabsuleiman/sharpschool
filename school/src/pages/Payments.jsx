import React, { useState } from "react";
import AI from "../Components/AI";

const Payments = () => {
  const containerStyle = {
    marginTop: "150px",
    width: "100%",
    display: "flex",
    justifyContent: "center",
    flexDirection: "column",
    alignItems: "center",
  };

  const formStyle = {
    width: "90%",
    maxWidth: "600px",
    padding: "25px",
    border: "1px solid #ccc",
    borderRadius: "10px",
    backgroundColor: "#f9f9f9",
    marginBottom: "30px",
  };

  const labelStyle = {
    display: "block",
    marginBottom: "5px",
    fontWeight: "bold",
  };

  const inputStyle = {
    width: "100%",
    padding: "10px",
    marginBottom: "15px",
    borderRadius: "6px",
    border: "1px solid #bbb",
    fontSize: "15px",
  };

  const buttonStyle = {
    width: "100%",
    padding: "12px",
    backgroundColor: "#09369fff",
    color: "white",
    border: "none",
    borderRadius: "6px",
    fontSize: "16px",
    fontWeight: "bold",
    cursor: "pointer",
  };

  const iframeStyle = {
    width: "100%",
    maxWidth: "700px",
    height: "650px",
    border: "none",
    marginTop: "20px",
    borderRadius: "10px",
  };

  const [formData, setFormData] = useState({
    studentName: "",
    grade: "",
    amount: "",
    parentName: "",
    parentId: "",
    parentPhone: "",
    parentEmail: "", // Add email for Pesapal
  });

  const [loading, setLoading] = useState(false);
  const [iframeUrl, setIframeUrl] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate all fields
    for (let key in formData) {
      if (!formData[key]) {
        alert("Please fill all fields");
        return;
      }
    }

    setLoading(true);

    try {
      // Map form data to backend expected fields
      const [firstName, ...rest] = formData.parentName.split(" ");
      const lastName = rest.join(" ") || "Parent";

      const requestBody = {
        amount: formData.amount,
        email: formData.parentEmail, // dynamic email
        phoneNumber: formData.parentPhone, // dynamic phone
        firstName: firstName,
        lastName: lastName,
        description: `School fees for ${formData.studentName}, Grade ${formData.grade}`,
      };

      const response = await fetch("http://localhost:8000/api/pesapal/initiate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(requestBody),
      });

      const data = await response.json();

      if (data.success) {
        setIframeUrl(data.iframeUrl);
      } else {
        console.log("Backend response:", data);
        alert("Failed to start payment. Try again.");
      }
    } catch (err) {
      console.log(err);
      alert("Network error, try again.");
    }

    setLoading(false);
  };

  return (
    <div style={containerStyle}>
      {!iframeUrl && (
        <form style={formStyle} onSubmit={handleSubmit}>
          <h2 style={{ textAlign: "center", marginBottom: "20px" }}>Pay School Fees</h2>

          <label style={labelStyle}>Student Full Name *</label>
          <input
            type="text"
            name="studentName"
            style={inputStyle}
            placeholder="Enter full name"
            value={formData.studentName}
            onChange={handleChange}
            required
          />

          <label style={labelStyle}>Class / Grade *</label>
          <input
            type="text"
            name="grade"
            style={inputStyle}
            placeholder="Grade"
            value={formData.grade}
            onChange={handleChange}
            required
          />

          <label style={labelStyle}>Amount (KES) *</label>
          <input
            type="number"
            name="amount"
            style={inputStyle}
            placeholder="Enter amount"
            value={formData.amount}
            onChange={handleChange}
            required
          />

          <label style={labelStyle}>Parent Full Name *</label>
          <input
            type="text"
            name="parentName"
            style={inputStyle}
            placeholder="Enter parent's full name"
            value={formData.parentName}
            onChange={handleChange}
            required
          />

          <label style={labelStyle}>Parent Email *</label>
          <input
            type="email"
            name="parentEmail"
            style={inputStyle}
            placeholder="Enter parent's email"
            value={formData.parentEmail}
            onChange={handleChange}
            required
          />

          <label style={labelStyle}>Parent ID Number *</label>
          <input
            type="number"
            name="parentId"
            style={inputStyle}
            placeholder="Enter ID number"
            value={formData.parentId}
            onChange={handleChange}
            required
          />

          <label style={labelStyle}>Parent Phone Number *</label>
          <input
            type="tel"
            name="parentPhone"
            style={inputStyle}
            placeholder="Enter phone number"
            value={formData.parentPhone}
            onChange={handleChange}
            required
          />

          <button type="submit" style={buttonStyle}>
            {loading ? "Please wait..." : "Pay Fees"}
          </button>
        </form>
      )}

      {iframeUrl && <iframe src={iframeUrl} style={iframeStyle} title="Pesapal Payment" />}

      <AI />
    </div>
  );
};

export default Payments;
