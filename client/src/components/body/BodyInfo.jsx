import React from 'react';
import CustomNavLink from "../customNavLink.jsx";
import {Box, Grid, Typography} from "@mui/material";
import Button from "@mui/material/Button";
import {niceParam} from "../../utils/formatters.js";
import HeightInfo from "./HeightInfo.jsx";
import {Link} from "react-router-dom";
import useFetch from "../../hooks/useFetch.js";

const bodyParts = ['leftCalf', 'rightCalf', 'leftThigh', 'rightThigh', 'hips', 'waist', 'chest', 'neck', 'shoulders', 'leftForearm', 'rightForearm', 'leftArm', 'rightArm'];


function BodyInfo({refresh, setRefresh}) {
    const {response} = useFetch(({
        method: 'get',
        path: 'body',
        deps: [refresh],
    }))
    const data = response?.[0]?.bodyParameters;

    return (
        <Grid
            sx={{
                height: '100%',
                backgroundColor: 'lavender'
        }}
            container
            className='links'
            direction='column'
            justifyContent='space-between'>
            <Grid container direction='column' gap={3} justifyContent={'flex-start'} alignItems={'flex-start'} sx={{mb: '45px'}}>
                <HeightInfo setRefresh={setRefresh}/>
            </Grid>
            <Button
                component={Link}
                to={'/body'}
                sx={{
                    width: '200px',
                    color: '#3b3b3f',
                    backgroundColor: 'white',
                    "&:hover": {
                        backgroundColor: '#3b3b3f',
                        color: 'white'
                    }
                }}
            >Show weight</Button>
            <Box>
                {bodyParts.map((bodyPart, i) => {
                    const size = data?.[bodyPart]?.size ? `${data[bodyPart].size} cm` : '-';
                    return (
                        <Grid container justifyContent='space-between'
                              key={i}
                        >
                            <CustomNavLink
                                style={{
                                    paddingTop: 0,
                                    paddingBottom: 0,
                                    borderRadius: '5px',
                                    border: '2px solid #3b3b3f',
                                    fontWeight: 500,
                                    margin: '5px 0',
                                }}
                                to={bodyPart}>
                                {niceParam(bodyPart)}
                            </CustomNavLink>
                            <Typography fontWeight='500'>{size}</Typography>
                        </Grid>
                    )
                })}
            </Box>
        </Grid>
    );
}

export default BodyInfo;