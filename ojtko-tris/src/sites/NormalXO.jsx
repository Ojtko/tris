import React, { useState } from 'react';
import './../styles/NormalXO.css';
import { useNavigate } from 'react-router-dom'; // Dodaj import

function NormalXO() {
  const [board, setBoard] = useState(Array(9).fill(null));
  const [currentPlayer, setCurrentPlayer] = useState('X');
  const [statusMessage, setStatusMessage] = useState("Player X's turn");
  const [gameOver, setGameOver] = useState(false);
  const navigate = useNavigate(); // Użyj hooka useNavigate
  const [userId, setUserId] = useState(localStorage.getItem('userId') || "0");
  const [userExp, setUserExp] = useState(localStorage.getItem('userExp') || "0");
  const [userCredits, setUserCredits] = useState(localStorage.getItem('userCredits') || "0");

  const xImage = '/petTop.png';
  const oImage = '/kolkoTop.png';

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

      const newExp = parseInt(userExp) + 5;
      const newCredits = parseInt(userCredits) + 10;

      fetch('http://localhost:5000/updateUserData', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userId: userId,
          exp: newExp,
          credits: newCredits
        }),
      });

      setTimeout(() => {
        navigate('../');
      }, 2000);
    } else if (updatedBoard.every(cell => cell !== null)) {
      setStatusMessage("It's a draw!");
      setGameOver(true);

      const newExp = parseInt(userExp) + 3;
      const newCredits = parseInt(userCredits) + 5;

      fetch('http://localhost:5000/updateUserData', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userId: userId,
          exp: newExp,
          credits: newCredits
        }),
      });

      setTimeout(() => {
        navigate('../');
      }, 2000);
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
            {cell === 'X' && <img src={xImage} alt="X" className="xo-image" />}
            {cell === 'O' && <img src={oImage} alt="O" className="xo-image" />}
          </div>
        ))}
      </div>
      <h2>{statusMessage}</h2>
    </div>
  );
}

export default NormalXO;
