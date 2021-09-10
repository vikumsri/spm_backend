const OrderModel = require('../models/order-model')
const { ORDER_ACCEPT } = require('../constants')
const { log } = require('../../logger');
/**
 * This api returns the a list of all the orders
 * @param none
 * @returns List of OrderModels
 */
const getAllOrders = async (req, res) => {

    log('Featching all order details')
    //Retrive data from backend
    await OrderModel.find()
        .then((data) => {
            log('Featching orders succsessfull!')
            log('Sending response..')
            res.status(200).send({ data: data });
        })
        .catch((error) => {
            log('Featching failed..')
            log(`Error:${error.message}`)
            res.status(500).send({ error: error.message });
        });
}

/**
 * This api returns the a list of all the orders
 * @param id
 * @returns List of OrderModels
 */
const getOrderById = async (req, res) => {
    const id = req.params.id

    log(`Featching order details of order:${id}`)

    //Retrive data from backend
    await OrderModel.find({ "orderId": id })
        .then((data) => {
            log('Featching order succsessfull!')
            log('Sending response..')
            res.status(200).send({ data: data });
        })
        .catch((error) => {
            log('Featching failed..')
            log(`Error:${error.message}`)
            res.status(500).send({ error: error.message });
        });
}

/**
 * This api saves order details to db the orders
 * @param OrderModel
 * @returns json 
 */
const createOrder = async (req, res) => {
    log('Request recived to create order')
    if (req.body) {
        const orderModel = new OrderModel(req.body);
        await orderModel
            .save()
            .then((data) => {
                log('Order details Inserted Successfully')
                res.json({
                    message: "Inserted Successfully",
                    data: data,
                });
            })
            .catch((error) => {
                log(`Error:${error.message}`)
                res.status(500).send({ error: error.message });
            });
    } else {
        log('Request failed due to empty request body')
    }
};

/**
 * This api update order details in db
 * @param OrderModel
 * @returns json 
 */
const updateOrderStatus = async (req, res) => {
    log(`Request recived to update order status`)
    if (req.body) {
        log(`updating order status of order:${req.body.id}`)
        await OrderModel.findByIdAndUpdate(
            req.body.id,
            { $set: { status: ORDER_ACCEPT } },
            { upsert: true },
            function (err, result) {
                if (err) {

                    log(`Error:${err.message}`)
                    res.send(result);
                } else {
                    log('Order status Updated Successfully')
                    res.send(result);
                }
            }
        );
    } else {
        log('Request failed due to empty request body')
    }
};

module.exports = {

    getAllOrders,
    getOrderById,
    createOrder,
    updateOrderStatus

}



