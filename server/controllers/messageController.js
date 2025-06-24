const Message = require('../models/Message');
const User = require('../models/User');
const Chat = require('../models/Chat');

// Send message
exports.sendMessage = async (req, res) => {
  try {
    const { content, chatId, attachments } = req.body;

    if (!content || !chatId) {
      return res.status(400).json({
        success: false,
        message: 'Please provide content and chatId'
      });
    }

    // Create new message
    let newMessage = {
      sender: req.user.id,
      content,
      chat: chatId
    };

    if (attachments && attachments.length > 0) {
      newMessage.attachments = attachments;
    }

    let message = await Message.create(newMessage);

    // Populate message with sender and chat details
    message = await message.populate('sender', 'username profilePicture');
    message = await message.populate('chat');
    message = await User.populate(message, {
      path: 'chat.users',
      select: 'username profilePicture email'
    });

    // Update latest message in chat
    await Chat.findByIdAndUpdate(chatId, {
      latestMessage: message._id
    });

    res.status(201).json({
      success: true,
      data: message
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// Get all messages for a chat
exports.getAllMessages = async (req, res) => {
  try {
    const { chatId } = req.params;

    // Find all messages for the chat
    const messages = await Message.find({ chat: chatId })
      .populate('sender', 'username profilePicture email')
      .populate('chat');

    res.status(200).json({
      success: true,
      data: messages
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// Mark messages as read
exports.markAsRead = async (req, res) => {
  try {
    const { messageId } = req.params;

    const message = await Message.findByIdAndUpdate(
      messageId,
      { $addToSet: { readBy: req.user.id } },
      { new: true }
    );

    if (!message) {
      return res.status(404).json({
        success: false,
        message: 'Message not found'
      });
    }

    res.status(200).json({
      success: true,
      data: message
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
}; 