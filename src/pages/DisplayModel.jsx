import React, { useState, useEffect, Suspense } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, useGLTF } from '@react-three/drei';
import '../styles/DisplayModel.css';

function Model({ path }) {
  const { scene } = useGLTF(path);
  return <primitive object={scene} />;
}

function DisplayModel() {
  const [models, setModels] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchModels() {
      try {
        const response = await axios.get('http://localhost:5000/models');
        console.log('Models fetched:', response.data);
        setModels(response.data);
      } catch (error) {
        console.error('Error fetching models:', error);
        setError('Error fetching models');
      }
    }
    fetchModels();
  }, []);

  return (
    <div>
      <div className='header'>
        <h1>3D MODELS</h1>
        <Link to="/upload">
          <button className='upload-button'>Upload Model</button>
        </Link>
      </div>
      <div className='main-div'>
        {error && <div className="error">{error}</div>}
        {models.map((model, index) => (
          <div key={index} className='model-div'>
            <Suspense fallback={<div>Loading...</div>}>
              <Canvas style={{ height: 800, width: 800, padding: 50 }}>
                <ambientLight />
                <pointLight position={[10, 10, 10]} />
                <Model path={`http://localhost:5000${model.path}`} />
                <OrbitControls />
              </Canvas>
            </Suspense>
          </div>
        ))}
      </div>
    </div>
  );
}

export default DisplayModel;
