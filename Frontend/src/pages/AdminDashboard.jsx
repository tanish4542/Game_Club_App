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
      setTransactions(transactionsResponse.data);
      setRecharges(rechargesResponse.data);
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

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <div className="bg-white overflow-hidden shadow rounded-lg">
              <div className="p-5">
                <div className="flex items-center">
                  <div className="flex-shrink-0">
                    <div className="w-8 h-8 bg-green-500 rounded-md flex items-center justify-center">
                      <span className="text-white font-bold">₹</span>
                    </div>
                  </div>
                  <div className="ml-5 w-0 flex-1">
                    <dl>
                      <dt className="text-sm font-medium text-gray-500 truncate">
                        Today's Collections
                      </dt>
                      <dd className="text-lg font-medium text-gray-900">
                        ₹{collections?.amount || 0}
                      </dd>
                    </dl>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white overflow-hidden shadow rounded-lg">
              <div className="p-5">
                <div className="flex items-center">
                  <div className="flex-shrink-0">
                    <div className="w-8 h-8 bg-blue-500 rounded-md flex items-center justify-center">
                      <span className="text-white font-bold">👥</span>
                    </div>
                  </div>
                  <div className="ml-5 w-0 flex-1">
                    <dl>
                      <dt className="text-sm font-medium text-gray-500 truncate">
                        Total Members
                      </dt>
                      <dd className="text-lg font-medium text-gray-900">
                        {members.length}
                      </dd>
                    </dl>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white overflow-hidden shadow rounded-lg">
              <div className="p-5">
                <div className="flex items-center">
                  <div className="flex-shrink-0">
                    <div className="w-8 h-8 bg-purple-500 rounded-md flex items-center justify-center">
                      <span className="text-white font-bold">🎮</span>
                    </div>
                  </div>
                  <div className="ml-5 w-0 flex-1">
                    <dl>
                      <dt className="text-sm font-medium text-gray-500 truncate">
                        Total Games
                      </dt>
                      <dd className="text-lg font-medium text-gray-900">
                        {games.length}
                      </dd>
                    </dl>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white overflow-hidden shadow rounded-lg">
              <div className="p-5">
                <div className="flex items-center">
                  <div className="flex-shrink-0">
                    <div className="w-8 h-8 bg-orange-500 rounded-md flex items-center justify-center">
                      <span className="text-white font-bold">📊</span>
                    </div>
                  </div>
                  <div className="ml-5 w-0 flex-1">
                    <dl>
                      <dt className="text-sm font-medium text-gray-500 truncate">
                        Total Transactions
                      </dt>
                      <dd className="text-lg font-medium text-gray-900">
                        {transactions.length}
                      </dd>
                    </dl>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="mb-8">
            <div className="flex flex-wrap gap-4">
              <button
                onClick={() => exportToCSV(transactions, 'transactions.csv')}
                className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md font-medium transition-colors"
              >
                Export Transactions CSV
              </button>
              <button
                onClick={() => exportToCSV(recharges, 'recharges.csv')}
                className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-md font-medium transition-colors"
              >
                Export Recharges CSV
              </button>
              <button
                onClick={() => navigate('/collections')}
                className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-md font-medium transition-colors"
              >
                View Collections
              </button>
            </div>
          </div>

          {/* Recent Transactions */}
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Recent Transactions</h2>
            <TransactionsTable
              transactions={transactions.slice(0, 10)}
              games={games}
              showMemberName={true}
            />
          </div>

          {/* Recent Recharges */}
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Recent Recharges</h2>
            <RechargesTable
              recharges={recharges.slice(0, 10)}
              showMemberName={true}
            />
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
