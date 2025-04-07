const WebSocket = require('ws');
const PORT = process.env.PORT || 3000;

const server = new WebSocket.Server({ port: PORT });

server.on('connection', (socket) => {
  console.log('Client connecté');

  socket.on('message', (message) => {
    console.log('Reçu :', message);

    // Renvoyer à tous les clients connectés
    server.clients.forEach((client) => {
      if (client.readyState === WebSocket.OPEN) {
        client.send(`Message reçu : ${message}`);
      }
    });
  });

  socket.on('close', () => {
    console.log('Client déconnecté');
  });
});

console.log(`Serveur WebSocket lancé sur le port ${PORT}`);
