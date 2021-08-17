const express = require('express');
const router = express.Router();
const categortyService = require('../services/category-service');

module.exports = function () {
     
    router.post('/create',categortyService.createCategory);
    router.get('/getAllCategories',categortyService.getAllCategories);
    router.get('/getFoodForCategory/:id',categortyService.getFoodForCategory);
    router.put('/edit',categortyService.updateCategory);
    router.delete('/delete',categortyService.deleteCategory);
    return router;
}