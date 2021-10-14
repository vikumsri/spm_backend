const Offer = require("../models/offer-model");
const moment = require("moment");

const createOffer = async (req, res) => {
  if (req.body) {
    const offer = new Offer(req.body);
    await offer
      .save()
      .then((data) => {
        res.status(200).send({ data: data });
      })
      .catch((error) => {
        res.status(500).send({ error: error.message });
      });
  }
};

const getOffer = async (req, res) => {
  await Offer.find({})
    .populate("categories", "categoryName")
    .populate("meals", "mealName")
    .then((data) => {
      res.status(200).send({ data: data });
    })
    .catch((error) => {
      res.status(500).send({ error: error.message });
    });
};

const getOfferById = async (req, res) => {
  if (req.params && req.params.id) {
    await Offer.findById(req.params.id)
      .then((data) => {
        res.status(200).send({ data: data });
      })
      .catch((error) => {
        res.status(500).send({ error: error.message });
      });
  }
};

const updateOffer = async (req, res) => {
  await Offer.findByIdAndUpdate(
    req.params.id,
    {
      $set: {
        offerName: req.body.offerName,
        description: req.body.description,
        discount: req.body.discount,
        price: req.body.price,
        startDate: req.body.startDate,
        endDate: req.body.endDate,
        image: req.body.image,
      },
    },
    { upsert: true },
    function (err, result) {
      if (err) {
        res.send(err);
      } else {
        res.send(result);
      }
    }
  );
};

const deleteOffer = async (req, res) => {
  //check if the req body is empty
  const id = req.params.id;
  console.log(id);

  //delete product data to database
  await Offer.findByIdAndDelete(id)
    .then((response) => {
      console.log("Data sucessfully deleted from the mongo db!");

      res.status(200).send(response);

      console.log("Response sent!");
    })
    .catch((err) => {
      res.status(500).send(err.message);
    });
};

const getMealForOffer = async (req, res) => {
  if (req.params && req.params.id) {
    await Offer.findById(req.params.id)
      .populate("meals", "mealName")
      .then((data) => {
        res.status(200).send({ meals: data.meals });
      })
      .catch((error) => {
        res.status(500).send({ error: error.message });
      });
  }
};

const getCatergoryForOffer = async (req, res) => {
  if (req.params && req.params.id) {
    await Offer.findById(req.params.id)
      .populate("catergories", "categoryName")
      .then((data) => {
        res.status(200).send({ catergories: data.catergories });
      })
      .catch((error) => {
        res.status(500).send({ error: error.message });
      });
  }
};

const searchOffer = async (req, res) => {
  if (req.params && req.params.key) {
    const keyword = req.params.key;
    const regex = new RegExp(keyword, "i"); // i for case insensitive
    await Offer.find({ offerName: { $regex: regex } })
      .then((data) => {
        res.status(200).send({ data: data });
      })
      .catch((error) => {
        res.status(500).send({ error: error.message });
      });
  }
};

const getOfferWeekly = async (req, res) => {
  if (req.params) {
    await Offer.find()
      .then((data) => {
        let dates = [];
        let offers = [];

        let startOfWeek = moment().startOf("week").toDate();
        let endOfWeek = moment().endOf("week").toDate();

        console.log(startOfWeek);
        console.log(endOfWeek);

        for (let i = 0; i < data.length; i++) {
          dates.push(data[i].startDate);

          let dateString = data[i].startDate; // Oct 23

          var dateObject = new Date(dateString);
          console.log(dateObject);

          if (startOfWeek <= dateObject) {
            offers.push(data[i]);
            console.log(dateObject);
          }
        }

        res.status(200).send({ data: offers });
      })
      .catch((error) => {
        res.status(500).send({ error: error.message });
      });
  }
};

module.exports = {
  createOffer,
  getOffer,
  updateOffer,
  deleteOffer,
  getMealForOffer,
  getCatergoryForOffer,
  getOfferById,
  deleteOffer,
  searchOffer,
  getOfferWeekly,
};
