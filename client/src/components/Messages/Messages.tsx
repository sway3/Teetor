import React, { useState, useEffect, ReactNode } from 'react';
import { io } from 'socket.io-client';

import { AxiosResponse } from 'axios';
import { useQuery } from '@tanstack/react-query';

import {
  Container,
  Title,
  ThreadContainer,
  ThreadNavigator,
  MessagesThread,
  ChatContainer,
  ChatInput,
  ChatContent,
  ChatMessage,
} from './style';

import Toggle from '../UI/Toggle/Toggle';
import { getMessageList } from '../../apis/userAPIs';

const socket = io('http://localhost:3001');

const DUMMY_USER1 = '65b16cd285aee463b6aa49fe';
const DUMMY_USER2 = '65ba988085aee463b6aa4a07';

const CURRENT_USER = DUMMY_USER2;
const TARGET_USER = DUMMY_USER1;

interface Message {
  senderId: string;
  recipientId: string;
  content: string;
  timestamp: Date;
}

const Messages: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');

  useEffect(() => {
    socket.on('initial_messages', (messages: Message[]) => {
      setMessages(messages);
    });

    socket.on('new_message', (message: Message) => {
      setMessages([...messages, message]);
    });

    return () => {
      socket.off('initial_messages');
      socket.off('new_message');
    };
  }, [messages]);

  const { data, isPending, error } = useQuery<AxiosResponse>({
    queryKey: ['message-list', CURRENT_USER],
    queryFn: () => getMessageList(CURRENT_USER),
  });

  let content: ReactNode = null;

  if (isPending) {
    content = <div>Loading...</div>;
  }

  if (error) {
    content = <div>Error: {error.message}</div>;
  }

  const sendMessage = (e: React.FormEvent) => {
    e.preventDefault();

    if (!input.trim()) {
      return;
    }

    socket.emit('send_message', {
      content: input,
      senderId: CURRENT_USER,
      recipientId: TARGET_USER,
    });

    setInput('');
  };

  return (
    <>
      <Container>
        <ThreadContainer>
          <ThreadNavigator>
            <Title>Messages</Title>
            <Toggle
              options={['Mentoring', 'General']}
              isDuplicate={false}
            />
          </ThreadNavigator>
        </ThreadContainer>
        <ChatContainer>
          <ChatContent>
            {messages.map((message, index) => (
              <ChatMessage key={index}>
                <p>
                  {message.senderId}: {message.content}
                </p>
              </ChatMessage>
            ))}
          </ChatContent>
          <form onSubmit={sendMessage}>
            <ChatInput
              type='text'
              value={input}
              onChange={(e) => setInput(e.target.value)}
            />
            <button type='submit'>Send</button>
          </form>
        </ChatContainer>
      </Container>
    </>
  );
};

export default Messages;
