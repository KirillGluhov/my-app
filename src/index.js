import React from 'react';
import ReactDOM from 'react-dom/client';
import 'bootstrap/dist/css/bootstrap.min.css';
import './styles/root.css';
import App from './App';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <App/>
);

/* 
Header. Поле type = "authorized" | "unauthorized", поле page = "keys" | "users" | "requests" | "profile" | "registration" | "login" | "main"
RequestCard. Поле status = "approved" | "awaits" | "cancelled" | "inProcess"
*/
