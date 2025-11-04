import React from 'react';

const Skeleton: React.FC<{ className?: string }> = ({ className }) => (
  <div className={`bg-gray-700/50 rounded-md animate-pulse ${className}`} />
);

export default Skeleton;