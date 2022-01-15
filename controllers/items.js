// Dependencies
const express = require("express");
const Item = require("../models/item");
//Route object
const itemsRouter = express.Router();

//Routes
//Index
itemsRouter.get("/", async (req, res) => {
    try {
        res.json(await Item.find({}));
    } catch (error) {
        res.status(400).json(error);
    }
});



//export route object
module.exports = itemsRouter;