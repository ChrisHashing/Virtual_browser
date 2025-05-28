import React from 'react';
import { FaArrowLeft, FaArrowRight, FaRedo, FaHome } from 'react-icons/fa';
import styles from './NavigationControls.module.css';

const NavigationControls = ({ 
  canGoBack, 
  canGoForward, 
  onBack, 
  onForward, 
  onRefresh, 
  onHome 
}) => {
  return (
    <div className={styles.controlsContainer}>
      <button 
        className={styles.navButton} 
        onClick={onBack} 
        disabled={!canGoBack}
        aria-label="Go back"
      >
        <FaArrowLeft />
      </button>
      
      <button 
        className={styles.navButton} 
        onClick={onForward} 
        disabled={!canGoForward}
        aria-label="Go forward"
      >
        <FaArrowRight />
      </button>
      
      <button 
        className={`${styles.navButton} ${styles.refreshButton}`} 
        onClick={onRefresh}
        aria-label="Refresh page"
      >
        <FaRedo />
      </button>
      
      <button 
        className={styles.navButton} 
        onClick={onHome}
        aria-label="Go to home page"
      >
        <FaHome />
      </button>
    </div>
  );
};

export default NavigationControls;