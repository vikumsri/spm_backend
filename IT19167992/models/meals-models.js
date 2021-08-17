const mongoose = require('mongoose');
const MealModel = new mongoose.Schema({
  
    mealName : { type : String, required : true, trim : true },
    price : { type : String, required : true, trim : true },
    description : { type : String, required : true, trim : true },
    mealImage : { type : String, required : false, trim : true },
    categories : [{ type : mongoose.Schema.Types.ObjectId , required : false, ref : 'categories'}]
});

const Meal = mongoose.model('meals', MealModel);
module.exports = Meal;