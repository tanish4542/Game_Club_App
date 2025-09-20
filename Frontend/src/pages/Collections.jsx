import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { collectionAPI } from '../services/api';
import Header from '../components/Header';
import LoadingSpinner from '../components/LoadingSpinner';
import { getTodayDateString } from '../utils/date';

const Collections = () => {
  const { user } = useAuth();
  const [selectedDate, setSelectedDate] = useState(getTodayDateString());
  const [collection, setCollection] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    loadCollection(selectedDate);
  }, [selectedDate]);

  const loadCollection = async (date) => {
    try {
      setLoading(true);
      setError('');
      const response = await collectionAPI.getByDay(date);
      setCollection(response.data);
    } catch (error) {
      setError('Failed to load collection data');
      console.error('Collection load error:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDateChange = (e) => {
    setSelectedDate(e.target.value);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-800">
      <Header />
      
      <div className="max-w-4xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          <div className="mb-6">
            <h1 className="text-3xl font-bold text-white">Daily Collections</h1>
            <p className="mt-2 text-gray-300">
              View collection totals for specific dates
            </p>
          </div>

          {/* Date Selector */}
          <div className="bg-gradient-to-br from-gray-900 via-gray-800 to-black shadow-lg rounded-xl p-6 mb-6 border border-gray-700">
            <div className="flex items-center space-x-4">
              <label htmlFor="date" className="block text-sm font-medium text-gray-300">
                Select Date:
              </label>
              <input
                id="date"
                type="date"
                value={selectedDate}
                onChange={handleDateChange}
                className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-primary-500 focus:border-primary-500"
              />
            </div>
          </div>

          {error && (
            <div className="mb-6 bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-md">
              {error}
            </div>
          )}

          {/* Collection Display */}
          <div className="bg-gradient-to-br from-gray-900 via-gray-800 to-black shadow-lg rounded-xl p-6 border border-gray-700">
            {loading ? (
              <div className="flex justify-center items-center py-8">
                <LoadingSpinner size="large" />
              </div>
            ) : (
              <div className="text-center">
                <h2 className="text-2xl font-bold text-gray-300 mb-4">
                  Collection for {new Date(selectedDate).toLocaleDateString()}
                </h2>
                <div className="bg-gradient-to-r from-pink-300 to-purple-300 rounded-xl p-8 text-gray-800 shadow-lg">
                  <div className="text-4xl font-bold">
                    ₹{collection?.amount || 0}
                  </div>
                  <div className="text-gray-600 mt-2">
                    Total Recharges
                  </div>
                </div>
                {collection && (
                  <div className="mt-4 text-sm text-gray-500">
                    Collection ID: {collection.id}
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Info Box */}
          <div className="mt-6 bg-blue-50 border border-blue-200 rounded-md p-4">
            <div className="flex">
              <div className="flex-shrink-0">
                <svg className="h-5 w-5 text-blue-400" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                </svg>
              </div>
              <div className="ml-3">
                <h3 className="text-sm font-medium text-blue-800">
                  How Collections Work
                </h3>
                <div className="mt-2 text-sm text-blue-700">
                  <p>
                    Daily collections are automatically calculated from all member recharges 
                    made on the selected date. The system updates collection totals in real-time 
                    as new recharges are added.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Collections;
