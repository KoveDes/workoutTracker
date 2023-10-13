import React from 'react';
import useAuth from "../hooks/useAuth";
import {Navigate, Outlet, useLocation} from "react-router-dom";

function RequireAuth(props) {
    const {auth} = useAuth();
    const location = useLocation();
    // console.log(auth);
    return (
        auth?.user ? <Outlet/>
            : (
                // <div>Nie masz dostępu
                // <h1>{JSON.stringify(auth)}</h1>
                // </div>
                <Navigate to='/login' state={{from: location}}  replace/>
            )
    );
}

export default RequireAuth;