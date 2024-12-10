from flask import Flask, render_template
from flask_socketio import SocketIO, join_room, leave_room, emit

app = Flask(__name__)
socketio = SocketIO(app)

@app.route("/")
def index():
    return render_template("index.html")

@socketio.on('join')
def on_join(data):
    username = data['username']
    room = data['room']
    # Add the user to the room
    join_room(room)
    # Emit a message to the room about the new join
    emit('message', {'msg': f"{username} has joined the room {room}!"}, to=room)

@socketio.on('leave')
def on_leave(data):
    username = data['username']
    room = data['room']
    # Remove the user from the room
    leave_room(room)
    # Emit a message to the room about the user leaving
    emit('message', {'msg': f"{username} has left the room {room}!"}, to=room)

if __name__ == "__main__":
    socketio.run(app, debug=True, port=5001)

