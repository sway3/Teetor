import React, { useEffect, useRef, useState } from 'react';
import { ChatContent, ChatMessage, MessageBox, MessageWrapper } from './style';
import useLoadMessages from '../../hooks/useLoadMessages';
import useListenMessages from '../../hooks/useListenMessages';
import { useSocketContext } from '../../context/SocketContext';
import Message from './Message';

interface Chat {
  _id: string;
  participants: string[];
  latestContent: string;
  timestamp: string;
}

interface MessageContentProps {
  chat: Chat;
}

const MessageContent: React.FC<MessageContentProps> = ({ chat }) => {
  const endOfMessagesRef: any = useRef(null);
  const { socket } = useSocketContext();
  const { messages, setMessages, suggestions, isPending } = useLoadMessages(
    chat._id
  );
  useListenMessages(messages, setMessages);

  console.log(suggestions.choices);

  useEffect(() => {
    endOfMessagesRef.current?.scrollIntoView();
  }, [messages]);

  return (
    <ChatContent>
      {isPending && <p>loading...</p>}

      {!isPending &&
        suggestions &&
        suggestions.map((sug: string, i: number) => {
          return <p key={i}>{sug}</p>;
        })}
      <div ref={endOfMessagesRef} />

      {!isPending &&
        messages &&
        messages.map((message: any, index) => {
          return (
            <Message
              key={index}
              message={message}
            />
          );
        })}
    </ChatContent>
  );
};

export default MessageContent;
