const socket = io();

socket.on('connect', function() {
    console.log('Connected to server');
});

socket.on('newMessage', function(message) {
    const li = $('<li></li>');
    li.text(`${message.from}: ${message.text}`);
    $('#messages').append(li);
});

socket.on('disconnect', function() {
    console.log('Disconnected from server');
});

$('#message-form').on('submit', function(event) {
    event.preventDefault();
    socket.emit('createMessage', {
        from: 'User',
        text: $('[name=message]').val()
    }, function() {

    });
});