//Dependencies
const mongoose = require ("mongoose");

//Mongoose schema
const Schema = mongoose.Schema;
const itemSchema = new Schema ({
    name : String,
    category : String,
    img : String,
    price : Number,
    uId: String
}, {timestamps: true});

//export mongoose model
module.exports = mongoose.model("Item", itemSchema);