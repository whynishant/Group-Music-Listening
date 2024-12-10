const socket = io();  // Connect to the server using Socket.IO

// Handle the click event for the 'join-room' button
document.getElementById('join-room').addEventListener('click', () => {
    const username = document.getElementById('username').value;
    const room = document.getElementById('room').value;

    if (username && room) {
        // Emit a 'join' event to the server with the username and room data
        socket.emit('join', { username, room });

        // Hide the room input and show the playlist container
        document.getElementById('room-container').style.display = 'none';
        document.getElementById('playlist-container').style.display = 'block';

        // Update the displayed room name
        document.getElementById('room-name').textContent = room;
    } else {
        alert('Please enter both a username and a room.');
    }
});

// Listen for messages from the server (for example, when someone joins or leaves the room)
socket.on('message', (data) => {
    console.log(data);  // Log the message
    const messages = document.getElementById('messages');
    const messageItem = document.createElement('li');
    messageItem.textContent = data.msg;
    messages.appendChild(messageItem);
});
