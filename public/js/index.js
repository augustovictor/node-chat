const socket = io();

socket.on('connect', function() {
    console.log('I am connected to server!');

    socket.emit('createMessage', { from: 'client', content: 'This is a message from client to server.' });
});

socket.on('disconnect', function() {
    console.log('I just disconnected!');
});

socket.on('newMessage', message => {
    console.log(message);
});