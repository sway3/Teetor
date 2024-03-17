import styled, {css} from 'styled-components';

export const Container = styled.div`
  display: flex;
  width: 100%;
  height: 100%;
  padding: 1rem;
  box-shadow: 0 0 1rem rgba(0, 0, 0, 0.1);
`;

export const Title = styled.h1`
  font-size: 1.5rem;
  font-weight: 600;
`;

export const ThreadContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 35rem;
  height: 100%;
  border-right: 1px solid rgba(0, 0, 0, 0.1);
`;


export const ThreadNavigator = styled.div`
  height: 100%;
`;

export const MessagesThread = styled.div`

`;

export const ChatContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
  margin: 0 auto;
`;

export const ChatInput = styled.input`
  width: 100%;
  height: 3rem;
  font-size: 1.5rem;
  padding: 0 1rem;
  box-sizing: border-box;
  border: 1px solid black;
`;

export const ChatContent = styled.div`
  width: 100%;
  height: 100%;
  overflow-y: auto;
`;

export const ChatMessage = styled.div`
  display: flex;
`;