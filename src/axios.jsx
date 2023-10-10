import axios from 'axios'

const instance = axios.create({
    baseURL: import.meta.env.VITE_SERVER_URL,
});
instance.interceptors.request.use(function (config) {
    const data = window.localStorage.getItem('persist:phan-bon/auth')
    const tokenObj = data && JSON.parse(data)
    if (tokenObj?.accessToken) config.headers = { authorization: `Bearer ${JSON.parse(tokenObj.accessToken)}` }
    return config;
}, function (error) {
    return error;
});

instance.interceptors.response.use(function (response) {
    return response.data;
}, function (error) {
    return error.response.data;
});

export default instance