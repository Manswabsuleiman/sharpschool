import React, { useState } from "react";
import axios from "axios";

const LoginModal = ({ open, onClose, setParent }) => {
  const [role, setRole] = useState("parent");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  if (!open) return null;

  const handleLogin = async () => {
    if (!email || !password) {
      setMessage("Please enter both email and password.");
      setTimeout(() => setMessage(""), 3000);
      return;
    }

    setLoading(true);
    try {
      if (role === "parent") {
        const res = await axios.post("http://localhost:8000/parent/login", {
          username: email,
          password,
        });

        localStorage.setItem("accessToken", res.data.accessToken);
        localStorage.setItem("refreshToken", res.data.refreshToken);
        localStorage.setItem("parent", JSON.stringify(res.data.parent));

        setParent(res.data.parent);
        window.dispatchEvent(new Event("parentLogin"));

        setMessage("Login successful! ✅");
        setEmail("");
        setPassword("");

        setTimeout(() => {
          setMessage("");
          onClose();
        }, 1500);
      } else {
        setMessage("Admin login not implemented yet.");
        setTimeout(() => setMessage(""), 3000);
      }
    } catch (err) {
      console.error(err);
      setMessage(
        err.response?.data?.message || "Login failed. Please try again."
      );
      setTimeout(() => setMessage(""), 3000);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        height: "100vh",
        backgroundColor: "rgba(0,0,0,0.5)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        zIndex: 9999,
        padding: "10px",
      }}
    >
      <div
        style={{
          width: "100%",
          maxWidth: "400px",
          background: "#fff",
          borderRadius: "12px",
          padding: "25px",
          position: "relative",
          boxShadow: "0 8px 20px rgba(0,0,0,0.25)",
          textAlign: "center",
        }}
      >
        <button
          onClick={onClose}
          style={{
            position: "absolute",
            top: "15px",
            right: "15px",
            background: "transparent",
            border: "none",
            fontSize: "20px",
            cursor: "pointer",
          }}
        >
          ✖
        </button>

        <h2
          style={{
            fontSize: "22px",
            marginBottom: "20px",
            fontWeight: "700",
            lineHeight: "1.2",
          }}
        >
          Sign in to <span style={{ color: "#000dbeff" }}>SharpMind School</span>
        </h2>

        <div
          style={{
            display: "flex",
            justifyContent: "center",
            gap: "15px",
            marginBottom: "20px",
            flexWrap: "wrap",
          }}
        >
          {["parent", "admin"].map((r) => (
            <label
              key={r}
              style={{
                padding: "8px 15px",
                borderRadius: "8px",
                border: role === r ? "2px solid #2a6fdb" : "1px solid #ccc",
                cursor: "pointer",
                fontWeight: role === r ? "700" : "500",
                fontSize: "14px",
                flex: "1 1 40%",
                textAlign: "center",
              }}
            >
              <input
                type="radio"
                name="role"
                value={r}
                checked={role === r}
                onChange={() => setRole(r)}
                style={{ display: "none" }}
              />
              {r.charAt(0).toUpperCase() + r.slice(1)}
            </label>
          ))}
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
          <input
            type="text"
            placeholder="Email address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            style={{
              padding: "10px",
              borderRadius: "8px",
              border: "1px solid #ccc",
              outline: "none",
              fontSize: "14px",
              width: "100%",
            }}
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            style={{
              padding: "10px",
              borderRadius: "8px",
              border: "1px solid #ccc",
              outline: "none",
              fontSize: "14px",
              width: "100%",
            }}
          />

          <button
            onClick={handleLogin}
            disabled={loading}
            style={{
              padding: "12px",
              backgroundColor: "#2a6fdb",
              color: "#fff",
              border: "none",
              borderRadius: "8px",
              cursor: loading ? "not-allowed" : "pointer",
              fontSize: "16px",
              fontWeight: "700",
              marginTop: "10px",
            }}
          >
            {loading
              ? "Logging in..."
              : `Login as ${role === "parent" ? "Parent" : "Admin"}`}
          </button>

          {message && (
            <div
              style={{
                marginTop: "10px",
                color: message.includes("successful") ? "green" : "red",
                fontWeight: "600",
                fontSize: "14px",
              }}
            >
              {message}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default LoginModal;
