//Dependencies
require ("dotenv").config();
const express = require("express");
//import mongoose
const mongoose = require("mongoose");
//App object
const app = express();
//Port
const { PORT = 3001, DATABASE_URL } = process.env
//Middleware
const cors = require("cors");
const morgan = require("morgan")

app.use(cors());
app.use(morgan("dev"));
app.use(express.json());

//Connection with database
mongoose.connect(DATABASE_URL);
//Connection events
mongoose.connection
  .on("open", () => console.log("You are connected to MongoDB"))
  .on("close", () => console.log("You are disconnected from MongoDB"))
  .on("error", (error) => console.log(error))

//Routes
app.get("/", (req, res) => {
    res.send("hello world")
});

//Listener
app.listen(PORT, () => console.log(`listening on PORT ${PORT}`));
