import React from 'react';
import { Link } from 'react-router-dom';

import angry from '../../Images/lewd_tshirt.png';
import rockPaper from '../../Images/image1.png';
import tictactoe from '../../Images/tictac.png';
import memory from '../../Images/memory.png';



import Card from '../components/card';
import Navbar from '../components/Navbar';

function Home() {
  return (
    <div className="container mx-auto px-4 py-8">
      <Navbar/>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-5">
        <Card
          title="Scissor Paper Rock"
          imageUrl={rockPaper}
          onPlay={
            <Link
              to={'/game'}
              className="text-center bg-blue-500 text-white font-bold w-full py-2 px-4 rounded hover:bg-blue-600 transition duration-200"
            >
              Play
            </Link>
          }
        />


        <Card
          title="Tic Tac Toe"
          imageUrl={tictactoe}
          onPlay={
            <Link
              to={'/tictactoe'}
              className="text-center bg-blue-500 text-white font-bold w-full py-2 px-4 rounded hover:bg-blue-600 transition duration-200"
            >
              Play
            </Link>
          }
        />


        <Card
          title="memory Game"
          imageUrl={memory}
          onPlay={
            <Link
              to={'/memoryGAme'}
              className="text-center bg-blue-500 text-white font-bold w-full py-2 px-4 rounded hover:bg-blue-600 transition duration-200"
            >
              Play
            </Link>
          }
        />


        <Card
          title="coming soon"
          imageUrl=""
          onPlay={
            <Link
              to={''}
              className="text-center bg-blue-500 text-white font-bold w-full py-2 px-4 rounded hover:bg-blue-600 transition duration-200"
            >
              Play
            </Link>
          }
        />


      </div>
    </div>
  );
}

export default Home;
