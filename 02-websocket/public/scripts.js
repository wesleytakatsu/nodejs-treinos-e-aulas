// JavaScript
const socket = new WebSocket('ws://127.0.0.1:8085');
const messages = document.getElementById('messages');
const messageInput = document.getElementById('message-input');
const sendButton = document.getElementById('send-button');

// Adiciona um listener para mensagens recebidas do servidor
socket.onmessage = event => {
    const message = document.createElement('div');
    message.innerHTML = event.data;
    messages.appendChild(message);
};

sendButton.addEventListener('click', () => {
    const message = messageInput.value;
    socket.send(message);
    messageInput.value = '';
});
