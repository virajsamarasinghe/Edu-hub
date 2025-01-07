// const Chat = require('../models/chatModel');

// // Fetch messages for a specific conversation
// const getMessages = async (req, res) => {
//   try {
//     const { conversationId } = req.params;
//     const messages = await Chat.find({ conversationId }).sort({ timestamp: 1 });
//     res.status(200).json({ messages });
//   } catch (error) {
//     res.status(500).json({ error: 'Failed to fetch messages' });
//   }
// };

// // Send a new message
// const sendMessage = async (req, res) => {
//   try {
//     const { conversationId, sender, text } = req.body;
//     const newMessage = new Chat({ conversationId, sender, text });
//     await newMessage.save();
//     res.status(201).json(newMessage);
//   } catch (error) {
//     res.status(500).json({ error: 'Failed to send message' });
//   }
// };

const Message = require('../models/message');

// Fetch all messages for a specific conversation
const getMessages = async (req, res) => {
  const { conversationId } = req.params;

  try {
    const messages = await Message.find({ conversationId }).sort('timestamp');
    res.status(200).json({ messages });
  } catch (error) {
    console.error('Error fetching messages:', error.message);
    res.status(500).json({ error: 'Failed to fetch messages' });
  }
};

// Send a new message
const sendMessage = async (req, res) => {
  const { conversationId, text, sender } = req.body;

  if (!conversationId || !text || !sender) {
    return res.status(400).json({ error: 'Invalid data. conversationId, text, and sender are required.' });
  }

  try {
    const newMessage = new Message({ conversationId, text, sender });
    const savedMessage = await newMessage.save();
    res.status(201).json(savedMessage);
  } catch (error) {
    console.error('Error sending message:', error.message);
    res.status(500).json({ error: 'Failed to send message' });
  }
};

module.exports = {
  getMessages,
  sendMessage,
};