import React from 'react';
import { useAuth } from '../context/AuthContext';

const Header = () => {
  const { user, logout, isMember, isAdmin } = useAuth();

  const handleLogout = () => {
    logout();
  };

  return (
    <header className="bg-white shadow-sm border-b">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <h1 className="text-xl font-bold text-gray-900">
              Gaming Club Management
            </h1>
          </div>
          
          {user && (
            <div className="flex items-center space-x-4">
              <div className="text-sm text-gray-700">
              {isMember && (
                <span>
                  Welcome, <span className="font-medium">{user.name}</span>
                  <span className="ml-2 text-primary-600">
                    Balance: ₹{user.balance || 0}
                  </span>
                </span>
              )}
                {isAdmin && (
                  <span>
                    Admin: <span className="font-medium">{user.username}</span>
                  </span>
                )}
              </div>
              
              <button
                onClick={handleLogout}
                className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-md text-sm font-medium transition-colors"
              >
                Logout
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
