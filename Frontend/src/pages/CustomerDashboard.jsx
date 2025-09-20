import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { gameAPI, transactionAPI, memberAPI } from '../services/api';
import Header from '../components/Header';
import BalanceCard from '../components/BalanceCard';
import GamesList from '../components/GamesList';
import TransactionsTable from '../components/TransactionsTable';
import LoadingSpinner from '../components/LoadingSpinner';

const CustomerDashboard = () => {
  const { user, updateUser } = useAuth();
  const navigate = useNavigate();
  
  const [games, setGames] = useState([]);
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isPlaying, setIsPlaying] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    loadDashboardData();
  }, []);

  const loadDashboardData = async () => {
    try {
      setLoading(true);
      const [gamesResponse, transactionsResponse, memberResponse] = await Promise.all([
        gameAPI.getAll(),
        memberAPI.getTransactionsWithNames(user.id).catch(() => ({ data: [] })), // Use new API with names
        memberAPI.getById(user.id)
      ]);

      setGames(gamesResponse.data);
      
      // Sort transactions by date (newest first)
      const sortedTransactions = transactionsResponse.data.sort((a, b) => 
        new Date(b.dateTime) - new Date(a.dateTime)
      );
      setTransactions(sortedTransactions);
      
      // Update user data with latest balance
      if (memberResponse.data) {
        updateUser(memberResponse.data);
      }
    } catch (error) {
      setError('Failed to load dashboard data');
      console.error('Dashboard load error:', error);
    } finally {
      setLoading(false);
    }
  };

  const handlePlayGame = async (game) => {
    if (user.balance < game.price) {
      setError('Insufficient balance to play this game');
      return;
    }

    setIsPlaying(true);
    setError('');

    try {
      const transactionData = {
        memberId: user.id,
        gameId: game.id,
        dateTime: new Date().toISOString()
      };

      await transactionAPI.create(transactionData);
      
      // Refresh user data and transactions
      await loadDashboardData();
      
      // Show success message
      setError('');
      alert(`Successfully played ${game.name}! ₹${game.price} deducted from your balance.`);
    } catch (error) {
      setError('Failed to play game. Please try again.');
      console.error('Play game error:', error);
    } finally {
      setIsPlaying(false);
    }
  };

  const handleRecharge = () => {
    navigate('/recharge');
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-800">
        <Header />
        <div className="flex justify-center items-center py-20">
          <LoadingSpinner size="xlarge" />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-800">
      <Header />
      
      <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          {error && (
            <div className="mb-6 bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-md">
              {error}
            </div>
          )}

          {/* Balance Card */}
          <div className="mb-8">
            <BalanceCard balance={user.balance} memberName={user.name} />
          </div>

          {/* Quick Actions */}
          <div className="mb-8">
            <div className="flex flex-col sm:flex-row gap-4">
              <button
                onClick={handleRecharge}
                className="bg-gradient-to-r from-green-800 to-green-900 hover:from-green-700 hover:to-green-800 text-white px-6 py-3 rounded-lg font-semibold transition-all duration-200 shadow-md hover:shadow-lg transform hover:scale-105 border border-green-700"
              >
                💰 Add Money
              </button>
              <button
                onClick={() => navigate('/transactions')}
                className="bg-gradient-to-r from-pink-800 to-purple-800 hover:from-pink-700 hover:to-purple-700 text-white px-6 py-3 rounded-lg font-semibold transition-all duration-200 shadow-md hover:shadow-lg transform hover:scale-105 border border-pink-700"
              >
                📊 View All Transactions
              </button>
            </div>
          </div>

          {/* Games Section */}
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-white mb-6">Available Games</h2>
            <GamesList
              games={games}
              onPlay={handlePlayGame}
              userBalance={user.balance}
              isPlaying={isPlaying}
            />
          </div>

          {/* Recent Transactions */}
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-white mb-6">Recent Transactions</h2>
            <TransactionsTable
              transactions={transactions.slice(0, 5)}
              games={games}
            />
            {transactions.length > 5 && (
              <div className="mt-4 text-center">
                <button
                  onClick={() => navigate('/transactions')}
                  className="text-pink-500 hover:text-pink-600 font-semibold bg-pink-50 hover:bg-pink-100 px-4 py-2 rounded-lg transition-all duration-200"
                >
                  📊 View All Transactions
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CustomerDashboard;
