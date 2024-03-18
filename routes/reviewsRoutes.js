const express = require('express');
const router = express.Router();

const {
    createReview,
    getSingleReview,
    getAllReviews,
    updateReview,
    deleteReview,
} = require("../controller/reviewsController")

router.post('/create', createReview);
router.get('/:id', getSingleReview);
router.get('', getAllReviews);
router.put('/:id', updateReview);
router.delete('/:id', deleteReview);

module.exports = router;
