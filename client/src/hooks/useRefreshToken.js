import React from 'react';
import useAuth from "./useAuth";
import axios from "../api/axios";

function UseRefreshToken(props) {
    const {setAuth, setUser} = useAuth();
    return async () => {
        const response = await axios.get('/auth/refresh', {
            withCredentials: true, //allows to send cookies along with request
        });
        console.log(response)
        setAuth(prev => {
            return ({
                ...prev,
                user: response.data.user,
                accessToken: response.data.accessToken
            })
        });
        setUser((prev) => ({
            ...prev,
            gender: response?.data?.gender,
            username: response?.data?.username,

        }))
        return response.data.accessToken;
    };
}


export default UseRefreshToken;