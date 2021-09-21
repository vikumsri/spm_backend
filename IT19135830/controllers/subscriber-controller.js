const express= require('express')
const router = express.Router();
const subscriber = require("../services/email-subscriber-service");

module.exports =function(){
    router.post('/subscribe', subscriber.subscribe);
    router.patch('/unsubscribe/:id',subscriber.unsubscribe);

    return router;
}
