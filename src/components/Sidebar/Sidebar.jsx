import React from 'react';
import { FaBookmark, FaHistory, FaDownload, FaCog } from 'react-icons/fa';
import styles from './Sidebar.module.css';

const Sidebar = ({ isOpen }) => {
  const sidebarItems = [
    { icon: <FaBookmark />, label: 'Bookmarks' },
    { icon: <FaHistory />, label: 'History' },
    { icon: <FaDownload />, label: 'Downloads' },
    { icon: <FaCog />, label: 'Settings' }
  ];

  return (
    <aside className={`${styles.sidebar} ${isOpen ? styles.open : ''}`}>
      <nav className={styles.sidebarNav}>
        <ul className={styles.sidebarList}>
          {sidebarItems.map((item, index) => (
            <li key={index} className={styles.sidebarItem}>
              <button className={styles.sidebarButton}>
                <span className={styles.sidebarIcon}>{item.icon}</span>
                <span className={styles.sidebarLabel}>{item.label}</span>
              </button>
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  );
};

export default Sidebar;