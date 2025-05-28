import React from 'react';

const Tab = ({ id, title, isActive, onTabClick, onCloseClick }) => {
  // Prevent closing the tab if it's the only one
  const handleCloseClick = (e) => {
    e.stopPropagation(); // Prevent tab activation when closing
    onCloseClick();
  };

  return (
    <div 
      className={`tab ${isActive ? 'active' : ''}`} 
      data-tab-id={id}
      onClick={onTabClick}
    >
      <div className="tab-icon">
        <i className="fa-solid fa-globe"></i>
      </div>
      <div className="tab-title">{title || 'New Tab'}</div>
      <div 
        className="tab-close"
        onClick={handleCloseClick}
      >
        <i className="fa-solid fa-xmark"></i>
      </div>
    </div>
  );
};

export default Tab;