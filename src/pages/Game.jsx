import styled from "styled-components";
import { Card } from "../components/Card";
import { useState, useCallback } from "react";
import { Tag } from "../components/Tag";
import { Token } from "../components/Token";
import { RESOURCES, BONUSES } from "../constants";
import { toast } from "react-toastify";

export function Game({ player1, player2 }) {
  const [score1, setScore1] = useState(0);
  const [score2, setScore2] = useState(0);

  const [resources, setResources] = useState(RESOURCES);
  const [bonuses, setBonuses] = useState(BONUSES.map(b => ({ ...b, values: [...b.values].sort(() => Math.random() - 0.5) })));
  const [sales, setSales] = useState([]);
  const [undoStack, setUndoStack] = useState([]);

  const sell = useCallback((resourceName, player, quantity) => {
    const resource = resources.find(r => r.name === resourceName);
    if (!resource) {
      console.error("Resource not found", resourceName);
      return;
    }

    // Add base tokens to score and remove them from the resource
    let tokens = resource.values.slice(0, quantity);
    let score = tokens.reduce((acc, value) => acc + value, 0);
    const newResources = resources.map(
      r =>
        r.name === resourceName
          ? { ...r, values: r.values.slice(quantity) }
          : r
    );

    // Add bonus token if applicable and remove it from the bonus
    const bonus = bonuses.find(b => b.name === quantity);
    const bonusToken = bonus?.values.slice(0, 1)[0] ?? 0;
    let newBonuses = bonuses;
    if (bonusToken) {
      score += bonusToken;
      newBonuses = bonuses.map(
        b => (b.name === quantity ? { ...b, values: b.values.slice(1) } : b)
      );
    }

    // Add score to the player
    const newScore1 = player === 1 ? score1 + score : score1;
    const newScore2 = player === 2 ? score2 + score : score2;

    // Record the sale
    const sale = {
      resourceName,
      player,
      quantity,
      tokens,
      bonusToken,
      score,
    };

    setSales([...sales, sale]);
    setResources(newResources);
    setBonuses(newBonuses);
    setScore1(newScore1);
    setScore2(newScore2);
    setUndoStack([]);

    toast(
      `${player === 1 ? player1 : player2} sold ${quantity} ${resourceName} for ${score} points [${tokens.join(' ')}${bonusToken ? ` +${bonusToken}` : ""}]`
    );
  }, [resources, bonuses, sales, score1, score2, player1, player2]);

  const undo = useCallback(() => {
    if (sales.length === 0) return;

    const lastSale = sales[sales.length - 1];
    const {resourceName, player, quantity, tokens, bonusToken, score} = lastSale;

    // Revert resources
    const newResources = resources.map(r =>
      r.name === resourceName
        ? { ...r, values: [...tokens, ...r.values] }
        : r
    );

    // Revert bonuses
    const newBonuses = bonuses.map(b =>
      b.name === quantity && bonusToken
        ? { ...b, values: [bonusToken, ...b.values] }
        : b
    );

    // Revert scores
    const newScore1 = player === 1 ? score1 - score : score1;
    const newScore2 = player === 2 ? score2 - score : score2;

    setResources(newResources);
    setBonuses(newBonuses);
    setScore1(newScore1);
    setScore2(newScore2);
    setSales(sales.slice(0, -1));
    setUndoStack([...undoStack, lastSale]);

    toast(`Undid last sale`);
  }, [resources, bonuses, sales, undoStack, score1, score2]);

  const redo = useCallback(() => {
    if (undoStack.length === 0) return;

    const saleToRedo = undoStack[undoStack.length - 1];
    const {resourceName, player, quantity, tokens, bonusToken, score} = saleToRedo;

    // Apply resources change
    const newResources = resources.map(r =>
      r.name === resourceName
        ? { ...r, values: r.values.slice(quantity) }
        : r
    );

    // Apply bonuses change
    const newBonuses = bonuses.map(b =>
      b.name === quantity && bonusToken
        ? { ...b, values: b.values.slice(1) }
        : b
    );

    // Apply scores change
    const newScore1 = player === 1 ? score1 + score : score1;
    const newScore2 = player === 2 ? score2 + score : score2;

    setResources(newResources);
    setBonuses(newBonuses);
    setScore1(newScore1);
    setScore2(newScore2);
    setSales([...sales, saleToRedo]);
    setUndoStack(undoStack.slice(0, -1));

    toast(`Redid last undone sale`);
  }, [resources, bonuses, sales, undoStack, score1, score2]);

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
          <Resource key={resource.name}>
            <Tag
              resource={resource}
              player1={player1}
              player2={player2}
              sell={sell}
            />
            {resource.values.map((value, index) =>
              <Token key={index}>
                {value}
              </Token>
            )}
          </Resource>
        )}
      </Card>
      <Card color="palevioletred" title={"Controls"}>
        <button onClick={undo} disabled={sales.length === 0}>Undo</button>
        <button onClick={redo} disabled={undoStack.length === 0}>Redo</button>
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
