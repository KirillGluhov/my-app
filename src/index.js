import React from 'react';
import ReactDOM from 'react-dom/client';
import 'bootstrap/dist/css/bootstrap.min.css';
import './styles/root.css'
import { Route, Routes, BrowserRouter } from 'react-router-dom';
import Requests from './components/Requests';
import Profile from './components/Profile';
import Keys from './components/KeysPage/Keys';
import Users from './components/UsersPage/Users';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<div>/</div>} />
        <Route path="registration" element={<div>Registration</div>} />
        <Route path="login" element={<div>Login</div>} />
        <Route path="requests" element={<Requests/>} />
        <Route path="profile" element={<Profile/>} />
        <Route path="users" element={<Users/>} />
        <Route path="keys" element={<Keys/>} />
        <Route path="keys/create" element={<div>Create key</div>} />
        <Route path="*" element={<div>Такой страницы нет</div>} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);

/* 
Header. Поле type = "authorized" | "unauthorized", поле page = "keys" | "users" | "requests" | "profile" | "registration" | "login" | "main"
RequestCard. Поле status = "approved" | "awaits" | "cancelled" | "inProcess"
*/
