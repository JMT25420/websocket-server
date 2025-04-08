const express = require('express');
const http = require('http');
const WebSocket = require('ws');
const helmet = require('helmet'); // <-- AJOUTÉ

const app = express();
const PORT = process.env.PORT || 3000;

// 🔐 Configuration de la sécurité avec helmet + politique CSP
app.use(
  helmet.contentSecurityPolicy({
    directives: {
      defaultSrc: ["'self'"],
      scriptSrc: ["'self'", "'unsafe-inline'"],
      connectSrc: ["'self'", "wss://websocket-server-afza.onrender.com"], // <-- C'EST ÇA QUI PERMET LE WS
    },
  })
);

// Route simple
app.get('/', (req, res) => {
  res.send('WebSocket server is running ✅');
});

// Serveur HTTP
const server = http.createServer(app);

// Serveur WebSocket
const wss = new WebSocket.Server({ server });

wss.on('connection', (socket) => {
  console.log('Client connecté');

  socket.on('message', (message) => {
    console.log('Reçu :', message);

    // Renvoie à tous les clients
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

// Lancement du serveur
server.listen(PORT, () => {
  console.log(`Serveur WebSocket & HTTP en écoute sur le port ${PORT}`);
});
