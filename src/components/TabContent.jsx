import React, { useEffect, useRef, useState } from 'react';
import DefaultContent from './DefaultContent';
import FirstTabContent from './FirstTabContent';
import LoadingContent from './LoadingContent';

const TabContent = ({ tab, isActive, onFeaturedItemClick }) => {
  const iframeRef = useRef(null);
  const [showDefaultContent, setShowDefaultContent] = useState(true);
  const [showLoading, setShowLoading] = useState(false);
  const [showIframe, setShowIframe] = useState(false);

  // Reset states when tab changes
  useEffect(() => {
    if (tab.hasSearched && tab.history.length > 0) {
      setShowDefaultContent(false);
      setShowLoading(true);
      setShowIframe(false);
    } else {
      setShowDefaultContent(true);
      setShowLoading(false);
      setShowIframe(false);
    }
  }, [tab.id, tab.hasSearched, tab.history.length]);

  // Handle iframe src updates
  useEffect(() => {
    if (iframeRef.current && tab.history.length > 0 && tab.currentIndex >= 0) {
      // Only update src if it's different to avoid unnecessary reloads
      const newSrc = tab.history[tab.currentIndex];
      if (iframeRef.current.src !== newSrc) {
        iframeRef.current.src = newSrc;
        
        // Show loading state when changing URL
        if (isActive) {
          setShowLoading(true);
          setShowIframe(false);
        }
      }
    }
  }, [tab.history, tab.currentIndex, isActive]);

  // Handle visibility based on active state
  useEffect(() => {
    // No need to change anything if we're showing default content
    if (showDefaultContent) return;
    
    // If tab becomes active and we have history, ensure iframe is visible
    if (isActive && tab.history.length > 0 && tab.currentIndex >= 0) {
      // If iframe is already loaded, show it immediately
      if (iframeRef.current && iframeRef.current.complete) {
        setShowLoading(false);
        setShowIframe(true);
      }
    }
  }, [isActive, showDefaultContent, tab.history.length, tab.currentIndex]);

  const handleIframeLoad = () => {
    setShowLoading(false);
    setShowIframe(true);
    
    // Try to update tab title from iframe content
    try {
      const title = iframeRef.current.contentDocument.title;
      if (title) {
        // This would need to be handled by lifting state up
        console.log('Iframe title:', title);
      }
    } catch (e) {
      console.log('Cannot access iframe content:', e);
    }
  };

  return (
    <div className={`tab-content ${isActive ? 'active' : ''}`} data-tab-id={tab.id}>
      {showDefaultContent && (
        tab.isFirstTab ? (
          <FirstTabContent tabId={tab.id} />
        ) : (
          <DefaultContent tabId={tab.id} onFeaturedItemClick={onFeaturedItemClick} />
        )
      )}
      
      {showLoading && (
        <LoadingContent tabId={tab.id} />
      )}
      
      <iframe 
        ref={iframeRef}
        title={tab.title}
        style={{ display: showIframe ? 'block' : 'none' }}
        onLoad={handleIframeLoad}
        onError={handleIframeLoad} // Handle errors the same way
      />
    </div>
  );
};

export default TabContent;