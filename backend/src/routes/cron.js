// Route to trigger trending ingestion (for dev/testing)
const express = require('express');
const router = express.Router();
const { ingestTrending } = require('../utils/ingest');

router.post('/ingest', async (req, res) => {
  try {
    await ingestTrending();
    res.json({ message: 'Ingestion complete' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
