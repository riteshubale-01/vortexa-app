// WebSocket server for real-time updates
const { Server } = require('ws');

function setupWebSocket(server) {
  const wss = new Server({ server });
  wss.on('connection', ws => {
    ws.on('message', msg => {
      // Optionally handle incoming messages
    });
  });
  // Attach to app for broadcasting
  server.on('request', (req, res) => {
    req.app = req.app || {};
    req.app.set('wss', wss);
  });
}

module.exports = { setupWebSocket };
