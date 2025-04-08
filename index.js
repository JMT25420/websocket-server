const express = require('express');
const http = require('http');
const WebSocket = require('ws');

const app = express();
const PORT = process.env.PORT || 3000;

// Simple route pour tester si le serveur est en ligne
app.get('/', (req, res) => {
  res.send('WebSocket server is running ✅');
});

const server = http.createServer(app);
const wss = new WebSocket.Server({ server });

wss.on('connection', (socket) => {
  console.log('Client connecté');

  socket.on('message', (message) => {
    console.log('Reçu :', message);

    wss.clients.forEach((client) => {
      if (client.readyState === WebSocket.OPEN) {
        client.send(`Message reçu : ${message}`);
      }
    });
  });

  socket.on('close', () => {
    console.log('Client déconnecté');
  });
});

server.listen(PORT, () => {
  console.log(`Serveur WebSocket & HTTP en écoute sur le port ${PORT}`);
});
