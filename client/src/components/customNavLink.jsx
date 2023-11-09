import React from 'react';
import {NavLink} from "react-router-dom";

function CustomNavLink({children, to, style}) {
    return (
            <NavLink
                to={to}
                style={style}

                className={({isActive}) => isActive ? 'link-active' : null}
            >{children}</NavLink>
    );

}

export default CustomNavLink;