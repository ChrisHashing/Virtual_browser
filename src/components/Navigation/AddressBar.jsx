import React, { useState } from 'react';
import { FaLock, FaUnlock, FaStar, FaSearch, FaTimesCircle } from 'react-icons/fa';
import styles from './AddressBar.module.css';

const AddressBar = ({ onNavigate }) => {
  const [url, setUrl] = useState('');
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [isSecure, setIsSecure] = useState(true);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (url.trim()) {
      onNavigate(url);
      
      // Determine if the URL is secure (just for demo purposes)
      setIsSecure(url.startsWith('https://'));
    }
  };

  const handleClear = () => {
    setUrl('');
  };

  const toggleBookmark = () => {
    setIsBookmarked(!isBookmarked);
  };

  return (
    <form className={styles.addressBarContainer} onSubmit={handleSubmit}>
      {isSecure ? (
        <FaLock className={styles.securityIcon} />
      ) : (
        <FaUnlock className={`${styles.securityIcon} ${styles.insecureIcon}`} />
      )}
      
      <input
        type="text"
        className={styles.addressInput}
        placeholder="Enter URL or search term..."
        value={url}
        onChange={(e) => setUrl(e.target.value)}
      />
      
      {url && (
        <button 
          type="button" 
          className={styles.actionButton} 
          onClick={handleClear}
          aria-label="Clear input"
        >
          <FaTimesCircle />
        </button>
      )}
      
      <button 
        type="button" 
        className={`${styles.actionButton} ${isBookmarked ? styles.bookmarked : ''}`} 
        onClick={toggleBookmark}
        aria-label={isBookmarked ? "Remove bookmark" : "Add bookmark"}
      >
        <FaStar />
      </button>
      
      <button 
        type="submit" 
        className={styles.actionButton}
        aria-label="Navigate"
      >
        <FaSearch />
      </button>
    </form>
  );
};

export default AddressBar;