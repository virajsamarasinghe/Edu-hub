const Chat = require('../models/chatModel');

// Fetch messages for a specific conversation
const getMessages = async (req, res) => {
  try {
    const { conversationId } = req.params;
    const messages = await Chat.find({ conversationId }).sort({ timestamp: 1 });
    res.status(200).json({ messages });
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch messages' });
  }
};

// Send a new message
const sendMessage = async (req, res) => {
  try {
    const { conversationId, sender, text } = req.body;
    const newMessage = new Chat({ conversationId, sender, text });
    await newMessage.save();
    res.status(201).json(newMessage);
  } catch (error) {
    res.status(500).json({ error: 'Failed to send message' });
  }
};

module.exports = { getMessages, sendMessage };
