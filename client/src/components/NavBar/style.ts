import styled from 'styled-components';

export const NavBarWrapper = styled.nav`
  display: flex;
  align-items: center;
  width: 100%;
  height: 4rem;
  background-color: #fafafa;
  padding: 0 5rem;
  box-shadow: 0 0 1rem rgba(0, 0, 0, 0.1);
`;

export const NavBarInnerWrapper = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
`;

export const LoginWrapper = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
`;

export const LoginInnerWrapper = styled.div`
  margin-left: auto;
`;

export const ButtonWrapper = styled.div`
  display: flex;
  gap: 1rem;
`;

export const NavBarTitle = styled.h1`
  font-size: 1.5rem;
  font-weight: 400;
  color: #000;
  margin-right: 2rem;
`;

export const NavList = styled.ul`
  display: flex;
  gap: 1rem;
`;

export const NavItem = styled.li`
  font-size: 1rem;
  font-weight: 400;
  color: #000;
  cursor: pointer;

  &:hover {
    color: #f0f0f0;
  }
`;

export const LoginButton = styled.button`
  display: block;
  font-size: 1rem;
  font-weight: 400;
  background-color: #fff;
  color: #000;
  border: 1px solid #d2d3db;
  border-radius: 0.5rem;
  padding: 0.5rem 1rem;
  cursor: pointer;

  &:hover {
    color: #e4e5f1;
  }
`;

export const SignUpButton = styled.button`
  display: block;
  font-size: 1rem;
  font-weight: 400;
  background-color: #000;
  color: #fff;
  border-radius: 0.5rem;
  padding: 0.5rem 1rem;
  cursor: pointer;

  &:hover {
    opacity: 0.8;
  }
`;

export const ProfileImg = styled.div`
  display: block;
  width: 2.5rem;
  height: 2.5rem;
  border-radius: 50%;
  background-color: #000;
`;
