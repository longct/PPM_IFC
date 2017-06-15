$(document).ready(function () {
    var socket = io();
    $('form').submit(function () {
        socket.emit('chatMessage', $('#m').val());
        $('#m').val('');
        return false;
    });
    socket.on('connect', function () {
        socket.emit('setUser', $('.usernameInput').val().trim());
    });
    socket.on('chatMessage', function (msg) {
        $('#messages').append($('<li>').text(msg));
    });
    socket.on('newUser', function (data) {
        $('#newUserMessage').text(data);
    });

});


