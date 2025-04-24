import React from 'react';

interface LoadingSpinnerProps {
  size?: 'small' | 'medium' | 'large';
  className?: string;
}

export const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({ 
  size = 'medium',
  className = ''
}) => {
  const sizeClasses = {
    small: 'h-4 w-4 border-2',
    medium: 'h-8 w-8 border-3',
    large: 'h-12 w-12 border-4'
  };
  
  return (
    <div className={`flex justify-center items-center ${className}`}>
      <div className={`${sizeClasses[size]} rounded-full border-t-primary-500 border-r-primary-200 border-b-primary-200 border-l-primary-200 animate-spin`}></div>
    </div>
  );
};