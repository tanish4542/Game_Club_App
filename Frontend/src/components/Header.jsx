import React from 'react';
import { useAuth } from '../context/AuthContext';
import GameControllerLogo from './GameControllerLogo';

const Header = () => {
  const { user, logout, isMember, isAdmin } = useAuth();

  const handleLogout = () => {
    logout();
  };

  return (
    <header className="bg-white shadow-sm border-b">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Left side - Game Controller Logo */}
          <div className="flex items-center">
            <GameControllerLogo size="medium" className="drop-shadow-md" />
          </div>
          
          {/* Center - Project Title */}
          <div className="flex items-center">
            <h1 className="text-2xl font-bold bg-gradient-to-r from-pink-400 to-purple-400 bg-clip-text text-transparent">
              Game Club
            </h1>
          </div>
          
          {user && (
            <div className="flex items-center space-x-4">
              <div className="text-sm text-gray-700">
              {isMember && (
                <span>
                  Welcome, <span className="font-medium">{user.name}</span>
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
