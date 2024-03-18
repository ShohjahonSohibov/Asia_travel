const express = require('express');
const router = express.Router();

const {
    createRoom,
    getSingleRoom,
    getAllRooms,
    updateRoom,
    deleteRoom,
} = require("../controller/roomsController");

router.post('/create', createRoom);
router.get('/:id', getSingleRoom);
router.get('', getAllRooms);
router.put('/:id', updateRoom);
router.delete('/:id', deleteRoom);

module.exports = router;
