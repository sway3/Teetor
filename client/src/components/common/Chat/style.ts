import styled from 'styled-components';

export const ChatWrapper = styled.div<{ isOpen: boolean }>`
  position: fixed;
  bottom: 80px;
  right: 20px;
  width: 300px;
  height: 400px;
  background-color: white;
  border-radius: 10px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  display: ${props => props.isOpen ? 'block' : 'none'};
  z-index: 100;
`;