const express = require('express');
const router = express.Router();

const {
    createBanner,
    getSingleBanner,
    getAllBanners,
    updateBanner,
    deleteBanner,
} = require("../controller/bannerController")

router.post('/create', createBanner);
router.get('/:id', getSingleBanner);
router.get('', getAllBanners);
router.put('/:id', updateBanner);
router.delete('/:id', deleteBanner);

module.exports = router;
