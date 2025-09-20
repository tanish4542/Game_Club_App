import React from 'react';

const BalanceCard = ({ balance, memberName }) => {
  return (
    <div className="bg-gradient-to-r from-primary-500 to-primary-600 rounded-lg shadow-lg p-6 text-white">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-medium">Current Balance</h3>
          <p className="text-2xl font-bold">₹{balance || 0}</p>
        </div>
        <div className="text-right">
          <p className="text-primary-100 text-sm">Member</p>
          <p className="font-medium">{memberName}</p>
        </div>
      </div>
    </div>
  );
};

export default BalanceCard;
