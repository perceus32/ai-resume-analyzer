import React from 'react';
import './FileUpload.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCloudUpload } from '@fortawesome/free-solid-svg-icons';
import { useState } from 'react';
import FileInfo from '../FileInfo/FileInfo';
import Modal from '../Modal/Modal.js'

const FileUpload = () => {
    const [isHovered, setIsHovered] = useState(false);
    const [files, setFiles] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [jobTitle, setJobTitle] = useState('');
    const [jobDescription, setJobDescription] = useState('');

    const handleFileChange = (event) => {
        const file = event.target.files[0];
        setFiles(prevFiles => [...prevFiles, file]);
        console.log('Selected file:', file);
      };

      const handleDragOver = (event) => {
        event.preventDefault();
        setIsHovered(true);
      };

      const handleDragLeave = () => {
        setIsHovered(false);
      };

      const handleCancel = () => {
        setFiles([]);
    };
    
      const handleDrop = (event) => {
        event.preventDefault();
        setIsHovered(false);
        const file = event.dataTransfer.files[0];
        setFiles(prevFiles => [...prevFiles, file]);
        console.log('Dropped file:', file);
      };

      const handleAttachFiles = () => {
        console.log('Attached files:', files);
        setShowModal(true); 
      };

      const handleSubmit = async () => {
        const formData = new FormData();
        formData.append('jobTitle', jobTitle);
        formData.append('jobDescription', jobDescription);
        files.forEach((file) => {
          formData.append('files', file);
        });
    
        try {
          const response = await fetch('http://localhost:8000/api/upload/', {
            method: 'POST',
            body: formData
          });
          if (response.ok) {
            console.log('Submission successful');
            const responseData = await response.json();
            console.log(responseData); 
            setJobTitle('');
            setJobDescription('');
            setFiles([]);
          } else {
            console.error('Submission failed');
          }
        } catch (error) {
          console.error('Error submitting data:', error);
        }
      };

      //TEST
// const handleSubmit = async () => {
//     try {
//         const response = await axios.post('http://localhost:8000/api/test/', { message: 'Hello from React' });
//         console.log(response.data.message); // Output: Hello from Django
//     } catch (error) {
//         console.error('Error:', error);
//     }
// }

    const handleCloseModal = () => {
      setShowModal(false); 
    };

  return (
    <div>
    <div className={`rounded-rectangle ${isHovered ? 'hovered' : ''}`} 
        onDrop={handleDrop} onDragOver={handleDragOver} onDragLeave={handleDragLeave}>
        <FontAwesomeIcon icon={faCloudUpload} />
        <div>
            <label htmlFor="file-upload" className="upload-text">Click to upload PDF</label>
            <label className="drag-text"> or drag and drop</label>
            <input id="file-upload" type="file" onChange={handleFileChange} style={{ display: 'none' }} />
        </div>
    </div>
      <FileInfo files = {files}/>
      <div className="button-container">
          <button className="cancel-button" onClick={handleCancel}>Cancel</button>
          <button className="submit-button" onClick={handleAttachFiles}>Attach Files</button>
      </div>
      {showModal && <Modal 
        jobTitle={jobTitle}
        setJobTitle={setJobTitle}
        jobDescription={jobDescription}
        setJobDescription={setJobDescription}
        handleSubmit={handleSubmit}
        onClose={handleCloseModal} />}
    </div>
    
  );
};

export default FileUpload;
