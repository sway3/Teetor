import styled, { css } from 'styled-components';

export const FormContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 2rem;
`;

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 50rem;
  padding: 2rem;
  border-radius: 1rem;
  box-shadow: 0 0 1rem rgba(0, 0, 0, 0.1);
`;

export const FormFlexItem = styled.div`
  width: 30rem;
`;

export const Label = styled.label`
  display: block;
  font-size: rem;
  margin: 0 0 0.3rem 0;
  color: #000;
`;

interface inputProps {
  width?: string;
  margin?: string;
}

export const Input = styled.input<inputProps>`
  display: block;
  font-size: 1rem;
  width: ${(props) => (props.width ? props.width : '30rem')};
  margin: ${(props) => (props.margin ? props.margin : '0 0 1.5rem 0')};
  padding: 0.8rem 0.5rem;
  border: 1px solid #d4d4d4;
  border-radius: 0.5rem;
`;

export const NameWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
`;

export const LinksWrapper = styled.div``;

export const Links = styled.div`
  display: flex;
`;

export const SelectLink = styled.select`
  display: block;
  font-size: 1rem;
  padding: 0.8rem 0.5rem;
  border: 1px solid #d4d4d4;
  border-radius: 0.5rem;
`;

export const RoleWrapper = styled.div`
  display: flex;
  justify-content: center;
  margin: 1rem;
`;

interface RoleButtonProps {
  $isActive: boolean;
}

export const RoleButton = styled.button<RoleButtonProps>`
  font-size: 1rem;
  padding: 1rem 2rem;
  border: 1px solid #777;
  border-radius: 1rem;

  ${(props) =>
    props.$isActive &&
    css`
      background-color: #14452f;
      color: white;
    `}

  &:hover {
    color: #fff;
    background-color: #14452f;
  }
`;

interface MentorProps {
  $isActive: boolean;
}

export const MentorInfoWrapper = styled.div<MentorProps>`
  display: ${(props) => (props.$isActive ? 'block' : 'none')};
  width: 30rem;
`;

export const Title = styled.h2`
  font-size: 1.5rem;
  margin: 1rem 0;
`;

export const SubTitle = styled.h3`
  font-size: 1rem;
`;

export const SearchBar = styled.div``;

export const CardWrapper = styled.div`
  display: flex;
  margin-bottom: 1rem;
`;

export const Card = styled.div`
  display: block;
  font-size: 1rem;
  font-weight: 500;
  color: #000;
  padding: 0.5rem 1rem;
  border: 1px solid #d2d3db;
  border-radius: 3rem;
`;
