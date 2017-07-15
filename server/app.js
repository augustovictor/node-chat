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
        const user = querystring.parse(params);
        console.log(user);
        if(!isRealString(user.name) || !isRealString(user.room)) {
            callback('Name and room name are required');
        }
        callback();
    });

    socket.emit('newMessageToClient', generateMessage('Admin', 'Welcome to the chat'));

    socket.broadcast.emit('newMessageToClient', generateMessage('Admin', 'New user entered...'));

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