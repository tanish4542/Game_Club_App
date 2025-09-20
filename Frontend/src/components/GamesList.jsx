import React from 'react';
import GameCard from './GameCard';
import LoadingSpinner from './LoadingSpinner';

const GamesList = ({ games, onPlay, userBalance, isPlaying }) => {
  if (!games) {
    return (
      <div className="flex justify-center items-center py-8">
        <LoadingSpinner size="large" />
      </div>
    );
  }

  if (games.length === 0) {
    return (
      <div className="text-center py-8">
        <p className="text-gray-500 text-lg">No games available</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {games.map((game) => (
        <GameCard
          key={game.id}
          game={game}
          onPlay={onPlay}
          userBalance={userBalance}
          isPlaying={isPlaying}
        />
      ))}
    </div>
  );
};

export default GamesList;
