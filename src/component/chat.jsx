// / src/components/Chat.js
import React, { useState, useEffect } from 'react';
import io from 'socket.io-client';
import '../styles/chat.scss'

const socket = io('192.168.1.24:3000');

const Chat = () => {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');

  useEffect(() => {
    socket.on('message', (message) => {
      setMessages([...messages, message]);
    });
  }, [messages]);

  const sendMessage = () => {
    socket.emit('message', newMessage);
    setNewMessage('');
  };

  return (
    <div>
        <nav>
            <div>WhatsApp 2</div>
        </nav>
      <div className="chat">
        {messages.map((msg, index) => (
          <div key={index} className='chat__message'>{msg}</div>
        ))}
      </div>
      <div className="input">
        <input
          type="text"
          className='input__content'
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
        />
        <button onClick={sendMessage} className='input__button'>→</button>
      </div>
    </div>
  );
};

export default Chat;