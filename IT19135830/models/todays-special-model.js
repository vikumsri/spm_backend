const mongoose = require("mongoose");

const TodaysSpecial = new mongoose.Schema({
    dishName: { type: String, required:true, trim:true},
    description: {type:String, required:true, trim:true},
    price: {type: Number, required:true},
    date: {type:String, required:true, trim:true},
    image: {type:String, required:true, trim:true}

});

module.exports = mongoose.model("todaysSpecial",TodaysSpecial);