"use client";
import { useState } from 'react';
import Board from './Board';
import Dice from './Dice';
import styles from './page.module.css';

const SNAKES: [number, number][] = [
  [16, 6], [47, 26], [49, 11], [62, 19], [87, 24], [93, 73], [95, 75], [98, 78]
];
const LADDERS: [number, number][] = [
  [4, 25], [13, 46], [33, 49], [42, 63], [50, 69], [53, 56], [60, 64]
];

export default function SnakeLadderGame() {
  const [players, setPlayers] = useState([
    { id: 1, position: 0, color: '#FF4136' },
    { id: 2, position: 0, color: '#0074D9' }
  ]);
  const [currentPlayer, setCurrentPlayer] = useState(0);
  const [diceValue, setDiceValue] = useState(1);
  const [gameStatus, setGameStatus] = useState("Player 1's turn");
  const [moves, setMoves] = useState<string[]>([]);

  const rollDice = () => {
  const newDiceValue = Math.floor(Math.random() * 6) + 1;
  setDiceValue(newDiceValue);

  setPlayers(prevPlayers => {
    const updatedPlayers = [...prevPlayers];
    const current = updatedPlayers[currentPlayer];
    let newPosition = current.position + newDiceValue;

    // Win check
    if (newPosition >= 100) {
      newPosition = 100;
      setGameStatus(`Player ${currentPlayer + 1} wins! 🎉`);
    } else {
      // Snake check
      const snake = SNAKES.find(([head]) => head === newPosition);
      if (snake) {
        const [, tail] = snake;
        setMoves(prev => [...prev, `Player ${currentPlayer + 1} bitten by snake at ${snake[0]} → ${tail}`]);
        newPosition = tail;
      }

      // Ladder check
      const ladder = LADDERS.find(([bottom]) => bottom === newPosition);
      if (ladder) {
        const [, top] = ladder;
        setMoves(prev => [...prev, `Player ${currentPlayer + 1} climbed ladder at ${ladder[0]} → ${top}`]);
        newPosition = top;
      }

      setGameStatus(`Player ${(currentPlayer + 1) % players.length + 1}'s turn`);
    }

    current.position = newPosition;

    // Only switch turn if no one won
    if (newPosition < 100) {
      setCurrentPlayer((currentPlayer + 1) % players.length);
    }

    return updatedPlayers;
  });
};


  const resetGame = () => {
    setPlayers(players.map(p => ({ ...p, position: 0 })));
    setCurrentPlayer(0);
    setGameStatus("Player 1's turn");
    setMoves([]);
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Snake & Ladder</h1>
      <div className={styles.gameArea}>
        <Board players={players} snakes={SNAKES} ladders={LADDERS} />
        <div className={styles.controls}>
          <Dice value={diceValue} onRoll={rollDice} disabled={gameStatus.includes('wins')} />
          <button className={styles.resetButton} onClick={resetGame}>Reset Game</button>
          <div className={styles.status}>{gameStatus}</div>
        </div>
      </div>
      
      <div className={styles.movesContainer}>
        <h3>Game Moves:</h3>
        <ul className={styles.movesList}>
          {moves.map((move, idx) => <li key={idx}>{move}</li>)}
        </ul>
      </div>
    </div>
  );
}
