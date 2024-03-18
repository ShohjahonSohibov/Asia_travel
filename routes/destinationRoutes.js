const express = require('express');
const router = express.Router();

const {
    createDestination,
    getSingleDestination,
    getAllDestinations,
    updateDestination,
    deleteDestination,
} = require("../controller/destinationController")

router.post('/create', createDestination);
router.get('/:id', getSingleDestination);
router.get('', getAllDestinations);
router.put('/:id', updateDestination);
router.delete('/:id', deleteDestination);

module.exports = router;
