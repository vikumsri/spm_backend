const DeliveryServiceModel = require('../models/deliveryService-model');

const CreateDeliveryService = async (req, res) => {
    console.log('Request recived to create delivery')
    if (req.body) {
        const deliveryServiceModel = new DeliveryServiceModel(req.body);
        await deliveryServiceModel
            .save()
            .then((data) => {
                console.log('Delivery details Inserted Successfully')
                res.json({
                    message: "Inserted Successfully",
                    data: data,
                });
            })
            .catch((error) => {
                console.log(`Error:${error.message}`)
                res.status(500).send({ error: error.message });
            });
    } else {
        console.log('Request failed due to empty request body')
    }
};

const deleteDeliveryService = async (req, res) => {

    //check if the req body is empty
        const id = req.params.id
        console.log(id)
        
        //delete product data to database
        await DeliveryServiceModel.findByIdAndDelete(id).then((response) => {

            console.log('Data sucessfully deleted from the mongo db!')

            res.status(200).send(response)

            console.log('Response sent!')

        }).catch(err => {
            res.status(500).send(err.message)
        });
        
        
}

const searchDeliveryService = async(req, res) => {
    if(req.params && req.params.key){
        const keyword = req.params.key
        const regex = new RegExp(keyword, 'i') // i for case insensitive
        await DeliveryServiceModel.find({"nicNumber": {$regex: regex}})
        .then(data => {
            res.status(200).send({ data:data});
        })
        .catch(error => {
            res.status(500).send({error: error.message});
        });
    }
}
 


module.exports = {

    CreateDeliveryService,
    deleteDeliveryService,
    searchDeliveryService,
   

}