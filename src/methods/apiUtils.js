const BASE_URL = 'https://win.jij.li/api';
const DEFAULT_HEADERS = {
    'Content-Type': 'application/json',
};

const fetchData = async (url, method, token, body = null) => {
    const config = {
        method,
        headers: {
            ...DEFAULT_HEADERS,
            'Authorization': `Bearer ${token}`,
        },
    };

    if (body) {
        config.body = JSON.stringify(body);
    }

    try {
        const response = await fetch(`${BASE_URL}${url}`, config);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        return await response.json();
    } catch (error) {
        console.error('Error fetching data:', error);
        throw error;
    }
};

export const get = async (url, token) => {
    return fetchData(url, 'GET', token);
};

export const post = async (url, token, body) => {
    return fetchData(url, 'POST', token, body);
};

export const put = async (url, token, body) => {
    return fetchData(url, 'PUT', token, body);
};

export const del = async (url, token) => {
    return fetchData(url, 'DELETE', token);
};