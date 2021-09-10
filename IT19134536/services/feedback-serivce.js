const FeedbackModel = require('../models/feedback-model')
const { ORDER_ACCEPT } = require('../constants')
const { log } = require('../../logger');

/**
 * This api returns the a list of all the feedbacks
 * @param none
 * @returns List of Feedbacks
 */
const getAllFeedbacks = async (req, res) => {

    log('Featching all Feedback details')
    //Retrive data from backend
    await FeedbackModel.find()
        .then((data) => {
            log('Featching Feedback succsessfull!')
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
 * @param FeedbackModel
 * @returns json 
 */
const createFeedback = async (req, res) => {
    log('Request recived to create Feedback')
    if (req.body) {
        const feedbackModel = new FeedbackModel(req.body);
        await feedbackModel
            .save()
            .then((data) => {
                log('Feedback details Inserted Successfully')
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



module.exports = {
    getAllFeedbacks,
    createFeedback,
}



