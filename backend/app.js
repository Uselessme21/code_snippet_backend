const express = require("express");
require("dotenv").config();
const cors = require("cors");
const app = express();
app.use(express.json());
app.use(cors);
const connection = require("./db");

const Coderouter = require("./routes/codeRoutes");
const userRoutes = require("./routes/userRoutes");

app.get("/", (req, res) => {
  res.send("welcome to my application");
});
// Set up routes

app.use("/api/code", Coderouter);
app.use("/api/user", userRoutes);

// Start the server
app.listen(process.env.port, async () => {
  await connection;
  console.log(`Server listening on port ${process.env.port}`);
});

