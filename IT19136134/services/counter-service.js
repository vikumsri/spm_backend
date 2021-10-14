const EmailSubscriber = require("../../IT19135830/models/emailSubscriber-model");
const Order = require("../../IT19134536/models/order-model");

const getEmailSubscriberCount = async (req, res) => {
  await EmailSubscriber.find()
    .count()
    .then((data) => {
      res.status(200).send({ data: data });
    })
    .catch((error) => {
      res.status(500).send({ error: error.message });
    });
};

const getCanceledOrderCount = async (req, res) => {
  await Order.find({ status: "CANCELED" })
    .count()
    .then((data) => {
      res.status(200).send({ data: data });
    })
    .catch((error) => {
      res.status(500).send({ error: error.message });
    });
};

const getAcceptedOrderCount = async (req, res) => {
  await Order.find({ status: "ACCEPTED" })
    .count()
    .then((data) => {
      res.status(200).send({ data: data });
    })
    .catch((error) => {
      res.status(500).send({ error: error.message });
    });
};

const getPendingOrderCount = async (req, res) => {
  await Order.find({ status: "PENDING" })
    .count()
    .then((data) => {
      res.status(200).send({ data: data });
    })
    .catch((error) => {
      res.status(500).send({ error: error.message });
    });
};

module.exports = {
  getEmailSubscriberCount,
  getCanceledOrderCount,
  getAcceptedOrderCount,
  getPendingOrderCount,
};
