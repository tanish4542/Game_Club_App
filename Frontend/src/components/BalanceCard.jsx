import React from 'react';

const BalanceCard = ({ balance, memberName }) => {
  return (
    <div className="bg-gradient-to-br from-gray-900 via-gray-800 to-black rounded-xl shadow-lg p-6 text-white transform hover:scale-105 transition-all duration-300 border border-gray-700">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <div className="flex items-center justify-center w-12 h-12 bg-white bg-opacity-20 rounded-full">
            <svg className="w-6 h-6 text-pink-400" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
            </svg>
          </div>
          <div>
            <h3 className="text-lg font-semibold text-gray-300">Current Balance</h3>
            <p className="text-3xl font-bold text-white">₹{balance || 0}</p>
          </div>
        </div>
        <div className="text-right">
          <p className="text-gray-400 text-sm font-medium">Member</p>
          <p className="font-semibold text-white">{memberName}</p>
        </div>
      </div>
    </div>
  );
};

export default BalanceCard;
