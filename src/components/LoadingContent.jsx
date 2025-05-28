import React from 'react';

const LoadingContent = ({ tabId }) => {
  return (
    <div className="loading-content" id={`loadingContent-${tabId}`}>
      <div className="loading-container">
        <div className="loading-spinner">
          <div className="spinner-orbit">
            <div className="spinner-planet"></div>
          </div>
        </div>
        <div className="loading-text">
          <h2>Loading WTTP Content</h2>
          <p>Connecting to decentralized contract...</p>
          <div className="loading-dots">
            <span></span>
            <span></span>
            <span></span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoadingContent;