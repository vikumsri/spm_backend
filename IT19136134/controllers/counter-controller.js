const express = require("express");
const router = express.Router();
const controller = require("../services/counter-service");

module.exports = function () {
  router.get("/emailSubscriberCount", controller.getEmailSubscriberCount);
  router.get("/cancelledCount", controller.getCanceledOrderCount);
  router.get("/pendingCount", controller.getPendingOrderCount);
  router.get("/acceptedCount", controller.getAcceptedOrderCount);
  return router;
};
