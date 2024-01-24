import styled from 'styled-components';

export const NotificationWrapper = styled.div<{ isOpen: boolean }>`
  position: fixed;
  top: 0;
  left: ${(props) => (props.isOpen ? '0' : '-30%')};
  width: 30%;
  height: 100vh;
  background-color: #fff;
  box-shadow: 2px 0px 5px rgba(0, 0, 0, 0.5);
  transition: left 0.3s ease-in-out;
  overflow-y: auto;
`;