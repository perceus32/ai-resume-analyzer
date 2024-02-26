import React from 'react';
import './App.css';
import TopBar from './components/TopBar/TopBar.js';
import FileUpload from './components/FileUpload/FileUpload.js';

function App() {

  return (
    <div className="app">
      <TopBar />
      <div className="main-window">
        <FileUpload />
      </div>
    </div>
  );
}

export default App;
