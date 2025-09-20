import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { adminAPI } from '../services/api';
import LoadingSpinner from '../components/LoadingSpinner';

const AdminAuth = () => {
  const [loginType, setLoginType] = useState('phone'); // 'phone' or 'username'
  const [phone, setPhone] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (loginType === 'phone') {
      if (!phone.trim() || !password.trim()) {
        setError('Please enter both phone number and password');
        return;
      }
    } else {
      if (!username.trim() || !password.trim()) {
        setError('Please enter both username and password');
        return;
      }
    }

    setLoading(true);
    setError('');

    try {
      let response;
      if (loginType === 'phone') {
        console.log('Admin login by phone:', phone.trim());
        response = await adminAPI.loginByPhone(phone.trim(), password.trim());
      } else {
        console.log('Admin login by username:', username.trim());
        response = await adminAPI.login(username.trim(), password.trim());
      }
      
      const admin = response.data;
      console.log('Admin found:', admin);
      
      // Log in the admin
      login(admin, 'admin');
      navigate('/dashboard/admin');
    } catch (error) {
      console.error('Admin login error:', error);
      setError(`Invalid ${loginType === 'phone' ? 'phone number or' : 'username or'} password`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
          Admin Login
        </h2>
        <p className="mt-2 text-center text-sm text-gray-600">
          Enter your admin credentials to continue
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          {error && (
            <div className="mb-4 bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-md">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Login Type Toggle */}
            <div className="flex space-x-4">
              <button
                type="button"
                onClick={() => setLoginType('phone')}
                className={`flex-1 py-2 px-4 rounded-md text-sm font-medium ${
                  loginType === 'phone'
                    ? 'bg-green-100 text-green-800 border border-green-300'
                    : 'bg-gray-100 text-gray-600 border border-gray-300'
                }`}
              >
                Phone Login
              </button>
              <button
                type="button"
                onClick={() => setLoginType('username')}
                className={`flex-1 py-2 px-4 rounded-md text-sm font-medium ${
                  loginType === 'username'
                    ? 'bg-green-100 text-green-800 border border-green-300'
                    : 'bg-gray-100 text-gray-600 border border-gray-300'
                }`}
              >
                Username Login
              </button>
            </div>

            {/* Phone or Username Input */}
            {loginType === 'phone' ? (
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
            ) : (
              <div>
                <label htmlFor="username" className="block text-sm font-medium text-gray-700">
                  Username
                </label>
                <div className="mt-1">
                  <input
                    id="username"
                    name="username"
                    type="text"
                    required
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
                {loading ? <LoadingSpinner size="small" /> : 'Sign In'}
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
              <strong>Note:</strong> You can login using either your phone number or username. 
              Phone login uses secure backend authentication.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminAuth;
