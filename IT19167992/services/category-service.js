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
            .populate('foods', 'mealName price description')
            .then(data => {
                
                res.status(200).send({ data: data});
            })
            .catch(error => {
                res.status(500).send({ error: error.message });
            });
    }
}

const updateCategory = async ( req, res) =>{   
    await Category.findByIdAndUpdate(
      req.body.id,
      { $set: { categoryName: req.body.categoryName } },
      { upsert: true },
      function (err, result) {
        if (err) {
          res.send(err);
        } else {
          res.send(result);
        }
      });
}

const deleteCategory = async (req, res) => {

    //check if the req body is empty
        const id = req.body.id
        console.log(id)
        
        //delete product data to database
        await Category.findByIdAndDelete(id).then((response) => {

            console.log('Data sucessfully deleted from the mongo db!')

            res.status(200).send(response)

            console.log('Response sent!')

        }).catch(err => {
            res.status(500).send(err.message)
        });
        
}
module.exports = {
    createCategory,
    getAllCategories,
    getFoodForCategory,
    updateCategory,
    deleteCategory
}