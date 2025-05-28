import React from 'react';
import { FaArrowLeft, FaArrowRight, FaRedo, FaHome } from 'react-icons/fa';
import styles from './NavigationControls.module.css';

const NavigationControls = ({ onBack, onForward, onRefresh, onHome, canGoBack, canGoForward }) => {
  return (
    <div className={styles.navigationControls}>
      <button 
        className={`${styles.navButton} ${!canGoBack ? styles.disabled : ''}`}
        onClick={onBack}
        disabled={!canGoBack}
        aria-label="Go back"
      >
        <FaArrowLeft />
      </button>
      <button 
        className={`${styles.navButton} ${!canGoForward ? styles.disabled : ''}`}
        onClick={onForward}
        disabled={!canGoForward}
        aria-label="Go forward"
      >
        <FaArrowRight />
      </button>
      <button 
        className={styles.navButton}
        onClick={onRefresh}
        aria-label="Refresh"
      >
        <FaRedo />
      </button>
      <button 
        className={styles.navButton}
        onClick={onHome}
        aria-label="Home"
      >
        <FaHome />
      </button>
    </div>
  );
};

export default NavigationControls;