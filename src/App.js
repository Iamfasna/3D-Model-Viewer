import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import DisplayModel from './pages/DisplayModel';
import UploadModel from './pages/UploadModel';
import axios from 'axios';
import './App.css';

function App() {
  const [models, setModels] = useState([]);

  useEffect(() => {
    async function fetchModels() {
      try {
        const response = await axios.get('http://localhost:5000/models');
        setModels(response.data);
      } catch (error) {
        console.error('Error fetching models:', error);
      }
    }
    fetchModels();
  }, []);

  const handleUpload = async (file) => {
    const formData = new FormData();
    formData.append('model', file);

    try {
      const response = await axios.post('http://localhost:5000/upload', formData);
      setModels([...models, { path: response.data.path }]);
    } catch (error) {
      console.error('Error uploading model:', error);
    }
  };

  return (
    <Router>
      <Routes>
        <Route path="/" element={<DisplayModel models={models} />} />
        <Route path="/upload" element={<UploadModel onUpload={handleUpload} />} />
      </Routes>
    </Router>
  );
}

export default App;
