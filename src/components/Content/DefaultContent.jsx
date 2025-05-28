import React, { useState } from 'react';
import { 
  FaGlobe, 
  FaSearch, 
  FaYoutube, 
  FaWikipediaW, 
  FaTwitter, 
  FaGithub, 
  FaReddit, 
  FaAmazon, 
  FaGoogle 
} from 'react-icons/fa';
import styles from './DefaultContent.module.css';

const DefaultContent = ({ onNavigate }) => {
  const [searchQuery, setSearchQuery] = useState('');
  
  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      // Check if it's a URL or a search query
      const isUrl = /^(https?:\/\/)?([\da-z.-]+)\.([a-z.]{2,6})([/\w .-]*)*\/?$/.test(searchQuery);
      
      if (isUrl) {
        const url = searchQuery.startsWith('http') ? searchQuery : `https://${searchQuery}`;
        onNavigate(url);
      } else {
        onNavigate(`https://www.google.com/search?q=${encodeURIComponent(searchQuery)}`);
      }
    }
  };
  
  const quickLinks = [
    { id: 'google', name: 'Google', icon: <FaGoogle className={styles.linkIcon} />, url: 'https://www.google.com' },
    { id: 'youtube', name: 'YouTube', icon: <FaYoutube className={styles.linkIcon} />, url: 'https://www.youtube.com' },
    { id: 'wikipedia', name: 'Wikipedia', icon: <FaWikipediaW className={styles.linkIcon} />, url: 'https://www.wikipedia.org' },
    { id: 'twitter', name: 'Twitter', icon: <FaTwitter className={styles.linkIcon} />, url: 'https://www.twitter.com' },
    { id: 'github', name: 'GitHub', icon: <FaGithub className={styles.linkIcon} />, url: 'https://www.github.com' },
    { id: 'reddit', name: 'Reddit', icon: <FaReddit className={styles.linkIcon} />, url: 'https://www.reddit.com' },
    { id: 'amazon', name: 'Amazon', icon: <FaAmazon className={styles.linkIcon} />, url: 'https://www.amazon.com' },
    { id: 'custom', name: 'Custom', icon: <FaGlobe className={styles.linkIcon} />, url: '' }
  ];
  
  return (
    <div className={styles.defaultContent}>
      <FaGlobe className={styles.logo} />
      <h1 className={styles.title}>Welcome to Virtual Browser</h1>
      <p className={styles.subtitle}>
        Browse the web securely and efficiently with our virtual browser application.
      </p>
      
      <div className={styles.searchContainer}>
        <form className={styles.searchForm} onSubmit={handleSearch}>
          <input
            type="text"
            className={styles.searchInput}
            placeholder="Search the web or enter a URL"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <button type="submit" className={styles.searchButton}>
            <FaSearch />
            <span>Search</span>
          </button>
        </form>
      </div>
      
      <div className={styles.quickLinks}>
        {quickLinks.map((link) => (
          <div 
            key={link.id} 
            className={styles.quickLink}
            onClick={() => link.url && onNavigate(link.url)}
            style={{ cursor: link.url ? 'pointer' : 'default' }}
          >
            {link.icon}
            <span className={styles.linkText}>{link.name}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DefaultContent;