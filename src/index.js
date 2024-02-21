import React from 'react';
import ReactDOM from 'react-dom/client';
import 'bootstrap/dist/css/bootstrap.min.css';
import './styles/root.css'
import { Route, Routes, BrowserRouter } from 'react-router-dom';
import Requests from './components/Requests';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<div>/</div>} />
        <Route path="registration" element={<div>Registration</div>} />
        <Route path="login" element={<div>Login</div>} />
        <Route path="requests" element={<Requests/>} />
        <Route path="profile" element={<div>Profile</div>} />
        <Route path="users" element={<div>Users</div>} />
        <Route path="keys" element={<div>Keys</div>} />
        <Route path="keys/create" element={<div>Create key</div>} />
        <Route path="*" element={<div>Такой страницы нет</div>} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);

/* 
Header. Поле type = "authorized" | "unauthorized", поле page = "keys" | "users" | "requests" | "profile" | "registration" | "login" | "main"
*/
