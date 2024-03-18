const express = require('express');
const router = express.Router();

const {
    createHotel,
    getSingleHotel,
    getAllHotels,
    updateHotel,
    deleteHotel,
} = require("../controller/hotelsController")

router.post('/create', createHotel)
router.get('/:id', getSingleHotel)
router.get('', getAllHotels)
router.put('/:id', updateHotel)
router.delete('/:id', deleteHotel)

module.exports = router;