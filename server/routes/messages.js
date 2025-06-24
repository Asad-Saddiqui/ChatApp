const express = require('express');
const { sendMessage, getAllMessages, markAsRead } = require('../controllers/messageController');
const { protect } = require('../middleware/auth');

const router = express.Router();

router.route('/').post(protect, sendMessage);
router.route('/:chatId').get(protect, getAllMessages);
router.route('/:messageId/read').put(protect, markAsRead);

module.exports = router; 