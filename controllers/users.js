// Dependencies
const express = require("express");
const mongoose = require("mongoose");
const admin = require("firebase-admin");
const User = require("../models/user");
const Item = require("../models/item");
//Route object
const usersRouter = express.Router();




const serviceAccount = require("../service-account-credentials.json");





/* async function isAuthenticated(req, res, next) {
    console.log("req.auth", req.headers)
    try{
        const token = req.get("Authorization");
    if(!token) throw new Error("you must be logged in first")

    const user = await admin.auth().verifyIdToken(token.replace("Bearer ", ""));
    if(!user) throw new Error ("something went wrong");

    req.user = user;

    next();

    } catch (error) {
        res.status(400).json({message: error.message});

    }
    
}
 */

async function getUser(uId) {
    const user = await User.findOne({uId : uId}).populate('favorites').populate('itemsToSell');
    return user;
} 
//get user

usersRouter.get("/", async (req, res) => {

    console.log(req.user);
    try {
        const user = await getUser(req.user.uid);
        res.json(user);
    } catch (error) {
        res.status(400).json(error);
    }
}); 

/* usersRouter.get("/:uid", async (req, res) => {

console.log(req.user);
    try {
        res.json(await User.findOne({uId : req.params.uid}));
    } catch (error) {
        res.status(400).json(error);
    }
}); */

// dashboard route
usersRouter.get("/userinfo", async (req, res) => {
    try {
         const user = await getUser(req.user.uid);
         res.json(user);
    } catch (error) {
        res.status(400).json(error);
    }
});



//create
usersRouter.post("/", async (req, res) => {
    console.log(req.get("Authorization"))
     req.body.uId = req.body.uid;
    
     try {
        res.json(await User.create(req.body));
     } catch (error) {
        res.status(400).json(error);
      }


   
});

//delete favorite

usersRouter.delete("/delete_favorite", async (req, res) => {
       
     try {
        const user = await getUser(req.user.uid);
        const itemId = req.query.item_id;
               
       user.favorites = user.favorites.filter(object => object._id != itemId);
        
        await user.save();
        res.status(200);
        res.end();
    } catch (error) {
        res.status(400).json(error);
    } 
});


//delete user

usersRouter.delete("/:id", async (req, res) => {
    try{
    res.json(await User.findByIdAndDelete(req.params.id));
    } catch (error) {
        res.status(400).json(error);
    }
});

//update user

usersRouter.put("/:id", async (req, res) => {
    try{
        res.json(await User.findByIdAndUpdate(req.params.id, req.body, {new:true}));

    } catch (error) {
        res.status(400).json(error);
    }
});

//add favorite item to user's object
usersRouter.post("/add_favorite", async (req, res) => {
    try {
        //const user = await User.findById(req.query.user_id);
    
        const item = req.query.item_id;
         const user = await getUser(req.user.uid);
        user.favorites.push(item);

        await user.save();
        res.status(200);
        res.end();
    } catch (error) {
        res.status(400).json(error);
    }


});





//export route object
module.exports = usersRouter;