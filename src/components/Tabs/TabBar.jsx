import React from 'react';
import { FaPlus } from 'react-icons/fa';
import Tab from './Tab';
import styles from './TabBar.module.css';

const TabBar = ({ 
  tabs, 
  activeTabId, 
  onTabClick, 
  onTabClose, 
  onNewTab 
}) => {
  return (
    <div className={styles.tabBar}>
      <div className={styles.tabsContainer}>
        {tabs.map((tab) => (
          <Tab
            key={tab.id}
            id={tab.id}
            title={tab.title}
            favicon={tab.favicon}
            isActive={tab.id === activeTabId}
            isLoading={tab.isLoading}
            onClick={onTabClick}
            onClose={onTabClose}
          />
        ))}
      </div>
      
      <button 
        className={styles.newTabButton} 
        onClick={onNewTab}
        aria-label="New tab"
      >
        <FaPlus />
      </button>
    </div>
  );
};

export default TabBar;