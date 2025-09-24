const mongoose = require('mongoose');

const PostSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  title: { type: String, required: true },
  body: { type: String, required: true },
  media_urls: [{ type: String }],
  timestamp: { type: Date, default: Date.now },
  sentiment_label: { type: String, enum: ['Positive', 'Neutral', 'Negative'], required: true },
  confidence: { type: Number, required: true },
  explanation: { type: String, required: true },
  isAIDailyNews: { type: Boolean, default: false },
  source: { type: String, default: 'user' }
});

module.exports = mongoose.model('Post', PostSchema);
