import React from 'react';
import styles from './BrowserContent.module.css';
import DefaultContent from './DefaultContent';

const BrowserContent = ({ activeTab, isLoading }) => {
  // If no active tab or URL, show default content
  if (!activeTab || !activeTab.url) {
    return <DefaultContent />;
  }

  return (
    <div className={styles.browserContent}>
      {isLoading ? (
        <div className={styles.loadingContainer}>
          <div className={styles.loadingSpinner}></div>
          <p>Loading...</p>
        </div>
      ) : (
        <iframe
          src={activeTab.url}
          title={activeTab.title || 'Browser Content'}
          className={styles.contentFrame}
          sandbox="allow-same-origin allow-scripts allow-forms"
          referrerPolicy="no-referrer"
        />
      )}
    </div>
  );
};

export default BrowserContent;