import React from 'react';
import { 
  FaHome, 
  FaBookmark, 
  FaHistory, 
  FaDownload, 
  FaCog, 
  FaInfoCircle 
} from 'react-icons/fa';
import styles from './Sidebar.module.css';

const Sidebar = () => {
  const navItems = [
    { id: 'home', label: 'Home', icon: <FaHome className={styles.navIcon} /> },
    { id: 'bookmarks', label: 'Bookmarks', icon: <FaBookmark className={styles.navIcon} /> },
    { id: 'history', label: 'History', icon: <FaHistory className={styles.navIcon} /> },
    { id: 'downloads', label: 'Downloads', icon: <FaDownload className={styles.navIcon} /> },
    { id: 'settings', label: 'Settings', icon: <FaCog className={styles.navIcon} /> },
    { id: 'about', label: 'About', icon: <FaInfoCircle className={styles.navIcon} /> },
  ];

  return (
    <aside className={styles.sidebar}>
      <div className={styles.sidebarHeader}>
        <h2 className={styles.sidebarTitle}>Browser Menu</h2>
      </div>
      
      <nav className={styles.sidebarNav}>
        <ul className={styles.navList}>
          {navItems.map((item) => (
            <li key={item.id} className={styles.navItem}>
              <div 
                className={`${styles.navLink} ${item.id === 'home' ? styles.navLinkActive : ''}`}
              >
                {item.icon}
                <span>{item.label}</span>
              </div>
            </li>
          ))}
        </ul>
      </nav>
      
      <div className={styles.sidebarFooter}>
        <p className={styles.footerText}>Virtual Browser v1.0.0</p>
      </div>
    </aside>
  );
};

export default Sidebar;