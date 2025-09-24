const { moderateText } = require('../utils/moderation');

// Middleware to block abusive/vulgar/sensitive content
exports.moderateContent = async (req, res, next) => {
  const { title, body } = req.body;
  const text = `${title} ${body}`;
  const result = await moderateText(text);
  if (result.blocked) {
    return res.status(400).json({ error: 'Content violates community guidelines: ' + result.reason });
  }
  next();
};
