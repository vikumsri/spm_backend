require('dotenv').config()
const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const mongo = require("mongoose");
const cors = require("cors");
const orderController = require('./IT19134536/controller/order-controller')
const feedbackController = require('./IT19134536/controller/feedback-controller')
const todaysSpecialAPI = require('./IT19135830/controllers/todays-special-controller')
const emailAPI = require('./IT19135830/controllers/email-creator-controller');
const offerAPI = require("./IT19136134/controllers/offer-controller");
const categoryController = require("./IT19167992/controllers/category-controller");
const deliveryServiceController = require('./IT19134536/controller/deliveryService-controller')
const mealController = require("./IT19167992/controllers/meals-controller");
const port = process.env.BASE_FE_PORT
const { log } = require('./logger');

app.use(cors());
app.use(bodyParser.json({ limit: "50mb" }))
 

mongo.connect(
    process.env.MONGODB_URL,
    { useNewUrlParser: true },
    { useUnifiedTopology: true }
);

mongo.connection.once("open", function () {
    log("Mongo db connected");

});

app.route("/").get((req, res) => {

    res.status(200).send("SPM Backend");
});

app.use("/order", orderController());
app.use("/feedback", feedbackController());
app.use("/user", todaysSpecialAPI());
app.use("/email", emailAPI());
app.use("/category", categoryController());
app.use("/meal", mealController());
app.use("/offer", offerAPI());
app.use('/delivery-service',deliveryServiceController());

app.listen(port, () =>
    log("Node server started running.."))

  res.send("SPM Backend");
});



app.listen(port, () => console.log("Node server is running.."));


