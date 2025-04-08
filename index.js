const http = require('http');
const WebSocket = require('ws');

const PORT = process.env.PORT || 3000;

// Créer un serveur HTTP
const server = http.createServer((req, res) => {
  res.writeHead(200);
  res.end("Serveur WebSocket actif");
});

// Attacher le WebSocket au serveur HTTP
const wss = new WebSocket.Server({ server });

wss.on('connection', (ws) => {
  console.log('Client connecté');

  ws.on('message', (message) => {
    console.log('Reçu :', message);

    // Diffuser le message à tous les clients
    wss.clients.forEach((client) => {
      if (client.readyState === WebSocket.OPEN) {
        client.send(`Message reçu : ${message}`);
      }
    });
  });

  ws.on('close', () => {
    console.log('Client déconnecté');
  });
});

// Démarrer le serveur HTTP sur le port attendu par Render
server.listen(PORT, () => {
  console.log(`Serveur WebSocket écoutant sur le port ${PORT}`);
});
