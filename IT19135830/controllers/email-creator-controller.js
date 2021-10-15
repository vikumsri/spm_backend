const express= require('express')
const router = express.Router();
const email = require("../services/email-creator-service");

module.exports =function(){
    router.post('/send-email', email.createEmail);
    router.get('/view-emails', email.viewEmails);
    router.get('/search-emails/:key', email.searchEmails);
    router.get('/subscribers', email.subscribers);


    return router;
}

