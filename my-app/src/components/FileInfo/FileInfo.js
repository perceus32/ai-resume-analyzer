import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFilePdf } from '@fortawesome/free-solid-svg-icons';
import './FileInfo.css';

const FileInfo = ({ files }) => {
  if (!files || files.length === 0) {
    return null; 
  }

  const handleSelectFile = (fileIndex) => {
    
  };

  const formatFileSize = (size) => {
    if (size < 1024) {
      return `${size} bytes`;
    } else if (size < 1024 * 1024) {
      return `${(size / 1024).toFixed(2)} KB`;
    } else {
      return `${(size / (1024 * 1024)).toFixed(2)} MB`;
    }
  };

  return (
    <div>
    {files.map((file, index) => (
      <div key={index} className="file-details">
        <FontAwesomeIcon icon={faFilePdf} className="pdf-icon" style={{ color: 'red'}} />
        <div className="file-info">
          <p className="file-name">{file.name}</p>
          <p className="file-size">Size: {formatFileSize(file.size)} bytes</p>
        </div>
        <input type="checkbox" className="select-checkbox" checked={true} onChange={() => handleSelectFile(index)} /> 
      </div>
    ))}
  </div>
  );
};

export default FileInfo;
