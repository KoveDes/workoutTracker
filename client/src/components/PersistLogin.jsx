import {Outlet} from "react-router-dom";
import {useEffect, useState} from "react";
import useRefreshToken from "../hooks/useRefreshToken";
import useAuth from "../hooks/useAuth";

function PersistLogin(props) {
    const [isLoading, setIsLoading] = useState(true);
    const refresh = useRefreshToken();
    const {auth, persist} = useAuth();

    //component load
    useEffect(() => {
        let isMounted = true;

        const verifyRT = async () => {
            try {
                await refresh();
            } catch (e) {
                console.error(e);
            } finally {
                setIsLoading(false);
            }
        }
        persist && !auth?.accessToken  ? verifyRT(): setIsLoading(false);

        return () => isMounted = false;
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