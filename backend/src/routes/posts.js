const express = require('express');
const router = express.Router();
const multer = require('multer');
const { createPost, getPosts } = require('../controllers/posts');
const { moderateContent } = require('../middleware/moderation');

// Multer setup for media uploads
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/');
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '-' + file.originalname);
  }
});
const upload = multer({ storage: storage, limits: { files: 7 } });

// Create post (with moderation)
router.post('/', moderateContent, upload.array('media', 7), createPost);

// Get posts (with optional sentiment filter)
router.get('/', getPosts);

module.exports = router;
