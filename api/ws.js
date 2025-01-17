const { WebSocketServer } = require('ws');

let wss; // WebSocket Server instance

const handler = (req, res) => {
    if (!wss) {
        wss = new WebSocketServer({ noServer: true });

        wss.on('connection', (ws) => {
            ws.on('message', (message) => {
                console.log('Received:', message);

                // Broadcast to all clients
                wss.clients.forEach((client) => {
                    if (client.readyState === WebSocket.OPEN) {
                        client.send(message);
                    }
                });
            });
        });

        console.log('WebSocket server initialized');
    }

    if (req.method === 'GET') {
        res.status(200).send('WebSocket server is running.');
    } else {
        res.status(405).send('Method Not Allowed');
    }
};

export default handler;

export const config = {
    api: {
        bodyParser: false, // Disable body parsing for WebSocket
    },
};
