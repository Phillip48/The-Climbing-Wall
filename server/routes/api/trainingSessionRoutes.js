const router = require('express').Router();
const { protect } = require('../../middleware/authMiddleware');
// /api/training

const {
    getSingleTrainingSession,
    getTrainingSessions,
    updateTrainingSession,
    createTrainingSession,
    getTrainingSessionDate,
    deleteTrainingSession
} = require('../../controllers/trainingSessionController');

// Training sessions 
router.route('/trainingsession').get(protect, getTrainingSessions).post(protect, createTrainingSession);
router.route('/trainingsession/date').get(protect, getTrainingSessionDate);
router.route('/trainingsession/:id').get(protect, getSingleTrainingSession).delete(protect, deleteTrainingSession).put(protect, updateTrainingSession);

module.exports = router;