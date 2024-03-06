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
    const [isDean, setIsLoggedInDean] = useState(checkTokenDean());
    const [isAdmin, setLoggedInAdmin] = useState(checkTokenAdmin());

    useEffect(() => {
        setIsLoggedInDean(checkTokenDean());
        setLoggedInAdmin(checkTokenAdmin());
    }, []);

    function checkTokenDean()
    {
        const token = localStorage.getItem('token');

        if (token != null)
        {
            if (jwtDecode(token).UserRole == "Principal")
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

    function checkTokenAdmin()
    {
        const token = localStorage.getItem('token');

        if (token != null)
        {
            if (jwtDecode(token).UserRole == "Admin")
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
                isDean ? (
                    <>
                        <Route path="requests" element={<Requests />} />
                        <Route path="profile" element={<Profile />} />
                        <Route path="users" element={<Users />} />
                        <Route path="keys" element={<Keys />} />
                        <Route path="*" element={<Navigate to="/requests" />} />
                    </>
                ) 
                : isAdmin ? (
                    <>
                        <Route path="users" element={<Users />} />
                        <Route path="*" element={<Navigate to="/users" />} />
                    </>
                ) 
                : (
                    <Route path="*" element={<Navigate to="/login" />} />
                )
            }
          </Routes>
        </BrowserRouter>
      </React.StrictMode>
    );
}

export default App;