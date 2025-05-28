import React from 'react';
import { FaPlus } from 'react-icons/fa';
import Tab from './Tab';
import styles from './TabBar.module.css';

const TabBar = ({ tabs, activeTabId, onSelectTab, onCloseTab, onAddTab }) => {
  return (
    <div className={styles.tabBar}>
      <div className={styles.tabsContainer}>
        {tabs.map(tab => (
          <Tab
            key={tab.id}
            tab={tab}
            isActive={tab.id === activeTabId}
            onSelect={onSelectTab}
            onClose={onCloseTab}
          />
        ))}
      </div>
      <button 
        className={styles.newTabButton}
        onClick={onAddTab}
        aria-label="New tab"
      >
        <FaPlus />
      </button>
    </div>
  );
};

export default TabBar;