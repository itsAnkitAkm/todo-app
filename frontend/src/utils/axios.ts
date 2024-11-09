import axios from "axios";

const instance = axios.create({
    
    baseURL: `https://server-v7my.onrender.com/api/v1/`,
    withCredentials: true,

});

export default instance;