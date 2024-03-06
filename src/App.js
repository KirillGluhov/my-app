import { useEffect, useState } from "react";
import React from 'react';
import { jwtDecode } from "jwt-decode";
import { Route, Routes, BrowserRouter, Navigate } from 'react-router-dom';
import Requests from './components/RequestsPage/Requests';
import Keys from './components/KeysPage/Keys';
import Users from './components/UsersPage/Users';
import Login from './components/LoginPage/Login';
import Profile from "./components/ProfilePage/Profile";

function App()
{
    const [isLoggedIn, setIsLoggedIn] = useState(checkToken());

    useEffect(() => {
        setIsLoggedIn(checkToken());
    }, []);

    function checkToken()
    {
        const token = localStorage.getItem('token');

        if (token != null)
        {
            if (jwtDecode(token).UserRole == "Principal" || jwtDecode(token).UserRole == "Admin")
            {
            return true;
            }
            else
            {
            return false;
            }
        }
        else
        {
            return false;
        }
    };

    return (
    <React.StrictMode>
        <BrowserRouter>
          <Routes>
            <Route path="login" element={<Login />} />
            {
                isLoggedIn ? (
                    <>
                        <Route path="requests" element={<Requests />} />
                        <Route path="profile" element={<Profile />} />
                        <Route path="users" element={<Users />} />
                        <Route path="keys" element={<Keys />} />
                        <Route path="*" element={<Navigate to="/requests" />} />
                    </>
                ) 
                : 
                (
                    <Route path="*" element={<Navigate to="/login" />} />
                )
            }
          </Routes>
        </BrowserRouter>
      </React.StrictMode>
    );
}

export default App;