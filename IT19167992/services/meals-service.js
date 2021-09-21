const Meal = require('../models/meals-models');

const createMeal = async (req, res) => {
    if (req.body) {
        const meal = new Meal(req.body);
        await meal.save()
            .then(data => {
                res.status(200).send({ data: data });
            })
            .catch(error => {
                res.status(500).send({ error: error.message });
            });
    }
}

const getAllMeals = async (req,res) => {
    await Meal.find({})
    .then(data => {
        res.status(200).send({ data: data});
    })
    .catch(error => {
        res.status(500).send({ error: error.message });
    });

}

const getMealById = async (req,res) => {
    if(req.params && req.params.id){
        await Meal.findById(req.params.id)
        .populate('meals', 'mealName price description')
        .then(data => {
            res.status(200).send({ meals: data });
        })
        .catch(error => {
            res.status(500).send({ error: error.message });
        });
    }   
}

const getCategoryForMeal = async (req, res) => {
    if (req.params && req.params.id) {
        await Meal.findById(req.params.id)
          .populate("catergories", "categoryName")
          .then((data) => {
            res.status(200).send({ catergories: data.catergories });
          })
          .catch((error) => {
            res.status(500).send({ error: error.message });
          });
      }
}

const updateMeal = async ( req, res) =>{   
    await Meal.findByIdAndUpdate(
      req.params.id,
      { $set: { mealName: req.body.mealName, price: req.body.price, description:req.body.description, image :req.body.image } },
      { upsert: true },
      function (err, result) {
        if (err) {
          res.send(err);
        } else {
          res.send(result);
        }
      });
}

const deleteMeal = async (req, res) => {

    //check if the req body is empty
        const id = req.params.id
        console.log(id)
        
        //delete product data to database
        await Meal.findByIdAndDelete(id).then((response) => {

            console.log('Data sucessfully deleted from the mongo db!')

            res.status(200).send(response)

            console.log('Response sent!')

        }).catch(err => {
            res.status(500).send(err.message)
        });
        
}

module.exports = {
    createMeal,
    getAllMeals,
    getMealById,
    updateMeal,
    deleteMeal,
    getCategoryForMeal
 
}