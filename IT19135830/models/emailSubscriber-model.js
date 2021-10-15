const mongoose = require("mongoose");

const EmailSubscriber = new mongoose.Schema({
    email: { type: String, required:true, trim:true},
    status: { type: String, required:true, trim:true}
});

module.exports = mongoose.model("emailSubscriber",EmailSubscriber);