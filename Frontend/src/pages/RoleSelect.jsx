import React from 'react';
import { useNavigate } from 'react-router-dom';
import GameControllerLogo from '../components/GameControllerLogo';

const RoleSelect = () => {
  const navigate = useNavigate();

  const handleRoleSelect = (role) => {
    if (role === 'member') {
      navigate('/auth/member');
    } else if (role === 'admin') {
      navigate('/auth/admin');
    }
  };

  return (
    <div className="min-h-screen bg-pink-gradient flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-4xl">
        {/* Large Game Controller Logo */}
        <div className="flex justify-center mb-8">
          <GameControllerLogo size="2xl" className="drop-shadow-2xl" />
        </div>
        
        <h2 className="mt-6 text-center text-4xl font-extrabold bg-gradient-to-r from-pink-400 to-purple-400 bg-clip-text text-transparent">
          Game Club
        </h2>
        <p className="mt-2 text-center text-lg text-gray-600">
          Choose your role to continue
        </p>
      </div>

      <div className="mt-12 sm:mx-auto sm:w-full sm:max-w-4xl">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Member Widget */}
          <button
            onClick={() => handleRoleSelect('member')}
            className="bg-card-gradient rounded-2xl shadow-xl p-8 border border-pink-100 transform hover:scale-105 transition-all duration-300 hover:shadow-2xl group"
          >
            <div className="text-center">
              {/* Large Member Icon */}
              <div className="flex justify-center mb-6">
                <div className="w-24 h-24 bg-gradient-to-r from-pink-300 to-purple-300 rounded-full flex items-center justify-center shadow-lg group-hover:shadow-xl transition-all duration-300">
                  <svg className="w-12 h-12 text-white" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 3c1.66 0 3 1.34 3 3s-1.34 3-3 3-3-1.34-3-3 1.34-3 3-3zm0 14.2c-2.5 0-4.71-1.28-6-3.22.03-1.99 4-3.08 6-3.08 1.99 0 5.97 1.09 6 3.08-1.29 1.94-3.5 3.22-6 3.22z"/>
                  </svg>
                </div>
              </div>
              
              <h3 className="text-2xl font-bold text-gray-800 mb-2">Member</h3>
              <p className="text-gray-600 text-lg">Play games and manage your balance</p>
              
              {/* Additional decorative elements */}
              <div className="mt-6 flex justify-center space-x-2">
                <div className="w-2 h-2 bg-pink-300 rounded-full"></div>
                <div className="w-2 h-2 bg-purple-300 rounded-full"></div>
                <div className="w-2 h-2 bg-pink-300 rounded-full"></div>
              </div>
            </div>
          </button>

          {/* Admin Widget */}
          <button
            onClick={() => handleRoleSelect('admin')}
            className="bg-card-gradient rounded-2xl shadow-xl p-8 border border-pink-100 transform hover:scale-105 transition-all duration-300 hover:shadow-2xl group"
          >
            <div className="text-center">
              {/* Large Admin Icon */}
              <div className="flex justify-center mb-6">
                <div className="w-24 h-24 bg-gradient-to-r from-green-300 to-green-400 rounded-full flex items-center justify-center shadow-lg group-hover:shadow-xl transition-all duration-300">
                  <svg className="w-12 h-12 text-white" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                  </svg>
                </div>
              </div>
              
              <h3 className="text-2xl font-bold text-gray-800 mb-2">Admin</h3>
              <p className="text-gray-600 text-lg">Manage games, members, and transactions</p>
              
              {/* Additional decorative elements */}
              <div className="mt-6 flex justify-center space-x-2">
                <div className="w-2 h-2 bg-green-300 rounded-full"></div>
                <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                <div className="w-2 h-2 bg-green-300 rounded-full"></div>
              </div>
            </div>
          </button>
        </div>
      </div>
    </div>
  );
};

export default RoleSelect;
