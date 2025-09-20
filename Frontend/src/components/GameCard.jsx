import React from 'react';

const GameCard = ({ game, onPlay, userBalance, isPlaying }) => {
  const canPlay = userBalance >= game.price;

  return (
    <div className="bg-white rounded-lg shadow-md p-6 border border-gray-200 hover:shadow-lg transition-shadow">
      <div className="flex justify-between items-start mb-4">
        <h3 className="text-lg font-semibold text-gray-900">{game.name}</h3>
        <span className="bg-primary-100 text-primary-800 px-2 py-1 rounded-full text-sm font-medium">
          ₹{game.price}
        </span>
      </div>
      
      {game.description && (
        <p className="text-gray-600 mb-4">{game.description}</p>
      )}
      
      <button
        onClick={() => onPlay(game)}
        disabled={!canPlay || isPlaying}
        className={`w-full py-2 px-4 rounded-md font-medium transition-colors ${
          canPlay && !isPlaying
            ? 'bg-primary-500 hover:bg-primary-600 text-white'
            : 'bg-gray-300 text-gray-500 cursor-not-allowed'
        }`}
      >
        {isPlaying ? (
          <div className="flex items-center justify-center">
            <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
            Playing...
          </div>
        ) : canPlay ? (
          'Play Game'
        ) : (
          'Insufficient Balance'
        )}
      </button>
      
      {!canPlay && (
        <p className="text-red-500 text-sm mt-2 text-center">
          Need ₹{game.price - userBalance} more
        </p>
      )}
    </div>
  );
};

export default GameCard;
