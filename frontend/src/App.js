import './App.css';
import React, { useState, useEffect } from 'react';
import openSocket from 'socket.io-client';

function App() {
  const [users, setUsers] = useState(0);
  const [chatHistory, setChatHistory] = useState([{me: false, text: "awfawaf"}, {me: true, text: "awefawe"}]);
  const [newMessage, setNewMessage] = useState('');

  const temp = openSocket('http://localhost:8000/chat');
  const socket = temp.connect('http://localhost:8000/chat');
  useEffect(() => {
    socket.on('text', data => {
        console.log("hi")
        setChatHistory([...chatHistory, data.msg]);
    });
    return () => {
        socket.disconnect();
    }
  }, []);

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log("emit");
    socket.emit('text', newMessage);
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
