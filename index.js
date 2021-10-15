const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const mongo = require("mongoose");
const cors = require("cors");
const orderController = require('./IT19134536/controller/order-controller')
const feedbackController = require('./IT19134536/controller/feedback-controller')
const todaysSpecialAPI = require('./IT19135830/controllers/todays-special-controller')
const emailAPI = require('./IT19135830/controllers/email-creator-controller');

 
 
const categoryController = require('./IT19167992/controllers/category-controller')
const mealController = require('./IT19167992/controllers/meals-controller')
app.use(cors());
app.use(bodyParser.json({ limit: "50mb" }))
 
 
const port = 5000;
 


const offerAPI = require("./IT19136134/controllers/offer-controller");
const categoryController = require("./IT19167992/controllers/category-controller");
const deliveryServiceController = require('./IT19134536/controller/deliveryService-controller')
const mealController = require("./IT19167992/controllers/meals-controller");


const port = process.env.BASE_FE_PORT
const { log } = require('./logger');

app.use(cors());
app.use(bodyParser.json({ limit: "50mb" }))
 

const counterService = require("./IT19136134/controllers/counter-controller");

app.use(cors());
app.use(bodyParser.json({ limit: "50mb" }));


mongo.connect(
  // "mongodb+srv://root:root@cluster0.pikdq.mongodb.net/icafDB?retryWrites=true&w=majority",
  "mongodb+srv://spmDb:root@cluster0.e1a78.mongodb.net/spmDB?retryWrites=true&w=majority",
  { useNewUrlParser: true },
  { useUnifiedTopology: true }
);

mongo.connection.once("open", function () {
  console.log("Mongo db connected");
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






 


app.use("/category", categoryController());
app.use("/meal", mealController());
app.use("/offer", offerAPI());
app.use("/counter", counterService());

app.listen(port, () => console.log("Node server is running.."));

