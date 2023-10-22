const express = require('express');
const { registerUser, loginUser, fetchAllUsers } = require('../controllers/userControllers');
const { protect } = require('../middlewares/authMiddleware');
const router = express.Router();

router.route('/').post(loginUser).get(protect, fetchAllUsers);
router.post('/register', registerUser);

module.exports = router;