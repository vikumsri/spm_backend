const express = require('express');
const router = express.Router();
const mealService = require('../services/meals-service')

module.exports = function () {
    router.post('/create', mealService.createMeal);
    router.get('/',mealService.getAllMeals);
    router.put('/edit/meal',mealService.updateMeal);
    return router;
}