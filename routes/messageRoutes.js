const express = require('express');
const { protect } = require('../middlewares/authMiddleware');
const { sendMesaage, allMessages } = require('../controllers/messageControllers');
const router = express.Router();

router.route('/').post(protect, sendMesaage);
router.route('/:chatId').get(protect, allMessages);

module.exports = router;