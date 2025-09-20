import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check localStorage for existing session
    const savedUser = localStorage.getItem('gameClubUser');
    if (savedUser) {
      try {
        setUser(JSON.parse(savedUser));
      } catch (error) {
        console.error('Error parsing saved user:', error);
        localStorage.removeItem('gameClubUser');
      }
    }
    setLoading(false);
  }, []);

  const login = (userData, userType) => {
    const userWithType = { ...userData, userType };
    setUser(userWithType);
    localStorage.setItem('gameClubUser', JSON.stringify(userWithType));
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('gameClubUser');
  };

  const updateUser = (updatedUserData) => {
    const updatedUser = { ...user, ...updatedUserData };
    setUser(updatedUser);
    localStorage.setItem('gameClubUser', JSON.stringify(updatedUser));
  };

  const value = {
    user,
    login,
    logout,
    updateUser,
    loading,
    isAuthenticated: !!user,
    isMember: user?.userType === 'member',
    isAdmin: user?.userType === 'admin',
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};
