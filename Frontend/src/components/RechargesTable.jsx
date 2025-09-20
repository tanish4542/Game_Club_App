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
        <p className="text-gray-500 text-lg">No recharges found</p>
      </div>
    );
  }

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleString();
  };

  return (
    <div className="bg-card-gradient shadow-lg overflow-hidden sm:rounded-xl border border-pink-100">
      <div className="px-4 py-5 sm:px-6">
        <h3 className="text-lg leading-6 font-semibold text-gray-900">
          💰 Recharges
        </h3>
        <p className="mt-1 max-w-2xl text-sm text-gray-600">
          All member recharges
        </p>
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              {showMemberName && (
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Member
                </th>
              )}
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Amount
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Date
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {recharges.map((recharge) => (
              <tr key={recharge.id} className="hover:bg-gray-50">
                {showMemberName && (
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {recharge.memberName || 'Unknown Member'}
                  </td>
                )}
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  ₹{recharge.amount}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
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
