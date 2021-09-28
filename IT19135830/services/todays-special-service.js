const moment =require("moment");

const todaysSpecial = require("../models/todays-special-model");


const createTodaysSpecial = async(req,res, next) => {
    if(req.body){
        const meal = new todaysSpecial(req.body);

        await meal
        .save()
        .then((data)=> {
            res.status(200).send({ data: data });
      })
        .catch((error) => {
            res.status(500).send({error: error.message});
        })
    }
};

const editTodaysSpecial = async (req,res) => {
    await todaysSpecial.findByIdAndUpdate(
        req.params.id,
        {$set: {dishName: req.body.dishName, description: req.body.description, price:req.body.price, date: req.body.date, image: req.body.image }},
        {upsert:true},
        function(err, result){
            if(err){
                res.send(err);
            }else{
                res.send(result);
            }
        }
    );
   
       
    }
    
    const viewTodaysSpecial = async(req, res) => {
        if(req.params){
            await todaysSpecial.find()
            .then(data => {
                res.status(200).send({ data:data});
            })
            .catch(error => {
                res.status(500).send({error: error.message});
            });
        }
    }

    const viewTodaysSpecialByDate = async(req, res) => {
        if(req.params && req.params.date){
            const date = req.params.date;

            await todaysSpecial.find({date:date})
            .then( data => {
                res.status(200).send({data:data});
            })
            .catch(error => {
                res.status(500).send({error:error.message});
            })
        }
    }

    const viewTodaysSpecialById = async(req, res) => {

            const id = req.params.id;

            await todaysSpecial.findById(req.params.id)
            .then( data => {
                res.status(200).send({data:data});
            })
            .catch(error => {
                res.status(500).send({error:error.message});
            })
        
    }

    const deleteTodaysSpecial =  async(req, res) => {
        if(req.params && req.params.id){
            const id = req.params.id;

            await todaysSpecial.findByIdAndDelete(id)
            .then(data => {
                res.status(200).send({data:data})
            })
            .catch(error => {
                res.status(500).send({error:error.message})
            })
        }
    }

    const specialsReport = async (req,res) => {
        if(req.params){
            await todaysSpecial.find()
                .then(data => {

                    let dates = [];
                    let dishes = [];
                    
                    let startOfWeek = moment().startOf('week').toDate();
                    let endOfWeek   = moment().endOf('week').toDate();

                    for (let i =0; i < data.length; i++){
                        dates.push(data[i].date);

                        let dateString = data[i].date; // Oct 23

                        var dateObject = new Date(dateString);


                        if(startOfWeek <= dateObject && endOfWeek >= dateObject){
                            dishes.push(data[i]);
                            
                        }                        
                        
                    }

                    res.status(200).send({data:dishes});



                })
                .catch(error => {
                    res.status(500).send({error: error.message});
                });
        }
    }


module.exports = {
    createTodaysSpecial,
    editTodaysSpecial,
    viewTodaysSpecial,
    viewTodaysSpecialByDate,
    deleteTodaysSpecial,
    viewTodaysSpecialById,
    specialsReport
    
}