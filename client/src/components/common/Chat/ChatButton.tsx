import React from 'react';
import styled from 'styled-components';

const Button = styled.button`
  position: fixed;
  bottom: 20px;
  width: 100px;
  height: 100px;
  background-color: #f8f8f8;
  border-radius: 50%;
  right: 20px;
  z-index: 1001;
`;

interface ChatButtonProps {
  onClick: () => void;
}

const ChatButton: React.FC<ChatButtonProps> = ({ onClick }) => {
  return <Button onClick={onClick}>Chat</Button>;
};

export default ChatButton;
