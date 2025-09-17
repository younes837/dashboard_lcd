const express = require("express");
const cors = require("cors");
const path = require("path");
require("dotenv").config();
const {
  connectToDatabase,
  connectToDatabaseRentway,
} = require("./config/dbConfig");

const app = express();
connectToDatabase();

app.use(cors());
app.use(express.json());

// Serve static files from the React frontend app
app.use(express.static(path.join(__dirname, "../frontend/dist")));

//----------------------------------------------------------

const reservationRoute = require("./routes/reservationRoute");
const parcRoute = require("./routes/parcRoute");
//----------------------------------------------------------
app.use("/api", reservationRoute);
app.use("/api", parcRoute);
//----------------------------------------------------------
app.get("/test-connnection", (req, res) => {
  res.send("test complieted");
});
app.listen(3001, () => console.log("Server running on port 3001"));
