const express = require("express");
const router = express.Router();
const service = require('../services/order-service')

module.exports = function () {
    router.get("/get-all-orders", service.getAllOrders);
    router.get("/get-order/:id", service.getOrderById);
    router.post("/create-order", service.createOrder);
    router.put("/update-order-status", service.updateOrderStatus);

    return router;
};
