import React, { useState } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// images 
import rock from '../../Images/rock.png'
import scissor from '../../Images/scissor.png'
import paper from '../../Images/paper.png'
import Navbar from '../components/Navbar';
import { Link } from 'react-router-dom';



const Game = () => {
  const [playerChoice, setPlayerChoice] = useState(null);
  const [computerChoice, setComputerChoice] = useState(null);
  const [result, setResult] = useState('');
  const [playerScore, setPlayerScore] = useState(0);
  const [computerScore, setComputerScore] = useState(0);

  const choices = ['rock', 'paper', 'scissors'];

  const handlePlayerChoice = (choice) => {
    const computerSelection = choices[Math.floor(Math.random() * choices.length)];
    setPlayerChoice(choice);
    setComputerChoice(computerSelection);
    determineWinner(choice, computerSelection);
  };

  const determineWinner = (player, computer) => {
    if (player === computer) {
      setResult('It\'s a tie!');
      displayToast('info', `Player chose: ${player}`, `Computer chose: ${computer}`, 'It\'s a tie!');
    } else if (
      (player === 'rock' && computer === 'scissors') ||
      (player === 'paper' && computer === 'rock') ||
      (player === 'scissors' && computer === 'paper')
    ) {
      setResult('You win!');
      setPlayerScore(prevScore => prevScore + 1);
      displayToast('success', `Player chose: ${player}`, `Computer chose: ${computer}`, 'You win!');
    } else {
      setResult('Computer wins!');
      setComputerScore(prevScore => prevScore + 1);
      displayToast('error', `Player chose: ${player}`, `Computer chose: ${computer}`, 'Computer wins!');
    }
  };

  const displayToast = (type, playerChoiceText, computerChoiceText, resultText) => {
    toast[type](<ToastContent player={playerChoiceText} computer={computerChoiceText} result={resultText} />, {
      position: "top-center",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  };

  const resetGame = () => {
    setPlayerScore(0);
    setComputerScore(0);
    setResult('');
  };

  // Custom component for toast content
  const ToastContent = ({ player, computer, result }) => (
    <div className="bg-white p-4 rounded shadow-lg">
      <p className="font-semibold">{player}</p>
      <p className="font-semibold">{computer}</p>
      <p className="font-bold text-xl mt-2">{result}</p>
    </div>
  );

  return (
    <>
     <Navbar/>
       <div className="flex flex-col h-[90vh] justify-center  items-center mt">
     
      
<h1 className="text-3xl font-bold mb-6 font-serif">Rock Paper Scissors</h1>  

       <div className=" flex flex-col items-center  gap-3 mt-8 mb-3 p-4 bg-gray-300">
        <p className="text-xl font-bold">Scoreboard</p>
       <div className='flex space-x-4'>
       <p className='text-green-600 text-2xl font-bold'>Your_score: {playerScore}</p>
       <p className='text-red-600 text-2xl font-bold'>Computer_score: {computerScore}</p>
       </div>
      </div>


      <div className="flex space-x-4 m-5">
        <button
          className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-bold py-2 px-4 rounded"
          onClick={() => handlePlayerChoice('rock')}
        >
          <img src={rock} alt="rock" />
        </button>
        <button
          className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-bold py-2 px-4 rounded"
          onClick={() => handlePlayerChoice('paper')}
        >
          <img src={paper} alt="rock" />
        </button>
        <button
          className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-bold py-2 px-4 rounded"
          onClick={() => handlePlayerChoice('scissor')}
        >
          <img src={scissor} alt="rock" />
        </button>
      </div>
      {/* {playerChoice && computerChoice && (
        <div className="mt-6">
          <p className="font-semibold">Player chose: {playerChoice}</p>
          <p className="font-semibold">Computer chose: {computerChoice}</p>
          <p className="font-bold text-xl mt-2">{result}</p>
        </div>
      )} */}
     
      <button
        className="mt-7 bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
        onClick={resetGame}
      >
        Reset_score
      </button>

      <Link to={'/home'}
        className="mt-7 bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded">
        exit
      </Link>

      {/* Toast Container for displaying notifications */}
      <ToastContainer
        position="top-center"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </div>
    </>
 
  );
};

export default Game;
