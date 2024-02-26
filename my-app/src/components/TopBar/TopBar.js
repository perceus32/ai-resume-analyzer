import React from 'react';
import userIcon from '../../icons/pp.png'; 
import companyIcon from '../../icons/crux.png'; 
import './TopBar.css';

const TopBar = () => {
  return (
    <div className="top-bar">
      <img src={companyIcon} height = "32px" alt="Company Icon" />
      <img src={userIcon} height = "50px" alt="User Icon" />
    </div>
  );
};

export default TopBar;
