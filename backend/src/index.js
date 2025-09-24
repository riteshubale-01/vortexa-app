// Main entry point for backend
require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const http = require('http');
const { Server } = require('ws');
const postRoutes = require('./routes/posts');
const userRoutes = require('./routes/users');
const followRoutes = require('./routes/follow');
const dashboardRoutes = require('./routes/dashboard');
const cronRoutes = require('./routes/cron');
const { ingestTrending } = require('./utils/ingest');
const { setupWebSocket } = require('./utils/websocket');

const app = express();
const server = http.createServer(app);

// Middleware
app.use(cors());
app.use(express.json());
app.use('/uploads', express.static('uploads'));

// Routes
app.use('/posts', postRoutes);
app.use('/users', userRoutes);
app.use('/follow', followRoutes);
app.use('/dashboard', dashboardRoutes);

// Dev/test: trigger ingestion manually
app.use('/cron', cronRoutes);

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error('MongoDB connection error:', err));

// WebSocket setup
setupWebSocket(server);

// Cron job: ingest trending + AI Daily News every 12 hours
setInterval(() => {
  ingestTrending().catch(console.error);
}, 12 * 60 * 60 * 1000); // 12 hours

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
  console.log(`Backend server running on port ${PORT}`);
});
