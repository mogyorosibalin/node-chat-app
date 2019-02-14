const socket = io();

function scrollToBottom() {
    // Selectors
    const messages = $('#messages');
    const newMessage = messages.children('li:last-child');
    // Heights
    const clientHeight = messages.prop('clientHeight');
    const scrollTop = messages.prop('scrollTop');
    const scrollHeight = messages.prop('scrollHeight');
    const newMessageHeight = newMessage.innerHeight();
    const lastMessageHeight = newMessage.prev().innerHeight();

    if (clientHeight + scrollTop + newMessageHeight + lastMessageHeight >= scrollHeight) {
        messages.scrollTop(scrollHeight);
    }
}

socket.on('connect', function() {
    const params = $.deparam(window.location.search);

    socket.emit('join', params, function(err) {
        if (err) {
            alert(err);
            window.location.href = '/';
        } else {
            console.log('No error occured');
        }
    });
});

socket.on('newMessage', function(message) {
    const formattedTime = moment(message.createdAt).format('h:mm a');
    const template = $('#message-template').html();
    const html = Mustache.render(template, {
        from: message.from,
        createdAt: formattedTime,
        text: message.text
    });
    $('#messages').append(html);
    scrollToBottom();
});

socket.on('newLocationMessage', function(message) {
    const formattedTime = moment(message.createdAt).format('h:mm a');
    const template = $('#location-message-template').html();
    const html = Mustache.render(template, {
        from: message.from,
        createdAt: formattedTime,
        url: message.url
    });
    $('#messages').append(html);
    scrollToBottom()
});

socket.on('updateUserList', function(users) {
    const ol = $('<ol></ol>');
    users.forEach(function(user) {
        ol.append($('<li></li>').text(user));
    });
    $('#users').html(ol);
});

socket.on('disconnect', function() {
    console.log('Disconnected from server');
});

$('#message-form').on('submit', function(event) {
    event.preventDefault();
    const messageTextbox = $('[name=message]');
    socket.emit('createMessage', {
        from: 'User',
        text: messageTextbox.val()
    }, function() {
        messageTextbox.val('');
    });
});

const locationButton = $('#send-location');
locationButton.on('click', function(event) {
    event.preventDefault();
    if (!navigator.geolocation) {
        return alert('Geolocation not supported by your browser!');
    }
    locationButton.attr('disabled', 'disabled').text('Sending location...');
    navigator.geolocation.getCurrentPosition(function(position) {
        locationButton.removeAttr('disabled').text('Send location');
        socket.emit('createLocationMessage', {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude
        });
    }, function() {
        locationButton.removeAttr('disabled').text('Send location');
        alert('Unable to fetch location!');
    })
});