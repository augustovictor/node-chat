const socket = io();

socket.on('connect', function() {
    console.log('I am connected to server!');
});

socket.on('disconnect', function() {
    console.log('I just disconnected!');
});

socket.on('newMessageToClient', message => {
    const msg = `<p>${ message.from } [${ message.createdAt }]: ${ message.content }</p>`;
    $('#messaged-feed').append(msg);
});

$('#message-form').on('submit', function(event) {
    event.preventDefault();
    socket.emit('createMessage', {
        from: 'User',
        content: $('[name=message]').val()
    }, function(ack) {
        $('[name=message]').val('');
        console.log(ack);
    });
});