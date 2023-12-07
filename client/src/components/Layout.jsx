import {Outlet} from "react-router-dom";
import Navbar from "./Navbar.jsx";
import {Box, Container} from "@mui/material";
import {memo} from "react";

function Layout() {
    return (
        <Box sx={{minHeight: '100vh'}}>
            <Navbar/>
            <Container maxWidth='xl' sx={{py: 6, minHeight: 'calc(100vh - 100px)'}}>
            <Outlet/>
            </Container>
        </Box>
    );
}

export default memo(Layout);