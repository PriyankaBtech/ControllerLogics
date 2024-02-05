const Comment = require('../models/comment');


// Controller for adding a comment to a post
exports.addComments = async (req, res) => {
    try {
        const { userId, postId, content} = req.body;
        const comment = new Comment({ userId, postId, content });
        await comment.save();
        res.status(201).json({message: "Post added successfully "});

    } catch (error) {
        res.status(400).json({ message: error.message });        
    }
}


// Controller for getting comments by post ID
exports.getCommentsByPostId = async (req, res) => {
    try {
        const postId = req.params.postId;
        const comments = await Comment.find({ postId });
        res.json(comments);

    } catch (error) {
        res.status(500).json({ message: error.message });         
    }
}