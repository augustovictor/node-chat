const path                = require('path');
const express             = require('express');
const http                = require('http');
const socketIO            = require('socket.io');

const publicPath          = path.join(__dirname, '../public');
const port                = process.env.PORT || 3000;

const app                 = express();
const server              = http.createServer(app);
const io                  = socketIO(server);
const querystring         = require('querystring');

const { generateMessage } = require('./utils/message');
const { isRealString }    = require('./utils/validation');

app.use(express.static(publicPath));

io.on('connection', (socket) => {
    console.log('New user connected.');

    socket.on('join', (params, callback) => {
        params = querystring.parse(params);
        console.log(params);
        if(!isRealString(params.name) || !isRealString(params.room)) {
            callback('Name and room name are required');
        }

        socket.join(params.room);
        
        socket.emit('newMessageToClient', generateMessage('Admin', 'Welcome to the chat'));
        socket.broadcast.to(params.room).emit('newMessageToClient', generateMessage('Admin', `${params.name} has joined...`));
        callback();
    });


    socket.on('createMessage', (message, callback) => {
        console.log(message);
        io.emit('newMessageToClient', generateMessage(message.from, message.content));
        callback('Message sent...');
    });

    socket.on('disconnect', () => {
        console.log('User disconnected!');
    });
});

server.listen(port, () => console.log(`Running on port ${port}`));