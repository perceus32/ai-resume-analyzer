import React from 'react';
import './HomePage.css';
import TopBar from '../TopBar/TopBar.js';
import FileUpload from '../FileUpload/FileUpload.js';

function HomePage() {

  return (
    <div className="app">
      <TopBar />
      <div className="main-window">
        <FileUpload />
      </div>
    </div>
  );
}

export default HomePage;
