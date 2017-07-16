const path                = require('path');
const express             = require('express');
const http                = require('http');
const socketIO            = require('socket.io');
const util                = require('util');

const publicPath          = path.join(__dirname, '../public');
const port                = process.env.PORT || 3000;

const app                 = express();
const server              = http.createServer(app);
const io                  = socketIO(server);
const querystring         = require('querystring');

const { generateMessage } = require('./utils/message');
const { isRealString }    = require('./utils/validation');
const { Users }           = require('./utils/users');

const users = new Users();

app.use(express.static(publicPath));

io.on('connection', (socket) => {
    console.log('New user connected.');

    socket.on('join', (params, callback) => {
        params = querystring.parse(params);
        if(!isRealString(params.name) || !isRealString(params.room)) {
            return callback('Name and room name are required');
        }

        socket.join(params.room);
        users.removeUser(socket.id);
        users.addUser(socket.id, params.name, params.room);

        io.to(params.room).emit('updateUsersList', users.getUserList(params.room));
        
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
        const user = users.removeUser(socket.id);
        if(user) {
            io.to(user.room).emit('updateUsersList', users.getUserList(user.room));
            io.to(user.room).emit('newMessageToClient', generateMessage('Admin', `User ${user.name} left the room...`));
        }
    });
});

server.listen(port, () => console.log(`Running on port ${port}`));