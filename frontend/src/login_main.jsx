import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './login.jsx';
import './style.css';

if (localStorage.getItem("key") != null) {
    localStorage.setItem("key", '["dummy1", "d1"],["dummy2", "d2"]');
    console.log("reset")
}

ReactDOM.createRoot(document.getElementById('app')).render(<App />);
