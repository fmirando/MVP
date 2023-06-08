import React from 'react';
import { FaSpinner } from 'react-icons/fa';

function LoadingIcon() {
  return (
    <div className="loading-container">
      <FaSpinner className="loading-icon" />
    </div>
  );
}

export default LoadingIcon;
