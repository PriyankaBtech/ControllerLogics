const Post = require('../models/post');

// Controller for creating a new post
exports.createPost = async (req, res) => {
    try {
        const { userId, content } = req.body;
        const post = new Post.create({ userId, content });
        await post.save();
        res.status(201).json({ message: "Post uploaded sucessfully" });

    } catch (error) {
        res.status(400).json({ message: error.message });        
    }
}


// Controller for getting all posts
exports.getAllPosts = async (res, req) => {
    try {
        const posts = await Post.find();
        res.json(posts)

    } catch (error) {
        res.status(500).json({ message: error.message });        
    }
}

// Controller for getting posts by user ID
exports.getPostsByUser = async (req, res) => {
    try {
      const userId = req.params.userId;
      // find posts by user ID in the database
      const posts = await Post.find({ userId });
      res.json(posts);
      
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
};