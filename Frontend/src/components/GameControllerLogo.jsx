import React from 'react';

const GameControllerLogo = ({ size = 'default', className = '' }) => {
  const getSizeClasses = () => {
    switch (size) {
      case 'small':
        return 'w-8 h-8';
      case 'medium':
        return 'w-12 h-12';
      case 'large':
        return 'w-16 h-16';
      case 'xl':
        return 'w-24 h-24';
      case '2xl':
        return 'w-32 h-32';
      default:
        return 'w-10 h-10';
    }
  };

  return (
    <div className={`${getSizeClasses()} ${className} relative`}>
      <svg
        viewBox="0 0 100 100"
        className="w-full h-full"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Outer golden ring */}
        <circle
          cx="50"
          cy="50"
          r="48"
          fill="none"
          stroke="url(#goldenGradient)"
          strokeWidth="2"
          className="drop-shadow-lg"
        />
        
        {/* Game Controller Body */}
        <ellipse
          cx="50"
          cy="50"
          rx="25"
          ry="15"
          fill="url(#controllerGradient)"
          className="drop-shadow-lg"
        />
        
        {/* Left D-pad */}
        <rect
          x="35"
          y="42"
          width="8"
          height="3"
          rx="1.5"
          fill="#1e40af"
        />
        <rect
          x="38.5"
          y="39"
          width="3"
          height="8"
          rx="1.5"
          fill="#1e40af"
        />
        
        {/* Right Action Buttons */}
        <circle
          cx="58"
          cy="42"
          r="2.5"
          fill="#fbbf24"
        />
        <circle
          cx="62"
          cy="46"
          r="2.5"
          fill="#3b82f6"
        />
        <circle
          cx="58"
          cy="50"
          r="2.5"
          fill="#ef4444"
        />
        <circle
          cx="54"
          cy="46"
          r="2.5"
          fill="#10b981"
        />
        
        {/* Central Digital Interface */}
        <circle
          cx="50"
          cy="50"
          r="8"
          fill="url(#digitalGradient)"
          className="drop-shadow-md"
        />
        
        {/* Digital network pattern */}
        <circle
          cx="50"
          cy="50"
          r="3"
          fill="#60a5fa"
        />
        <circle
          cx="46"
          cy="46"
          r="1"
          fill="#93c5fd"
        />
        <circle
          cx="54"
          cy="46"
          r="1"
          fill="#93c5fd"
        />
        <circle
          cx="46"
          cy="54"
          r="1"
          fill="#93c5fd"
        />
        <circle
          cx="54"
          cy="54"
          r="1"
          fill="#93c5fd"
        />
        
        {/* Connection lines */}
        <line
          x1="50"
          y1="50"
          x2="46"
          y2="46"
          stroke="#60a5fa"
          strokeWidth="0.5"
        />
        <line
          x1="50"
          y1="50"
          x2="54"
          y2="46"
          stroke="#60a5fa"
          strokeWidth="0.5"
        />
        <line
          x1="50"
          y1="50"
          x2="46"
          y2="54"
          stroke="#60a5fa"
          strokeWidth="0.5"
        />
        <line
          x1="50"
          y1="50"
          x2="54"
          y2="54"
          stroke="#60a5fa"
          strokeWidth="0.5"
        />
        
        {/* Gaming scene icons around the controller */}
        {/* Castle/Fantasy (top-left) */}
        <circle
          cx="25"
          cy="25"
          r="6"
          fill="url(#castleGradient)"
          className="drop-shadow-sm"
        />
        <rect
          x="22"
          y="28"
          width="6"
          height="4"
          fill="#8b5cf6"
        />
        <polygon
          points="20,28 25,22 30,28"
          fill="#a855f7"
        />
        
        {/* Spaceship (top-right) */}
        <circle
          cx="75"
          cy="25"
          r="6"
          fill="url(#spaceshipGradient)"
          className="drop-shadow-sm"
        />
        <ellipse
          cx="75"
          cy="25"
          rx="4"
          ry="2"
          fill="#3b82f6"
        />
        <polygon
          points="71,25 75,20 79,25"
          fill="#60a5fa"
        />
        
        {/* Racing car (bottom-right) */}
        <circle
          cx="75"
          cy="75"
          r="6"
          fill="url(#carGradient)"
          className="drop-shadow-sm"
        />
        <rect
          x="70"
          y="72"
          width="10"
          height="4"
          rx="2"
          fill="#fbbf24"
        />
        <circle
          cx="72"
          cy="76"
          r="1.5"
          fill="#1f2937"
        />
        <circle
          cx="78"
          cy="76"
          r="1.5"
          fill="#1f2937"
        />
        
        {/* Stadium (bottom-left) */}
        <circle
          cx="25"
          cy="75"
          r="6"
          fill="url(#stadiumGradient)"
          className="drop-shadow-sm"
        />
        <ellipse
          cx="25"
          cy="75"
          rx="5"
          ry="3"
          fill="#10b981"
        />
        <rect
          x="20"
          y="72"
          width="10"
          height="2"
          fill="#059669"
        />
        
        {/* Gradients */}
        <defs>
          <linearGradient id="goldenGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#fbbf24" />
            <stop offset="50%" stopColor="#f59e0b" />
            <stop offset="100%" stopColor="#d97706" />
          </linearGradient>
          
          <linearGradient id="controllerGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#1e40af" />
            <stop offset="50%" stopColor="#3b82f6" />
            <stop offset="100%" stopColor="#1d4ed8" />
          </linearGradient>
          
          <linearGradient id="digitalGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#1e40af" />
            <stop offset="100%" stopColor="#3b82f6" />
          </linearGradient>
          
          <linearGradient id="castleGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#8b5cf6" />
            <stop offset="100%" stopColor="#a855f7" />
          </linearGradient>
          
          <linearGradient id="spaceshipGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#3b82f6" />
            <stop offset="100%" stopColor="#60a5fa" />
          </linearGradient>
          
          <linearGradient id="carGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#fbbf24" />
            <stop offset="100%" stopColor="#f59e0b" />
          </linearGradient>
          
          <linearGradient id="stadiumGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#10b981" />
            <stop offset="100%" stopColor="#059669" />
          </linearGradient>
        </defs>
      </svg>
    </div>
  );
};

export default GameControllerLogo;
