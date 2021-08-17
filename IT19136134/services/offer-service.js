const Offer = require("../models/offer-model");

const createOffer = async (req, res) => {
  if (req.body) {
    const offer = new Offer(req.body);
    await offer
      .save()
      .then((data) => {
        res.status(200).send({ data: data });
      })
      .catch((error) => {
        res.status(500).send({ error: error.message });
      });
  }
};

const getOffer = async (req, res) => {
  await Offer.find({})
    .populate("categories", "categoryName")
    .populate("meals", "mealName")
    .then((data) => {
      res.status(200).send({ data: data });
    })
    .catch((error) => {
      res.status(500).send({ error: error.message });
    });
};

module.exports = {
  createOffer,
  getOffer,
};
