import React from 'react';
import { useNavigate } from 'react-router-dom';

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
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
          Gaming Club Management
        </h2>
        <p className="mt-2 text-center text-sm text-gray-600">
          Choose your role to continue
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          <div className="space-y-6">
            <button
              onClick={() => handleRoleSelect('member')}
              className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 transition-colors"
            >
              <div className="text-center">
                <div className="text-lg font-semibold">Member</div>
                <div className="text-sm opacity-90">Play games and manage your account</div>
              </div>
            </button>

            <button
              onClick={() => handleRoleSelect('admin')}
              className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 transition-colors"
            >
              <div className="text-center">
                <div className="text-lg font-semibold">Admin</div>
                <div className="text-sm opacity-90">Manage games, members, and collections</div>
              </div>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RoleSelect;
