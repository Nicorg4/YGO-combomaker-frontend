import React from 'react';

type ProgressProps = {
  value: number;
  color?: string;
  className?: string;
};

const Progress = ({ value, color = 'bg-blue-500', className = '' }: ProgressProps) => {
  return (
    <div className={`w-full h-2 bg-gray-300 clip-diagonal overflow-hidden ${className}`}>
      <div
        className={`h-full ${color} transition-all duration-200`}
        style={{ width: `${Math.min(value, 100)}%` }}
      />
    </div>
  );
};

export default Progress;