import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function MegaXO() {
  const [boardSize, setBoardSize] = useState(5);
  const [board, setBoard] = useState([]);
  const [currentPlayer, setCurrentPlayer] = useState('X');
  const [gameActive, setGameActive] = useState(false);
  const [statusMessage, setStatusMessage] = useState('Select a board size and start the game!');
  const winCondition = boardSize === 5 ? 4 : 5;
  const navigate = useNavigate(); // Użyj hooka useNavigate
  const userId = localStorage.getItem('userId') || "0";
  const [userExp, setUserExp] = useState(parseInt(localStorage.getItem('userExp')) || 0);
  const [userCredits, setUserCredits] = useState(parseInt(localStorage.getItem('userCredits')) || 0);

  // Inicjalizuj planszę, gdy zmienia się boardSize
  useEffect(() => {
    if (gameActive) {
      setBoard(Array(boardSize).fill(null).map(() => Array(boardSize).fill(null)));
    }
  }, [boardSize, gameActive]);

  const startGame = () => {
    setGameActive(true);
    setCurrentPlayer('X');
    setStatusMessage(`Player ${currentPlayer}'s turn`);
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

      const newExp = userExp + 10;
      const newCredits = userCredits + 10;

      updateUserData(userId, newExp, newCredits);

    } else if (isBoardFull(updatedBoard)) {
      setStatusMessage('It\'s a draw!');
      setGameActive(false);

      const newExp = userExp + 7;
      const newCredits = userCredits + 10;

      updateUserData(userId, newExp, newCredits);
    } else {
      const nextPlayer = currentPlayer === 'X' ? 'O' : 'X';
      setCurrentPlayer(nextPlayer);
      setStatusMessage(`Player ${nextPlayer}'s turn`);
    }
  };

  const updateUserData = async (id, exp, credits) => {
    try {
      const response = await fetch('http://localhost:5000/updateUserData', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userId: id,
          exp: exp,
          credits: credits
        }),
      });
      
      if (response.ok) {
        localStorage.setItem('userExp', exp);  // Zaktualizuj lokalne dane
        localStorage.setItem('userCredits', credits);  // Zaktualizuj lokalne dane
        setUserExp(exp);
        setUserCredits(credits);

        // Opóźnij nawigację
        setTimeout(() => {
          navigate('../');
        }, 2000);
      } else {
        console.error('Error updating user data:', response.statusText);
      }
    } catch (error) {
      console.error('Error during fetch:', error);
    }
  };

  const checkWin = (row, col, updatedBoard) => {
    return (
      checkDirection(row, col, 1, 0, updatedBoard) ||  // Horizontal
      checkDirection(row, col, 0, 1, updatedBoard) ||  // Vertical
      checkDirection(row, col, 1, 1, updatedBoard) ||  // Diagonal \
      checkDirection(row, col, 1, -1, updatedBoard)    // Diagonal /
    );
  };

  const checkDirection = (row, col, rowDir, colDir, updatedBoard) => {
    let count = 1;

    for (let i = 1; i < winCondition; i++) {
      const newRow = row + i * rowDir;
      const newCol = col + i * colDir;
      if (newRow >= 0 && newRow < boardSize && newCol >= 0 && newCol < boardSize && updatedBoard[newRow][newCol] === currentPlayer) {
        count++;
      } else {
        break;
      }
    }

    for (let i = 1; i < winCondition; i++) {
      const newRow = row - i * rowDir;
      const newCol = col - i * colDir;
      if (newRow >= 0 && newRow < boardSize && newCol >= 0 && newCol < boardSize && updatedBoard[newRow][newCol] === currentPlayer) {
        count++;
      } else {
        break;
      }
    }

    return count >= winCondition;
  };

  const isBoardFull = (updatedBoard) => {
    return updatedBoard.every(row => row.every(cell => cell !== null));
  };

  return (
    <div className="mega-xo-container">
      <h1>Mega Tic-Tac-Toe</h1>
      <div>
        <label htmlFor="boardSize">Choose Board Size: </label>
        <select
          id="boardSize"
          value={boardSize}
          onChange={(e) => setBoardSize(parseInt(e.target.value))}
          disabled={gameActive}
        >
          <option value="5">5x5</option>
          <option value="7">7x7</option>
        </select>
        <button onClick={startGame} disabled={gameActive}>Start Game</button>
      </div>

      <div className="board-container">
        <div className="board" style={{ gridTemplateColumns: `repeat(${boardSize}, 1fr)` }}>
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
    </div>
  );
}

export default MegaXO;
