import styled from "styled-components";
import { Card } from "../components/Card";
import { useState } from "react";
import { Tag } from "../components/Tag";
import { Token } from "../components/Token";
import { RESOURCES } from "../constants";

export function Game({ player1, player2 }) {
  const [score1, setScore1] = useState(0);
  const [score2, setScore2] = useState(0);

  const [resources, setResources] = useState(RESOURCES);

  return (
    <Container>
      <Card color="dodgerblue" title={"Score"}>
        <p>
          <PlayerNumber>[Player 1]</PlayerNumber> {player1}: {score1}
        </p>
        <p>
          <PlayerNumber>[Player 2]</PlayerNumber> {player2}: {score2}
        </p>
      </Card>
      <Card color="goldenrod" title={"Market"}>
        {resources.map(resource =>
          <Resource>
            <Tag resource={resource} player1={player1} player2={player2} />
            {resource.values.map(value =>
              <Token>
                {value}
              </Token>
            )}
          </Resource>
        )}
      </Card>
      <Card color="palevioletred" title={"Controls"}>
        <button>Undo</button>
        <button>Redo</button>
        <button>End game</button>
      </Card>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
`;

const PlayerNumber = styled.span`color: grey;`;

const Resource = styled.div`
  display: flex;
  align-items: center;
  margin-top: 0.5rem;
`;
