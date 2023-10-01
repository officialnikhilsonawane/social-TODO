import React from 'react';
import ReactDOM from 'react-dom/client';
// import './index.css';
import App from './App';
import Contextapi from './components/Contextapi';
// import Reftest from './components/Reftest';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Contextapi />
  </React.StrictMode>
);
