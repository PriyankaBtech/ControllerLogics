// controllers/likeController.js
const Like = require('../models/like');

exports.toggleLike = async (req, res) => {
    try {
        const { videoId, userId } = req.body;
        const existingLike = await Like.findOne({ videoId, userId });
        if (!existingLike) {
            await existingLike.remove();
            res.json({ message: 'Like removed successfully' });        
        } else {
            const like = new Like({ videoId, userId });
            await like.save();
            res.status(201).json({ message: 'Like added successfully' });
        }

    } catch (error) {
        res.status(400).json({ message: error.message });        
    }
}


exports.getLikesByVideoId = async (req, res) => {
    try {
        const videoId = req.params.videoId;
        const likes = await Like.find({ videoId });
        res.json(likes);

    } catch (error) {
        res.status(500).json({ message: error.message });        
    }
}