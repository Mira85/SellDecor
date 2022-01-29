// Dependencies
const express = require("express");
const admin = require("firebase-admin");
const Item = require("../models/item");
const User = require("../models/user");
//Route object
const itemsRouter = express.Router();

async function isAuthenticated(req, res, next) {
    //console.log(req)
    try {
        const token = req.get("Authorization");
        if (!token) throw new Error("you must be logged in first")

        const user = await admin.auth().verifyIdToken(token.replace("Bearer ", ""));
        if (!user) throw new Error("something went wrong");

        req.user = user;

        next();

    } catch (error) {
        res.status(400).json({ message: error.message });

    }

};

async function getUser(uId) {
    const user = await User.findOne({ uId: uId });
    return user;
}



itemsRouter.get("/", async (req, res) => {
    try {
        res.json(await Item.find({}));

    } catch (error) {
        res.status(400).json(error);
    }
});



//delete
itemsRouter.delete("/:deleteItemId", isAuthenticated, async (req, res) => {
    try {
        await Item.findByIdAndDelete(req.params.deleteItemId)


        const user = await getUser(req.user.uid)
        console.log(user)


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
itemsRouter.post("/", isAuthenticated, async (req, res) => {

    try {
        req.body.uId = req.user.uid;
        console.log(req.body);
        const newItem = await Item.create(req.body);


        const user = await getUser(req.user.uid)
        console.log(user)
        user.itemsToSell.push(newItem._id);
        await user.save();

        res.json(newItem);
    } catch (error) {
        res.status(400).json(error);
    }
});

//update
itemsRouter.put("/:id", isAuthenticated, async (req, res) => {
    console.log('req.body.id', req.body.id)
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