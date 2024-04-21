import styled from 'styled-components';

export const MatchingPageWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 2rem 5rem;
`;

export const GridWrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-gap: 2rem;
  justify-content: center;
  align-items: center;
  width: 70rem;
`;
