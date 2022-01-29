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
const morgan = require("morgan");


const admin = require("firebase-admin");

// const serviceAccount = require("./service-account-credentials.json");

const serviceAccount = JSON.parse(process.env.GOOGLE_CREDS);

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});


const itemsController = require("./controllers/items");
const usersController = require("./controllers/users");

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
app.use("/item/", itemsController);
app.use("/user/", usersController);

//Listener
app.listen(PORT, () => console.log(`listening on PORT ${PORT}`));
