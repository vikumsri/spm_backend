const mongoose = require("mongoose");

const DeliveryServiceModel = new mongoose.Schema({
     
    nicNumber: { type: String, required: true, trim: true },
    fullName: { type: String, required: true, trim: true },
    phoneNumber: { type: String, required: true, trim: true },
    address:{ type: String, required: true, trim: true },
       
});

module.exports = mongoose.model("DeliveryService", DeliveryServiceModel);