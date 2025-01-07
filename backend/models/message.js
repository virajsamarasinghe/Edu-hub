// const mongoose = require('mongoose');

// const chatSchema = new mongoose.Schema({
//   conversationId: { type: String, required: true }, // Unique ID for the conversation
//   sender: { type: String, required: true },        // Either 'tutor' or 'student'
//   text: { type: String, required: true },          // The message text
//   timestamp: { type: Date, default: Date.now },    // When the message was sent
// });

// module.exports = mongoose.model('Chat', chatSchema);
const mongoose = require('mongoose');

const messageSchema = new mongoose.Schema({
  conversationId: { type: String, required: true },
  text: { type: String, required: true },
  sender: { type: String, required: true }, // 'user', 'tutor'
  timestamp: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Message', messageSchema);