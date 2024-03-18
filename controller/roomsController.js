const Rooms = require("../models/Rooms");

const createRoom = async (req, res) => {
  try {
    const room = new Rooms(req.body);
    const response = await room.save();
    res.send(response);
  } catch (err) {
    res.status(500).send({
      message: err.message,
    });
  }
};

const getSingleRoom = async (req, res) => {
  try {
    const roomId = req.params.id;
    const room = await Rooms.findOne({ id: roomId });
    if (!room) {
      return res.status(404).send({
        message: "Room not found",
      });
    }
    res.send(room);
  } catch (err) {
    res.status(500).send({
      message: err.message,
    });
  }
};

const getAllRooms = async (req, res) => {
  try {
    let query = {};
    let { offset, limit, status, type, hotel_id } = req.query;
    offset = parseInt(offset) || 0;
    limit = parseInt(limit) || 10; // Default limit to 10 if not provided
    if (status) {
      query["status"] = status
    }
    if (type) {
      query["type"] = type
    }
    if (hotel_id) {
      query["hotel_id"] = hotel_id
    }
    const rooms = await Rooms.find(query).skip(offset).limit(limit);
    res.send(rooms);
  } catch (err) {
    res.status(500).send({
      message: err.message,
    });
  }
};

const updateRoom = async (req, res) => {
  try {
    const updatedRoom = await Rooms.updateOne(
      { id: req.params.id },
      { $set: req.body },
      { runValidators: true }
    );

    if (!updatedRoom) {
      return res.status(404).send({
        message: "Room not found",
      });
    }

    res.send(updatedRoom);
  } catch (err) {
    res.status(500).send({
      message: err.message,
    });
  }
};

const deleteRoom = async (req, res) => {
  try {
    const deletedRoom = await Rooms.deleteOne({ id: req.params.id });
    if (!deletedRoom) {
      return res.status(404).send({
        message: "Room not found",
      });
    }

    res.send({
      message: "Room deleted successfully",
    });
  } catch (err) {
    res.status(500).send({
      message: err.message,
    });
  }
};

module.exports = {
  createRoom,
  getSingleRoom,
  getAllRooms,
  updateRoom,
  deleteRoom,
};
