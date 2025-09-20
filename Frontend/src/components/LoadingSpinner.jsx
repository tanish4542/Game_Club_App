import React from 'react';

const LoadingSpinner = ({ size = 'medium', className = '' }) => {
  const sizeClasses = {
    small: 'h-4 w-4',
    medium: 'h-8 w-8',
    large: 'h-12 w-12',
    xlarge: 'h-16 w-16'
  };

  return (
    <div className={`animate-spin rounded-full border-b-2 border-primary-500 ${sizeClasses[size]} ${className}`}></div>
  );
};

export default LoadingSpinner;
