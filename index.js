
const http = require('http');

const server = http.createServer((req, res) => {
  if (req.url === '/health') {
    res.writeHead(200, { 'Content-Type': 'text/plain' });
    res.end('Server is running');
  }
});


const WebSocket = require('ws');
const PORT = process.env.PORT || 8080
// Create a WebSocket server on port 8080
const wss = new WebSocket.Server({ port: PORT });

console.log(`WebSocket server is running on ws://localhost:${PORT}`);

// Store connected clients
const clients = new Set();

// Broadcast a message to all connected clients
const broadcast = (data) => {
    console.log('jarim: ', clients.size);

    clients.forEach((client) => {
        // console.log('jarim2: ', client);
        if (client.readyState === WebSocket.OPEN) {
            client.send(data);
        }
    });
};

// Handle connection events
wss.on('connection', (ws) => {
    console.log('New client connected');
    clients.add(ws);

    ws.on('message', (message) => {
        try {
            // Parse the incoming message
            const data = JSON.parse(message);
            console.log('Received:', data);

            // Broadcast the message to all clients as a JSON string
            broadcast(JSON.stringify(data));
        } catch (error) {
            console.error('Error parsing message:', error);
        }
    });

    ws.on('close', () => {
        clients.delete(ws);
        console.log('Client disconnected');
    });
});

