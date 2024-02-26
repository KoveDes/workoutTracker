import {axiosPrivate} from "../api/axios";
import {useEffect} from "react";
import useAuth from "./useAuth";
import useRefreshToken from "./useRefreshToken";
import useLogout from "./useLogout.js";

/*Attach interceptors to Axios private instance*/
const useAxiosPrivate = () => {
    const logout = useLogout();
    const refresh = useRefreshToken();
    const {auth, setAuth, setPersist, setUser} = useAuth();

    useEffect(() => {
        const requestIntercept = axiosPrivate.interceptors.request.use(
            config => {
                //initial request
                if (!config.headers['Authorization']) {
                    config.headers['Authorization'] = `Bearer ${auth?.accessToken}`
                }
                return config;
            }, error => Promise.reject(error)
        )

        const responseIntercept = axiosPrivate.interceptors.response.use(
            response => response,
            async (error) => {
                //Handling expired AT
                const prevReq = error?.config;
                if (error?.response?.status === 403 && !prevReq?.sent) {
                    prevReq.sent = true; //retry only once
                    try {
                        const newAT = await refresh();
                        console.log('Zapisano nowy AT');
                        prevReq.headers['Authorization'] = `Bearer ${newAT}`;
                        return axiosPrivate(prevReq);
                    }
                    catch(e) {
                        setAuth({});
                        setUser({})
                        setPersist(false);
                        localStorage.removeItem('persist');
                    }
                }
                return Promise.reject(error);
            }
        )
        //Cleanup function
        return () => {
            axiosPrivate.interceptors.request.eject(requestIntercept);
            axiosPrivate.interceptors.response.eject(responseIntercept);
        }

    }, [auth, refresh])

    return axiosPrivate;
}

export default useAxiosPrivate;