import React, {useState} from 'react';
import {Link, Outlet, useLocation} from "react-router-dom";
import '../Body.css'
import BodyInfo from "../components/BodyInfo.jsx";
import WeightInfo from "../components/WeightInfo.jsx";
import '../weightInfo.css'
import {Box, Grid} from "@mui/material";

function Body(props) {
    const [refresh, setRefresh] = useState();
    const location = useLocation();
    const isBodyLocation = location.pathname === '/body';

    return (
        <Box sx={{
            margin: '30px 2.5%',
            textAlign: 'center',
        }}>
            <Box className='about-page' style={{
                margin: '30px 0'
            }}>
                {/*<BodyInfo />*/}
                <Box className="grid-container">
                    <Box className="first-div" p='20px'>
                        <BodyInfo refresh={refresh} setRefresh={setRefresh}/>
                    </Box>
                    <Box className="second-div weight">
                        {isBodyLocation ? <WeightInfo refresh={refresh} /> :  <Outlet context={setRefresh}/>}
                    </Box>
                </Box>


            </Box>
        </Box>
    );
}

export default Body;