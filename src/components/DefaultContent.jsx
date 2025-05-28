import React from 'react';

const DefaultContent = ({ tabId, onFeaturedItemClick }) => {
  return (
    <div className="default-content" id={`defaultContent-${tabId}`}>
      <div className="default-content-logo">
        <i className="fa-solid fa-cube"></i>
      </div>
      <h1>Welcome to WTTP Browser</h1>
      <p>WTTP (Web3 Text Transfer Protocol) enables decentralized web content stored on-chain. Enter a contract address above to explore content or check out our featured contracts below.</p>
      <div className="featured-content">
        <div 
          className="featured-item" 
          onClick={() => onFeaturedItemClick('0x1234567890123456789012345678901234567890')}
        >
          <div className="featured-icon">
            <i className="fa-solid fa-newspaper"></i>
          </div>
          <div className="featured-title">WTTP News</div>
          <div className="featured-desc">Latest updates and developments in the WTTP ecosystem</div>
        </div>
        <div 
          className="featured-item" 
          onClick={() => onFeaturedItemClick('0xabcdef1234567890abcdef1234567890abcdef12')}
        >
          <div className="featured-icon">
            <i className="fa-solid fa-book"></i>
          </div>
          <div className="featured-title">Documentation</div>
          <div className="featured-desc">Learn how to build and deploy WTTP contracts</div>
        </div>
        <div 
          className="featured-item" 
          onClick={() => onFeaturedItemClick('0xa1b2c3d4e5f6a1b2c3d4e5f6a1b2c3d4e5f6a1b2')}
        >
          <div className="featured-icon">
            <i className="fa-solid fa-code"></i>
          </div>
          <div className="featured-title">Examples</div>
          <div className="featured-desc">Sample WTTP applications and templates</div>
        </div>
      </div>
    </div>
  );
};

export default DefaultContent;