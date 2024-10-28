const router = require('express').Router();
const { protect } = require('../../middleware/authMiddleware');
// /api/user

const {
    // getSingleUser,
    // getUsers,
    getMe,
    // createUser,
    deleteUser,
    updateUser,
    // loginRequired,
    signIn,
    register,
    // profile
} = require('../../controllers/userController');


// User Routes
router.route('/register').post(register);
router.route('/signin').post(signIn);
router.route('/profile', protect, getMe);
router.route('/profile/:userId').put(protect, updateUser);
router.route('/delete/:userId').delete(protect, deleteUser);

module.exports = router;
