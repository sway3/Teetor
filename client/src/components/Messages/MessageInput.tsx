import React, { useState } from 'react';
import { ChatInput } from './style';
import useSendMessage from '../../hooks/useSendMessage';

interface Chat {
  _id: string;
  participants: string[];
  latestContent: string;
  timestamp: string;
}

interface MessageInputProps {
  chat: Chat;
}

const MessageInput: React.FC<MessageInputProps> = ({ chat }) => {
  const [input, setInput] = useState('');
  const sendMessageMutation = useSendMessage();

  const sendMessage = (e: React.FormEvent) => {
    e.preventDefault();

    if (!input.trim()) {
      return;
    }

    const messageInfo = {
      content: input,
      chatId: chat._id,
    };

    sendMessageMutation.mutate(messageInfo);
    setInput('');
  };

  return (
    <form onSubmit={sendMessage}>
      <ChatInput
        type='text'
        value={input}
        onChange={(e) => setInput(e.target.value)}
      />
      <button type='submit'>Send</button>
    </form>
  );
};

export default MessageInput;
