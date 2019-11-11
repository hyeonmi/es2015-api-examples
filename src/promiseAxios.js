import axios from 'axios';

export const getAjax = (url) => {
    return axios.get(url)
};

