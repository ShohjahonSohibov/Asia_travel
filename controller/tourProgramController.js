const TourProgram = require("../models/Tour_program");

const createTourProgram = async (req, res) => {
  try {
    const tourProgram = new TourProgram(req.body);
    const response = await tourProgram.save();
    res.send(response);
  } catch (err) {
    res.status(500).send({
      message: err.message,
    });
  }
};

const getSingleTourProgram = async (req, res) => {
  try {
    const tourProgramId = req.params.id;
    const tourProgram = await TourProgram.findOne({ id: tourProgramId });
    if (!tourProgram) {
      return res.status(404).send({
        message: "Tour program not found",
      });
    }
    res.send(tourProgram);
  } catch (err) {
    res.status(500).send({
      message: err.message,
    });
  }
};

const getAllTourPrograms = async (req, res) => {
  try {
    let query = {};
    let { offset, limit, status, tour_id } = req.query;
    offset = parseInt(offset) || 0;
    limit = parseInt(limit) || 10; // Default limit to 10 if not provided
    if (status) {
      query["status"] = status
    }
    if (tour_id) {
      query["tour_id"] = tour_id
    }
    const tourPrograms = await TourProgram.find(query).skip(offset).limit(limit);
    res.send(tourPrograms);
  } catch (err) {
    res.status(500).send({
      message: err.message,
    });
  }
};

const updateTourProgram = async (req, res) => {
  try {
    const updatedTourProgram = await TourProgram.updateOne(
      { id: req.params.id },
      { $set: req.body },
      { runValidators: true }
    );

    if (!updatedTourProgram) {
      return res.status(404).send({
        message: "Tour program not found",
      });
    }

    res.send(updatedTourProgram);
  } catch (err) {
    res.status(500).send({
      message: err.message,
    });
  }
};

const deleteTourProgram = async (req, res) => {
  try {
    const deletedTourProgram = await TourProgram.deleteOne({ id: req.params.id });
    if (!deletedTourProgram) {
      return res.status(404).send({
        message: "Tour program not found",
      });
    }

    res.send({
      message: "Tour program deleted successfully",
    });
  } catch (err) {
    res.status(500).send({
      message: err.message,
    });
  }
};

module.exports = {
  createTourProgram,
  getSingleTourProgram,
  getAllTourPrograms,
  updateTourProgram,
  deleteTourProgram,
};
