const router = require('express').Router();
const { protect } = require('../../middleware/authMiddleware');
// /api/climbing

const {
    getClimbingSessions,
    getSingleClimbingSession,
    updateClimbingSession,
    deleteClimbingSession,
    getClimbingSessionDate,
    createClimbingSession
} = require('../../controllers/climbingSessionController');

// Climbing sessions 
router.route('/climbingsession').get(protect, getClimbingSessions).post(protect, createClimbingSession);
router.route('/climbingsession/date').get(protect, getClimbingSessionDate);
router.route('/climbingsession/:id').get(protect, getSingleClimbingSession).delete(protect, deleteClimbingSession).put(protect, updateClimbingSession);

module.exports = router;