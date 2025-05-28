import React from 'react';
import { FaTimes } from 'react-icons/fa';
import styles from './Tab.module.css';

const Tab = ({ tab, isActive, onSelect, onClose }) => {
  const handleTabClick = () => {
    onSelect(tab.id);
  };

  const handleCloseClick = (e) => {
    e.stopPropagation();
    onClose(tab.id);
  };

  return (
    <div 
      className={`${styles.tab} ${isActive ? styles.active : ''}`}
      onClick={handleTabClick}
    >
      <div className={styles.tabContent}>
        <span className={styles.favicon}>
          {tab.favicon ? (
            <img src={tab.favicon} alt="" className={styles.faviconImg} />
          ) : (
            <div className={styles.defaultFavicon} />
          )}
        </span>
        <span className={styles.title}>{tab.title || 'New Tab'}</span>
      </div>
      <button 
        className={styles.closeButton}
        onClick={handleCloseClick}
        aria-label="Close tab"
      >
        <FaTimes />
      </button>
    </div>
  );
};

export default Tab;