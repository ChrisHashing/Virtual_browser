import React, { useState, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';
import styles from './App.module.css';

// Component imports
import Header from './components/Header/Header';
import Sidebar from './components/Sidebar/Sidebar';
import TabBar from './components/Tabs/TabBar';
import NavigationControls from './components/Navigation/NavigationControls';
import AddressBar from './components/Navigation/AddressBar';
import BrowserContent from './components/Content/BrowserContent';

function App() {
  // State
  const [tabs, setTabs] = useState([]);
  const [activeTabId, setActiveTabId] = useState(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // Initialize with a default tab
  useEffect(() => {
    if (tabs.length === 0) {
      const newTab = {
        id: uuidv4(),
        title: 'New Tab',
        url: '',
        favicon: null,
        history: [],
        currentHistoryIndex: -1
      };
      
      setTabs([newTab]);
      setActiveTabId(newTab.id);
    }
    
    // Apply saved theme preference on page load
    const storedTheme = localStorage.getItem('preferredTheme');
    if (storedTheme === 'light' || storedTheme === 'dark') {
      document.documentElement.setAttribute('data-theme', storedTheme);
    } else {
      // Follow system preference if no manual choice saved
      const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      document.documentElement.setAttribute('data-theme', systemPrefersDark ? 'dark' : 'light');
    }
  }, []);

  // Tab management functions
  const handleAddTab = () => {
    const newTab = {
      id: uuidv4(),
      title: 'New Tab',
      url: '',
      favicon: null,
      history: [],
      currentHistoryIndex: -1
    };
    
    setTabs([...tabs, newTab]);
    setActiveTabId(newTab.id);
  };

  const handleCloseTab = (tabId) => {
    // Don't close if it's the last tab
    if (tabs.length <= 1) {
      const newTab = {
        id: uuidv4(),
        title: 'New Tab',
        url: '',
        favicon: null,
        history: [],
        currentHistoryIndex: -1
      };
      
      setTabs([newTab]);
      setActiveTabId(newTab.id);
      return;
    }
    
    const updatedTabs = tabs.filter(tab => tab.id !== tabId);
    
    // If closing the active tab, select another tab
    if (activeTabId === tabId) {
      const closedTabIndex = tabs.findIndex(tab => tab.id === tabId);
      const newActiveIndex = closedTabIndex === 0 ? 0 : closedTabIndex - 1;
      setActiveTabId(updatedTabs[newActiveIndex].id);
    }
    
    setTabs(updatedTabs);
  };

  const handleSelectTab = (tabId) => {
    setActiveTabId(tabId);
  };

  // Navigation functions
  const handleNavigate = (url) => {
    setIsLoading(true);
    
    // Process URL (add https:// if needed)
    let processedUrl = url;
    if (!/^https?:\/\//i.test(url)) {
      processedUrl = 'https://' + url;
    }
    
    // Update the active tab
    setTabs(prevTabs => 
      prevTabs.map(tab => {
        if (tab.id === activeTabId) {
          // Update history
          const newHistory = [...tab.history.slice(0, tab.currentHistoryIndex + 1), processedUrl];
          
          return {
            ...tab,
            url: processedUrl,
            title: url, // Will be updated when page loads
            history: newHistory,
            currentHistoryIndex: newHistory.length - 1
          };
        }
        return tab;
      })
    );
    
    // Simulate page loading
    setTimeout(() => {
      setIsLoading(false);
    }, 1000);
  };

  const handleBack = () => {
    const activeTab = tabs.find(tab => tab.id === activeTabId);
    
    if (activeTab && activeTab.currentHistoryIndex > 0) {
      setIsLoading(true);
      
      setTabs(prevTabs => 
        prevTabs.map(tab => {
          if (tab.id === activeTabId) {
            const newIndex = tab.currentHistoryIndex - 1;
            return {
              ...tab,
              url: tab.history[newIndex],
              currentHistoryIndex: newIndex
            };
          }
          return tab;
        })
      );
      
      setTimeout(() => {
        setIsLoading(false);
      }, 500);
    }
  };

  const handleForward = () => {
    const activeTab = tabs.find(tab => tab.id === activeTabId);
    
    if (activeTab && activeTab.currentHistoryIndex < activeTab.history.length - 1) {
      setIsLoading(true);
      
      setTabs(prevTabs => 
        prevTabs.map(tab => {
          if (tab.id === activeTabId) {
            const newIndex = tab.currentHistoryIndex + 1;
            return {
              ...tab,
              url: tab.history[newIndex],
              currentHistoryIndex: newIndex
            };
          }
          return tab;
        })
      );
      
      setTimeout(() => {
        setIsLoading(false);
      }, 500);
    }
  };

  const handleRefresh = () => {
    setIsLoading(true);
    
    setTimeout(() => {
      setIsLoading(false);
    }, 500);
  };

  const handleHome = () => {
    setIsLoading(true);
    
    setTabs(prevTabs => 
      prevTabs.map(tab => {
        if (tab.id === activeTabId) {
          return {
            ...tab,
            url: '',
            title: 'New Tab'
          };
        }
        return tab;
      })
    );
    
    setTimeout(() => {
      setIsLoading(false);
    }, 500);
  };

  // Sidebar toggle
  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  // Theme toggle
  const toggleTheme = () => {
    const htmlElement = document.documentElement;
    const currentTheme = htmlElement.getAttribute('data-theme');
    const newTheme = currentTheme === 'light' ? 'dark' : 'light';

    htmlElement.setAttribute('data-theme', newTheme);

    // Save theme preference
    localStorage.setItem('preferredTheme', newTheme);
  };

  // Get the active tab
  const activeTab = tabs.find(tab => tab.id === activeTabId);
  
  // Check if navigation buttons should be enabled
  const canGoBack = activeTab && activeTab.currentHistoryIndex > 0;
  const canGoForward = activeTab && activeTab.currentHistoryIndex < activeTab.history.length - 1;

  return (
    <div className={`${styles.browserContainer} ${isSidebarOpen ? styles.sidebarOpen : ''}`}>
      <Header toggleSidebar={toggleSidebar} />
      
      <div className={styles.mainContent}>
        <Sidebar isOpen={isSidebarOpen} />
        
        <div className={styles.contentArea}>
          <TabBar 
            tabs={tabs} 
            activeTabId={activeTabId} 
            onSelectTab={handleSelectTab} 
            onCloseTab={handleCloseTab} 
            onAddTab={handleAddTab} 
          />
          
          <div className={styles.navigationBar}>
            <NavigationControls 
              onBack={handleBack} 
              onForward={handleForward} 
              onRefresh={handleRefresh} 
              onHome={handleHome} 
              canGoBack={canGoBack} 
              canGoForward={canGoForward} 
            />
            <AddressBar 
              currentUrl={activeTab ? activeTab.url : ''} 
              onNavigate={handleNavigate} 
            />
          </div>
          
          <BrowserContent 
            activeTab={activeTab} 
            isLoading={isLoading} 
          />
        </div>
      </div>
    </div>
  );
}

export default App;