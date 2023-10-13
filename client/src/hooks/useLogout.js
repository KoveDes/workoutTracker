import useAuth from "./useAuth";
import axios from "../api/axios";

const useLogout = () => {
    const {setAuth, setPersist} = useAuth();

    return async () => {
        try {
            const response = await axios('/auth/logout', {
                withCredentials: true
            });
            console.log(response);
            setAuth({});
            setPersist(false);
            localStorage.removeItem('persist');

        } catch (e) {
            console.log(e);
        }
    };
}

export default useLogout;