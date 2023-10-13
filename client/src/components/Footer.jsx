import React from 'react';
import useLogout from "../hooks/useLogout.js";
import {useNavigate} from "react-router-dom";

function Footer(props) {
    const logout = useLogout();
    const navigate = useNavigate();

    const signOut = async () => {
        await logout();
        navigate('/');

    };

    return (
        <footer className='footer' style={{
            // position: 'absolute',
            // width: '100%',
            // bottom: 0,
            backgroundColor: '#61c1f8',
            textAlign: 'center',
            color: 'white',
            // height: '50px',
            lineHeight: '50px',
            fontWeight: 'bold'
        }}>
            <h2>Footer<span
                style={{fontSize: '1rem', color: 'red'}}
                onClick={signOut}
            > Logout</span></h2>

        </footer>
    );
}

export default React.memo(Footer);