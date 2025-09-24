// Seed script for initial data
const mongoose = require('mongoose');
const User = require('../models/User');
const Post = require('../models/Post');
require('dotenv').config();

async function seed() {
  await mongoose.connect(process.env.MONGODB_URI);
  await User.deleteMany({});
  await Post.deleteMany({});
  const user = new User({ username: 'testuser', email: 'test@vortexa.com', password: 'test' });
  await user.save();
  const post = new Post({
    user: user._id,
    title: 'Welcome to Vortexa!',
    body: 'This is a sample post.',
    media_urls: [],
    sentiment_label: 'Positive',
    confidence: 0.9,
    explanation: 'Sample positive post.'
  });
  await post.save();
  console.log('Seeded!');
  process.exit();
}

seed();
