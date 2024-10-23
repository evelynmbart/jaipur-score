import { useState } from "react";
import { NewGame } from "./pages/NewGame";
import { Game } from "./pages/Game";
import styled from "styled-components";
import "./App.css";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export function App() {
  const [player1, setPlayer1] = useState(null);
  const [player2, setPlayer2] = useState(null);
  const [gameStarted, setGameStarted] = useState(false);

  return (
    <Container>
      <h1>Jaipur Score Card</h1>
      {gameStarted
        ? <Game player1={player1} player2={player2} />
        : <NewGame
            player1={player1}
            setPlayer1={setPlayer1}
            player2={player2}
            setPlayer2={setPlayer2}
            startGame={() => setGameStarted(true)}
          />}
      <ToastContainer position="bottom-right" theme="dark" />
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;
