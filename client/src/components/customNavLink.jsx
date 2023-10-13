import React from 'react';
import {NavLink} from "react-router-dom";

function CustomNavLink({children, to}) {
    return (
            <NavLink
                to={to}
                className={({isActive}) => isActive ? 'link-active' : null}
            >{children}</NavLink>
    );

}

export default CustomNavLink;