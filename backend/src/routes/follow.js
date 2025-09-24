const express = require('express');
const router = express.Router();
const { followUser, unfollowUser } = require('../controllers/follow');

router.post('/follow', followUser);
router.post('/unfollow', unfollowUser);

module.exports = router;
