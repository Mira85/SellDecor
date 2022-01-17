// Dependencies
const express = require("express");
const Item = require("../models/item");
const User = require("../models/user");
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
itemsRouter.delete("/:deleteItemId", async (req, res) => {
    try {
        await Item.findByIdAndDelete(req.params.deleteItemId)
        const userId = req.query.user_id;
        const user = await User.findById(userId);
        console.log(user);

        user.itemsToSell = user.itemsToSell.filter(objId => objId != req.params.deleteItemId);
        await user.save();

      res.status(200);
      res.end();
    } catch (error) {
      //send error
      res.status(400).json(error)
    }
  });
  


//create
itemsRouter.post("/", async (req, res) => {
    try {
        const newItem = await Item.create(req.body);
        const userId = req.query.user_id;
        const user = await User.findById(userId);
        user.itemsToSell.push(newItem._id);
        await user.save();

        res.json(newItem);
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