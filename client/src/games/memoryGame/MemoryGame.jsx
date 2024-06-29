import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const Card = ({ card, onClick }) => {
  return (
    <div
      className={`bg-blue-500 rounded-lg p-4 m-2 cursor-pointer flex items-center justify-center 
        ${card.flipped ? 'bg-white' : ''}`}
      onClick={() => onClick(card.id)}
      style={{ height: '80px', width: '75px' }}  // Added fixed height and width for better visibility
    >
      <span className={`text-3xl ${card.flipped ? 'text-black' : 'text-white'}`}>
        {card.flipped ? card.value : 'FLIP'}
      </span>
    </div>
  );
};

const GameBoard = ({ cards, handleCardClick }) => {
  return (
    <div className="grid grid-cols-4 md:grid-cols-4 lg:grid-cols-6 gap-3">
      {cards.map((card) => (
        <Card key={card.id} card={card} onClick={handleCardClick} />
      ))}
    </div>
  );
};

const GameModal = ({ isOpen, resetGame }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-white p-8 rounded-lg shadow-lg text-center">
        <h2 className="text-2xl font-bold mb-4">Congratulations!</h2>
        <p className="text-lg">You completed the memory game.</p>
        <button
          onClick={resetGame}
          className="bg-blue-500 text-white px-4 py-2 mt-4 rounded-md hover:bg-blue-600"
        >
          Play Again
        </button>
      
      </div>

    </div>
  );
};

const MemoryGame = () => {
  const [cards, setCards] = useState([]);
  const [flippedCards, setFlippedCards] = useState([]);
  const [matchedPairs, setMatchedPairs] = useState([]);
  const [isChecking, setIsChecking] = useState(false);

  useEffect(() => {
    initializeGame();
  }, []);

  const initializeGame = () => {
    const initialCards = generateCards();
    const shuffledCards = shuffleCards(initialCards);
    setCards(shuffledCards);
  };

  const generateCards = () => {
    const values = ['🍎', '🍌', '🍒', '🍓', '🥑', '🍍', '🥭', '🍊'];
    let id = 0;
    const cards = values.reduce((acc, value) => {
      acc.push({ id: id++, value, flipped: false });
      acc.push({ id: id++, value, flipped: false });
      return acc;
    }, []);
    return cards;
  };

  const shuffleCards = (cards) => {
    for (let i = cards.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [cards[i], cards[j]] = [cards[j], cards[i]];
    }
    return cards;
  };

  const handleCardClick = (id) => {
    if (isChecking) return;

    const clickedCard = cards.find((card) => card.id === id);
    if (clickedCard.flipped || flippedCards.length === 2) return;

    const newFlippedCards = [...flippedCards, clickedCard];
    setFlippedCards(newFlippedCards);
    flipCard(id, true);

    if (newFlippedCards.length === 2) {
      setIsChecking(true);
      if (newFlippedCards[0].value === newFlippedCards[1].value) {
        setMatchedPairs([...matchedPairs, newFlippedCards[0].value]);
        setFlippedCards([]);
        setIsChecking(false);
      } else {
        setTimeout(() => {
          flipCard(newFlippedCards[0].id, false);
          flipCard(newFlippedCards[1].id, false);
          setFlippedCards([]);
          setIsChecking(false);
        }, 1000);
      }
    }
  };

  const flipCard = (id, flipped) => {
    setCards((prevCards) =>
      prevCards.map((card) =>
        card.id === id ? { ...card, flipped } : card
      )
    );
  };

  const resetGame = () => {
    setCards([]);
    setFlippedCards([]);
    setMatchedPairs([]);
    initializeGame();
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center">
      <h1 className="text-4xl font-bold font-serif mb-8">Memory Game</h1>
      <GameBoard cards={cards} handleCardClick={handleCardClick} />
      <button
        onClick={resetGame}
        className="bg-blue-500 text-white px-4 py-3 mt-4 rounded-md hover:bg-blue-600"
      >
        Reset Game
      </button >
      <Link to={'/home'}
        className="mt-7 bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded">
        exit
      </Link>
      <GameModal
        isOpen={matchedPairs.length === cards.length / 2}
        resetGame={resetGame}
      />
    </div>
  );
};

export default MemoryGame;
