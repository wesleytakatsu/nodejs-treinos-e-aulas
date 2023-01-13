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
//const uuidv4 = require('uuid/v4');
const { v4: uuidv4 } = require('uuid');

const wss = new WebSocket.Server({ port: 8085 });
const clients = new Map();

wss.on('connection', (ws) => {
    // gera uma ID unica
    const clientId = uuidv4();
    clients.set(clientId, ws);
    // envia uma mensagem de boas vindas
    ws.send(JSON.stringify({id: clientId, text: 'Bem vindo ao nosso chat!'}));
    ws.on('message', (message) => {
        console.log(`Received message => ${message}`);
        try {
            const data = JSON.parse(message);
            if(data.id && data.text){
                const client = clients.get(data.id);
                if (client) {
                  client.send(JSON.stringify({id: data.id, text: ` Sua mensagem: ${data.text}`}));
                }
            }
        } catch (error) {
            console.error('Invalid message format');
        }
    });
    ws.on('close', () => {
        clients.delete(clientId);
        console.log('Client disconnected');
    });
});
console.log('Server started on port 8085');


