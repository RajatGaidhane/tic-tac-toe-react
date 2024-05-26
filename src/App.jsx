import Player from './components/Player';
import GameBoard from './components/GameBoard';
import Log from './components/Log.jsx';
import GameOver from './components/GameOver.jsx';
import { useState } from 'react';
import { WINNING_COMBINATIONS } from './winning-combinations.js';

const PLAYERS = {
  X: 'Player 1',
  O: 'Player 2'
};

const INITIAL_GAME_BOARD = [
  [null, null, null],
  [null, null, null],
  [null, null, null]
];

function deriveActivePlayer(turns){
  let currentPlayer = 'X';

  if (turns.length > 0 && turns[0].player === 'X'){
    currentPlayer = 'O';
  }
  return currentPlayer;
}

function App() {
  
  const [playes, setPlayers] = useState(PLAYERS);

  const [gameTurns, onSelectSquare] = useState([]);

  const activePlayer = deriveActivePlayer(gameTurns);

  let gameBoard = [...INITIAL_GAME_BOARD.map(array => [...array])];

    for (const turn of gameTurns){
        const square = turn.square;
        const player = turn.player;

        gameBoard[square.row][square.col] = player;
    }

  let winner = null;

  for (const combination of WINNING_COMBINATIONS)  {
    const firstSquareSymbol = gameBoard[combination[0].row][combination[0].column];
    const secondSquareSymbol = gameBoard[combination[1].row][combination[1].column];
    const thirdSquareSymbol = gameBoard[combination[2].row][combination[2].column];

    if (firstSquareSymbol && 
      firstSquareSymbol === secondSquareSymbol && 
      firstSquareSymbol === thirdSquareSymbol) {
        winner = playes[firstSquareSymbol];
    }
  }

  const hasDraw = !winner && gameTurns.length === 9;

  function handleSelectSqaure(rowIndex, colIndex){
    onSelectSquare(prevTurns => {
      
      const currentPlayer = deriveActivePlayer(prevTurns);
      
      const updatedTurn = [
        {square: {row: rowIndex, col: colIndex}, player: currentPlayer}, 
        ...prevTurns];
      
      return updatedTurn;
    })
  }

  function handlePlayerNameChange(symbol, name){
    setPlayers((prevPlayers) => {
      return {
        ...prevPlayers,
        [symbol]: name
      }
    });
    console.log(players);
  }

  function restartGame() {
    onSelectSquare([]);
    winner = null;
  }

  return (
    <main>
      <div id="game-container">
        <ol id="players" className="highlight-player">
          <Player initalName={PLAYERS.X} symbol="X" isActive={activePlayer === 'X'} playerNameChange={handlePlayerNameChange} />
          <Player initalName={PLAYERS.O} symbol="O" isActive={activePlayer === 'O'} playerNameChange={handlePlayerNameChange} />
        </ol>
        {(winner || hasDraw) && <GameOver winner={winner} onGameOver={restartGame}/>}
        <GameBoard onSelectSquare={handleSelectSqaure} board={gameBoard} />
      </div>
      <Log  turns={gameTurns} />
    </main>
  )
}

export default App
