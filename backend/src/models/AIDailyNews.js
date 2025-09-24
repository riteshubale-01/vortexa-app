const mongoose = require('mongoose');

const AIDailyNewsSchema = new mongoose.Schema({
  post: { type: mongoose.Schema.Types.ObjectId, ref: 'Post', required: true },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('AIDailyNews', AIDailyNewsSchema);
