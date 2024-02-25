const express = require('express');
const app = express();
const socketio = require('socket.io');
const namespaces = require('./data/namespaces');

app.use(express.static(__dirname + '/public'));

const expressServer = app.listen(8001);
const io = socketio(expressServer)

io.on('connection', (socket) => {
    socket.emit('welcome', 'welcome to the server')

    socket.on('client_connect', () => {
        console.log('Socket Id#', socket.id, 'has connected')
    })

    socket.emit('list_namespaces', namespaces)
})