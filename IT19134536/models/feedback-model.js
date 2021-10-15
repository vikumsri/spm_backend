const mongoose = require("mongoose");

const FeedbackModel = new mongoose.Schema({
    // feedbackId: { type: String, required: true, trim: true },
    message: { type: String, required: true, trim: true },
    order: [{ type: mongoose.Schema.Types.ObjectId, required: false, ref: 'Order' }]
});

module.exports = mongoose.model("Feedback", FeedbackModel);