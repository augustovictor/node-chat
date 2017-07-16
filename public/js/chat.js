const socket = io();

socket.on('connect', function() {
    var stringParams = window.location.search.slice(1, window.location.search.length);
    console.log(stringParams);
    socket.emit('join', stringParams, function(err) {
        if(err) {
            alert(err);
            return window.location.href = '/';
        }
        console.log('No error');
    });
});

socket.on('disconnect', function() {
    console.log('I just disconnected!');
});

socket.on('updateUsersList', function(users) {
    const usersList = $('<ul></ul>');
    users.forEach(function(user) {
        usersList.append(`<li>${user.name}</li>`);
    });
    $('#users-list-container').html(usersList);
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