import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { memberAPI } from '../services/api';
import LoadingSpinner from '../components/LoadingSpinner';

const CustomerAuth = () => {
  const [phone, setPhone] = useState('');
  const [name, setName] = useState('');
  const [showSignup, setShowSignup] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [isNewUser, setIsNewUser] = useState(false);
  
  const navigate = useNavigate();
  const { login } = useAuth();

  const handlePhoneSubmit = async (e) => {
    e.preventDefault();
    if (!phone.trim()) {
      setError('Please enter your phone number');
      return;
    }

    setLoading(true);
    setError('');

    try {
      console.log('Searching for member with phone:', phone.trim());
      // Try to find existing member by phone
      const response = await memberAPI.findByPhone(phone.trim());
      const member = response.data;
      console.log('Member found:', member);
      
      // Member exists, log them in
      login(member, 'member');
      navigate('/dashboard/member');
    } catch (error) {
      console.error('Error finding member:', error);
      if (error.response?.status === 404) {
        // Member not found, show signup form
        setIsNewUser(true);
        setShowSignup(true);
        setError(''); // Clear any previous errors
      } else {
        setError(`Error finding member: ${error.response?.data || error.message}. Please check your connection and try again.`);
      }
    } finally {
      setLoading(false);
    }
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    if (!name.trim()) {
      setError('Please enter your name');
      return;
    }

    setLoading(true);
    setError('');

    try {
      // Create new member
      const memberData = {
        name: name.trim(),
        phone: phone.trim(),
        balance: 0
      };
      
      const response = await memberAPI.create(memberData);
      const newMember = response.data;
      
      // Log in the new member
      login(newMember, 'member');
      navigate('/dashboard/member');
    } catch (error) {
      setError('Error creating account. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const goBack = () => {
    setShowSignup(false);
    setIsNewUser(false);
    setError('');
  };

  const showSignupForm = () => {
    setShowSignup(true);
    setIsNewUser(false);
    setError('');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-900 via-black to-purple-900 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        {/* Large Member Icon */}
        <div className="flex justify-center mb-6">
          <div className="w-32 h-32 bg-gradient-to-r from-pink-300 to-purple-300 rounded-full flex items-center justify-center shadow-xl">
            <svg className="w-16 h-16 text-white" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 3c1.66 0 3 1.34 3 3s-1.34 3-3 3-3-1.34-3-3 1.34-3 3-3zm0 14.2c-2.5 0-4.71-1.28-6-3.22.03-1.99 4-3.08 6-3.08 1.99 0 5.97 1.09 6 3.08-1.29 1.94-3.5 3.22-6 3.22z"/>
            </svg>
          </div>
        </div>
        
        <h2 className="mt-6 text-center text-3xl font-extrabold bg-gradient-to-r from-pink-400 to-purple-400 bg-clip-text text-transparent">
          {showSignup ? 'Create Account' : 'Member Login'}
        </h2>
        <p className="mt-2 text-center text-sm text-gray-600">
          {showSignup 
            ? (isNewUser ? 'Phone number not found. Please create a new account.' : 'Enter your details to create a new account')
            : 'Enter your phone number to continue'
          }
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-gradient-to-br from-gray-900 via-gray-800 to-black py-8 px-4 shadow-lg sm:rounded-xl sm:px-10 border border-gray-700">
          {error && (
            <div className="mb-4 bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-md">
              {error}
            </div>
          )}

          {!showSignup ? (
            <form onSubmit={handlePhoneSubmit} className="space-y-6">
              <div>
                <label htmlFor="phone" className="block text-sm font-medium text-gray-700">
                  Phone Number
                </label>
                <div className="mt-1">
                  <input
                    id="phone"
                    name="phone"
                    type="tel"
                    required
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md placeholder-gray-400 focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
                    placeholder="Enter your phone number"
                  />
                </div>
              </div>

              <div>
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {loading ? <LoadingSpinner size="small" /> : 'Continue'}
                </button>
              </div>

              <div className="mt-4">
                <div className="relative">
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-gray-300" />
                  </div>
                  <div className="relative flex justify-center text-sm">
                    <span className="px-2 bg-white text-gray-500">Or</span>
                  </div>
                </div>
              </div>

              <div>
                <button
                  type="button"
                  onClick={showSignupForm}
                  className="w-full flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-white bg-black hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
                >
                  Create New Account
                </button>
              </div>
            </form>
          ) : (
            <form onSubmit={handleSignup} className="space-y-6">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                  Full Name
                </label>
                <div className="mt-1">
                  <input
                    id="name"
                    name="name"
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md placeholder-gray-400 focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
                    placeholder="Enter your full name"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="phone-display" className="block text-sm font-medium text-gray-700">
                  Phone Number
                </label>
                <div className="mt-1">
                  <input
                    id="phone-display"
                    type="tel"
                    value={phone}
                    disabled
                    className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md bg-gray-50 text-gray-500 sm:text-sm"
                  />
                </div>
              </div>

              <div className="flex space-x-3">
                <button
                  type="button"
                  onClick={goBack}
                  className="flex-1 flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
                >
                  Back
                </button>
                <button
                  type="submit"
                  disabled={loading}
                  className="flex-1 flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-red bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {loading ? <LoadingSpinner size="small" /> : 'Create Account'}
                </button>
              </div>
            </form>
          )}

          <div className="mt-6">
            <button
              onClick={() => navigate('/')}
              className="w-full flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-white bg-black hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
            >
              Back to Role Selection
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CustomerAuth;
