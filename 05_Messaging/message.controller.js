const Message = require('../models/message');

// Controller for sending a message
exports.sendMessage = async (req, res) => {
    try {
        const { senderId, receiverId, content } = req.body;
        const message = new Message({ senderId, receiverId, content });
        await message.save();
        res.status(201).json(message);

    } catch (error) {
        res.status(400).json({ message: error.message });       
    }
}


// Controller for getting messages between two users
exports.getMessages = async (req, res) => {
    try {
        const { userId, receiverId } = req.params;
        const messages = await Message.find({
            $or: [
                { senderId, receiverId },
                { senderId: receiverId, receiverId: senderId }
            ]
        });
        res.json(messages); // with the list of messages

    } catch (error) {
        res.status(500).json({ message: error.message });        
    }
}

// Controller for deleting messages between two users
exports.deleteMessages = async (req, res) => {
    try {        
        const { senderId, receiverId } = req.params;
        // delete messages between sender and receiver
        await Message.deleteMany({
            $or: [
            { senderId, receiverId },
            { senderId: receiverId, receiverId: senderId }
            ]
        });
        res.json({ message: 'Messages deleted successfully' });

    } catch (error) {
      res.status(500).json({ message: error.message });
    }
};