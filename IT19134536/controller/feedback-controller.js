const express = require("express");
const router = express.Router();
const service = require('../services/feedback-serivce')

module.exports = function () {
    router.get("/get-all-feedbacks", service.getAllFeedbacks);
    router.post("/create-feedbacks", service.createFeedback);

    return router;
};
