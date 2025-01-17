const { WebSocketServer } = require('ws');

let wss; // WebSocket Server instance

const handler = (req, res) => {
    // console.log('test 123: ', wss)
    // if (!wss) {
        wss = new WebSocketServer({ noServer: true });
        // wss = new WebSocketServer({ port: "ws://node-ws-mu.vercel.app/" });

        wss.on('connection', (ws) => {
            console.log('connecting')
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
    // }

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
