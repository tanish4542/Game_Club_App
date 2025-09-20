import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { transactionAPI, gameAPI, memberAPI } from '../services/api';
import Header from '../components/Header';
import TransactionsTable from '../components/TransactionsTable';
import LoadingSpinner from '../components/LoadingSpinner';

const Transactions = () => {
  const { user, isMember } = useAuth();
  const [transactions, setTransactions] = useState([]);
  const [games, setGames] = useState([]);
  const [members, setMembers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    loadTransactions();
  }, []);

  const loadTransactions = async () => {
    try {
      setLoading(true);
      
      let transactionsResponse;
      if (isMember) {
        // For members, get their transactions with names
        transactionsResponse = await memberAPI.getTransactionsWithNames(user.id).catch(() => ({ data: [] }));
      } else {
        // For admins, get all transactions with names
        transactionsResponse = await transactionAPI.getAllWithNames().catch(() => ({ data: [] }));
      }

      const [gamesResponse, membersResponse] = await Promise.all([
        gameAPI.getAll().catch(() => ({ data: [] })),
        memberAPI.getAll().catch(() => ({ data: [] }))
      ]);

      // Sort transactions by date (newest first)
      const sortedTransactions = transactionsResponse.data.sort((a, b) => 
        new Date(b.dateTime) - new Date(a.dateTime)
      );
      setTransactions(sortedTransactions);
      
      setGames(gamesResponse.data);
      setMembers(membersResponse.data);
    } catch (error) {
      setError('Failed to load transactions');
      console.error('Transactions load error:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <div className="flex justify-center items-center py-20">
          <LoadingSpinner size="xlarge" />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          {error && (
            <div className="mb-6 bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-md">
              {error}
            </div>
          )}

          <div className="mb-6">
            <h1 className="text-3xl font-bold text-gray-900">
              {isMember ? 'My Transactions' : 'All Transactions'}
            </h1>
            <p className="mt-2 text-gray-600">
              {isMember 
                ? 'View your game transaction history'
                : 'View all member transactions'
              }
            </p>
          </div>

            <TransactionsTable
              transactions={transactions}
              games={games}
              showMemberName={!isMember}
            />

          {transactions.length === 0 && !loading && (
            <div className="text-center py-12">
              <p className="text-gray-500 text-lg">
                {isMember 
                  ? 'You haven\'t played any games yet'
                  : 'No transactions found'
                }
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Transactions;
