import React from 'react';
import { FaTimes, FaGlobe } from 'react-icons/fa';
import styles from './Tab.module.css';

const Tab = ({ 
  id, 
  title, 
  favicon, 
  isActive, 
  isLoading, 
  onClick, 
  onClose 
}) => {
  const handleClose = (e) => {
    e.stopPropagation();
    onClose(id);
  };

  return (
    <div 
      className={`${styles.tab} ${isActive ? styles.activeTab : ''}`}
      onClick={() => onClick(id)}
    >
      {favicon ? (
        <img src={favicon} alt="" className={styles.favicon} />
      ) : (
        <FaGlobe className={styles.favicon} />
      )}
      
      <div className={styles.tabTitle}>
        {title || 'New Tab'}
      </div>
      
      <button 
        className={styles.closeButton} 
        onClick={handleClose}
        aria-label="Close tab"
      >
        <FaTimes />
      </button>
      
      {isLoading && <div className={styles.loadingIndicator}></div>}
    </div>
  );
};

export default Tab;