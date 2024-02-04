// controllers/commentController.js
const Comment = require('../models/comment');

// controller for add commment on video
exports.addComment = async (req, res) => {
   try {
    const { videoId, userId, content } = req.body;
    const comment = await new Comment({ videoId, userId, content });
    await res.comment.save();
    res.status(201).json(comment)

   } catch (error) {
    res.status(400).json({ message: error.message });    
   }
}


// controller for read commments on video
exports.getCommentsByVideoId = async (req, res) => {
   try {
    const videoId = req.params.videoId;
    const comments = await Comment.find({ videoId });
    res.status(201).json(comments)

   } catch (error) {
    res.status(400).json({ message: error.message });    
   }    
}