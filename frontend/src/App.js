import './App.css';
import React, { useState, useEffect } from 'react';
import { io, Socket } from 'socket.io-client';

function App() {
  const [users, setUsers] = useState(0);
  const [chatHistory, setChatHistory] = useState([{me: false, text: "awfawaf"}, {me: true, text: "awefawe"}]);
  const [newMessage, setNewMessage] = useState('');
  const [socket, setSocket] = useState(null);

  useEffect(() => {
    console.log("useeffect");
    const tempSocket = io.connect('http://localhost:8000/chat');
    setSocket(tempSocket);
    tempSocket.on('message', data => {
        console.log("hi")
        setChatHistory([...chatHistory, {me: false, text: data.msg}]);
    });

    return () => {
      tempSocket.disconnect();
    }
  }, []);

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log("emit");
    socket.emit('text', {msg: newMessage, room: "1"});
    setNewMessage('');
  }

  return (
    <div className="container">
      <div style={{marginLeft: 'auto'}}>Users: {users}</div>
      <div className="mid">
        <div className="prompt">
          <span>Prompt</span>
        </div>
        <div className="chat">
          {chatHistory.map((message, index) => (
            <div key={index} style={message.me ? {marginLeft: 'auto'} : {}}>{message.text}</div>
          ))}
        </div>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Enter your message"
            value={newMessage}
            onChange={e => setNewMessage(e.target.value)}
          />
          <button type="submit">Send</button>
        </form>
      </div>
    </div>
  )
}

export default App;
