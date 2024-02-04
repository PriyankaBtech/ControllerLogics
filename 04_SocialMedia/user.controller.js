const User = require('../models/user');


// Controller for getting user profile
exports.getUserProfile = async (req, res) => {
  try {
    const userId = req.params.userId;
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.json(user);
    
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


// Controller for updating user profile
exports.updateUserProfile = async (req, res) => {
  try {
    const userId = req.params.userId;
    const { username, email } = req.body;
    const updatedUser = await User.findByIdAndUpdate(userId, { username, email }, { new: true });
    if (!updatedUser) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.json(updatedUser);

  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Controller for following/unfollowing a user
exports.toggleFollowUser = async (req, res) => {
  try {
    const { userId, followUserId } = req.body;
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    // Check if the user is already following the target user
    const isFollowing = user.following.includes(followUserId);
    if (isFollowing) {
      // if already following, unfollow
      user.following.pull(followUserId);
      await user.save();
      res.json({ message: 'Unfollowed successfully' });
    } else {
      // if not following, follow
      user.following.push(followUserId);
      await user.save();
      res.json({ message: 'Followed successfully' });
    }

  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
