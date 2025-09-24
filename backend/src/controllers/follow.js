const User = require('../models/User');

exports.followUser = async (req, res) => {
  try {
    const { userId, targetId } = req.body;
    if (userId === targetId) return res.status(400).json({ error: 'Cannot follow yourself' });
    const user = await User.findById(userId);
    const target = await User.findById(targetId);
    if (!user || !target) return res.status(404).json({ error: 'User not found' });
    if (!user.following.includes(targetId)) user.following.push(targetId);
    if (!target.followers.includes(userId)) target.followers.push(userId);
    await user.save();
    await target.save();
    res.json({ message: 'Followed' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.unfollowUser = async (req, res) => {
  try {
    const { userId, targetId } = req.body;
    const user = await User.findById(userId);
    const target = await User.findById(targetId);
    if (!user || !target) return res.status(404).json({ error: 'User not found' });
    user.following = user.following.filter(id => id.toString() !== targetId);
    target.followers = target.followers.filter(id => id.toString() !== userId);
    await user.save();
    await target.save();
    res.json({ message: 'Unfollowed' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
