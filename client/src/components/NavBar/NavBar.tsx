import React from 'react';

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

const NavBar: React.FC = () => {
  return (
    <>
      <NavBarWrapper>
        <NavBarInnerWrapper>
          <NavBarTitle>teetor</NavBarTitle>
          <NavList>
            <NavItem>Dashboard</NavItem>
            <NavItem>Forum</NavItem>
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
    </>
  );
};

export default NavBar;
