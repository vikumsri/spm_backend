const mongoose = require('mongoose');

const CategoryModel = new mongoose.Schema({
    categoryName : { type : String, required : true, trim : true},
    image : { type : String, required : false, trim : true},
     
});

const Category = mongoose.model('categories', CategoryModel);
module.exports = Category;