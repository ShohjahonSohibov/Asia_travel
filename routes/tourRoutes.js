const express = require('express');
const router = express.Router();

const {
    createTour,
    getSingleTour,
    getAllTours,
    updateTour,
    deleteTour,
} = require("../controller/tourController");

router.post('/create', createTour);
router.get('/:id', getSingleTour);
router.get('', getAllTours);
router.put('/:id', updateTour);
router.delete('/:id', deleteTour);

module.exports = router;
