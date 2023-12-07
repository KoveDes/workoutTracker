import axios from "axios";
import production from "../../config.js";
const BASE_URL = production ? 'https://gymtrackr-api.onrender.com' : '/api'

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
