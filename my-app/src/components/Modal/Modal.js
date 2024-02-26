import React from 'react';
import './Modal.css';

const Modal = ({ onClose, jobTitle, setJobTitle, jobDescription, setJobDescription, handleSubmit }) => {

    return (
        <div className="modal-background">
            <div className="modal-content">
                <button className="close-button" onClick={onClose}>X</button> 
                <h2>Add Role</h2>
                <p className="subtext">Add job description</p>
                <div className="form-field">
                    <label htmlFor="role">Role</label>
                    <input 
                        type="text" 
                        id="role" 
                        placeholder="Role*" 
                        value={jobTitle} 
                        onChange={(e) => setJobTitle(e.target.value)} 
                        required 
                    />
                </div>
                <div className="form-field">
                    <label htmlFor="jobDescription">Job Description</label>
                    <textarea 
                        id="jobDescription" 
                        placeholder="Job Description*" 
                        value={jobDescription} 
                        onChange={(e) => setJobDescription(e.target.value)} 
                        required 
                    />
                </div>
                <div className="button-container">
                    <button className="cancel-button" onClick={onClose}>Cancel</button>
                    <button className="submit-button" onClick={handleSubmit}>Submit</button>
                </div>
            </div>
        </div>
    );
};

export default Modal;

