from flask import session
from flask_socketio import emit, join_room, leave_room

from .. import socketio
import chats

@socketio.on('joined', namespace='/chat')
def joined(message):
    """Sent by clients when they enter a room.
    A status message is broadcast to all people in the room."""
    room = session.get('room')
    situation_dict = chats.get_situation()
    robot_response = chats.get_dialog(situation_dict)
    session['situation'] = situation_dict
    join_room(room)
    emit('status', {
        'msg': 'Situation: ' + situation_dict['situation_description'] + '\n' + robot_response }, 
        room=room
    )


@socketio.on('text', namespace='/chat')
def text(message):
    """Sent by a client when the user entered a new message.
    The message is sent to all people in the room."""
    room = session.get('room')
    emit('message', {'msg': session.get('name') + ':' + message['msg']}, room=room)


@socketio.on('left', namespace='/chat')
def left(message):
    """Sent by clients when they leave a room.
    A status message is broadcast to all people in the room."""
    room = session.get('room')
    leave_room(room)
    emit('status', {'msg': session.get('name') + ' has left the room.'}, room=room)

