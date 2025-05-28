import React from 'react';

const FirstTabContent = ({ tabId }) => {
  return (
    <div className="default-content-first-tab first-tab-content" id={`defaultContent-${tabId}`}>
      {/* Header Section */}
      <div className="wttp-main-section-container wttp-hero-welcome-section">
        <h1>Welcome to the Future of the Internet!</h1>
      </div>

      {/* Features Section */}
      <div className="wttp-main-section-container wttp-features-showcase-section">
        <div className="wttp-features-list-container">
          <h3>Features</h3>
          <ul>
            <li style={{ '--i': 1 }}>No monthly hosting</li>
            <li style={{ '--i': 2 }}>Permanent websites</li>
            <li style={{ '--i': 3 }}>Blockchain Security</li>
          </ul>
        </div>
        <div className="wttp-visual-placeholder-box">
        </div>
      </div>

      {/* Description Section */}
      <div className="wttp-main-section-container wttp-protocol-description-section">
        <h3>The (WTTP) Web Three Transfer Protocol</h3>
        <p>
          Try out some on-chain websites, including the WTTP Docs.
        </p>
        <div className="wttp-docs-highlight-box">
          <p>
            Experience the next generation of decentralized web hosting where your content lives forever on the blockchain, completely decentralized and censorship-resistant.
          </p>
        </div>
      </div>

      {/* Tokenomics Section */}
      <div className="wttp-main-section-container wttp-tokenomics-display-section">
        <h3>Tokenomics</h3>
        <div className="wttp-tokenomics-grid-layout">
          <div className="wttp-tokenomics-card-item">
            <span className="wttp-token-icon">O</span>
            <div className="wttp-token-label">Total Supply</div>
            <div className="wttp-token-value">1B WTTP</div>
          </div>
          <div className="wttp-tokenomics-card-item">
            <span className="wttp-token-icon">O</span>
            <div className="wttp-token-label">Locked</div>
            <div className="wttp-token-value">80%</div>
          </div>
          <div className="wttp-tokenomics-card-item">
            <span className="wttp-token-icon">O</span>
            <div className="wttp-token-label">Liquidity</div>
            <div className="wttp-token-value">20%</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FirstTabContent;