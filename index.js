require('dotenv').config()
const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const mongo = require("mongoose");
const cors = require("cors");
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

app.listen(port, () =>
    log("Node server started running.."))
