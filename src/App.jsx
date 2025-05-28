import { useState, useEffect, useRef } from 'react';
import Tab from './components/Tab';
import TabContent from './components/TabContent';

function App() {
  const GATEWAY_BASE = 'http://localhost:3000';
  const [tabs, setTabs] = useState([]);
  const [activeTabId, setActiveTabId] = useState(null);
  const [tabCounter, setTabCounter] = useState(0);
  const [inputValue, setInputValue] = useState('');
  
  // Refs for navigation buttons
  const backButtonRef = useRef(null);
  const forwardButtonRef = useRef(null);
  const reloadButtonRef = useRef(null);

  // Initialize app - only runs once
  useEffect(() => {
    // Create initial tab only if we don't have any
    if (tabs.length === 0) {
      const newTabId = `tab-${tabCounter}`;
      const newTab = {
        id: newTabId,
        title: 'New Tab',
        url: '',
        history: [],
        currentIndex: -1,
        hasSearched: false,
        isFirstTab: true
      };
      
      setTabs([newTab]);
      setActiveTabId(newTabId);
      setTabCounter(prevCounter => prevCounter + 1);
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
  }, []); // Empty dependency array ensures this only runs once

  // Update navigation buttons when active tab changes
  useEffect(() => {
    if (activeTabId !== null) {
      updateButtons();
    }
  }, [activeTabId, tabs]);

  const createNewTab = () => {
    const newTabId = `tab-${tabCounter}`;
    
    const newTab = {
      id: newTabId,
      title: 'New Tab',
      url: '',
      history: [],
      currentIndex: -1,
      hasSearched: false,
      isFirstTab: false // Only the initial tab should be first tab
    };
    
    setTabs(prevTabs => [...prevTabs, newTab]);
    setActiveTabId(newTabId);
    setTabCounter(prevCounter => prevCounter + 1);
  };

  const closeTab = (tabId) => {
    setTabs(prevTabs => {
      // If this is the last tab, don't close it - create a new empty tab instead
      if (prevTabs.length <= 1) {
        // We'll create a new tab after this function completes
        setTimeout(() => {
          // Create a new tab with a clean state
          const newTabId = `tab-${tabCounter}`;
          const newTab = {
            id: newTabId,
            title: 'New Tab',
            url: '',
            history: [],
            currentIndex: -1,
            hasSearched: false,
            isFirstTab: false
          };
          
          setTabs([newTab]);
          setActiveTabId(newTabId);
          setTabCounter(prevCounter => prevCounter + 1);
        }, 0);
        
        // Return an empty array - this will be replaced by the new tab
        return [];
      }
      
      const updatedTabs = prevTabs.filter(tab => tab.id !== tabId);
      
      // If we're closing the active tab, set a new active tab
      if (activeTabId === tabId) {
        // Find the index of the tab being closed
        const closedTabIndex = prevTabs.findIndex(tab => tab.id === tabId);
        
        // Prefer to activate the tab to the left, unless it's the first tab
        const newActiveIndex = closedTabIndex === 0 ? 0 : closedTabIndex - 1;
        setActiveTabId(updatedTabs[newActiveIndex].id);
      }
      
      return updatedTabs;
    });
  };

  const setActiveTab = (tabId) => {
    setActiveTabId(tabId);
    
    // Update URL input to show current tab's URL
    const tabInfo = tabs.find(tab => tab.id === tabId);
    if (tabInfo) {
      setInputValue(tabInfo.url);
    }
  };

  const navigateTo = () => {
    if (inputValue.trim() && activeTabId) {
      const activeTab = tabs.find(tab => tab.id === activeTabId);
      if (activeTab) {
        goTo(inputValue.trim(), activeTab);
      }
    }
  };

  const goTo = (address, tabInfo) => {
    const addr = address.trim();
    const isContract = /^0x[a-fA-F0-9]{40}$/.test(addr);

    // Build URL based on whether it's a contract address or not
    const url = isContract
      ? `${GATEWAY_BASE}/${addr}/index.html`
      : `${GATEWAY_BASE}/${addr}`;

    // Update tab info
    setTabs(prevTabs => {
      return prevTabs.map(tab => {
        if (tab.id === tabInfo.id) {
          // Update history but prevent duplicates
          let newHistory = [...tab.history];
          let newIndex = tab.currentIndex;
          
          if (tab.history[tab.currentIndex] !== url) {
            newHistory = newHistory.slice(0, tab.currentIndex + 1);
            newHistory.push(url);
            newIndex = newHistory.length - 1;
          }
          
          return {
            ...tab,
            url: addr,
            title: isContract ? `${addr.substring(0, 20)}${addr.length > 20 ? '...' : ''}` : addr.substring(0, 20),
            history: newHistory,
            currentIndex: newIndex,
            hasSearched: true
          };
        }
        return tab;
      });
    });
  };

  const goBack = () => {
    if (!activeTabId) return;

    const activeTab = tabs.find(tab => tab.id === activeTabId);
    if (activeTab && activeTab.currentIndex > 0) {
      setTabs(prevTabs => {
        return prevTabs.map(tab => {
          if (tab.id === activeTabId) {
            return {
              ...tab,
              currentIndex: tab.currentIndex - 1
            };
          }
          return tab;
        });
      });
    }
  };

  const goForward = () => {
    if (!activeTabId) return;

    const activeTab = tabs.find(tab => tab.id === activeTabId);
    if (activeTab && activeTab.currentIndex < activeTab.history.length - 1) {
      setTabs(prevTabs => {
        return prevTabs.map(tab => {
          if (tab.id === activeTabId) {
            return {
              ...tab,
              currentIndex: tab.currentIndex + 1
            };
          }
          return tab;
        });
      });
    }
  };

  const reload = () => {
    if (!activeTabId) return;

    const activeTab = tabs.find(tab => tab.id === activeTabId);
    if (activeTab && activeTab.history[activeTab.currentIndex]) {
      // Force a reload by updating the tab
      setTabs(prevTabs => {
        return prevTabs.map(tab => {
          if (tab.id === activeTabId) {
            return { ...tab };
          }
          return tab;
        });
      });
    }
  };

  const updateButtons = () => {
    const activeTab = tabs.find(tab => tab.id === activeTabId);
    
    if (activeTab) {
      if (backButtonRef.current) {
        backButtonRef.current.disabled = activeTab.currentIndex <= 0;
      }
      
      if (forwardButtonRef.current) {
        forwardButtonRef.current.disabled = activeTab.currentIndex >= activeTab.history.length - 1;
      }
      
      if (reloadButtonRef.current) {
        reloadButtonRef.current.disabled = activeTab.currentIndex === -1;
      }
    }
  };

  const toggleTheme = () => {
    const htmlElement = document.documentElement;
    const currentTheme = htmlElement.getAttribute('data-theme');
    const newTheme = currentTheme === 'light' ? 'dark' : 'light';

    htmlElement.setAttribute('data-theme', newTheme);

    // Save theme preference
    localStorage.setItem('preferredTheme', newTheme);
  };

  const handleFeaturedItemClick = (contract) => {
    setInputValue(contract);
    navigateTo();
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      navigateTo();
    }
  };

  const activeTab = tabs.find(tab => tab.id === activeTabId);

  return (
    <>
      <div className="browser-header">
        <div className="title-bar">
          <div className="tab-container" id="tabContainer">
            {tabs.map(tab => (
              <Tab
                key={tab.id}
                id={tab.id}
                title={tab.title}
                isActive={tab.id === activeTabId}
                onTabClick={() => setActiveTab(tab.id)}
                onCloseClick={() => closeTab(tab.id)}
              />
            ))}
          </div>
          <div className="new-tab" id="newTabBtn" onClick={createNewTab}>
            <i className="fa-solid fa-plus"></i>
          </div>
        </div>

        <div className="controls">
          <div className="nav-buttons">
            <button 
              className="nav-button" 
              id="backButton" 
              ref={backButtonRef}
              onClick={goBack}
              disabled={!activeTab || activeTab.currentIndex <= 0}
            >
              <i className="fa-solid fa-chevron-left"></i>
            </button>
            <button 
              className="nav-button" 
              id="forwardButton" 
              ref={forwardButtonRef}
              onClick={goForward}
              disabled={!activeTab || activeTab.currentIndex >= activeTab.history.length - 1}
            >
              <i className="fa-solid fa-chevron-right"></i>
            </button>
            <button 
              className="nav-button" 
              id="reloadButton" 
              ref={reloadButtonRef}
              onClick={reload}
              disabled={!activeTab || activeTab.currentIndex === -1}
            >
              <i className="fa-solid fa-arrow-rotate-right"></i>
            </button>
          </div>

          <input 
            className="contract-input" 
            id="contractInput" 
            placeholder="Enter WTTP contract address (0x...)" 
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyPress={handleKeyPress}
          />

          <button className="nav-button" id="goButton" onClick={navigateTo}>
            <i className="fa-solid fa-arrow-right"></i>
          </button>

          <div className="browser-actions">
            <a href="https://x.com/TechnicallyWeb3" target="_blank" rel="noopener noreferrer" style={{ textDecoration: 'none' }}>
              <button className="action-button">
                <i className="fa-brands fa-twitter"></i>
              </button>
            </a>
            <a href="https://discord.gg/2BuEhqfeeB" target="_blank" rel="noopener noreferrer" style={{ textDecoration: 'none' }}>
              <button className="action-button">
                <i className="fa-brands fa-discord"></i>
              </button>
            </a>
            <button className="action-button">
              <i className="fa-regular fa-file-word"></i>
            </button>
          </div>

          {/* Theme Toggle Button */}
          <div className="theme-toggle" id="themeToggle" onClick={toggleTheme}>
            <div className="theme-toggle-icon">
              <span><i className="fa-solid fa-sun"></i></span>
              <span><i className="fa-solid fa-moon"></i></span>
            </div>
            <div className="theme-toggle-slider"></div>
          </div>
        </div>
      </div>

      <div className="browser-content" id="browserContent">
        {tabs.map(tab => (
          <TabContent
            key={tab.id}
            tab={tab}
            isActive={tab.id === activeTabId}
            onFeaturedItemClick={handleFeaturedItemClick}
          />
        ))}
      </div>
    </>
  );
}

export default App;