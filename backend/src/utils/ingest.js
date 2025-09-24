// Trending post ingestion from X (Twitter) and Reddit, and AI Daily News
const axios = require('axios');
const Post = require('../models/Post');
const User = require('../models/User');
const { classifySentiment } = require('./sentiment');

// Placeholder: Replace with real API keys and logic for Twitter/Reddit
async function fetchTrendingFromReddit() {
  // Example: fetch top posts from r/news
  const res = await axios.get('https://www.reddit.com/r/news/hot.json?limit=3');
  return res.data.data.children.map(c => ({
    title: c.data.title,
    body: c.data.selftext || '',
    media_urls: c.data.url ? [c.data.url] : [],
    source: 'reddit'
  }));
}

async function fetchTrendingFromX() {
  // Placeholder: Use X API or scraping (not implemented)
  return [];
}

async function postAIDailyNews() {
  // Find or create AI Daily News user
  let user = await User.findOne({ isAIDailyNews: true });
  if (!user) {
    user = new User({ username: 'AI Daily News', email: 'ai@vortexa.com', password: 'ai', isAIDailyNews: true });
    await user.save();
  }
  // Generate summary with OpenAI
  let summary = 'AI Daily News summary.';
  if (process.env.OPENAI_API_KEY) {
    const { Configuration, OpenAIApi } = require('openai');
    const openai = new OpenAIApi(new Configuration({ apiKey: process.env.OPENAI_API_KEY }));
    const prompt = 'Summarize the most important world news from the last 12 hours in 3-5 bullet points.';
    const resp = await openai.createChatCompletion({
      model: 'gpt-3.5-turbo',
      messages: [{ role: 'user', content: prompt }],
      max_tokens: 200
    });
    summary = resp.data.choices[0].message.content;
  }
  // Sentiment
  const { label, confidence, explanation } = await classifySentiment(summary);
  // Save post
  const post = new Post({
    user: user._id,
    title: 'AI Daily News',
    body: summary,
    media_urls: [],
    sentiment_label: label,
    confidence,
    explanation,
    isAIDailyNews: true,
    source: 'ai-daily-news'
  });
  await post.save();
}

// Main ingestion function (to be run every 12h)
async function ingestTrending() {
  const reddit = await fetchTrendingFromReddit();
  const x = await fetchTrendingFromX();
  const all = [...reddit, ...x];
  // Find or create AI Daily News user
  let user = await User.findOne({ isAIDailyNews: true });
  if (!user) {
    user = new User({ username: 'AI Daily News', email: 'ai@vortexa.com', password: 'ai', isAIDailyNews: true });
    await user.save();
  }
  for (const item of all) {
    const { label, confidence, explanation } = await classifySentiment(item.title + ' ' + item.body);
    const post = new Post({
      user: user._id,
      title: item.title,
      body: item.body,
      media_urls: item.media_urls,
      sentiment_label: label,
      confidence,
      explanation,
      isAIDailyNews: false,
      source: item.source
    });
    await post.save();
  }
  // Post AI Daily News
  await postAIDailyNews();
}

module.exports = { ingestTrending, postAIDailyNews };
