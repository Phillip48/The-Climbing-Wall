const router = require('express').Router();
const { protect } = require('../../middleware/authMiddleware');
// /api/send

const {
    getSends,
    getSingleSend,
    createSend,
    updateSend,
    getSendDate,
    deleteSend
} = require('../../controllers/sendController');

// Sends Routes 
router.route('/sends').get(protect, getSends).post(protect, createSend);
router.route('/sends/find').get(protect, getSendDate);
router.route('/sends/:id').get(protect, getSingleSend).delete(protect, deleteSend).put(protect, updateSend);


module.exports = router;