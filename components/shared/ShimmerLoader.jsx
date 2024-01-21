// components/ShimmerLoader.js
import React from 'react';

const ShimmerLoader = () => {
  return (
    <div className="w-full h-full relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 animate-shimmer"></div>
    </div>
  );
};

export default ShimmerLoader;
