import styled from "styled-components";
import { Card } from "../components/Card";
import { useState } from "react";
import { Tag } from "../components/Tag";
import { Token } from "../components/Token";
import { RESOURCES, BONUSES } from "../constants";
import { toast } from "react-toastify";

export function Game({ player1, player2 }) {
  const [score1, setScore1] = useState(0);
  const [score2, setScore2] = useState(0);

  const [resources, setResources] = useState(RESOURCES);
  const [bonuses, setBonuses] = useState(BONUSES.map(b => ({ ...b, values: [...b.values].sort(() => Math.random() - 0.5) })));

  const sell = (resourceName, player, quantity) => {
    const resource = resources.find(r => r.name === resourceName);
    if (!resource) {
      console.error("Resource not found", resourceName);
      return;
    }

    // Add base tokens to score and remove them from the resource
    let tokens = resource.values.slice(0, quantity);
    let score = tokens.reduce((acc, value) => acc + value, 0);
    setResources(
      resources.map(
        r =>
          r.name === resourceName
            ? { ...r, values: r.values.slice(quantity) }
            : r
      )
    );

    // Add bonus token if applicable and remove it from the bonus
    const bonus = bonuses.find(b => b.name === quantity);
    const bonusToken = bonus?.values.slice(0, 1)[0] ?? 0;
    if (bonusToken) {
      score += bonusToken;
      setBonuses(
        bonuses.map(
          b => (b.name === quantity ? { ...b, values: b.values.slice(1) } : b)
        )
      );
    }

    // Add score to the player
    if (player === 1) {
      setScore1(score1 + score);
    } else {
      setScore2(score2 + score);
    }

    toast(
      `${player === 1 ? player1 : player2} sold ${quantity} ${resourceName} for ${score} points [${tokens.join(' ')}${bonusToken ? ` +${bonusToken}` : ""}]`
    );
  };

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
            <Tag
              resource={resource}
              player1={player1}
              player2={player2}
              sell={sell}
            />
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
