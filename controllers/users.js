// Dependencies
const express = require("express");
const User = require("../models/user");
const Item = require("../models/item");
//Route object
const usersRouter = express.Router();

// dashboard route
usersRouter.get("/dashboard/:id", async (req, res) => {
    try {
        res.json(await User.findById(req.params.id).populate('favorites'));
    } catch (error) {
        res.status(400).json(error);
    }
});

//create
usersRouter.post("/", async (req, res) => {
    try {
        res.json(await User.create(req.body));
    } catch (error) {
        res.status(400).json(error);
    }
});


//export route object
module.exports = usersRouter;