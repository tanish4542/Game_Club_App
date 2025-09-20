import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { collectionAPI, transactionAPI, rechargeAPI, gameAPI, memberAPI } from '../services/api';
import Header from '../components/Header';
import TransactionsTable from '../components/TransactionsTable';
import RechargesTable from '../components/RechargesTable';
import GameManagement from '../components/GameManagement';
import LoadingSpinner from '../components/LoadingSpinner';
import { getTodayDateString } from '../utils/date';

const AdminDashboard = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  
  const [collections, setCollections] = useState(null);
  const [transactions, setTransactions] = useState([]);
  const [recharges, setRecharges] = useState([]);
  const [games, setGames] = useState([]);
  const [members, setMembers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    loadDashboardData();
  }, []);

  const loadDashboardData = async () => {
    try {
      setLoading(true);
      const today = getTodayDateString();
      
      const [
        collectionsResponse,
        transactionsResponse,
        rechargesResponse,
        gamesResponse,
        membersResponse
      ] = await Promise.all([
        collectionAPI.getByDay(today).catch(() => ({ data: { amount: 0 } })),
        transactionAPI.getAllWithNames().catch(() => ({ data: [] })),
        rechargeAPI.getAllWithNames().catch(() => ({ data: [] })),
        gameAPI.getAll().catch(() => ({ data: [] })),
        memberAPI.getAll().catch(() => ({ data: [] }))
      ]);

      setCollections(collectionsResponse.data);
      
      // Sort transactions by date (newest first)
      const sortedTransactions = transactionsResponse.data.sort((a, b) => 
        new Date(b.dateTime) - new Date(a.dateTime)
      );
      setTransactions(sortedTransactions);
      
      // Sort recharges by date (newest first)
      const sortedRecharges = rechargesResponse.data.sort((a, b) => 
        new Date(b.dateTime) - new Date(a.dateTime)
      );
      setRecharges(sortedRecharges);
      
      setGames(gamesResponse.data);
      setMembers(membersResponse.data);
    } catch (error) {
      setError('Failed to load dashboard data');
      console.error('Admin dashboard load error:', error);
    } finally {
      setLoading(false);
    }
  };

  const refreshGames = async () => {
    try {
      const gamesResponse = await gameAPI.getAll();
      setGames(gamesResponse.data);
    } catch (error) {
      console.error('Failed to refresh games:', error);
    }
  };

  const exportToCSV = (data, filename) => {
    if (!data || data.length === 0) {
      alert('No data to export');
      return;
    }

    let csvData = data;
    
    // For transactions, create a custom CSV with readable names
    if (filename === 'transactions.csv') {
      csvData = data.map(transaction => ({
        'Transaction ID': transaction.id,
        'Member Name': transaction.memberName || 'Unknown Member',
        'Game Name': transaction.gameName || 'Unknown Game',
        'Amount': transaction.amount,
        'Date': new Date(transaction.dateTime).toLocaleString()
      }));
    }
    
    // For recharges, create a custom CSV with readable names
    if (filename === 'recharges.csv') {
      csvData = data.map(recharge => ({
        'Recharge ID': recharge.id,
        'Member Name': recharge.memberName || 'Unknown Member',
        'Amount': recharge.amount,
        'Date': new Date(recharge.dateTime).toLocaleString()
      }));
    }

    const headers = Object.keys(csvData[0]);
    const csvContent = [
      headers.join(','),
      ...csvData.map(row => headers.map(header => `"${row[header] || ''}"`).join(','))
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    a.click();
    window.URL.revokeObjectURL(url);
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

          {/* Navigation Widgets */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <button
              onClick={() => navigate('/transactions')}
              className="bg-card-gradient overflow-hidden shadow-lg rounded-xl border border-pink-100 transform hover:scale-105 transition-all duration-300 p-6 text-left hover:shadow-xl"
            >
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <div className="w-12 h-12 bg-gradient-to-r from-pink-300 to-purple-300 rounded-xl flex items-center justify-center shadow-md">
                    <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zM9 17H7v-7h2v7zm4 0h-2V7h2v10zm4 0h-2v-4h2v4z"/>
                    </svg>
                  </div>
                </div>
                <div className="ml-5 w-0 flex-1">
                  <dl>
                    <dt className="text-sm font-semibold text-gray-600 truncate">
                      View Transactions
                    </dt>
                    <dd className="text-lg font-bold text-gray-800">
                      {transactions.length} Total
                    </dd>
                  </dl>
                </div>
              </div>
            </button>

            <button
              onClick={() => navigate('/collections')}
              className="bg-card-gradient overflow-hidden shadow-lg rounded-xl border border-pink-100 transform hover:scale-105 transition-all duration-300 p-6 text-left hover:shadow-xl"
            >
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <div className="w-12 h-12 bg-gradient-to-r from-green-300 to-green-400 rounded-xl flex items-center justify-center shadow-md">
                    <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
                    </svg>
                  </div>
                </div>
                <div className="ml-5 w-0 flex-1">
                  <dl>
                    <dt className="text-sm font-semibold text-gray-600 truncate">
                      View Collections
                    </dt>
                    <dd className="text-lg font-bold text-gray-800">
                      ₹{collections?.amount || 0} Today
                    </dd>
                  </dl>
                </div>
              </div>
            </button>

            <button
              onClick={() => {
                // Navigate to a recharges page (we'll need to create this)
                alert('Recharges page coming soon!');
              }}
              className="bg-card-gradient overflow-hidden shadow-lg rounded-xl border border-pink-100 transform hover:scale-105 transition-all duration-300 p-6 text-left hover:shadow-xl"
            >
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <div className="w-12 h-12 bg-gradient-to-r from-blue-300 to-blue-400 rounded-xl flex items-center justify-center shadow-md">
                    <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M16 4c0-1.11.89-2 2-2s2 .89 2 2-.89 2-2 2-2-.89-2-2zm4 18v-6h2.5l-2.54-7.63A1.5 1.5 0 0 0 18.54 8H16c-.8 0-1.54.37-2.01.99L12 11l-1.99-2.01A2.5 2.5 0 0 0 8 8H5.46c-.8 0-1.54.37-2.01.99L.95 16.37 3.5 22H6v6h2v-6h4v6h2z"/>
                    </svg>
                  </div>
                </div>
                <div className="ml-5 w-0 flex-1">
                  <dl>
                    <dt className="text-sm font-semibold text-gray-600 truncate">
                      View Members
                    </dt>
                    <dd className="text-lg font-bold text-gray-800">
                      {members.length} Total
                    </dd>
                  </dl>
                </div>
              </div>
            </button>

            <div className="bg-card-gradient overflow-hidden shadow-lg rounded-xl border border-pink-100 p-6">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <div className="w-12 h-12 bg-gradient-to-r from-purple-300 to-purple-400 rounded-xl flex items-center justify-center shadow-md">
                    <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M17.5 6C15.57 6 14 7.57 14 9.5s1.57 3.5 3.5 3.5 3.5-1.57 3.5-3.5-1.57-3.5-3.5-3.5zm0 5c-.83 0-1.5-.67-1.5-1.5S16.67 8 17.5 8s1.5.67 1.5 1.5-.67 1.5-1.5 1.5zM6.5 9C4.57 9 3 10.57 3 12.5s1.57 3.5 3.5 3.5 3.5-1.57 3.5-3.5-1.57-3.5-3.5-3.5zm0 5c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5zM12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z"/>
                    </svg>
                  </div>
                </div>
                <div className="ml-5 w-0 flex-1">
                  <dl>
                    <dt className="text-sm font-semibold text-gray-600 truncate">
                      Total Games
                    </dt>
                    <dd className="text-lg font-bold text-gray-800">
                      {games.length} Available
                    </dd>
                  </dl>
                </div>
              </div>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="mb-8">
            <div className="flex flex-wrap gap-4">
              <button
                onClick={() => exportToCSV(transactions, 'transactions.csv')}
                className="bg-gradient-to-r from-pink-300 to-purple-300 hover:from-pink-400 hover:to-purple-400 text-white px-6 py-3 rounded-lg font-semibold transition-all duration-200 shadow-md hover:shadow-lg transform hover:scale-105"
              >
                📊 Export Transactions CSV
              </button>
              <button
                onClick={() => exportToCSV(recharges, 'recharges.csv')}
                className="bg-gradient-to-r from-green-300 to-green-400 hover:from-green-400 hover:to-green-500 text-white px-6 py-3 rounded-lg font-semibold transition-all duration-200 shadow-md hover:shadow-lg transform hover:scale-105"
              >
                💰 Export Recharges CSV
              </button>
            </div>
          </div>

          {/* Game Management */}
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Game Management</h2>
            <GameManagement
              games={games}
              onGamesUpdate={refreshGames}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
