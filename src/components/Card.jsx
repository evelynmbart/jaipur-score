import styled from "styled-components";

export function Card({ color, title, children }) {
  return (
    <Container color={color}>
      <Title color={color}>
        {title}
      </Title>
      {children}
    </Container>
  );
}

const Container = styled.div`
  margin: 2rem auto 0;
  border: 1px solid ${({ color }) => color};
  border-radius: 1rem;
  width: calc(100% - 2rem);
  text-align: left;
  padding: 0.5rem 1rem;
`;

const Title = styled.h2`
  font-size: 1rem;
  color: ${({ color }) => color};
`;
