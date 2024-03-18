const Banner = require("../models/Banner");

const createBanner = async (req, res) => {
  try {
    const banner = new Banner(req.body);
    const response = await banner.save();
    res.send(response);
  } catch (err) {
    res.status(500).send({
      message: err.message,
    });
  }
};

const getSingleBanner = async (req, res) => {
  try {
    const bannerId = req.params.id;
    const banner = await Banner.findOne({ id: bannerId });
    if (!banner) {
      return res.status(404).send({
        message: "Banner not found",
      });
    }
    res.send(banner);
  } catch (err) {
    res.status(500).send({
      message: err.message,
    });
  }
};

const getAllBanners = async (req, res) => {
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
    const banners = await Banner.find(query).skip(offset).limit(limit);
    res.send(banners);
  } catch (err) {
    res.status(500).send({
      message: err.message,
    });
  }
};

const updateBanner = async (req, res) => {
  try {
    const updatedBanner = await Banner.updateOne({ id: req.params.id }, { $set: req.body }, { runValidators: true} );

    if (!updatedBanner) {
      return res.status(404).send({
        message: "Banner not found",
      });
    }

    res.send(updatedBanner);
  } catch (err) {
    res.status(500).send({
      message: err.message,
    });
  }
};

const deleteBanner = async (req, res) => {
  try {
    const deletedBanner = await Banner.deleteOne({ id: req.params.id });
    if (!deletedBanner) {
      return res.status(404).send({
        message: "Banner not found",
      });
    }

    res.send({
      message: "Banner deleted successfully",
    });
  } catch (err) {
    res.status(500).send({
      message: err.message,
    });
  }
};  

module.exports = {
  createBanner,
  getSingleBanner,
  getAllBanners,
  updateBanner,
  deleteBanner,
};
