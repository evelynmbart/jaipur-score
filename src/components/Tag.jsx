import styled from "styled-components";
import "react-tippy/dist/tippy.css";
import { Tooltip } from "react-tippy";
import { useState } from "react";

export function Tag({ resource, player1, player2, sell }) {
  const [open, setOpen] = useState(false);
  const [selectedPlayer, setSelectedPlayer] = useState(1); // 1 or 2
  const [selectedQuantity, setSelectedQuantity] = useState(1);

  return (
    <Tooltip
      html={
        <SaleContainer>
          <SaleRow>
            Selling {resource.name}...
          </SaleRow>
          <SaleRow>
            Player:
            <RadioButton
              selected={selectedPlayer === 1}
              onClick={() => setSelectedPlayer(1)}
              color={resource.color}
              bgcolor={resource.bgcolor}
            >
              {player1}
            </RadioButton>
            <RadioButton
              selected={selectedPlayer === 2}
              onClick={() => setSelectedPlayer(2)}
              bgcolor={resource.bgcolor}
              color={resource.color}
            >
              {player2}
            </RadioButton>
          </SaleRow>
          <SaleRow>
            Quantity:
            {Array.from({ length: 5 }, (_, i) => i + 2).map(quantity =>
              <RadioButton
                key={quantity}
                selected={selectedQuantity === quantity}
                onClick={() => setSelectedQuantity(quantity)}
                bgcolor={resource.bgcolor}
                color={resource.color}
              >
                {quantity}
              </RadioButton>
            )}
          </SaleRow>
          <SaleRow>
            <SellButton
              bgcolor={resource.bgcolor}
              color={resource.color}
              onClick={() => {
                sell(resource.name, selectedPlayer, selectedQuantity);
                setOpen(false);
              }}
            >
              Sell
            </SellButton>
          </SaleRow>
        </SaleContainer>
      }
      position="top"
      trigger="click"
      interactive={true}
      duration={100}
      open={open}
    >
      <Container
        color={resource.color}
        bgcolor={resource.bgcolor}
        onClick={() => {
          setSelectedPlayer(1);
          setSelectedQuantity(1);
          setOpen(true);
        }}
      >
        {resource.name}
      </Container>
    </Tooltip>
  );
}

const Container = styled.div`
  background-color: ${({ bgcolor }) => bgcolor};
  color: ${({ color }) => color};
  display: inline-flex;
  align-items: center;
  border: 1px solid ${({ color }) => color};
  border-radius: 0.2rem;
  padding: 0 0.2rem;
  margin-right: 0.4rem;

  &:hover {
    cursor: pointer;
  }
`;

const SaleContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.2rem;
  padding: 0.2rem;
`;

const SaleRow = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

const RadioButton = styled.button`
  display: inline-block;
  padding: 0 0.5rem;

  &:hover {
    cursor: pointer;
  }

  ${({ selected, bgcolor, color }) =>
    selected &&
    `
    background-color: ${bgcolor};
    color: ${color};
    border: 1px solid ${color};
    border-radius: 0.2rem;
  `};
`;

const SellButton = styled.button`
  background-color: ${({ bgcolor }) => bgcolor};
  color: ${({ color }) => color};
  border: 1px solid ${({ color }) => color};
  border-radius: 0.2rem;
  padding: 0.5rem 1rem;
  font-weight: bold;

  &:hover {
    cursor: pointer;
  }
`;
