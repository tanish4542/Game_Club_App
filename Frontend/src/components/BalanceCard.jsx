import React from 'react';

const BalanceCard = ({ balance, memberName }) => {
  return (
    <div className="bg-gradient-to-br from-pink-300 via-pink-200 to-purple-300 rounded-xl shadow-lg p-6 text-gray-800 transform hover:scale-105 transition-all duration-300">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <div className="flex items-center justify-center w-12 h-12 bg-white bg-opacity-60 rounded-full">
            <svg className="w-6 h-6 text-pink-600" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
            </svg>
          </div>
          <div>
            <h3 className="text-lg font-semibold text-gray-700">Current Balance</h3>
            <p className="text-3xl font-bold text-gray-800">₹{balance || 0}</p>
          </div>
        </div>
        <div className="text-right">
          <p className="text-gray-600 text-sm font-medium">Member</p>
          <p className="font-semibold text-gray-800">{memberName}</p>
        </div>
      </div>
    </div>
  );
};

export default BalanceCard;
