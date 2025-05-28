import React, { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import Header from './components/Header/Header';
import Sidebar from './components/Sidebar/Sidebar';
import TabBar from './components/Tabs/TabBar';
import NavigationControls from './components/Navigation/NavigationControls';
import AddressBar from './components/Navigation/AddressBar';
import BrowserContent from './components/Content/BrowserContent';
import DefaultContent from './components/Content/DefaultContent';
import styles from './App.module.css';

function App() {
  const [tabs, setTabs] = useState([
    { id: uuidv4(), title: 'New Tab', url: '', isLoading: false }
  ]);
  const [activeTabId, setActiveTabId] = useState(tabs[0].id);
  const [canGoBack] = useState(false);
  const [canGoForward] = useState(false);
  const [isSidebarOpen] = useState(true);

  const activeTab = tabs.find(tab => tab.id === activeTabId) || tabs[0];

  const handleNewTab = () => {
    const newTab = {
      id: uuidv4(),
      title: 'New Tab',
      url: '',
      isLoading: false
    };
    
    setTabs([...tabs, newTab]);
    setActiveTabId(newTab.id);
  };

  const handleTabClick = (tabId) => {
    setActiveTabId(tabId);
  };

  const handleTabClose = (tabId) => {
    if (tabs.length === 1) {
      // If it's the last tab, create a new empty tab
      const newTab = {
        id: uuidv4(),
        title: 'New Tab',
        url: '',
        isLoading: false
      };
      
      setTabs([newTab]);
      setActiveTabId(newTab.id);
    } else {
      const newTabs = tabs.filter(tab => tab.id !== tabId);
      setTabs(newTabs);
      
      // If the active tab is being closed, activate another tab
      if (activeTabId === tabId) {
        const index = tabs.findIndex(tab => tab.id === tabId);
        const newActiveIndex = index === 0 ? 0 : index - 1;
        setActiveTabId(newTabs[newActiveIndex].id);
      }
    }
  };

  const handleNavigate = (url) => {
    setTabs(tabs.map(tab => 
      tab.id === activeTabId 
        ? { ...tab, url, isLoading: true } 
        : tab
    ));
  };

  const handleTitleChange = (title) => {
    setTabs(tabs.map(tab => 
      tab.id === activeTabId 
        ? { ...tab, title } 
        : tab
    ));
  };

  const handleSetLoading = (isLoading) => {
    setTabs(tabs.map(tab => 
      tab.id === activeTabId 
        ? { ...tab, isLoading } 
        : tab
    ));
  };

  const handleBack = () => {
    // This would normally interact with browser history
    console.log('Go back');
  };

  const handleForward = () => {
    // This would normally interact with browser history
    console.log('Go forward');
  };

  const handleRefresh = () => {
    // Force a reload of the current page
    handleNavigate(activeTab.url);
  };

  const handleHome = () => {
    // Navigate to home page (empty tab)
    setTabs(tabs.map(tab => 
      tab.id === activeTabId 
        ? { ...tab, url: '', title: 'New Tab' } 
        : tab
    ));
  };

  // Toggle sidebar functionality can be implemented later
  // const toggleSidebar = () => {
  //   setIsSidebarOpen(!isSidebarOpen);
  // };

  return (
    <div className={styles.app}>
      <Header />
      
      <div className={styles.mainContainer}>
        {isSidebarOpen && <Sidebar />}
        
        <div className={styles.browserContainer}>
          <TabBar 
            tabs={tabs}
            activeTabId={activeTabId}
            onTabClick={handleTabClick}
            onTabClose={handleTabClose}
            onNewTab={handleNewTab}
          />
          
          <div className={styles.navigationBar}>
            <NavigationControls 
              canGoBack={canGoBack}
              canGoForward={canGoForward}
              onBack={handleBack}
              onForward={handleForward}
              onRefresh={handleRefresh}
              onHome={handleHome}
            />
            
            <AddressBar 
              onNavigate={handleNavigate}
            />
          </div>
          
          <div className={styles.contentContainer}>
            {activeTab.url ? (
              <BrowserContent 
                url={activeTab.url}
                isLoading={activeTab.isLoading}
                setIsLoading={handleSetLoading}
                onTitleChange={handleTitleChange}
              />
            ) : (
              <DefaultContent 
                onNavigate={handleNavigate}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;