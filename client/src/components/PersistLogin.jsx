import {Outlet} from "react-router-dom";
import {useEffect, useState} from "react";
import useRefreshToken from "../hooks/useRefreshToken";
import useAuth from "../hooks/useAuth";

function PersistLogin() {
    const [isLoading, setIsLoading] = useState(true);
    const refresh = useRefreshToken();
    const {auth, persist} = useAuth();

    useEffect(() => {
        let ignore = false;

        const verifyRT = async () => {
            try {
                if(!ignore) await refresh();
            } catch (e) {
                // console.error(e);
            }
            setIsLoading(false);
        }
        persist && !auth?.accessToken  ? verifyRT(): setIsLoading(false);

        return () => ignore = true;
    }, [auth.user])

    return (
        <>
            {
                !persist ?
                    <Outlet/>
                    :
                    isLoading ?
                        <p>Loading...</p>
                        : <Outlet/>
            }
        </>
    );
}

export default PersistLogin;