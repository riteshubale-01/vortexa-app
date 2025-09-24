const Post = require('../models/Post');
const User = require('../models/User');
const { classifySentiment } = require('../utils/sentiment');

// Create a new post
exports.createPost = async (req, res) => {
  try {
    const { title, body, userId } = req.body;
    const files = req.files || [];
    const media_urls = files.map(f => `/uploads/${f.filename}`);
    // Sentiment analysis
    const { label, confidence, explanation } = await classifySentiment(title + ' ' + body);
    // Save post
    const post = new Post({
      user: userId,
      title,
      body,
      media_urls,
      sentiment_label: label,
      confidence,
      explanation
    });
    await post.save();
    // WebSocket broadcast (if needed)
    req.app.get('wss')?.clients.forEach(client => {
      if (client.readyState === 1) client.send(JSON.stringify({ type: 'new_post', post }));
    });
    res.status(201).json(post);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get posts (optionally filter by sentiment)
exports.getPosts = async (req, res) => {
  try {
    const { sentiment } = req.query;
    const filter = sentiment ? { sentiment_label: sentiment } : {};
    const posts = await Post.find(filter).populate('user', 'username isAIDailyNews').sort({ timestamp: -1 });
    res.json(posts);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
