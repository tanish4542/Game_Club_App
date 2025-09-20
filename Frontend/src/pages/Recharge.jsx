import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { rechargeAPI, memberAPI } from '../services/api';
import Header from '../components/Header';
import LoadingSpinner from '../components/LoadingSpinner';

const Recharge = () => {
  const { user, updateUser } = useAuth();
  const navigate = useNavigate();
  
  const [amount, setAmount] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const rechargeAmount = parseFloat(amount);
    if (!rechargeAmount || rechargeAmount <= 0) {
      setError('Please enter a valid amount');
      return;
    }

    setLoading(true);
    setError('');
    setSuccess('');

    try {
      const rechargeData = {
        memberId: user.id,
        amount: rechargeAmount,
        dateTime: new Date().toISOString()
      };

      await rechargeAPI.create(rechargeData);
      
      // Refresh user data to get updated balance
      const memberResponse = await memberAPI.getById(user.id);
      updateUser(memberResponse.data);
      
      setSuccess(`Successfully added ₹${rechargeAmount} to your account!`);
      setAmount('');
      
      // Redirect to dashboard after 2 seconds
      setTimeout(() => {
        navigate('/dashboard/member');
      }, 2000);
    } catch (error) {
      setError('Failed to add money. Please try again.');
      console.error('Recharge error:', error);
    } finally {
      setLoading(false);
    }
  };

  const quickAmounts = [100, 200, 500, 1000];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-800">
      <Header />
      
      <div className="max-w-md mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-br from-gray-900 via-gray-800 to-black py-8 px-4 shadow-lg sm:rounded-xl sm:px-10 border border-gray-700">
          <div className="mb-6">
            <h2 className="text-2xl font-bold text-white text-center">
              Add Money
            </h2>
            <p className="mt-2 text-center text-sm text-gray-300">
              Current Balance: ₹{user.balance || 0}
            </p>
          </div>

          {error && (
            <div className="mb-4 bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-md">
              {error}
            </div>
          )}

          {success && (
            <div className="mb-4 bg-green-50 border border-green-200 text-green-600 px-4 py-3 rounded-md">
              {success}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="amount" className="block text-sm font-medium text-gray-700">
                Amount (₹)
              </label>
              <div className="mt-1">
                <input
                  id="amount"
                  name="amount"
                  type="number"
                  min="1"
                  step="0.01"
                  required
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md placeholder-gray-400 focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
                  placeholder="Enter amount to add"
                />
              </div>
            </div>

            {/* Quick Amount Buttons */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Quick Amounts
              </label>
              <div className="grid grid-cols-2 gap-2">
                {quickAmounts.map((quickAmount) => (
                  <button
                    key={quickAmount}
                    type="button"
                    onClick={() => setAmount(quickAmount.toString())}
                    className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
                  >
                    ₹{quickAmount}
                  </button>
                ))}
              </div>
            </div>

            <div className="flex space-x-3">
              <button
                type="button"
                onClick={() => navigate('/dashboard/member')}
                className="flex-1 flex justify-center py-3 px-4 border border-gray-300 rounded-lg shadow-sm text-sm font-semibold text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-pink-500 transition-all duration-200"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={loading}
                className="flex-1 flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-md text-sm font-semibold text-white bg-gradient-to-r from-green-300 to-green-400 hover:from-green-400 hover:to-green-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 transform hover:scale-105"
              >
                {loading ? <LoadingSpinner size="small" /> : '💰 Add Money'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Recharge;
