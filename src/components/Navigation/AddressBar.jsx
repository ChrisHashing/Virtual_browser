import React, { useState } from 'react';
import { FaSearch, FaLock } from 'react-icons/fa';
import styles from './AddressBar.module.css';

const AddressBar = ({ currentUrl, onNavigate }) => {
  const [inputValue, setInputValue] = useState(currentUrl || '');
  
  const handleSubmit = (e) => {
    e.preventDefault();
    if (inputValue.trim()) {
      onNavigate(inputValue);
    }
  };

  const isSecure = inputValue.startsWith('https://');

  return (
    <form className={styles.addressBarContainer} onSubmit={handleSubmit}>
      <div className={styles.addressBar}>
        {isSecure && (
          <span className={styles.secureIcon}>
            <FaLock />
          </span>
        )}
        <input
          type="text"
          className={styles.addressInput}
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          placeholder="Enter URL or search term"
          aria-label="Address bar"
        />
        <button 
          type="submit" 
          className={styles.searchButton}
          aria-label="Navigate"
        >
          <FaSearch />
        </button>
      </div>
    </form>
  );
};

export default AddressBar;