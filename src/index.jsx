import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import Sincheong from './pages/Sincheong';
import { LOGIN_URL, SINCHEONG_URL } from './constants/URLConstants';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Router>
      <Routes>
        <Route path={LOGIN_URL} element={<Login />} />
        <Route
          path={SINCHEONG_URL}
          element={<Sincheong />}
        />
        <Route path="*" element={<Navigate to={LOGIN_URL} />} />
      </Routes>
    </Router>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
