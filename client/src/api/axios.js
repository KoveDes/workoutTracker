import axios from "axios";
const BASE_URL = 'https://gymtrackr-api.onrender.com/'

const axiosPublic = axios.create({
    baseURL: BASE_URL
});
export const axiosPrivate = axios.create({
    baseURL: BASE_URL,
    headers: {
        'Content-Type': 'application/json',
        withCredentials: true,
    }
})

export default axiosPublic;
