const Hotel = require("../models/Hotels");

const createHotel = async (req, res) => {
  try {
    const hotel = new Hotel(req.body);
    const response = await hotel.save();
    res.send(response);
  } catch (err) {
    res.status(500).send({
      message: err.message,
    });
  }
};

const getSingleHotel = async (req, res) => {
  try {
    const hotelId = req.params.id;
    const hotel = await Hotel.findOne({ id: hotelId });
    if (!hotel) {
      return res.status(404).send({
        message: "Hotel not found",
      });
    }
    res.send(hotel);
  } catch (err) {
    res.status(500).send({
      message: err.message,
    });
  }
};

const getAllHotels = async (req, res) => {
  try {
    let query = {}
    let { offset, limit, status } = req.query;
    offset = parseInt(offset) || 0;
    limit = parseInt(limit) || 10; // Default limit to 10 if not provided
    if (status) {
        query["status"] = status
    }
    const hotels = await Hotel.find(query).skip(offset).limit(limit);
    res.send(hotels);
  } catch (err) {
    res.status(500).send({
      message: err.message,
    });
  }
};

const updateHotel = async (req, res) => {
    try {
      const updatedHotel = await Hotel.updateOne({ id: req.params.id }, { $set: req.body }, { runValidators: true} );
  
      if (!updatedHotel) {
        return res.status(404).send({
          message: "Hotel not found",
        });
      }
  
      res.send(updatedHotel);
    } catch (err) {
      res.status(500).send({
        message: err.message,
      });
    }
  };
  
  const deleteHotel = async (req, res) => {
    try {
      const deletedHotel = await Hotel.deleteOne({ id: req.params.id });
      if (!deletedHotel) {
        return res.status(404).send({
          message: "Hotel not found",
        });
      }
  
      res.send({
        message: "Hotel deleted successfully",
      });
    } catch (err) {
      res.status(500).send({
        message: err.message,
      });
    }
  };  

module.exports = {
  createHotel,
  getSingleHotel,
  getAllHotels,
  updateHotel,
  deleteHotel,
};
