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
    with open('prompts/context.txt') as f:
        lines = f.readlines()
    in_prompt = ''.join(lines).replace('[CONTEXT]', situation_dict['situation_description'])

    print(in_prompt)

    robot_response = chats.get_dialog(in_prompt)[2:]

    join_room(room)
    emit('message', {
        'msg': 'Them: ' + robot_response }, 
        room=room
    )

    session['situation'] = ["You: " + robot_response]
    


@socketio.on('text', namespace='/chat')
def text(message):
    """Sent by a client when the user entered a new message.
    The message is sent to all people in the room."""
    room = session.get('room')
    session['situation'].append("Them: " + message['msg'])
    emit('message', {'msg':  "You: " + message['msg'] + "\n"}, room=room)

    
    with open('prompts/continue.txt') as f:
        lines = f.readlines()

    in_prompt = ''.join(lines).replace('[TEXT]', '\n'.join(session['situation'])) + "\n\n"

    print("State:", in_prompt)
    robot_response = chats.get_dialog(in_prompt)
    if "You:" in robot_response:
        robot_response = robot_response.replace("You: ", "")
    if robot_response[0] == "\n":
        robot_response = robot_response[1:]

    emit('message', {
        'msg':  "Them: " + robot_response }, 
        room=room
    )
    session['situation'].append("You: " + robot_response)


@socketio.on('left', namespace='/chat')
def left(message):
    """Sent by clients when they leave a room.
    A status message is broadcast to all people in the room."""
    room = session.get('room')
    leave_room(room)
    emit('status', {'msg': session.get('name') + ' has left the room.'}, room=room)

