import React from 'react';
import { FaSearch, FaBookmark, FaHistory } from 'react-icons/fa';
import styles from './DefaultContent.module.css';

const DefaultContent = () => {
  const quickLinks = [
    { icon: <FaSearch />, title: 'Search', url: 'https://www.google.com' },
    { icon: <FaBookmark />, title: 'Bookmarks', url: '#bookmarks' },
    { icon: <FaHistory />, title: 'History', url: '#history' }
  ];

  return (
    <div className={styles.defaultContent}>
      <div className={styles.welcomeContainer}>
        <h1 className={styles.welcomeTitle}>Welcome to Virtual Browser</h1>
        <p className={styles.welcomeText}>
          This is a simulated browser environment. Enter a URL in the address bar to get started.
        </p>
        
        <div className={styles.searchContainer}>
          <input 
            type="text" 
            className={styles.searchInput} 
            placeholder="Search the web"
            aria-label="Search the web"
          />
          <button className={styles.searchButton}>
            <FaSearch />
          </button>
        </div>
        
        <div className={styles.quickLinksContainer}>
          <h2 className={styles.quickLinksTitle}>Quick Links</h2>
          <div className={styles.quickLinks}>
            {quickLinks.map((link, index) => (
              <a 
                key={index} 
                href={link.url} 
                className={styles.quickLink}
              >
                <span className={styles.quickLinkIcon}>{link.icon}</span>
                <span className={styles.quickLinkTitle}>{link.title}</span>
              </a>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DefaultContent;