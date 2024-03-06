import axios, * as others from 'axios';
import { jwtDecode } from "jwt-decode";

function logoutUser()
{
    axios.post('https://win.jij.li/api/auth/logout')
    .then(response => {
        
        window.location.assign("http://localhost:3000/login");
        localStorage.clear();
    })
    .catch(error => {
        window.location.assign("http://localhost:3000/login");
        localStorage.clear();
    });
}

export default logoutUser;