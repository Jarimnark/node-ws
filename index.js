// index.js
const WebSocket = require('ws');

// Create a WebSocket server on port 8080
const wss = new WebSocket.Server({ port: 8080 });

console.log('WebSocket server is running on ws://localhost:8080');

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

