const express= require('express')
const router = express.Router();
const todaysSpecial = require("../services/todays-special-service");

module.exports =function(){
    router.post('/add-todays-special', todaysSpecial.createTodaysSpecial);
    router.put('/edit-todays-special/:id', todaysSpecial.editTodaysSpecial);
    router.get('/views-today-specials', todaysSpecial.viewTodaysSpecial);
    router.get('/get-todays-special-dishes/:date',todaysSpecial.viewTodaysSpecialByDate);
    router.delete('/delete-todays-special/:id', todaysSpecial.deleteTodaysSpecial);
    router.get('/view-individual-todays-special/:id', todaysSpecial.viewTodaysSpecialById);


    return router;
}
