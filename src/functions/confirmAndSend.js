import axios, * as others from 'axios';

function confirmAndSend(data)
{

    axios.post('https://win.jij.li/api/auth/login', data)
    .then(response => {
        localStorage.setItem("token", response.data.accessToken);
        window.location.assign("http://localhost:3000/requests");
    })
    .catch(error => {
        console.error('Error:', error);
    });
}

export default confirmAndSend;