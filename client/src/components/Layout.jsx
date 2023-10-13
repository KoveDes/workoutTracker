import React from 'react';
import {Outlet} from "react-router-dom";
import Navbar from "./Navbar.jsx";
import Footer from "./Footer.jsx";

function Layout(props) {
    return (
        <>
            <Navbar/>
            <main style={{minHeight: '80vh'}}>
                <Outlet/>
            </main>
            <Footer/>
        </>
    );
}

export default Layout;