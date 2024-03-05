import React from 'react';
import ReactDOM from 'react-dom/client';
import 'bootstrap/dist/css/bootstrap.min.css';
import './styles/root.css'
import { Route, Routes, BrowserRouter, Navigate } from 'react-router-dom';
import Requests from './components/Requests';
import Profile from './components/Profile';
import Keys from './components/Keys';
import Users from './components/UsersPage/Users';
import Login from './components/LoginPage/Login';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="login" element={<Login/>} />
        <Route path="requests" element={<Requests/>} />
        <Route path="profile" element={<Profile/>} />
        <Route path="users" element={<Users/>} />
        <Route path="keys" element={<Keys/>} />
        <Route path="keys/create" element={<div>Create key</div>} />
        <Route path="*" element={<Navigate to="/login" />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);

/* 
Header. Поле type = "authorized" | "unauthorized", поле page = "keys" | "users" | "requests" | "profile" | "registration" | "login" | "main"
RequestCard. Поле status = "approved" | "awaits" | "cancelled" | "inProcess"
*/
