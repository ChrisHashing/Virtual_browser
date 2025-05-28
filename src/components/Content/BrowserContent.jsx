import React, { useState, useRef, useEffect } from 'react';
import { FaExclamationTriangle, FaRedo } from 'react-icons/fa';
import styles from './BrowserContent.module.css';

const BrowserContent = ({ url, isLoading, setIsLoading, onTitleChange }) => {
  const [error, setError] = useState(null);
  const iframeRef = useRef(null);
  
  useEffect(() => {
    if (url) {
      setIsLoading(true);
      setError(null);
    }
  }, [url, setIsLoading]);
  
  const handleLoad = () => {
    setIsLoading(false);
    setError(null);
    
    // Try to get the page title
    try {
      if (iframeRef.current && iframeRef.current.contentDocument) {
        const title = iframeRef.current.contentDocument.title;
        if (title && onTitleChange) {
          onTitleChange(title);
        }
      }
    } catch (err) {
      console.log('Cannot access iframe content due to same-origin policy');
    }
  };
  
  const handleError = () => {
    setIsLoading(false);
    setError({
      title: 'Page failed to load',
      message: `We couldn't load the page at ${url}. Please check the URL and try again.`
    });
  };
  
  const handleRetry = () => {
    if (url) {
      setIsLoading(true);
      setError(null);
      
      // Force iframe reload
      if (iframeRef.current) {
        iframeRef.current.src = url;
      }
    }
  };
  
  return (
    <div className={styles.browserContent}>
      {!error ? (
        <>
          <iframe
            ref={iframeRef}
            className={styles.contentFrame}
            src={url}
            title="Browser Content"
            onLoad={handleLoad}
            onError={handleError}
            sandbox="allow-same-origin allow-scripts allow-popups allow-forms"
          />
          
          {isLoading && (
            <div className={styles.loadingOverlay}>
              <div className={styles.spinner}></div>
              <div className={styles.loadingText}>Loading...</div>
            </div>
          )}
        </>
      ) : (
        <div className={styles.errorContainer}>
          <FaExclamationTriangle className={styles.errorIcon} />
          <h2 className={styles.errorTitle}>{error.title}</h2>
          <p className={styles.errorMessage}>{error.message}</p>
          <button className={styles.retryButton} onClick={handleRetry}>
            <FaRedo />
            <span>Retry</span>
          </button>
        </div>
      )}
    </div>
  );
};

export default BrowserContent;