import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { adminAPI } from '../services/api';
import LoadingSpinner from '../components/LoadingSpinner';

const AdminAuth = () => {
  const [isSignup, setIsSignup] = useState(false);
  const [phone, setPhone] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (isSignup) {
      // Signup logic
      if (!phone.trim() || !username.trim() || !password.trim()) {
        setError('Please fill in all fields');
        return;
      }
    } else {
      // Login logic
      if (!phone.trim() || !password.trim()) {
        setError('Please enter both phone number and password');
        return;
      }
    }

    setLoading(true);
    setError('');

    try {
      if (isSignup) {
        console.log('Admin signup:', { phone: phone.trim(), username: username.trim() });
        const adminData = {
          phone: phone.trim(),
          username: username.trim(),
          password: password.trim()
        };
        const response = await adminAPI.create(adminData);
        const admin = response.data;
        console.log('Admin created:', admin);
        
        // Log in the new admin
        login(admin, 'admin');
        navigate('/dashboard/admin');
      } else {
        console.log('Admin login by phone:', phone.trim());
        const response = await adminAPI.loginByPhone(phone.trim(), password.trim());
        const admin = response.data;
        console.log('Admin found:', admin);
        
        // Log in the admin
        login(admin, 'admin');
        navigate('/dashboard/admin');
      }
    } catch (error) {
      console.error('Admin auth error:', error);
      if (isSignup) {
        setError('Error creating admin account. Phone number might already exist.');
      } else {
        setError('Invalid phone number or password');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-pink-gradient flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        {/* Large Admin Icon */}
        <div className="flex justify-center mb-6">
          <div className="w-32 h-32 bg-gradient-to-r from-green-300 to-green-400 rounded-full flex items-center justify-center shadow-xl">
            <svg className="w-16 h-16 text-white" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
            </svg>
          </div>
        </div>
        
        <h2 className="mt-6 text-center text-3xl font-extrabold bg-gradient-to-r from-green-400 to-green-500 bg-clip-text text-transparent">
          {isSignup ? 'Admin Signup' : 'Admin Login'}
        </h2>
        <p className="mt-2 text-center text-sm text-gray-600">
          {isSignup 
            ? 'Create account'
            : 'Enter credentials'
          }
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-card-gradient py-8 px-4 shadow-lg sm:rounded-xl sm:px-10 border border-pink-100">
          {error && (
            <div className="mb-4 bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-md">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Signup/Login Toggle */}
            <div className="flex space-x-4">
              <button
                type="button"
                onClick={() => setIsSignup(false)}
                className={`flex-1 py-2 px-4 rounded-md text-sm font-medium ${
                  !isSignup
                    ? 'bg-green-100 text-green-800 border border-green-300'
                    : 'bg-gray-100 text-gray-600 border border-gray-300'
                }`}
              >
                Login
              </button>
              <button
                type="button"
                onClick={() => setIsSignup(true)}
                className={`flex-1 py-2 px-4 rounded-md text-sm font-medium ${
                  isSignup
                    ? 'bg-green-100 text-green-800 border border-green-300'
                    : 'bg-gray-100 text-gray-600 border border-gray-300'
                }`}
              >
                Signup
              </button>
            </div>

            {/* Phone Number Input */}
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

            {/* Username Input (only for signup) */}
            {isSignup && (
              <div>
                <label htmlFor="username" className="block text-sm font-medium text-gray-700">
                  Username
                </label>
                <div className="mt-1">
                  <input
                    id="username"
                    name="username"
                    type="text"
                    required={isSignup}
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md placeholder-gray-400 focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
                    placeholder="Enter your username"
                  />
                </div>
              </div>
            )}

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                Password
              </label>
              <div className="mt-1">
                <input
                  id="password"
                  name="password"
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md placeholder-gray-400 focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
                  placeholder="Enter your password"
                />
              </div>
            </div>

            <div>
              <button
                type="submit"
                disabled={loading}
                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? <LoadingSpinner size="small" /> : (isSignup ? 'Create Account' : 'Sign In')}
              </button>
            </div>
          </form>

          <div className="mt-6">
            <button
              onClick={() => navigate('/')}
              className="w-full flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
            >
              Back to Role Selection
            </button>
          </div>

          <div className="mt-4 p-3 bg-blue-50 border border-blue-200 rounded-md">
            <p className="text-sm text-blue-800">
              <strong>Note:</strong> Admin login is only available through phone number and password. 
              Use signup to create a new admin account.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminAuth;
