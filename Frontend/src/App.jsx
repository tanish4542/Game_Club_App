import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';

// Pages
import RoleSelect from './pages/RoleSelect';
import CustomerAuth from './pages/CustomerAuth';
import AdminAuth from './pages/AdminAuth';
import CustomerDashboard from './pages/CustomerDashboard';
import AdminDashboard from './pages/AdminDashboard';
import Recharge from './pages/Recharge';
import Transactions from './pages/Transactions';
import Collections from './pages/Collections';

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="App">
          <Routes>
            {/* Public Routes */}
            <Route path="/" element={<RoleSelect />} />
            <Route path="/auth/member" element={<CustomerAuth />} />
            <Route path="/auth/admin" element={<AdminAuth />} />
            
            {/* Protected Member Routes */}
            <Route 
              path="/dashboard/member" 
              element={
                <ProtectedRoute requiredRole="member">
                  <CustomerDashboard />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/recharge" 
              element={
                <ProtectedRoute requiredRole="member">
                  <Recharge />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/transactions" 
              element={
                <ProtectedRoute>
                  <Transactions />
                </ProtectedRoute>
              } 
            />
            
            {/* Protected Admin Routes */}
            <Route 
              path="/dashboard/admin" 
              element={
                <ProtectedRoute requiredRole="admin">
                  <AdminDashboard />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/collections" 
              element={
                <ProtectedRoute requiredRole="admin">
                  <Collections />
                </ProtectedRoute>
              } 
            />
            
            {/* Catch all route */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;
