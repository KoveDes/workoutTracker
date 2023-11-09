import React, {useCallback, useState} from 'react';
import {Outlet, useLocation} from "react-router-dom";
import BodyInfo from "../components/body/BodyInfo.jsx";
import WeightInfo from "../components/body/WeightInfo.jsx";
import {Box, Grid} from "@mui/material";

function Body() {
    const [refresh, setRefresh] = useState(false);
    const location = useLocation();
    const isBodyLocation = location.pathname === '/body';
    const handleRefresh = useCallback(() => {
        setRefresh(v => !v);
    }, []);

    return (
        <Box>

            <Grid container gap='30px' wrap='nowrap' sx={{height: '780px'}}>
                <Box
                    className="first-div"
                    sx={{
                        p: '20px',
                        minWidth: '375px',
                        maxWidth: '375px',
                        boxSizing: 'border-box',
                        borderRadius: '25px',
                        backgroundColor: 'lavender'
                }}>
                    <BodyInfo refresh={refresh} setRefresh={handleRefresh}/>
                </Box>
                <Box
                    // className="second-div weight"
                    flexGrow='1'
                >
                    {isBodyLocation ? <WeightInfo refresh={refresh}/> : <Outlet context={setRefresh}/>}
                </Box>
            </Grid>
        </Box>
    );
}

export default Body;