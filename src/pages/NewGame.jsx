import styled from "styled-components";

export function NewGame({
  player1,
  setPlayer1,
  player2,
  setPlayer2,
  startGame
}) {
  return (
    <Container>
      <h2>Create a new game</h2>
      <Label>
        Player 1
        <PlayerInput
          value={player1}
          onChange={e => setPlayer1(e.target.value)}
        />
      </Label>
      <Label>
        Player 2
        <PlayerInput
          value={player2}
          onChange={e => setPlayer2(e.target.value)}
        />
      </Label>
      <Button onClick={startGame}>Start game</Button>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  border: 1px solid goldenrod;
  padding: 2rem;
  border-radius: 1rem;
  margin: 2rem;
`;

const Label = styled.label`margin-top: 1rem;`;

const PlayerInput = styled.input`
  margin: 0.5rem 0 1rem;
  font-size: 1.2rem;
  padding: 0.5rem;
  border-radius: 0.5rem;
  border: 1px solid grey;
`;

const Button = styled.button`
  margin-top: 1rem;
  padding: 0.5rem 1rem;
  border: none;
  border-radius: 0.5rem;
  background-color: goldenrod;
  color: black;
  font-size: 1.3rem;
  font-weight: bold;
  text-transform: uppercase;

  &:hover {
    background-color: gold;
    cursor: pointer;
  }
`;
