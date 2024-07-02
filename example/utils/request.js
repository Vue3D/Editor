import axios from "axios";

const request = axios.create({
    withCredentials: true,
    timeout: 10000
})

request.interceptors.request.use(config => {
    return config
}, error => {
    return Promise.reject(error);
})

request.interceptors.response.use(res => {
    let {code, data, msg} = res.data
    if (code === 2000) {
        return res.data
    } else {
        return res.data
    }

}, error => {
    return Promise.reject(error);
})

export default request
