const express = require('express');
const { protect } = require('../middlewares/authMiddleware');
const { accessChat, fetchChats, createGroupChat, renameGroupChat, addToGroupChat, removeFromGroupChat } = require('../controllers/chatControllers');
const router = express.Router();

router.route('/')
.post(protect, accessChat) //accessing a single chat
.get(protect, fetchChats); // accessing all chats

router.route('/group').post(protect, createGroupChat); //creating a group chat
router.route('/rename').put(protect, renameGroupChat); //renaming the group title
router.route('/remove').put(protect, removeFromGroupChat); //removing a user from the group
router.route('/groupAdd').put(protect, addToGroupChat); //adding a user to the group

module.exports = router;