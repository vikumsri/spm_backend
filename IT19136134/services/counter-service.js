const getCanceledOrderCount = async (req, res) => {
  await User.find({ status: "CANCELED" })
    .count()
    .then((data) => {
      res.status(200).send({ data: data });
    })
    .catch((error) => {
      res.status(500).send({ error: error.message });
    });
};
