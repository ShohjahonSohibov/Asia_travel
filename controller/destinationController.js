const Destinations = require("../models/Destinations");

const createDestination = async (req, res) => {
  try {
    const destination = new Destinations(req.body);
    const response = await destination.save();
    res.send(response);
  } catch (err) {
    res.status(500).send({
      message: err.message,
    });
  }
};

const getSingleDestination = async (req, res) => {
  try {
    const destinationId = req.params.id;
    const destination = await Destinations.findOne({ id: destinationId });
    if (!destination) {
      return res.status(404).send({
        message: "Destination not found",
      });
    }
    res.send(destination);
  } catch (err) {
    res.status(500).send({
      message: err.message,
    });
  }
};

const getAllDestinations = async (req, res) => {
  try {
    let query = {}
    let { offset, limit, type, status } = req.query;
    offset = parseInt(offset) || 0;
    limit = parseInt(limit) || 10; // Default limit to 10 if not provided

    if (type) {
      query["type"] = type
    }
    if (status) {
      query["status"] = status
    }
    const destinations = await Destinations.find(query).skip(offset).limit(limit);
    res.send(destinations);
  } catch (err) {
    res.status(500).send({
      message: err.message,
    });
  }
};

const updateDestination = async (req, res) => {
  try {
    const updatedDestination = await Destinations.updateOne({ id: req.params.id }, { $set: req.body }, { runValidators: true} );

    if (!updatedDestination) {
      return res.status(404).send({
        message: "Destination not found",
      });
    }

    res.send(updatedDestination);
  } catch (err) {
    res.status(500).send({
      message: err.message,
    });
  }
};

const deleteDestination = async (req, res) => {
  try {
    const deletedDestination = await Destinations.deleteOne({ id: req.params.id });
    if (!deletedDestination) {
      return res.status(404).send({
        message: "Destination not found",
      });
    }

    res.send({
      message: "Destination deleted successfully",
    });
  } catch (err) {
    res.status(500).send({
      message: err.message,
    });
  }
};  

module.exports = {
  createDestination,
  getSingleDestination,
  getAllDestinations,
  updateDestination,
  deleteDestination,
};
