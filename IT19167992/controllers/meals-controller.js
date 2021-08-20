const express = require('express');
const router = express.Router();
const mealService = require('../services/meals-service')

module.exports = function () {
    router.post('/create', mealService.createMeal);
    router.get('/',mealService.getAllMeals);
    router.get('/getMealById/:id',mealService.getMealById);
    router.get('/getCategoryForMeal/:id',mealService.getCategoryForMeal);
    router.put('/edit/:id',mealService.updateMeal);
    router.delete('/delete/:id',mealService.deleteMeal);
    return router;
}