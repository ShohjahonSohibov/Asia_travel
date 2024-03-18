const Reviews = require("../models/Reviews");

const createReview = async (req, res) => {
  try {
    const review = new Reviews(req.body);
    const response = await review.save();
    res.send(response);
  } catch (err) {
    res.status(500).send({
      message: err.message,
    });
  }
};

const getSingleReview = async (req, res) => {
  try {
    const reviewId = req.params.id;
    const review = await Reviews.findOne({ id: reviewId });
    if (!review) {
      return res.status(404).send({
        message: "Review not found",
      });
    }
    res.send(review);
  } catch (err) {
    res.status(500).send({
      message: err.message,
    });
  }
};

const getAllReviews = async (req, res) => {
  try {
    let query = {};
    let { offset, limit } = req.query;
    offset = parseInt(offset) || 0;
    limit = parseInt(limit) || 10; // Default limit to 10 if not provided
    const reviews = await Reviews.find(query).skip(offset).limit(limit);
    res.send(reviews);
  } catch (err) {
    res.status(500).send({
      message: err.message,
    });
  }
};

const updateReview = async (req, res) => {
  try {
    const updatedReview = await Reviews.updateOne(
      { id: req.params.id },
      { $set: req.body },
      { runValidators: true }
    );

    if (!updatedReview) {
      return res.status(404).send({
        message: "Review not found",
      });
    }

    res.send(updatedReview);
  } catch (err) {
    res.status(500).send({
      message: err.message,
    });
  }
};

const deleteReview = async (req, res) => {
  try {
    const deletedReview = await Reviews.deleteOne({ id: req.params.id });
    if (!deletedReview) {
      return res.status(404).send({
        message: "Review not found",
      });
    }

    res.send({
      message: "Review deleted successfully",
    });
  } catch (err) {
    res.status(500).send({
      message: err.message,
    });
  }
};

module.exports = {
  createReview,
  getSingleReview,
  getAllReviews,
  updateReview,
  deleteReview,
};
