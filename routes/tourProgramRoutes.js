const express = require('express');
const router = express.Router();

const {
    createTourProgram,
    getSingleTourProgram,
    getAllTourPrograms,
    updateTourProgram,
    deleteTourProgram,
} = require("../controller/tourProgramController");

router.post('/create', createTourProgram);
router.get('/:id', getSingleTourProgram);
router.get('', getAllTourPrograms);
router.put('/:id', updateTourProgram);
router.delete('/:id', deleteTourProgram);

module.exports = router;
