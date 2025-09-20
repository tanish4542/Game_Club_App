import React from 'react';

const GameCard = ({ game, onPlay, userBalance, isPlaying }) => {
  const canPlay = userBalance >= game.price;

  return (
    <div className="bg-gradient-to-br from-gray-900 via-gray-800 to-black rounded-xl shadow-lg p-6 border border-gray-700 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
      <div className="flex justify-between items-start mb-4">
        <div className="flex items-center space-x-3">
          <div className="flex items-center justify-center w-10 h-10 bg-gradient-to-r from-pink-400 to-purple-400 rounded-lg">
            <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
              <path d="M17.5 6C15.57 6 14 7.57 14 9.5s1.57 3.5 3.5 3.5 3.5-1.57 3.5-3.5-1.57-3.5-3.5-3.5zm0 5c-.83 0-1.5-.67-1.5-1.5S16.67 8 17.5 8s1.5.67 1.5 1.5-.67 1.5-1.5 1.5zM6.5 9C4.57 9 3 10.57 3 12.5s1.57 3.5 3.5 3.5 3.5-1.57 3.5-3.5-1.57-3.5-3.5-3.5zm0 5c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5zM12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z"/>
            </svg>
          </div>
          <h3 className="text-lg font-semibold text-white">{game.name}</h3>
        </div>
        <span className="bg-gradient-to-r from-pink-800 to-purple-800 text-white px-3 py-1 rounded-full text-sm font-bold border border-pink-600">
          ₹{game.price}
        </span>
      </div>
      
      {game.description && (
        <p className="text-gray-300 mb-4 text-sm">{game.description}</p>
      )}
      
      <button
        onClick={() => onPlay(game)}
        disabled={!canPlay || isPlaying}
        className={`w-full py-3 px-4 rounded-lg font-semibold transition-all duration-200 ${
          canPlay && !isPlaying
            ? 'bg-gradient-to-r from-pink-800 to-purple-800 hover:from-pink-700 hover:to-purple-700 text-white shadow-md hover:shadow-lg transform hover:scale-105 border border-pink-600'
            : 'bg-gray-700 text-gray-400 cursor-not-allowed border border-gray-600'
        }`}
      >
        {isPlaying ? (
          <div className="flex items-center justify-center">
            <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
            Playing...
          </div>
        ) : canPlay ? (
          '🎮 Play Game'
        ) : (
          '❌ Insufficient Balance'
        )}
      </button>
      
      {!canPlay && (
        <p className="text-red-500 text-sm mt-2 text-center font-medium">
          Need ₹{game.price - userBalance} more
        </p>
      )}
    </div>
  );
};

export default GameCard;
