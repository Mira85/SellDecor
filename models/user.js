//Dependencies
const mongoose = require ("mongoose");

//Mongoose schema
const Schema = mongoose.Schema;
const userSchema = new Schema ({
    firstName : String,
    lastName : String,
    itemsToSell : [],
    favorites : [{ type: Schema.Types.ObjectID, ref: 'Item'}],
    
}, {timestamps: true});

//export mongoose model
module.exports = mongoose.model("User", userSchema);