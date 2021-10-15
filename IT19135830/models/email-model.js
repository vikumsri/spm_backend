const mongoose = require("mongoose");

const EmailCreator = new mongoose.Schema({
    topic: { type: String, required:true, trim:true},
    body: { type: String, required:true, trim:true},
    date: { type: String, required:true, trim:true}

});

module.exports = mongoose.model("emailCreator",EmailCreator);