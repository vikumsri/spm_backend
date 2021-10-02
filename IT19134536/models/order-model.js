const mongoose = require("mongoose");

const OrderModel = new mongoose.Schema({
    // id: { type: String, required: true, trim: true },
    // orderId: { type: String, required: true, trim: true },
    address: { type: String, required: true, trim: true },
    customerName: { type: String, required: true, trim: true },
    phoneNumber: { type: String, required: true, trim: true },
    nicNumber:{ type: String, required: true, trim: true },
    price:{ type: String, required: true, trim: true },
    status: { type: String, required: true, trim: true },
    items: [{
        itemID: String,
        itemName: String,
        itemQuantity: Number
    }]
});

module.exports = mongoose.model("Order", OrderModel);