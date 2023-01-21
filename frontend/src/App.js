import logo from './logo.svg';
import './App.css';
import React, { useState } from 'react';

function App() {
  const [users, setUsers] = useState(0);
  const [chatHistory, setChatHistory] = useState([{me: false, text: "awfawaf"}, {me: true, text: "awefawe"}]);
  const [newMessage, setNewMessage] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    setChatHistory([...chatHistory, newMessage]);
    setNewMessage('');
  }

  return (
    <div class="container">
      <div style={{marginLeft: 'auto'}}>Users: {users}</div>
      <div class="mid">
        <div class="prompt">
          <span>Prompt</span>
        </div>
        <div class="chat">
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
