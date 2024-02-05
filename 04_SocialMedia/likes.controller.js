const Like = require('../models/like');

// Controller for toggling a like on a post
exports.toggleLikes = async (req, res) => {
    try {
        const { userId, postId } = req.body;
        // check if the user has already liked the post
        const existingLike = await Like.findOne({ postId, userId });
        if (existingLike) {
            // If like exists, remove it
            await existingLike.remove();
            res.json({ message: 'Like removed successfully' });
        } else {
            // If like doesn't exist, create a new one
            const like = new Like({ postId, userId });
            await like.save();
            res.status(201).json({ message: 'Like added successfully' });
        }

    } catch (error) {
        res.status(400).json({ message: error.message });        
    }
}


// Controller for getting likes by post ID
exports.getLikesByPostId = async (req, res) => {
    try {
      const postId = req.params.postId;
      const likes = await Like.find({ postId });
      res.json(likes);
      
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
};