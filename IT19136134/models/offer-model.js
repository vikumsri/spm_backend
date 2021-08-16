const mongoose = require("mongoose");

const OfferSchema = new mongoose.Schema({
  offerName: { type: String, required: true, trim: true },
  catergories: {
    type: mongoose.Schema.Types.ObjectId,
    required: false,
    ref: "catergories",
  },

  meals: {
    type: mongoose.Schema.Types.ObjectId,
    required: false,
    ref: "meals",
  },

  description: { type: String, required: true, trim: true },
  discount: { type: String, required: true, trim: true },
  price: { type: String, required: true, trim: true },
  startDate: { type: String, required: true },
  endDate: { type: String, required: true, trim: true },
  image: { type: String, required: true },
});

const Offer = mongoose.model("offers", OfferSchema);
module.exports = Offer;
