const Post = require('../models/Post');
const natural = require('natural');

exports.getDashboardData = async (req, res) => {
  try {
    // Sentiment over time (last 24h)
    const since = new Date(Date.now() - 24 * 60 * 60 * 1000);
    const posts = await Post.find({ timestamp: { $gte: since } });
    const timeBuckets = {};
    posts.forEach(post => {
      const hour = post.timestamp.getHours();
      if (!timeBuckets[hour]) timeBuckets[hour] = { Positive: 0, Neutral: 0, Negative: 0 };
      timeBuckets[hour][post.sentiment_label]++;
    });
    // Sentiment distribution
    const dist = { Positive: 0, Neutral: 0, Negative: 0 };
    posts.forEach(post => dist[post.sentiment_label]++);
    // Top keywords per sentiment
    const keywords = { Positive: {}, Neutral: {}, Negative: {} };
    posts.forEach(post => {
      const tokenizer = new natural.WordTokenizer();
      const words = tokenizer.tokenize(post.title + ' ' + post.body);
      words.forEach(word => {
        if (!keywords[post.sentiment_label][word]) keywords[post.sentiment_label][word] = 0;
        keywords[post.sentiment_label][word]++;
      });
    });
    // Get top 5 keywords per sentiment
    const topKeywords = {};
    Object.keys(keywords).forEach(sentiment => {
      topKeywords[sentiment] = Object.entries(keywords[sentiment])
        .sort((a, b) => b[1] - a[1])
        .slice(0, 5)
        .map(([word]) => word);
    });
    res.json({ timeBuckets, dist, topKeywords });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
