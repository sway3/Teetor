import React, { useState, useEffect } from 'react';
import { DUMMY_USER_ID } from '../../../config/config';
import socket from '../../../config/socket';

import { ChatWrapper } from './style';

interface ChatProps {
  isOpen: boolean;
  onClose: () => void;
}

interface IMessage {
  recipientId: string;
  senderId: string;
  message: string;
  timestamp: string;
}

const Chat: React.FC<ChatProps> = ({ isOpen, onClose }) => {
  const [messages, setMessages] = useState<IMessage[]>([]);
  const [newMessage, setNewMessage] = useState<string>('');

  useEffect(() => {
    socket.emit('join_room', DUMMY_USER_ID);
    
    socket.on('receive_message', (message: IMessage) => {
      setMessages((prevMessages) => [...prevMessages, message]);
    });

    return () => {
      socket.off('receive_message');
    };
  }, []);

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();

    if (!newMessage.trim()) return;

    const message = {
      senderId: DUMMY_USER_ID,
      recipientId: '65ba988085aee463b6aa4a07',
      message: newMessage,
      timestamp: new Date().toISOString(),
    };

    socket.emit('send_message', message);
    setNewMessage('');
  };

  return (
    <ChatWrapper isOpen={isOpen}>
      <button onClick={onClose}>Close</button>
      <div>
        <div>
          {messages.map((message, index) => {
            return (
              <div key={index}>
                <p>{message.message}</p>
              </div>
            );
          })}
        </div>
        <form onSubmit={handleSendMessage}>
          <input
            type='text'
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
          />
          <button type='submit'>Send</button>
        </form>
      </div>
    </ChatWrapper>
  );
};

export default Chat;
