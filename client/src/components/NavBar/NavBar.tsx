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
  ProfileImg,
} from './style';

import Notification from '../UI/Notification/Notification';

const NavBar: React.FC = () => {
  const [isNotificationOpen, setIsNotificationOpen] =
    React.useState<boolean>(false);

  const [isLoggedIn, setIsLoggedIn] = React.useState<boolean>(true);

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
            <NavItem>
              <Link to='/match'>Find Mentors</Link>
            </NavItem>
          </NavList>
        </NavBarInnerWrapper>
        <LoginWrapper>
          <LoginInnerWrapper>
            {isLoggedIn ? (
              <Link to='/profile'>
                <ProfileImg />
              </Link>
            ) : (
              <ButtonWrapper>
                <LoginButton>Login</LoginButton>
                <SignUpButton>Sign Up</SignUpButton>
              </ButtonWrapper>
            )}
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
