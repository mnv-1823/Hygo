const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const connectDB = require("./config/db");

dotenv.config();
connectDB();

const app = express();
app.use(cors());
app.use(express.json());

app.use("/api/patients", require("./routes/patientRoutes"));
app.use("/api/reminders", require("./routes/reminderRoutes"));

module.exports = app;
