const Tours = require("../models/Tours");

const createTour = async (req, res) => {
  try {
    const tour = new Tours(req.body);
    const response = await tour.save();
    res.send(response);
  } catch (err) {
    res.status(500).send({
      message: err.message,
    });
  }
};

const getSingleTour = async (req, res) => {
  try {
    const tourId = req.params.id;
    const tour = await Tours.findOne({ id: tourId });
    if (!tour) {
      return res.status(404).send({
        message: "Tour not found",
      });
    }
    res.send(tour);
  } catch (err) {
    res.status(500).send({
      message: err.message,
    });
  }
};

const getAllTours = async (req, res) => {
  try {
    let query = {};
    let { offset, limit, status } = req.query;
    offset = parseInt(offset) || 0;
    limit = parseInt(limit) || 10; // Default limit to 10 if not provided
    if (status) {
      query["status"] = status;
    }
    const tours = await Tours.find(query).skip(offset).limit(limit);
    res.send(tours);
  } catch (err) {
    res.status(500).send({
      message: err.message,
    });
  }
};

const updateTour = async (req, res) => {
  try {
    const updatedTour = await Tours.updateOne(
      { id: req.params.id },
      { $set: req.body },
      { runValidators: true }
    );

    if (!updatedTour) {
      return res.status(404).send({
        message: "Tour not found",
      });
    }

    res.send(updatedTour);
  } catch (err) {
    res.status(500).send({
      message: err.message,
    });
  }
};

const deleteTour = async (req, res) => {
  try {
    const deletedTour = await Tours.deleteOne({ id: req.params.id });
    if (!deletedTour) {
      return res.status(404).send({
        message: "Tour not found",
      });
    }

    res.send({
      message: "Tour deleted successfully",
    });
  } catch (err) {
    res.status(500).send({
      message: err.message,
    });
  }
};

module.exports = {
  createTour,
  getSingleTour,
  getAllTours,
  updateTour,
  deleteTour,
};
