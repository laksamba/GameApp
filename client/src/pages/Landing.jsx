// src/components/LandingPage.js

import React from 'react';
import { Link } from 'react-router-dom';
import HomeDisplay from '../components/HomeDisplay';

const LandingPage = () => {
  return (
    <>
    
      <div className="min-h-screen bg-gray-900 flex flex-col items-center justify-center text-white">
      <HomeDisplay/>
        <header className="text-center mb-12">
          <h1 className="text-4xl md:text-6xl font-bold mb-4">Welcome to GameZone</h1>
          <p className="text-lg md:text-2xl">The ultimate gaming experience awaits you!</p>
        </header>
        <div className="flex space-x-4">
          <Link to={'/login'} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
            Login
          </Link>
          <Link to={'/register'} className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
            Sign Up
          </Link>
        </div>
      </div>
    </>

  );
}

export default LandingPage;
