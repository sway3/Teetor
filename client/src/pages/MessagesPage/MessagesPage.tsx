import React from 'react';
import NavBar from '../../components/NavBar/NavBar';

import Messages from '../../components/Messages/Messages';

import { Container, Title } from './style';

const MessagesPage: React.FC = () => {
  return (
    <>
      <NavBar />
      <Container>
        <Messages />
      </Container>
    </>
  );
};

export default MessagesPage;
