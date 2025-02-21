const express = require("express");
const app = express();
const cors = require("cors");
const moragn = require("morgan");
const routes = require("./routes");

app.use(cors());
app.use(morgan("dev"));
app.use(express.json());

app.use("/api", routes);

app.use((req, res, next) => {
    res.status(404).json({ message: "Not Found" });
});

module.exports = app;