require('dotenv').config()
const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const mongo = require("mongoose");
const cors = require("cors");

const offerAPI = require("./IT19136134/controllers/offer-controller");
const categoryController = require("./IT19167992/controllers/category-controller");
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
  res.send("SPM Backend");
});


app.use("/category", categoryController());
app.use("/meal", mealController());
app.use("/offer", offerAPI());

app.listen(port, () => console.log("Node server is running.."));

