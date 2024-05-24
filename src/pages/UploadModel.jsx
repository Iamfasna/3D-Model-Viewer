import React, { useState } from 'react';
import '../styles/UploadModel.css';

function UploadModel({ onUpload }) {
  const [file, setFile] = useState(null);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleUpload = () => {
    if (file) {
      onUpload(file);
      setFile(null);
    }
  };

  return (
    <div>
      <div className='dashboard'>
        <h1>DASHBOARD</h1>
        <input type='file' className='input' onChange={handleFileChange} />
        <button onClick={handleUpload}>Upload</button>
      </div>
    </div>
  );
}

export default UploadModel;
