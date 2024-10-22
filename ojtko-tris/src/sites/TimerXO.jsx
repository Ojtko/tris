import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; // Make sure to import useNavigate
import './../styles/TimerXO.css';

function TimerXO() {
  const [board, setBoard] = useState(Array(3).fill(null).map(() => Array(3).fill(null)));
  const [currentPlayer, setCurrentPlayer] = useState('X');
  const [gameActive, setGameActive] = useState(false);
  const [statusMessage, setStatusMessage] = useState('Select a time limit and start the game!');
  const [moveTimeLimit, setMoveTimeLimit] = useState(3000);
  const [timeLeft, setTimeLeft] = useState(moveTimeLimit / 1000);
  const [timerId, setTimerId] = useState(null);
  const navigate = useNavigate();
  const [userId, setUserId] = useState(localStorage.getItem('userId') || "0");
  const [userExp, setUserExp] = useState(localStorage.getItem('userExp') || "0");
  const [userCredits, setUserCredits] = useState(localStorage.getItem('userCredits') || "0");

  useEffect(() => {
    if (gameActive && timeLeft > 0) {
      const intervalId = setInterval(() => {
        setTimeLeft(prevTimeLeft => prevTimeLeft - 0.1);
      }, 100);
      setTimerId(intervalId);
      return () => clearInterval(intervalId); // Clear interval when unmounting
    } else if (timeLeft <= 0 && gameActive) {
      setStatusMessage('Time is up! Skipping turn...');
      switchPlayer();
    }
  }, [timeLeft, gameActive]);

  const startGame = () => {
    setBoard(Array(3).fill(null).map(() => Array(3).fill(null)));
    setCurrentPlayer('X');
    setGameActive(true);
    setStatusMessage(`Player X's turn`);
    setTimeLeft(moveTimeLimit / 1000);
  };

  const handleCellClick = (row, col) => {
    if (!gameActive || board[row][col]) return;

    const updatedBoard = board.map((boardRow, rowIndex) =>
      boardRow.map((cell, colIndex) => (rowIndex === row && colIndex === col ? currentPlayer : cell))
    );

    setBoard(updatedBoard);

    if (checkWin(row, col, updatedBoard)) {
      setStatusMessage(`Player ${currentPlayer} wins!`);
      setGameActive(false);
      clearInterval(timerId); // Clear the timer on win

      const newExp = parseInt(userExp) + 5;
      const newCredits = parseInt(userCredits) + 25;

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

    } else if (isBoardFull(updatedBoard)) {
      setStatusMessage('It\'s a draw!');
      setGameActive(false);
      clearInterval(timerId); // Clear the timer on draw

      const newExp = parseInt(userExp) + 4;
      const newCredits = parseInt(userCredits) + 20;

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
      switchPlayer(); // Switch player if no win or draw
    }
  };

  const switchPlayer = () => {
    clearInterval(timerId); // Clear the timer on player switch
    setCurrentPlayer(prevPlayer => {
      const nextPlayer = prevPlayer === 'X' ? 'O' : 'X';
      setStatusMessage(`Player ${nextPlayer}'s turn`);
      setTimeLeft(moveTimeLimit / 1000); // Reset time for the next player
      return nextPlayer; // Return the next player
    });
  };

  const checkWin = (row, col, updatedBoard) => {
    return (
      checkDirection(row, col, 1, 0, updatedBoard) || 
      checkDirection(row, col, 0, 1, updatedBoard) || 
      checkDirection(row, col, 1, 1, updatedBoard) || 
      checkDirection(row, col, 1, -1, updatedBoard) 
    );
  };

  const checkDirection = (row, col, rowDir, colDir, updatedBoard) => {
    let count = 1;
    for (let i = 1; i < 3; i++) {
      const newRow = row + i * rowDir;
      const newCol = col + i * colDir;
      if (newRow >= 0 && newRow < 3 && newCol >= 0 && newCol < 3 && updatedBoard[newRow][newCol] === currentPlayer) {
        count++;
      } else {
        break;
      }
    }

    for (let i = 1; i < 3; i++) {
      const newRow = row - i * rowDir;
      const newCol = col - i * colDir;
      if (newRow >= 0 && newRow < 3 && newCol >= 0 && newCol < 3 && updatedBoard[newRow][newCol] === currentPlayer) {
        count++;
      } else {
        break;
      }
    }

    return count >= 3;
  };

  const isBoardFull = (updatedBoard) => {
    return updatedBoard.every(row => row.every(cell => cell !== null));
  };

  return (
    <div className="tic-tac-toe-container">
      <h1>Tic-Tac-Toe with Time Limit</h1>
      <div>
        <label htmlFor="moveTime">Set Time per Move (ms): </label>
        <input
          type="number"
          id="moveTime"
          value={moveTimeLimit}
          onChange={(e) => setMoveTimeLimit(parseInt(e.target.value))}
          min="1000"
          step="500"
          disabled={gameActive}
        />
        <button onClick={startGame} disabled={gameActive}>Start Game</button>
      </div>

      <div className="board-container">
        <div className="board">
          {board.map((row, rowIndex) =>
            row.map((cell, colIndex) => (
              <div
                key={`${rowIndex}-${colIndex}`}
                className={`cell ${cell ? 'disabled' : ''}`}
                onClick={() => handleCellClick(rowIndex, colIndex)}
              >
                {cell}
              </div>
            ))
          )}
        </div>
      </div>

      <h2 id="status">{statusMessage}</h2>
      <div id="timer">Time left: {timeLeft.toFixed(1)} seconds</div>
    </div>
  );
}

export default TimerXO;
