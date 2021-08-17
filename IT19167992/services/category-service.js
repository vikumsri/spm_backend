const Category = require('../models/category-model');
const axios = require('axios');

const createCategory = async (req,res) => {
    if(req.body){
        const category = new Category(req.body);
        await category.save()
        .then(data => {
            res.status(200).send({ data: data});
        })
        .catch(error =>{
            res.status(500).send({ error: error.message });
        });
    }
}

const getAllCategories = async (req, res) => {
    await Category.find({})
    .then(data => {
      res.status(200).send({ data: data });
    })
    .catch(error => {
      res.status(500).send({ error: error.message });
    });
}

const getFoodForCategory = async (req, res) => {
    if (req.params && req.params.id) {
        await Category.findById(req.params.id)
            .populate('foods', 'code name amount size')
            .then(data => {
                
                res.status(200).send({ data: data});
            })
            .catch(error => {
                res.status(500).send({ error: error.message });
            });
    }
}

module.exports = {
    createCategory,
    getAllCategories,
    getFoodForCategory
}