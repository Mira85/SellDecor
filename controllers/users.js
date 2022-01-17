// Dependencies
const express = require("express");
const mongoose = require("mongoose");
const User = require("../models/user");
const Item = require("../models/item");
const user = require("../models/user");
//Route object
const usersRouter = express.Router();

// dashboard route
usersRouter.get("/dashboard/:id", async (req, res) => {
    try {
        res.json(await User.findById(req.params.id).populate('favorites').populate('itemsToSell'));
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

//add favorite item to user's object
usersRouter.post("/add_favorite", async (req, res) => {
    try {
        const user = await User.findById(req.query.user_id);
        const item = req.query.item_id;
        user.favorites.push(item);

        await user.save();
        res.status(200);
        res.end();
    } catch (error) {
        res.status(400).json(error);
    }


});

//delete favorite

usersRouter.delete("/delete_favorite", async (req, res) => {
    try {
        const user = await User.findById(req.query.user_id);
        const itemId = mongoose.Types.ObjectId(req.query.item_id) ;
       
       user.favorites = user.favorites.filter(objId => 
        {
            console.log(objId, itemId);
            objId !== itemId;
        });
       console.log(user)
        await user.save();
        res.status(200);
        res.end();
    } catch (error) {
        res.status(400).json(error);
    }
});

//export route object
module.exports = usersRouter;