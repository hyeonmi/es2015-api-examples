import axios from 'axios';

export const getUsers = (url) => {
    return axios.get(url)
};

