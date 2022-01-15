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

//delete
itemsRouter.delete("/:id", async (req, res) => {
    try {
      // send all people
      res.json(await Item.findByIdAndDelete(req.params.id))
    } catch (error) {
      //send error
      res.status(400).json(error)
    }
  });
  


//create
itemsRouter.post("/", async (req, res) => {
    try {
        res.json(await Item.create(req.body));
    } catch (error) {
        res.status(400).json(error);
    }
});

//update
itemsRouter.put("/:id", async (req, res) => {
    try {
        res.json(
            await Item.findByIdAndUpdate(req.params.id, req.body, { new: true })
        );
    } catch (error) {
        res.status(400).json(error)
    }
});




//export route object
module.exports = itemsRouter;