import axios from "axios";
const BASE_URL = '/api'

const axiosPublic = axios.create({
    baseURL: BASE_URL
});
// Attach interceptors to work with JWT
export const axiosPrivate = axios.create({
    baseURL: BASE_URL,
    headers: {
        'Content-Type': 'application/json',
        withCredentials: true,
    }
})

export default axiosPublic;
