import React, { useState, useEffect } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { GiSkullCrossedBones, GiMeepleCircle } from "react-icons/gi";
import { Link } from 'react-router-dom';

const TicTacToe = () => {
  const [history, setHistory] = useState([Array(9).fill(null)]);
  const [stepNumber, setStepNumber] = useState(0);
  const [xIsNext, setXIsNext] = useState(true);
  const [leaderboard, setLeaderboard] = useState([]);

  useEffect(() => {
    const savedLeaderboard = JSON.parse(localStorage.getItem('leaderboard')) || [];
    setLeaderboard(savedLeaderboard);
  }, []);

  useEffect(() => {
    localStorage.setItem('leaderboard', JSON.stringify(leaderboard));
  }, [leaderboard]);

  const handleClick = (index) => {
    const currentHistory = history.slice(0, stepNumber + 1);
    const currentSquares = [...currentHistory[currentHistory.length - 1]];

    if (calculateWinner(currentSquares) || currentSquares[index]) {
      return;
    }

    currentSquares[index] = xIsNext ? 'X' : 'O';
    setHistory([...currentHistory, currentSquares]);
    setStepNumber(currentHistory.length);
    setXIsNext(!xIsNext);

    const winner = calculateWinner(currentSquares);
    if (winner) {
      toast.success(`Winner: ${winner}`, {
        position: 'top-center',
        autoClose: 3000,
      });
      updateLeaderboard(winner);
    }
  };

  const jumpTo = (step) => {
    setStepNumber(step);
    setXIsNext(step % 2 === 0);
  };

  const updateLeaderboard = (winner) => {
    const newEntry = { winner, date: new Date().toLocaleString() };
    const updatedLeaderboard = [...leaderboard, newEntry];
    setLeaderboard(updatedLeaderboard);
  };

  const currentSquares = history[stepNumber];
  const winner = calculateWinner(currentSquares);
  const status = winner ? `Winner: ${winner}` : `Next player: ${xIsNext ? 'X' : 'O'}`;

  return (
    <div className="flex flex-col h-[100vh] justify-center items-center mt-10">
      <h1 className="text-3xl font-bold mb-6 font-serif">Tic-Tac-Toe</h1>
      <div className="mb-4 text-green-600 text-2xl font-bold">{status}</div>
      <div className="grid grid-cols-3 gap-2">
        {currentSquares.map((square, index) => (
          <button
            key={index}
            className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-bold py-4 px-6 rounded flex justify-center items-center"

            onClick={() => handleClick(index)}
            style={{ height: '80px', width: '80px' }}
          >
            {square === 'X' ? <GiSkullCrossedBones style={{color: 'green', fontSize: 20}} /> : square === 'O' ? <GiMeepleCircle style={{color: 'red', fontSize: 20}} /> : ''}
          </button>
        ))}
      </div>
      <div className="mt-8">
        <button
          className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
          onClick={() => jumpTo(0)}
        >
          Reset
        </button>
      </div>
      <Link to={'/home'}
        className="mt-7 bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded">
        exit
      </Link>
      <div className=" flex flex-col items-center ">
        <h2 className="text-2xl  font-bold mb-4">Leaderboard</h2>
       <div className='mt-8 overflow-scroll h-40 w-auto'>
       <ul>
          {leaderboard.map((entry, index) => (
            <li key={index} className="mb-2 ">
              {entry.date}: {entry.winner}
            </li>
          ))}
        </ul>
       </div>
      </div>
      <ToastContainer />
    </div>
  );
};

const calculateWinner = (squares) => {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];

  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }

  return null;
};

export default TicTacToe;
