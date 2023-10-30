import React, {useEffect, useState} from 'react';
import '../BodyInfo.css'
import useAxiosPrivate from "../hooks/useAxiosPrivate.js";
import useAuth from "../hooks/useAuth.js";
import CustomNavLink from "./customNavLink.jsx";
import {Box, Grid, Typography} from "@mui/material";
import Button from "@mui/material/Button";
import {niceParam} from "../utils/formatters.js";
import HeightInfo from "./HeightInfo.jsx";
import {Link} from "react-router-dom";

const bodyParts = ['leftCalf', 'rightCalf', 'leftThigh', 'rightThigh', 'hips', 'waist', 'chest', 'neck', 'shoulders', 'leftForearm', 'rightForearm', 'leftArm', 'rightArm'];


function BodyInfo({refresh, setRefresh}) {
    const [data, setData] = useState([]);

    const axiosPrivate = useAxiosPrivate();
    const {auth} = useAuth();

    useEffect(() => {
        let ignore = false;
        const controller = new AbortController();
        const getBodyPartInfo = async () => {
            try {
                const response = await axiosPrivate.get(`/body/?user=${auth.user}`, {
                    signal: controller.signal
                })
                if (!ignore) {
                    setData(response.data[0].bodyParameters);
                }
            } catch (e) {
                console.log(e);
                setData([]);
            }
        }
        getBodyPartInfo();
        return () => {
            ignore = true;
            controller.abort('useEffect');
        }
    }, [refresh]);

    return (
        <Grid sx={{width: '100%', height: '100%', position: 'relative'}} container className='links' direction='column'
              justifyContent='space-between'>

            <Grid container direction='column' gap={3} justifyContent={'flex-start'} alignItems={'flex-start'}>
                <HeightInfo setRefresh={setRefresh}/>

            </Grid>
            <Button
                component={Link}
                to={'/body'}
                sx={{
                    width: '200px',
                    // backgroundColor: 'darkorange',
                    color: 'white',
                    "&:hover": {
                        borderColor: 'orangered',
                    }
                }}
            >Show weight</Button>
            <Box>


                {/*<Grid container justifyContent='space-between' mb='15px'*/}
                {/*>*/}
                {/*    <Typography variant='h6' fontWeight='500' color='grey'>Body Parts</Typography>*/}
                {/*    <Typography variant='h6' fontWeight='500' color='grey' textAlign='right'>Current Sizes</Typography>*/}
                {/*</Grid>*/}
                {bodyParts.map((bodyPart, i) => {
                    const size = data?.[bodyPart]?.size ? `${data[bodyPart].size} cm` : '-';
                    return (
                        <Grid container justifyContent='space-between'
                              key={i}
                        >

                            <Button
                                component={CustomNavLink}
                                to={bodyPart}>{niceParam(bodyPart)}</Button>
                            <Typography fontWeight='500'>{size}</Typography>
                        </Grid>
                    )
                })}
            </Box>
        </Grid>
    );
}

export default BodyInfo;