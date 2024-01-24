import React from 'react';

import { Link } from 'react-router-dom';

import {
  NavBarWrapper,
  NavBarInnerWrapper,
  LoginWrapper,
  LoginInnerWrapper,
  NavBarTitle,
  NavList,
  NavItem,
  ButtonWrapper,
  LoginButton,
  SignUpButton,
} from './style';

import Notification from '../UI/Notification/Notification';

const NavBar: React.FC = () => {
  const [isNotificationOpen, setIsNotificationOpen] =
    React.useState<boolean>(false);

  return (
    <>
      <NavBarWrapper>
        <NavBarInnerWrapper>
          <NavBarTitle>teetor</NavBarTitle>
          <NavList>
            <NavItem>
              <Link to='/dashboard'>Dashboard</Link>
            </NavItem>
            <NavItem>
              <Link to='/forum'>Forum</Link>
            </NavItem>
            <NavItem onClick={() => setIsNotificationOpen(!isNotificationOpen)}>
              Notification
            </NavItem>
          </NavList>
        </NavBarInnerWrapper>
        <LoginWrapper>
          <LoginInnerWrapper>
            <ButtonWrapper>
              <LoginButton>Login</LoginButton>
              <SignUpButton>Sign Up</SignUpButton>
            </ButtonWrapper>
          </LoginInnerWrapper>
        </LoginWrapper>
      </NavBarWrapper>
      <Notification
        isOpen={isNotificationOpen}
        onClose={() => setIsNotificationOpen(false)}
      />
    </>
  );
};

export default NavBar;
