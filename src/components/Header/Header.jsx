import React from 'react';
import { FaBars, FaCog } from 'react-icons/fa';
import styles from './Header.module.css';

const Header = ({ toggleSidebar }) => {
  return (
    <header className={styles.header}>
      <div className={styles.logoContainer}>
        <button 
          className={styles.menuButton} 
          onClick={toggleSidebar}
          aria-label="Toggle sidebar"
        >
          <FaBars />
        </button>
        <h1 className={styles.logo}>Virtual Browser</h1>
      </div>
      <div className={styles.headerControls}>
        <button 
          className={styles.settingsButton}
          aria-label="Settings"
        >
          <FaCog />
        </button>
      </div>
    </header>
  );
};

export default Header;