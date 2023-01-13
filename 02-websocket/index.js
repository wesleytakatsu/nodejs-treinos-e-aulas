const express = require("express");
const app = express();
app.use(express.static("public"));
app.get("/", (req, res) => {
    res.send("Olá, mundo!");
});
app.listen(3000, () => {
    console.log("Servidor rodando na porta 3000");
});







const WebSocket = require('ws');

const wss = new WebSocket.Server({ port: 8085 });

wss.on('connection', (ws) => {
    ws.send('Bem vindo ao nosso chat!');
    ws.on('message', (message) => {
        console.log(`Received message => ${message}`);
        // Envia a mensagem para todos os clientes conectados
        wss.clients.forEach(client => {
            if (client !== ws && client.readyState === WebSocket.OPEN) {
                client.send(message);
            }
        });
        // responde a mensagem
        ws.send(`Você me enviou: ${message}`);
    });
    ws.on('close', () => console.log('Client disconnected'));
});
console.log('Server started on port 8085');
