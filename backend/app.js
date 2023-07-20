const express = require("express");
require("dotenv").config();
const cors = require("cors");
const app = express();
app.use(express.json());
// app.use(cors);
const connection = require("./db");

app.get("/", (req, res) => {
  console.log("remde")
  res.status(200).json("welcome to my application");
});

const Coderouter = require("./routes/codeRoutes");
const userRoutes = require("./routes/userRoutes");


// Set up routes

app.use("/code", Coderouter);
app.use("/user", userRoutes);

// Start the server
app.listen(process.env.port || 6000, async () => {
  await connection;
  console.log(`Server listening on port ${process.env.port}`);
});

