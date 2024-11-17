import React, { useState, useEffect } from 'react';
import { io } from 'socket.io-client';
 // Add your Tailwind CSS classes here

const socket = io('http://localhost:5000'); // Adjust the URL as necessary

const Chat = ({ rentalId, user }) => {
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    socket.emit('joinRoom', rentalId);

    socket.on('receiveMessage', ({ message, sender }) => {
      setMessages((prevMessages) => [...prevMessages, { message, sender }]);
    });

    return () => {
      socket.off('receiveMessage');
    };
  }, [rentalId]);

  const sendMessage = (e) => {
    e.preventDefault();
    if (message.trim()) {
      socket.emit('sendMessage', { rentalId, message, sender: user });
      setMessage('');
    }
  };

  return (
    <div className="chat-container">
      <div className="chat-messages">
        {messages.map((msg, idx) => (
          <div key={idx} className={`chat-message ${msg.sender === user ? 'sent' : 'received'}`}><strong>{msg.sender}:</strong> {msg.message}</div>
        ))}
      </div>
      <form onSubmit={sendMessage} className="chat-form">
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          className="chat-input"
          placeholder="Type a message..."
        />
        <button type="submit" className="chat-send-button">Send</button>
      </form>
    </div>
  );
};

export default Chat;
