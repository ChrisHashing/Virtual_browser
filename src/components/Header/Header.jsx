import React from 'react';
import { FaGlobe, FaCog, FaUser, FaQuestionCircle } from 'react-icons/fa';
import styles from './Header.module.css';

const Header = () => {
  return (
    <header className={styles.header}>
      <div className={styles.logo}>
        <FaGlobe className={styles.logoIcon} />
        <span>Virtual Browser</span>
      </div>
      
      <div className={styles.actions}>
        <button className={styles.actionButton} aria-label="Help">
          <FaQuestionCircle />
        </button>
        
        <button className={styles.actionButton} aria-label="User profile">
          <FaUser />
        </button>
        
        <button className={`${styles.actionButton} ${styles.settingsButton}`} aria-label="Settings">
          <FaCog />
        </button>
      </div>
    </header>
  );
};

export default Header;