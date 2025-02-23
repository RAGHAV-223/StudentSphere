import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css'; // Import global styles if any
import 'bootstrap/dist/css/bootstrap.min.css';
// import 'bootstrap/dist/js/bootstrap.bundle.min.js';

window.API_BASE_URL = "http://localhost:8000";

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
