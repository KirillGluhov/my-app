import axios, * as others from 'axios';
import { jwtDecode } from "jwt-decode";

function logoutUser()
{
    axios.post('https://win.jij.li/api/auth/logout')
    .then(response => {
        
        localStorage.removeItem("token");
        window.location.assign("http://localhost:3000/login");
    })
    .catch(error => {
        window.location.assign("http://localhost:3000/login");
    });
}

export default logoutUser;