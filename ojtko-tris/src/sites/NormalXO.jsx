import React, { useState } from 'react';
import './../styles/NormalXO.css';
import { useLocation } from 'react-router-dom';

function NormalXO() {
  let location = useLocation();
  console.log("location: ", location);
  const { currentX, currentO } = location.state || { currentX: '/krzyzykTop2.png', currentO: '/kolkoTop.png' };
  const [board, setBoard] = useState(Array(9).fill(null));
  const [currentPlayer, setCurrentPlayer] = useState('X');
  const [statusMessage, setStatusMessage] = useState("Player X's turn");
  const [gameOver, setGameOver] = useState(false);
  

  const xImage = currentX;
  const oImage = currentO;
  console.log("O: ", xImage);
  console.log("X: ", oImage);
  

  const handleClick = (index) => {
    if (board[index] || gameOver) {
      return;
    }

    const updatedBoard = board.map((cell, cellIndex) => 
      cellIndex === index ? currentPlayer : cell
    );
    setBoard(updatedBoard);

    if (checkWin(updatedBoard)) {
      setStatusMessage(`Player ${currentPlayer} wins!`);
      setGameOver(true);
    } else if (updatedBoard.every(cell => cell !== null)) {
      setStatusMessage("It's a draw!");
      setGameOver(true);
    } else {
      const nextPlayer = currentPlayer === 'X' ? 'O' : 'X';
      setCurrentPlayer(nextPlayer);
      setStatusMessage(`Player ${nextPlayer}'s turn`);
    }
  };

  const checkWin = (board) => {
    const winningCombinations = [
      [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
      [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
      [0, 4, 8], [2, 4, 6]             // Diagonals
    ];
    return winningCombinations.some(combination =>
      combination.every(index => board[index] === currentPlayer)
    );
  };

  const resetGame = () => {
    setBoard(Array(9).fill(null));
    setCurrentPlayer('X');
    setStatusMessage("Player X's turn");
    setGameOver(false);
  };

  return (
    <div className="tic-tac-toe-container">
      <h1>Classic Tic-Tac-Toe</h1>
      <div className="board">
        {board.map((cell, index) => (
          <div 
            key={index} 
            className="cell" 
            onClick={() => handleClick(index)}
          >
            {cell === 'X' && <img src={currentX} alt="X" className="xo-image" />}
            {cell === 'O' && <img src={currentO} alt="O" className="xo-image" />}
          </div>
        ))}
      </div>
      <h2>{statusMessage}</h2>
      <button className="reset-button" onClick={resetGame}>Reset Game</button>
    </div>
  );
}

export default NormalXO;
