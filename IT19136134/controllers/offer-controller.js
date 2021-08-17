const express = require("express");
const router = express.Router();
const controller = require("../services/offer-service");

module.exports = function () {
  router.post("/create", controller.createOffer);
  router.get("/", controller.getOffer);
  router.put("/updateoffer/:id", controller.updateOffer);
  router.get("/getMealForOffer/:id", controller.getMealForOffer);
  router.get("/getCatergoryForOffer/:id", controller.getCatergoryForOffer);
  router.get("/getOfferById/:id", controller.getOfferById);
  return router;
};
