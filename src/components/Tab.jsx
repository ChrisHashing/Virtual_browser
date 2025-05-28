import React from 'react';

const Tab = ({ id, title, isActive, onTabClick, onCloseClick }) => {
  return (
    <div 
      className={`tab ${isActive ? 'active' : ''}`} 
      data-tab-id={id}
      onClick={onTabClick}
    >
      <div className="tab-icon">
        <i className="fa-solid fa-globe"></i>
      </div>
      <div className="tab-title">{title}</div>
      <div 
        className="tab-close"
        onClick={(e) => {
          e.stopPropagation();
          onCloseClick();
        }}
      >
        <i className="fa-solid fa-xmark"></i>
      </div>
    </div>
  );
};

export default Tab;