const express = require("express");
const cors = require("cors");
const sendEmail = require("./Email");

const app = express();

app.use(cors());
app.use(express.json()); // built-in parser

app.post("/send-email", sendEmail);

const PORT = 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
