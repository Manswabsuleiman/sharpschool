require("dotenv").config();
const express = require("express");
const cors = require("cors");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { v4: uuidv4 } = require("uuid");
const axios = require("axios");
const sendEmail = require("./Email"); // your email handler

const app = express();
app.use(cors());
app.use(express.json()); // built-in parser

// =========================
// Parent Backend
// =========================
let parents = [
  {
    id: 1,
    username: "manswab123",
    password: bcrypt.hashSync("123", 10),
    fullName: "Shamim Wanjiru",
    studentName: "Manswab Juma",
  },
  {
    id: 2,
    username: "parent2",
    password: bcrypt.hashSync("parent456", 10),
    fullName: "Mary Smith",
    studentName: "Bob Smith",
  },
];

let refreshTokens = [];

app.get("/", (req, res) => res.send("Server running ✅"));

app.post("/parent/login", async (req, res) => {
  const { username, password } = req.body;
  const parent = parents.find((p) => p.username === username);
  if (!parent) return res.status(401).json({ message: "Invalid username or password" });

  const validPassword = await bcrypt.compare(password, parent.password);
  if (!validPassword) return res.status(401).json({ message: "Invalid username or password" });

  const accessToken = jwt.sign(
    { id: parent.id, username: parent.username, studentName: parent.studentName },
    process.env.JWT_SECRET,
    { expiresIn: "2h" }
  );

  const refreshToken = uuidv4();
  refreshTokens.push({ token: refreshToken, userId: parent.id });

  res.json({
    message: "Parent login successful",
    accessToken,
    refreshToken,
    parent: {
      id: parent.id,
      username: parent.username,
      fullName: parent.fullName,
      studentName: parent.studentName,
    },
  });
});

app.post("/parent/refresh-token", (req, res) => {
  const { refreshToken } = req.body;
  if (!refreshToken) return res.status(401).json({ message: "No refresh token provided" });

  const stored = refreshTokens.find(rt => rt.token === refreshToken);
  if (!stored) return res.status(403).json({ message: "Invalid refresh token" });

  const parent = parents.find(p => p.id === stored.userId);
  if (!parent) return res.status(403).json({ message: "Parent not found" });

  const newAccessToken = jwt.sign(
    { id: parent.id, username: parent.username, studentName: parent.studentName },
    process.env.JWT_SECRET,
    { expiresIn: "2h" }
  );

  res.json({ accessToken: newAccessToken });
});

app.get("/parent/dashboard", (req, res) => {
  const authHeader = req.headers.authorization;
  if (!authHeader) return res.status(401).json({ message: "No token provided" });

  const token = authHeader.split(" ")[1];
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    res.json({ message: `Welcome ${decoded.username}, student: ${decoded.studentName}` });
  } catch {
    res.status(401).json({ message: "Invalid or expired token" });
  }
});

app.post("/parent/logout", (req, res) => {
  const { refreshToken } = req.body;
  refreshTokens = refreshTokens.filter(rt => rt.token !== refreshToken);
  res.json({ message: "Logged out successfully" });
});

// =========================
// Pesapal Backend
// =========================
const CONSUMER_KEY = process.env.PESAPAL_KEY || "qkio1BGGYAXTu2JOfm7XSXNruoZsrqEW";
const CONSUMER_SECRET = process.env.PESAPAL_SECRET || "osGQ364R49cXKeOYSpaOnT++rHs=";
const CALLBACK_URL = process.env.PESAPAL_CALLBACK || "https://proarmy-tammara-thermogenic.ngrok-free.dev/api/pesapal/callback";

const IPN_ID = "96711feb-fece-44c1-a340-db0ffcf0e906";

const PESAPAL_BASE_URL = "https://cybqa.pesapal.com/pesapalv3";
const AUTH_ENDPOINT = `${PESAPAL_BASE_URL}/api/Auth/RequestToken`;
const SUBMIT_ENDPOINT = `${PESAPAL_BASE_URL}/api/Transactions/SubmitOrderRequest`;
const STATUS_ENDPOINT = `${PESAPAL_BASE_URL}/api/Transactions/GetTransactionStatus`;

async function getToken() {
  const body = { consumer_key: CONSUMER_KEY, consumer_secret: CONSUMER_SECRET };
  const resp = await axios.post(AUTH_ENDPOINT, body, { headers: { "Content-Type": "application/json" } });
  return resp.data.token;
}

app.post("/api/pesapal/initiate", async (req, res) => {
  try {
    const { amount, email, phoneNumber, firstName, lastName, description } = req.body;
    if (!amount || !email || !phoneNumber || !firstName || !lastName || !description)
      return res.status(400).json({ success: false, error: "All fields are required" });

    const token = await getToken();
    const merchantReference = `ORDER-${Date.now()}`;

    const requestBody = {
      id: merchantReference,
      currency: "KES",
      amount,
      description,
      callback_url: CALLBACK_URL,
      notification_id: IPN_ID,
      billing_address: { email_address: email, phone_number: phoneNumber, first_name: firstName, last_name: lastName, country_code: "KE" },
    };

    const resp = await axios.post(SUBMIT_ENDPOINT, requestBody, { headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" } });
    const iframeUrl = resp.data.iframe_url || resp.data.redirect_url || null;

    if (!iframeUrl) return res.status(500).json({ success: false, error: "No iframeUrl returned", raw: resp.data });
    res.json({ success: true, iframeUrl, orderTrackingId: resp.data.orderTrackingId, merchantReference });
  } catch (err) {
    res.status(500).json({ success: false, error: "Transaction initiation failed", details: err.response?.data || err.message });
  }
});

app.get("/api/pesapal/callback", (req, res) => {
  console.log("Pesapal callback received:", req.query);
  res.send("Pesapal callback received successfully");
});

app.get("/api/pesapal/status/:orderTrackingId", async (req, res) => {
  try {
    const token = await getToken();
    const url = `${STATUS_ENDPOINT}?OrderTrackingId=${req.params.orderTrackingId}`;
    const resp = await axios.get(url, { headers: { Authorization: `Bearer ${token}`, Accept: "application/json" } });
    res.json({ success: true, data: resp.data });
  } catch (err) {
    res.status(500).json({ success: false, error: "Status check failed", details: err.response?.data || err.message });
  }
});

// =========================
// Email Route
// =========================
app.post("/send-email", sendEmail);

// =========================
// Start Server
// =========================
const PORT = process.env.PORT || 8000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
