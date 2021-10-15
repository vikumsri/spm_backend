const express = require("express");
const router = express.Router();
const deliveryService = require('../services/deliveryService-service');

module.exports = function () {
    
    router.post("/create-delivery-service", deliveryService.CreateDeliveryService);
    router.delete('/delete-delivery-service/:id',deliveryService.deleteDeliveryService);
    router.get('/search-category-delivery-service/:key',deliveryService.searchDeliveryService);
    

    return router;
};