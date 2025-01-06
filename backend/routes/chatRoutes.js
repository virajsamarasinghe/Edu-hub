const express = require('express');
const { getMessages, sendMessage } = require('../controllers/chatController');

const router = express.Router();

// Route to fetch all messages for a conversation
router.get('/:conversationId', getMessages);

// Route to send a new message
router.post('/send', sendMessage);

module.exports = router;
