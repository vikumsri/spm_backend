const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const mongo = require("mongoose");
const cors = require("cors");
const port = 5000

app.use(cors());
app.use(bodyParser.json())


mongo.connect(
    // "mongodb+srv://root:root@cluster0.pikdq.mongodb.net/icafDB?retryWrites=true&w=majority",
    "mongodb+srv://spmDb:root@cluster0.e1a78.mongodb.net/spmDB?retryWrites=true&w=majority",
    { useNewUrlParser: true },
    { useUnifiedTopology: true}
);

mongo.connection.once("open", function () {
    console.log("Mongo db connected");
});

app.route("/").get((req, res) => {
    res.send("SPM Backend");
});


app.listen(port, () =>
    console.log("Node server is running.."))
