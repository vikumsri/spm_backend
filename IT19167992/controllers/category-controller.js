const express = require('express');
const router = express.Router();
const categortyService = require('../services/category-service');

module.exports = function () {
     
    router.post('/create',categortyService.createCategory);
    router.get('/getAllCategories',categortyService.getAllCategories);
    router.get('/getFoodForCategory/:id',categortyService.getFoodForCategory);
    router.get('/getCategoryById/:id',categortyService.getCategoryById);
    router.put('/edit/:id',categortyService.updateCategory);
    router.delete('/delete/:id',categortyService.deleteCategory);
    return router;
}