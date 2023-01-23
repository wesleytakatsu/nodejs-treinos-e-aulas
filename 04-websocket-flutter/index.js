const WebSocket = require("ws");

//  Porta de comunicação do WebSocket
const port = 8585;
const wss = new WebSocket.Server({ port: port });
console.log(`[WebSocket] WebSocket server rodando em localhost:${port}`);

wss.on("connection", (ws, request) => {
    const clientIp = request.connection.remoteAddress;
    console.log(`[WebSocket] Client IP ${clientIp} se conectou`);
    ws.send("Você está conectado no servidor NodeJS do Wesley Takatsu via WebSocket!");

    // Manda uma mensagem Broadcast. No caso para todos os clientes conectados
    ws.on("message", (message) => {
        wss.clients.forEach((client) => {
            if (client.readyState === WebSocket.OPEN) {
                client.send(message);
            }
        });
        console.log(`[WebSocket] Mensagem ${message} recebida.`);
    });
});