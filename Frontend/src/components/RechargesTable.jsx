import React from 'react';
import LoadingSpinner from './LoadingSpinner';

const RechargesTable = ({ recharges, showMemberName = false }) => {
  if (!recharges) {
    return (
      <div className="flex justify-center items-center py-8">
        <LoadingSpinner size="large" />
      </div>
    );
  }

  if (recharges.length === 0) {
    return (
      <div className="text-center py-8">
        <p className="text-gray-400 text-lg">No recharges found</p>
      </div>
    );
  }

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleString();
  };

  return (
    <div className="bg-gradient-to-br from-gray-900 via-gray-800 to-black shadow-lg overflow-hidden sm:rounded-xl border border-gray-700">
      <div className="px-4 py-5 sm:px-6">
        <h3 className="text-lg leading-6 font-semibold text-white">
          💰 Recharges
        </h3>
        <p className="mt-1 max-w-2xl text-sm text-gray-300">
          All member recharges
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
                Amount
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                Date
              </th>
            </tr>
          </thead>
          <tbody className="bg-gray-900 divide-y divide-gray-700">
            {recharges.map((recharge) => (
              <tr key={recharge.id} className="hover:bg-gray-800">
                {showMemberName && (
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-white">
                    {recharge.memberName || 'Unknown Member'}
                  </td>
                )}
                <td className="px-6 py-4 whitespace-nowrap text-sm text-white">
                  ₹{recharge.amount}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                  {formatDate(recharge.dateTime)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default RechargesTable;
