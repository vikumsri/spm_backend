const OrderModel = require('../models/order-model')
const { ORDER_ACCEPT } = require('../constants')
 
/**
 * This api returns the a list of all the orders
 * @param none
 * @returns List of OrderModels
 */
const getAllOrders = async (req, res) => {

    console.log('Featching all order details')
    //Retrive data from backend
    await OrderModel.find()
        .then((data) => {
            console.log('Featching orders succsessfull!')
            console.log('Sending response..')
            res.status(200).send({ data: data });
        })
        .catch((error) => {
            console.log('Featching failed..')
            console.log(`Error:${error.message}`)
            res.status(500).send({ error: error.message });
        });
}

/**
 * This api returns the a list of all the orders
 * @param id
 * 
 * @returns List of OrderModels
 */
const getOrderById = async (req, res) => {
    const id = req.params.id

    console.log(`Featching order details of order:${id}`)

    //Retrive data from backend
    await OrderModel.find({ "orderId": id })
        .then((data) => {
            console.log('Featching order succsessfull!')
            console.log('Sending response..')
            res.status(200).send({ data: data });
        })
        .catch((error) => {
            console.log('Featching failed..')
            console.log(`Error:${error.message}`)
            console.res.status(500).send({ error: error.message });
        });
}

/**
 * This api saves order details to db the orders
 * @param OrderModel
 * @returns json 
 */
const createOrder = async (req, res) => {
    console.log('Request recived to create order')
    if (req.body) {
        const orderModel = new OrderModel(req.body);
        await orderModel
            .save()
            .then((data) => {
                console.log('Order details Inserted Successfully')
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

/**
 * This api update order details in db
 * @param OrderModel
 * @returns json 
 */
const updateOrderStatus = async (req, res) => {
    console.log(`Request recived to update order status`)
    if (req.body) {
        console.log(`updating order status of order:${req.body.id}`)
        await OrderModel.findByIdAndUpdate(
            req.body.id,
            { $set: { status: ORDER_ACCEPT } },
            { upsert: true },
            function (err, result) {
                if (err) {

                    console.log(`Error:${err.message}`)
                    res.send(result);
                } else {
                    console.log('Order status Updated Successfully')
                    res.send(result);
                }
            }
        );
    } else {
        console.log('Request failed due to empty request body')
    }
};

// const updateOrderStatus = async (req, res) => {
//     log(`Request recived to update order status`)
//     if (req.body) {
//         log(`updating order status of order:${req.body.id}`)
//         await OrderModel.findByIdAndUpdate(
//             req.body.id,
//             { $set: { status: ORDER_ACCEPT } },
//             { upsert: true },
//             function (err, result) {
//                 if (err) {

//                     log(`Error:${err.message}`)
//                     res.send(result);
//                 } else {
//                     log('Order status Updated Successfully')
//                     res.send(result);
//                 }
//             }
//         );
//     } else {
//         log('Request failed due to empty request body')
//     }
// };

const updateDeliveryOrderStatus = async (req, res) => {
    // console.log(`Request recived to update order status`)
    // if (req.body) {
    //     console.log(`updating order status of order:${req.body.id}`)
    //     await OrderModel.findByIdAndUpdate(
    //         req.body.id,
            
    //         { $set: { status: DELEVERE_ACCEPT } },
    //         { upsert: true },
    //         function (err, result) {
    //             if (err) {

    //                 console.log(`Error:${err.message}`)
    //                 res.send(result);
    //             } else {
    //                 console.log('Order Delivery status Updated Successfully')
    //                 res.send(result);
    //             }
    //         }
    //     );
    // } else {
    //     console.log('Request failed due to empty request body')
    // }
    console.log(`Request recived to update order status`)
    if (req.body) {
        console.log(`updating order status of order:${req.params.key}`)
        const keyword = req.params.key
        var myquery = { status: "ON DELEVERY", nicNumber : keyword  };
        var newvalues = { $set: {status: "DELEVERED"} };
        await OrderModel.updateOne(
            myquery, newvalues,
            function (err, result) {
                if (err) {

                    console.log(`Error:${err.message}`)
                    res.send(result);
                } else {
                    console.log('Order Delivery status Updated Successfully')
                    res.send(result);
                }
            }
        );
    } else {
        console.log('Request failed due to empty request body')
    }

 
 
       
    
};

const searchOrders = async(req, res) => {
    if(req.params && req.params.key){
        const keyword = req.params.key
        const regex = new RegExp(keyword, 'i') // i for case insensitive
        await OrderModel.find({"nicNumber": {$regex: regex}})
        .then(data => {
            res.status(200).send({ data:data});
        })
        .catch(error => {
            res.status(500).send({error: error.message});
        });
    }
}

module.exports = {

    getAllOrders,
    getOrderById,
    createOrder,
    updateOrderStatus,
    updateDeliveryOrderStatus,
    searchOrders

}



