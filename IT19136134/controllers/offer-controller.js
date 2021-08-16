const express = require("express");
const router = express.Router();
const controller = require("../services/offer-service");

module.exports = function () {
  router.post("/create", controller.createOffer);
  router.get("/", controller.getOffer);

  return router;
};
