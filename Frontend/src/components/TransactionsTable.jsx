import React from 'react';
import LoadingSpinner from './LoadingSpinner';

const TransactionsTable = ({ transactions, games, showMemberName = false }) => {
  if (!transactions) {
    return (
      <div className="flex justify-center items-center py-8">
        <LoadingSpinner size="large" />
      </div>
    );
  }

  if (transactions.length === 0) {
    return (
      <div className="text-center py-8">
        <p className="text-gray-400 text-lg">No transactions found</p>
      </div>
    );
  }

  const getGameName = (gameId, gameName) => {
    // If gameName is provided (from DTO), use it directly
    if (gameName) {
      return gameName;
    }
    // Fallback to finding by ID
    const game = games?.find(g => g.id === gameId);
    return game ? game.name : 'Unknown Game';
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleString();
  };

  return (
    <div className="bg-gradient-to-br from-gray-900 via-gray-800 to-black shadow-lg overflow-hidden sm:rounded-xl border border-gray-700">
      <div className="px-4 py-5 sm:px-6">
        <h3 className="text-lg leading-6 font-semibold text-white">
          📊 Transactions
        </h3>
        <p className="mt-1 max-w-2xl text-sm text-gray-300">
          All game transactions
        </p>
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-700">
          <thead className="bg-gray-800">
            <tr>
              {showMemberName && (
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                  Member
                </th>
              )}
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                Game
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                Amount
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                Date
              </th>
            </tr>
          </thead>
          <tbody className="bg-gray-900 divide-y divide-gray-700">
            {transactions.map((transaction) => (
              <tr key={transaction.id} className="hover:bg-gray-800">
                {showMemberName && (
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-white">
                    {transaction.memberName || 'Unknown Member'}
                  </td>
                )}
                <td className="px-6 py-4 whitespace-nowrap text-sm text-white">
                  {getGameName(transaction.gameId, transaction.gameName)}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-white">
                  ₹{transaction.amount}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                  {formatDate(transaction.dateTime)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TransactionsTable;
